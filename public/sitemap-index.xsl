<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">
<xsl:output method="html" indent="yes" encoding="UTF-8"/>
<xsl:template match="/">
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <meta name="robots" content="noindex,nofollow"/>
  <title>Sitemap Index — HVAC Audit</title>
  <style>
    *{margin:0;box-sizing:border-box}
    body{font-family:system-ui,sans-serif;background:#0b1220;color:#f1f5f9;padding:3rem 2rem;min-height:100vh}
    .c{max-width:720px;margin:0 auto}
    .b{display:flex;align-items:center;gap:.5rem;margin-bottom:2rem}
    .bd{width:8px;height:8px;border-radius:50%;background:#0ea5e9}
    .bn{font-size:.875rem;font-weight:600}
    h1{font-size:1.5rem;font-weight:700;letter-spacing:-.02em;margin-bottom:.5rem}
    .st{font-size:.8125rem;color:#64748b;margin-bottom:2.5rem}
    .ct{color:#0ea5e9}
    .list{display:flex;flex-direction:column;gap:1px;border:1px solid #1e293b;border-radius:.5rem;overflow:hidden}
    .row{display:flex;align-items:center;justify-content:space-between;padding:1.25rem 1.5rem;background:#0f1a2e}
    .row:hover{background:#132038}
    a{color:#0ea5e9;text-decoration:none;font-size:.875rem;font-weight:500}
    a:hover{text-decoration:underline}
    .ar{color:#334155}
  </style>
</head>
<body>
  <div class="c">
    <div class="b"><div class="bd"/><span class="bn">HVAC Audit</span></div>
    <h1>Sitemap Index</h1>
    <p class="st"><span class="ct"><xsl:value-of select="count(s:sitemapindex/s:sitemap)"/></span> sitemaps</p>
    <div class="list">
      <xsl:for-each select="s:sitemapindex/s:sitemap">
        <div class="row">
          <a href="{s:loc}"><xsl:value-of select="s:loc"/></a>
          <span class="ar">→</span>
        </div>
      </xsl:for-each>
    </div>
  </div>
</body>
</html>
</xsl:template>
</xsl:stylesheet>
