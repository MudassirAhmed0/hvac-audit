import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ site }) => {
  const siteUrl =
    import.meta.env.SITE_URL ||
    site?.href?.replace(/\/$/, "") ||
    "https://hvacaudit.co";

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="${siteUrl}/sitemap-index.xsl"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${siteUrl}/page-sitemap.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${siteUrl}/blog-sitemap.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${siteUrl}/report-sitemap.xml</loc>
  </sitemap>
</sitemapindex>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
};
