/**
 * Pulls curated HVAC audit reports from Postgres and writes src/data/reports.json.
 *
 * Usage:  DATABASE_URL=postgres://... node scripts/sync-reports.mjs
 * Env:    DATABASE_URL (required)
 */

import pgPkg from "pg";
const { Client } = pgPkg;
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "src", "data", "reports.json");

// ── Curated lead IDs ────────────────────────────────────────────────
// Hand-picked for score variety, city diversity, and interesting issue profiles.
// To add a report: add its lead ID here, run `node scripts/sync-reports.mjs`.
const CURATED_IDS = [
  13,  // Tiger Air and Heating — Dallas, TX (Score 60)
  14,  // Harlen Johnson HVAC — Dallas, TX (Score 60)
  12,  // Rescue Air and Plumbing — Dallas, TX (Score 80)
  148, // Air Tech of Houston — Houston, TX (Score 30)
  328, // Veteran Air — San Antonio, TX (Score 45)
  395, // RedHome HVAC Services — Austin, TX (Score 50)
  263, // AZ Perfect Comfort — Phoenix, AZ (Score 60)
  380, // Caldeco Air Conditioning — Tampa, FL (Score 60)
  181, // The Chill Brothers — Houston, TX (Score 70)
];

const DB_URL = process.env.DATABASE_URL;
if (!DB_URL) {
  console.error("ERROR: DATABASE_URL env var is required");
  process.exit(1);
}

// ── State-specific licensing text ───────────────────────────────────
const LICENSE_TEXT = {
  TX: "Texas requires TDLR/TACL licensing for HVAC work. Not showing the license number makes the business look less legitimate than competitors who display theirs.",
  AZ: "Arizona requires ROC (Registrar of Contractors) licensing for HVAC work. Not showing the license number makes the business look less legitimate than competitors who display theirs.",
  FL: "Florida requires state contractor licensing for HVAC work. Not showing the license number makes the business look less legitimate than competitors who display theirs.",
};

// ── Impact estimate calculation (mirrors hvac.ts calculateRevenueImpact) ─
function buildImpactEstimate(audit, lead) {
  let lostLeads = 0;
  if (audit.pageSpeedSeconds && audit.pageSpeedSeconds > 3) lostLeads += 3;
  if (!audit.hasSsl) lostLeads += 4;
  else if (!audit.httpRedirectsToHttps) lostLeads += 1;
  if (!audit.hasClearCtaAboveFold) lostLeads += 3;
  if (!audit.hasClickToCall) lostLeads += 4;
  if (!audit.hasAfterHoursCapture) lostLeads += 5;
  if (!audit.hasBookingWidget) lostLeads += 2;
  if (!audit.hasContactForm) lostLeads += 3;
  if (!audit.hasReviewsOnSite && (lead.review_count || 0) > 10) lostLeads += 2;
  if (audit.serviceAreaPageCount === 0) lostLeads += 2;
  if (audit.isRunningPaidAds && ((!audit.hasSsl || !audit.httpRedirectsToHttps) || !audit.hasClickToCall || !audit.hasClearCtaAboveFold)) lostLeads += 3;

  // Estimate monthly visitors from review count (rough heuristic)
  const reviews = lead.review_count || 50;
  let monthlyVisitors;
  if (reviews > 5000) monthlyVisitors = 2500;
  else if (reviews > 2000) monthlyVisitors = 1500;
  else if (reviews > 1000) monthlyVisitors = 1200;
  else if (reviews > 500) monthlyVisitors = 800;
  else if (reviews > 200) monthlyVisitors = 500;
  else if (reviews > 100) monthlyVisitors = 350;
  else monthlyVisitors = 200;

  // Build bounce reason from top issues
  const reasons = [];
  if (audit.pageSpeedSeconds && audit.pageSpeedSeconds > 3) {
    reasons.push(`${audit.pageSpeedSeconds}s load time (53% leave after 3s)`);
  }
  if (!audit.hasSsl) {
    reasons.push('Chrome "Not Secure" warning');
  } else if (!audit.httpRedirectsToHttps) {
    reasons.push('Chrome "Not Secure" warning on HTTP links');
  }
  if (!audit.hasClickToCall) reasons.push("phone not clickable on mobile");
  if (!audit.hasContactForm) reasons.push("no contact form");
  if (!audit.hasAfterHoursCapture && reasons.length < 3) reasons.push("no after-hours capture");
  if (!audit.hasReviewsOnSite && reviews > 100 && reasons.length < 3) reasons.push("no visible reviews");
  if (!audit.hasClearCtaAboveFold && reasons.length < 3) reasons.push("no CTA above fold");

  const bouncePercent = Math.min(55, 25 + lostLeads * 1.5);
  const bouncedVisitors = Math.round(monthlyVisitors * bouncePercent / 100);
  const bookingRate = 5;
  const missedLeadsLow = Math.max(2, Math.round(bouncedVisitors * bookingRate / 100 * 0.7));
  const missedLeadsHigh = Math.max(3, Math.round(bouncedVisitors * bookingRate / 100 * 1.3));
  const avgServiceCall = 400;
  const missedRevLow = missedLeadsLow * avgServiceCall;
  const missedRevHigh = missedLeadsHigh * avgServiceCall;

  return {
    monthlyVisitors,
    bounceReason: reasons.slice(0, 3).join(" + "),
    bouncePercent: Math.round(bouncePercent),
    bouncedVisitors,
    bookingRate,
    missedLeads: `${missedLeadsLow}-${missedLeadsHigh}`,
    avgServiceCall,
    missedRepairRevenue: `$${missedRevLow.toLocaleString()}-$${missedRevHigh.toLocaleString()}`,
    installNote:
      missedLeadsHigh >= 10
        ? `If even 2 of those were system replacements, that's another $16,000-$30,000.`
        : `If even 1 of those was a system replacement, that's another $8,000-$15,000.`,
  };
}

// ── URL cleaning ────────────────────────────────────────────────────
function cleanUrl(url) {
  if (!url) return "";
  try {
    const u = new URL(url);
    // Strip UTM and tracking params
    u.search = "";
    let clean = u.toString();
    // Remove trailing slash from path if it's just the root
    if (u.pathname === "/") clean = clean.replace(/\/$/, "");
    return clean;
  } catch {
    return url;
  }
}

function extractDomain(url) {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// ── Fix state-specific gaps ─────────────────────────────────────────
function fixGaps(gaps, state) {
  const licenseText = LICENSE_TEXT[state] || LICENSE_TEXT.TX;
  return gaps.map((g) => {
    if (g.gap === "No license number displayed") {
      return { ...g, impact: licenseText };
    }
    return g;
  });
}

// ── Main ────────────────────────────────────────────────────────────
async function main() {
  const client = new Client({
    connectionString: DB_URL,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();
  console.log(`Connected. Pulling ${CURATED_IDS.length} reports...`);

  const res = await client.query(
    `SELECT id, name, website, city, state, total_score, rating, review_count, niche_audit
     FROM leads WHERE id = ANY($1)`,
    [CURATED_IDS]
  );

  // Sort by the order in CURATED_IDS
  const idOrder = new Map(CURATED_IDS.map((id, i) => [id, i]));
  const rows = res.rows.sort((a, b) => (idOrder.get(a.id) ?? 99) - (idOrder.get(b.id) ?? 99));

  const reports = rows.map((row) => {
    const audit = row.niche_audit;
    const cleanedUrl = cleanUrl(row.website);
    const domain = extractDomain(row.website);
    const slug = slugify(row.name);

    return {
      slug,
      name: row.name,
      domain,
      website: cleanedUrl,
      rating: row.rating,
      reviewCount: row.review_count,
      city: row.city,
      state: row.state,
      totalScore: row.total_score,
      impactEstimate: buildImpactEstimate(audit, row),
      businessSummary: audit.businessSummary,
      gapSummary: fixGaps(audit.gapSummary, row.state),
    };
  });

  writeFileSync(OUT, JSON.stringify(reports, null, 2));
  console.log(`Wrote ${reports.length} reports to ${OUT}`);

  for (const r of reports) {
    console.log(
      `  ${r.totalScore.toString().padStart(3)} | ${r.name.padEnd(45)} | ${r.city}, ${r.state} | ${r.gapSummary.length} gaps | ~${r.impactEstimate.missedLeads} missed/mo`
    );
  }

  await client.end();
}

main().catch((e) => {
  console.error("FAILED:", e.message);
  process.exit(1);
});
