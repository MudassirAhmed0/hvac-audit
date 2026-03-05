import { chromium } from 'playwright';
import { readFileSync } from 'fs';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });

// Load Geist font as base64 for embedding
const geistFont = readFileSync('public/fonts/GeistVF.woff2').toString('base64');

const html = `<!DOCTYPE html>
<html>
<head>
<style>
  @font-face {
    font-family: 'Geist';
    src: url(data:font/woff2;base64,${geistFont}) format('woff2');
    font-weight: 100 900;
  }
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1200px;
    height: 630px;
    background: #0b1220;
    font-family: 'Geist', system-ui, sans-serif;
    color: #f1f5f9;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 72px 80px;
    overflow: hidden;
    position: relative;
  }
  /* Subtle gradient */
  .bg-glow {
    position: absolute;
    top: 0; right: 0;
    width: 50%; height: 100%;
    background: radial-gradient(ellipse at 70% 30%, rgba(14,165,233,0.06), transparent 70%);
    pointer-events: none;
  }
  .top {
    position: relative;
    z-index: 1;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .label {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #f87171;
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 28px;
  }
  .label-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #f87171;
  }
  h1 {
    font-size: 62px;
    font-weight: 800;
    line-height: 0.95;
    letter-spacing: -0.03em;
    max-width: 900px;
  }
  h1 .accent { color: #0ea5e9; }
  .cta {
    margin-top: 24px;
    display: inline-flex;
    align-items: center;
    gap: 20px;
    font-size: 16px;
    color: #0ea5e9;
    font-weight: 600;
  }
  .cta .sep {
    color: #253449;
  }
  .bottom {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    border-top: 1px solid #1e293b;
    padding-top: 32px;
  }
  .stats {
    display: flex;
    gap: 56px;
  }
  .stat-val {
    font-size: 32px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #f87171;
  }
  .stat-label {
    font-size: 10px;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-top: 4px;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .brand-name {
    font-size: 16px;
    font-weight: 600;
    letter-spacing: -0.01em;
  }
  .brand-url {
    font-size: 13px;
    color: #64748b;
    margin-left: 4px;
  }
</style>
</head>
<body>
  <div class="bg-glow"></div>
  <div class="top">
    <div class="label">
      <div class="label-dot"></div>
      Free Diagnostic Report
    </div>
    <h1>Your HVAC website is losing you <span class="accent">$12,000+</span>/month</h1>
    <div class="cta">
      <span>Free 8-point diagnostic</span>
      <span class="sep">•</span>
      <span>No credit card</span>
      <span class="sep">•</span>
      <span>48hr report</span>
    </div>
  </div>
  <div class="bottom">
    <div class="stats">
      <div>
        <div class="stat-val">21s</div>
        <div class="stat-label">Avg Load Time</div>
      </div>
      <div>
        <div class="stat-val">60%</div>
        <div class="stat-label">No SSL</div>
      </div>
      <div>
        <div class="stat-val">147+</div>
        <div class="stat-label">Sites Audited</div>
      </div>
    </div>
    <div class="brand">
      <svg width="28" height="28" viewBox="0 0 32 32">
        <rect width="32" height="32" rx="8" fill="#0b1220" stroke="#253449"/>
        <path d="M8 22a8 8 0 0 1 16 0" fill="none" stroke="#253449" stroke-width="2" stroke-linecap="round"/>
        <path d="M8 22a8 8 0 0 1 12.5-3.5" fill="none" stroke="#0ea5e9" stroke-width="2" stroke-linecap="round"/>
        <line x1="16" y1="22" x2="20" y2="16" stroke="#f1f5f9" stroke-width="2" stroke-linecap="round"/>
        <circle cx="16" cy="22" r="1.5" fill="#0ea5e9"/>
      </svg>
      <span class="brand-name">HVAC Audit</span>
      <span class="brand-url">hvacaudit.co</span>
    </div>
  </div>
</body>
</html>`;

await page.setContent(html, { waitUntil: 'networkidle' });
await page.waitForTimeout(500);
await page.screenshot({ path: 'public/og-image.png' });
console.log('OG image generated: public/og-image.png');

// Also generate apple-touch-icon (180x180)
const touchPage = await browser.newPage({ viewport: { width: 180, height: 180 }, deviceScaleFactor: 1 });
const touchHtml = `<!DOCTYPE html>
<html>
<head>
<style>
  * { margin: 0; }
  body {
    width: 180px; height: 180px;
    background: #0b1220;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
</head>
<body>
  <svg width="120" height="120" viewBox="0 0 32 32">
    <path d="M8 22a8 8 0 0 1 16 0" fill="none" stroke="#253449" stroke-width="2" stroke-linecap="round"/>
    <path d="M8 22a8 8 0 0 1 12.5-3.5" fill="none" stroke="#0ea5e9" stroke-width="2" stroke-linecap="round"/>
    <line x1="16" y1="22" x2="20" y2="16" stroke="#f1f5f9" stroke-width="2" stroke-linecap="round"/>
    <circle cx="16" cy="22" r="1.5" fill="#0ea5e9"/>
  </svg>
</body>
</html>`;

await touchPage.setContent(touchHtml, { waitUntil: 'networkidle' });
await touchPage.screenshot({ path: 'public/apple-touch-icon.png' });
console.log('Apple touch icon generated: public/apple-touch-icon.png');

await browser.close();
