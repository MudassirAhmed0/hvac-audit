import type { APIRoute } from "astro";
import { painPages } from "../data/pain-pages";
import marketData from "../data/market-data.json";

export const GET: APIRoute = async ({ site }) => {
  const siteUrl =
    import.meta.env.SITE_URL ||
    site?.href?.replace(/\/$/, "") ||
    "https://hvacaudit.co";

  const urls: { loc: string; lastmod: string }[] = [];

  // Parent pain pages
  for (const page of painPages) {
    urls.push({ loc: `${siteUrl}/${page.slug}/`, lastmod: "2026-03-13" });
  }

  // City variant pages (pain × city)
  for (const page of painPages) {
    for (const city of marketData.cities) {
      urls.push({
        loc: `${siteUrl}/${page.slug}/${city.slug}/`,
        lastmod: "2026-03-13",
      });
    }
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
};
