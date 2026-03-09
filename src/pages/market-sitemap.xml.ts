import type { APIRoute } from "astro";
import marketData from "../data/market-data.json";

export const GET: APIRoute = async ({ site }) => {
  const siteUrl =
    import.meta.env.SITE_URL ||
    site?.href?.replace(/\/$/, "") ||
    "https://hvacaudit.co";

  const lastmod = marketData.generatedAt.split("T")[0];

  const urls: { loc: string }[] = [
    { loc: `${siteUrl}/market/` },
    { loc: `${siteUrl}/market/hvac/` },
  ];

  // States
  for (const state of marketData.states) {
    urls.push({ loc: `${siteUrl}/market/hvac/${state.slug}/` });
  }

  // Cities
  for (const city of marketData.cities) {
    urls.push({ loc: `${siteUrl}/market/hvac/${city.slug}/` });
  }

  // Problems
  for (const problem of marketData.problems) {
    urls.push({ loc: `${siteUrl}/market/hvac/${problem.slug}/` });

    // Problem x State
    for (const st of problem.byState) {
      if (st.count >= 10) {
        urls.push({ loc: `${siteUrl}/market/hvac/${problem.slug}/${st.slug}/` });
      }
    }
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
};
