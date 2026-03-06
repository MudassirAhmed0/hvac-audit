import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { reports } from "../data/reports";

export const GET: APIRoute = async ({ site }) => {
  const siteUrl =
    import.meta.env.SITE_URL ||
    site?.href?.replace(/\/$/, "") ||
    "https://hvacaudit.co";

  const today = new Date().toISOString().split("T")[0];

  const blogPosts = await getCollection("blog");
  const sortedPosts = blogPosts.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );

  const urls: { loc: string; lastmod: string; changefreq: string; priority: string }[] = [];

  // Homepage
  urls.push({
    loc: `${siteUrl}/`,
    lastmod: today,
    changefreq: "weekly",
    priority: "1.0",
  });

  // Blog listing
  urls.push({
    loc: `${siteUrl}/blog/`,
    lastmod: sortedPosts[0]?.data.date.toISOString().split("T")[0] || today,
    changefreq: "weekly",
    priority: "0.9",
  });

  // Blog posts
  for (const post of sortedPosts) {
    urls.push({
      loc: `${siteUrl}/blog/${post.id.replace(/\.md$/, "")}/`,
      lastmod: post.data.date.toISOString().split("T")[0],
      changefreq: "monthly",
      priority: "0.8",
    });
  }

  // About
  urls.push({
    loc: `${siteUrl}/about/`,
    lastmod: today,
    changefreq: "monthly",
    priority: "0.8",
  });

  // Privacy & Terms
  urls.push({
    loc: `${siteUrl}/privacy/`,
    lastmod: today,
    changefreq: "yearly",
    priority: "0.3",
  });
  urls.push({
    loc: `${siteUrl}/terms/`,
    lastmod: today,
    changefreq: "yearly",
    priority: "0.3",
  });

  // Reports listing
  urls.push({
    loc: `${siteUrl}/reports/`,
    lastmod: today,
    changefreq: "weekly",
    priority: "0.9",
  });

  // Report pages
  for (const report of reports) {
    urls.push({
      loc: `${siteUrl}/report/${report.slug}/`,
      lastmod: today,
      changefreq: "monthly",
      priority: "0.7",
    });
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
};
