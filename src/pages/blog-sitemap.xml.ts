import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

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

  const page1Count = 9;
  const postsPerPage = 8;
  const remaining = blogPosts.length - page1Count;
  const totalPages = remaining > 0 ? 1 + Math.ceil(remaining / postsPerPage) : 1;

  const urls: { loc: string; lastmod: string; changefreq: string; priority: string }[] = [];

  // Blog listing pages
  for (let i = 1; i <= totalPages; i++) {
    urls.push({
      loc: i === 1 ? `${siteUrl}/blog/` : `${siteUrl}/blog/page/${i}/`,
      lastmod: sortedPosts[0]?.data.date.toISOString().split("T")[0] || today,
      changefreq: "weekly",
      priority: i === 1 ? "0.9" : "0.5",
    });
  }

  // Individual blog posts
  for (const post of sortedPosts) {
    urls.push({
      loc: `${siteUrl}/blog/${post.id.replace(/\.md$/, "")}/`,
      lastmod: post.data.date.toISOString().split("T")[0],
      changefreq: "monthly",
      priority: "0.8",
    });
  }

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
