import type { APIRoute } from "astro";
import { reports } from "../data/reports";

export const GET: APIRoute = async ({ site }) => {
  const siteUrl =
    import.meta.env.SITE_URL ||
    site?.href?.replace(/\/$/, "") ||
    "https://hvacaudit.co";

  const today = new Date().toISOString().split("T")[0];

  const urls = [
    { loc: `${siteUrl}/reports/`, lastmod: today, changefreq: "weekly", priority: "0.9" },
    ...reports.map((r) => ({
      loc: `${siteUrl}/report/${r.slug}/`,
      lastmod: today,
      changefreq: "monthly" as const,
      priority: "0.7",
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="${siteUrl}/sitemap.xsl"?>
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
