<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
<xsl:output method="html" indent="yes" encoding="UTF-8"/>
<xsl:template match="/">
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Sitemap Index — HVAC Audit</title>
  <style>
    * { margin: 0; box-sizing: border-box; }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: #0b1220;
      color: #f1f5f9;
      padding: 3rem 2rem;
      min-height: 100vh;
    }
    .container { max-width: 720px; margin: 0 auto; }
    .brand {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 2rem;
    }
    .brand-dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      background: #0ea5e9;
    }
    .brand-name {
      font-size: 0.875rem;
      font-weight: 600;
    }
    h1 {
      font-size: 1.5rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      margin-bottom: 0.5rem;
    }
    .subtitle {
      font-size: 0.8125rem;
      color: #64748b;
      margin-bottom: 2.5rem;
    }
    .count { color: #0ea5e9; }
    .sitemaps {
      display: flex;
      flex-direction: column;
      gap: 1px;
      border: 1px solid #1e293b;
      border-radius: 0.5rem;
      overflow: hidden;
    }
    .sitemap-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.25rem 1.5rem;
      background: #0f1a2e;
      transition: background 0.15s;
    }
    .sitemap-row:hover { background: #132038; }
    a {
      color: #0ea5e9;
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 500;
    }
    a:hover { text-decoration: underline; }
    .arrow {
      color: #334155;
      font-size: 1rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="brand">
      <div class="brand-dot"></div>
      <span class="brand-name">HVAC Audit</span>
    </div>
    <h1>Sitemap Index</h1>
    <p class="subtitle">
      <span class="count"><xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/></span> sitemap(s)
    </p>
    <div class="sitemaps">
      <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
        <div class="sitemap-row">
          <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
          <span class="arrow">→</span>
        </div>
      </xsl:for-each>
    </div>
  </div>
</body>
</html>
</xsl:template>
</xsl:stylesheet>
