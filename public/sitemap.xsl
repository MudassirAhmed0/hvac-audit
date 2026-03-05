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
  <title>Sitemap — HVAC Audit</title>
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
    .count {
      color: #0ea5e9;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    thead th {
      font-size: 0.625rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #64748b;
      text-align: left;
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #1e293b;
    }
    tbody td {
      padding: 1rem;
      border-bottom: 1px solid #1e293b;
      font-size: 0.875rem;
    }
    tbody tr:hover {
      background: #0f1a2e;
    }
    a {
      color: #0ea5e9;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    .priority {
      display: inline-block;
      padding: 0.125rem 0.5rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      background: rgba(14, 165, 233, 0.12);
      color: #0ea5e9;
    }
    .date { color: #94a3b8; }
    .freq { color: #64748b; text-transform: capitalize; }
  </style>
</head>
<body>
  <div class="container">
    <div class="brand">
      <div class="brand-dot"></div>
      <span class="brand-name">HVAC Audit</span>
    </div>
    <h1>Sitemap</h1>
    <p class="subtitle">
      <span class="count"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></span> URL(s) indexed
    </p>
    <table>
      <thead>
        <tr>
          <th>URL</th>
          <th>Priority</th>
          <th>Frequency</th>
          <th>Last Modified</th>
        </tr>
      </thead>
      <tbody>
        <xsl:for-each select="sitemap:urlset/sitemap:url">
          <tr>
            <td><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a></td>
            <td><span class="priority"><xsl:value-of select="sitemap:priority"/></span></td>
            <td><span class="freq"><xsl:value-of select="sitemap:changefreq"/></span></td>
            <td><span class="date"><xsl:value-of select="sitemap:lastmod"/></span></td>
          </tr>
        </xsl:for-each>
      </tbody>
    </table>
  </div>
</body>
</html>
</xsl:template>
</xsl:stylesheet>
