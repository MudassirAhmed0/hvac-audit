import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import marketData from "../data/market-data.json";

// Fixed dates for sitemaps with manually-synced content.
// Update these when the underlying data actually changes.
const PAGE_LAST_UPDATED = "2026-03-09";
const REPORTS_LAST_SYNCED = "2026-03-09";

export const GET: APIRoute = async ({ site }) => {
  const siteUrl =
    import.meta.env.SITE_URL ||
    site?.href?.replace(/\/$/, "") ||
    "https://hvacaudit.co";

  // Blog: latest post date
  const blogPosts = await getCollection("blog");
  const latestBlogDate = blogPosts
    .map((p) => p.data.lastModified || p.data.date)
    .sort((a, b) => b.getTime() - a.getTime())[0];
  const blogLastmod = latestBlogDate
    ? latestBlogDate.toISOString().split("T")[0]
    : PAGE_LAST_UPDATED;

  // Market: from data sync timestamp
  const marketLastmod = marketData.generatedAt.split("T")[0];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap-index.xsl"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${siteUrl}/page-sitemap.xml</loc>
    <lastmod>${PAGE_LAST_UPDATED}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${siteUrl}/blog-sitemap.xml</loc>
    <lastmod>${blogLastmod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${siteUrl}/report-sitemap.xml</loc>
    <lastmod>${REPORTS_LAST_SYNCED}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${siteUrl}/pain-sitemap.xml</loc>
    <lastmod>2026-03-13</lastmod>
  </sitemap>
  <sitemap>
    <loc>${siteUrl}/market-sitemap.xml</loc>
    <lastmod>${marketLastmod}</lastmod>
  </sitemap>
</sitemapindex>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
};
