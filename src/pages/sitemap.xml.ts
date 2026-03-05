import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const siteUrl = import.meta.env.SITE_URL || site?.href?.replace(/\/$/, "") || "https://hvacaudit.co";
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
};
