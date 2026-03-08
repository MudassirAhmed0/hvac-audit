/**
 * IndexNow stream submission.
 * Submits URLs one at a time with a delay between each.
 *
 * Usage:
 *   node scripts/indexnow-stream.mjs          # submit all URLs
 *   node scripts/indexnow-stream.mjs --skip=51 # skip first 51 (resume after rate limit)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const SITE = "https://hvacaudit.co";
const KEY = "fb3e25fa4c70471a89e20604e1fe0a80";
const DELAY_MS = 1500; // 1.5s between requests to be respectful

// Collect all URLs
function getAllUrls() {
  const urls = [];

  // Static pages
  urls.push(
    `${SITE}/`,
    `${SITE}/about/`,
    `${SITE}/blog/`,
    `${SITE}/reports/`,
    `${SITE}/privacy/`,
    `${SITE}/terms/`,
  );

  // Blog posts
  const blogDir = path.join(ROOT, "src/content/blog");
  if (fs.existsSync(blogDir)) {
    for (const file of fs.readdirSync(blogDir)) {
      if (file.endsWith(".md")) {
        const slug = file.replace(/\.md$/, "");
        urls.push(`${SITE}/blog/${slug}/`);
      }
    }
  }

  // Blog pagination
  const totalPosts = fs.readdirSync(path.join(ROOT, "src/content/blog")).filter(f => f.endsWith(".md")).length;
  const page1Count = 9;
  const perPage = 8;
  const remaining = totalPosts - page1Count;
  const totalPages = remaining > 0 ? 1 + Math.ceil(remaining / perPage) : 1;
  for (let i = 2; i <= totalPages; i++) {
    urls.push(`${SITE}/blog/page/${i}/`);
  }

  // Report pages
  const reportsFile = path.join(ROOT, "src/data/reports.json");
  if (fs.existsSync(reportsFile)) {
    const reports = JSON.parse(fs.readFileSync(reportsFile, "utf8"));
    for (const report of reports) {
      urls.push(`${SITE}/report/${report.slug}/`);
    }
  }

  return urls;
}

async function submitUrl(url) {
  const endpoint = `https://api.indexnow.org/indexnow?url=${encodeURIComponent(url)}&key=${KEY}`;
  const res = await fetch(endpoint);
  return res.status;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const skipArg = process.argv.find((a) => a.startsWith("--skip="));
  const skip = skipArg ? parseInt(skipArg.split("=")[1], 10) : 0;

  const allUrls = getAllUrls();
  const urls = allUrls.slice(skip);
  console.log(`\nIndexNow Stream Submission`);
  console.log(`Total URLs: ${allUrls.length} (skipping ${skip}, submitting ${urls.length})`);
  console.log(`Delay: ${DELAY_MS}ms between requests\n`);

  let ok = 0;
  let fail = 0;

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    try {
      const status = await submitUrl(url);
      const icon = status === 200 || status === 202 ? "✓" : "✗";
      console.log(`[${i + 1}/${urls.length}] ${icon} ${status} ${url}`);
      if (status === 200 || status === 202) ok++;
      else fail++;
    } catch (err) {
      console.log(`[${i + 1}/${urls.length}] ✗ ERR ${url} — ${err.message}`);
      fail++;
    }

    if (i < urls.length - 1) await sleep(DELAY_MS);
  }

  console.log(`\nDone. ${ok} accepted, ${fail} failed.`);
}

main();
