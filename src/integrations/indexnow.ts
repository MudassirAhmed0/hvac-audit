/**
 * Astro integration: IndexNow — submit only changed URLs after build.
 *
 * How it works:
 * 1. Before build: runs `git diff --name-only HEAD~1` to find changed files
 * 2. Maps changed files to their public URLs
 * 3. After build: streams each changed URL to IndexNow one at a time
 *
 * Covers: static pages, blog posts, blog index, reports, components (triggers parent page)
 */

import type { AstroIntegration } from "astro";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const SITE = "https://hvacaudit.co";
const KEY = "fb3e25fa4c70471a89e20604e1fe0a80";
const DELAY_MS = 1200;

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function submitUrl(url: string): Promise<number> {
  const endpoint = `https://api.indexnow.org/indexnow?url=${encodeURIComponent(url)}&key=${KEY}`;
  const res = await fetch(endpoint);
  return res.status;
}

function getChangedFiles(): string[] {
  try {
    // Compare with previous commit
    const output = execSync("git diff --name-only HEAD~1", { encoding: "utf8" });
    return output.trim().split("\n").filter(Boolean);
  } catch {
    // First commit or no git — skip
    return [];
  }
}

function mapFileToUrls(file: string, root: string): string[] {
  const urls: string[] = [];

  // Direct page files
  if (file === "src/pages/index.astro") {
    urls.push(`${SITE}/`);
  } else if (file === "src/pages/about.astro") {
    urls.push(`${SITE}/about/`);
  } else if (file === "src/pages/privacy.astro") {
    urls.push(`${SITE}/privacy/`);
  } else if (file === "src/pages/terms.astro") {
    urls.push(`${SITE}/terms/`);
  } else if (file === "src/pages/blog/index.astro") {
    urls.push(`${SITE}/blog/`);
  } else if (file === "src/pages/reports/index.astro") {
    urls.push(`${SITE}/reports/`);
  }

  // Blog post content
  else if (file.startsWith("src/content/blog/") && file.endsWith(".md")) {
    const slug = path.basename(file, ".md");
    urls.push(`${SITE}/blog/${slug}/`);
    // Also resubmit blog index since listing changed
    urls.push(`${SITE}/blog/`);
  }

  // Blog post template change — affects all blog posts, submit blog index
  else if (file === "src/pages/blog/[...slug].astro") {
    urls.push(`${SITE}/blog/`);
  }

  // Report data changed — submit all report pages
  else if (file === "src/data/reports.json" || file === "src/data/reports.ts") {
    urls.push(`${SITE}/reports/`);
    const reportsFile = path.join(root, "src/data/reports.json");
    if (fs.existsSync(reportsFile)) {
      const reports = JSON.parse(fs.readFileSync(reportsFile, "utf8"));
      for (const report of reports) {
        urls.push(`${SITE}/report/${report.slug}/`);
      }
    }
  }

  // Report page template change
  else if (file === "src/pages/report/[slug].astro") {
    urls.push(`${SITE}/reports/`);
  }

  // Market data changed — submit all market pages
  else if (file === "src/data/market-data.json" || file === "src/data/gap-narratives.ts") {
    urls.push(`${SITE}/market/`);
    urls.push(`${SITE}/market/hvac/`);
    const marketFile = path.join(root, "src/data/market-data.json");
    if (fs.existsSync(marketFile)) {
      const data = JSON.parse(fs.readFileSync(marketFile, "utf8"));
      for (const state of data.states) {
        urls.push(`${SITE}/market/hvac/${state.slug}/`);
      }
      for (const city of data.cities) {
        urls.push(`${SITE}/market/hvac/${city.slug}/`);
      }
      for (const problem of data.problems) {
        urls.push(`${SITE}/market/hvac/${problem.slug}/`);
      }
    }
  }

  // Market page templates
  else if (file.startsWith("src/pages/market/")) {
    urls.push(`${SITE}/market/`);
    urls.push(`${SITE}/market/hvac/`);
  }

  // Market components
  else if (file.startsWith("src/components/market/") && file.endsWith(".astro")) {
    urls.push(`${SITE}/market/`);
    urls.push(`${SITE}/market/hvac/`);
  }

  // Shared components — submit homepage (most components live there)
  else if (file.startsWith("src/components/") && file.endsWith(".astro")) {
    urls.push(`${SITE}/`);
  }

  // Layout change — affects every page, just submit homepage + blog index
  else if (file === "src/layouts/Base.astro") {
    urls.push(`${SITE}/`);
    urls.push(`${SITE}/blog/`);
  }

  // Global CSS — affects every page
  else if (file === "src/styles/global.css") {
    urls.push(`${SITE}/`);
  }

  // Public assets (cover images etc.) — find which blog post uses it
  else if (file.startsWith("public/blog/cover-") && file.endsWith(".webp")) {
    const match = file.match(/cover-(.+)\.webp$/);
    if (match) {
      urls.push(`${SITE}/blog/${match[1]}/`);
    }
  }

  return urls;
}

export default function indexNowIntegration(): AstroIntegration {
  let changedUrls: string[] = [];

  return {
    name: "indexnow",
    hooks: {
      "astro:build:start": ({ logger }) => {
        const root = process.cwd();
        const changedFiles = getChangedFiles();

        if (changedFiles.length === 0) {
          logger.info("No changed files detected — skipping IndexNow");
          return;
        }

        logger.info(`${changedFiles.length} changed files detected`);

        // Map files to URLs, deduplicate
        const urlSet = new Set<string>();
        for (const file of changedFiles) {
          for (const url of mapFileToUrls(file, root)) {
            urlSet.add(url);
          }
        }

        changedUrls = [...urlSet];
        logger.info(`${changedUrls.length} URLs to submit to IndexNow`);
      },

      "astro:build:done": async ({ logger }) => {
        if (changedUrls.length === 0) {
          logger.info("IndexNow: nothing to submit");
          return;
        }

        // Only run on Vercel production deploys (VERCEL=1 is set by Vercel)
        if (!process.env.VERCEL && !process.env.INDEXNOW_FORCE) {
          logger.info(`IndexNow: skipping (local build). Set INDEXNOW_FORCE=1 to override.`);
          return;
        }

        logger.info(`IndexNow: streaming ${changedUrls.length} URLs...`);

        let ok = 0;
        let fail = 0;

        for (let i = 0; i < changedUrls.length; i++) {
          const url = changedUrls[i];
          try {
            const status = await submitUrl(url);
            if (status === 200 || status === 202) {
              logger.info(`  ✓ ${url}`);
              ok++;
            } else {
              logger.warn(`  ✗ ${status} ${url}`);
              fail++;
            }
          } catch (err: any) {
            logger.warn(`  ✗ ERR ${url} — ${err.message}`);
            fail++;
          }

          if (i < changedUrls.length - 1) await sleep(DELAY_MS);
        }

        logger.info(`IndexNow: ${ok} accepted, ${fail} failed`);
      },
    },
  };
}
