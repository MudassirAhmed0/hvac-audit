import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const siteUrl = import.meta.env.SITE_URL || site?.href?.replace(/\/$/, "") || "https://hvacaudit.co";
  const body = `User-agent: *
Allow: /
Disallow: /404
Disallow: /*?*

Sitemap: ${siteUrl}/sitemap.xml
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain" },
  });
};
