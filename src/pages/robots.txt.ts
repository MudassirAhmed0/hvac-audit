import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const siteUrl = import.meta.env.SITE_URL || site?.href?.replace(/\/$/, "") || "https://hvac-audit.co";
  const body = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain" },
  });
};
