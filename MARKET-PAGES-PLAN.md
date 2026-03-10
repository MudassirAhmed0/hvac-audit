# Market Pages — Complete Implementation Plan

## What This Is

Data-driven market report pages for hvacaudit.co. Not pSEO template swaps — each page is a genuine market analysis powered by real audit data from the creative-axe database.

**URL prefix**: `/market/` (separates cleanly from existing `/report/[company-slug]/`)

---

## CRITICAL: Website Quality Score (Not Lead Score)

The `total_score` in the database is a **sales score** — "how good a target is this lead for outreach." Higher score = worse website = better sales target. This CANNOT be used as the "HVAC Website Index."

### Website Quality Score Formula (0-100)

Derived from deep audit (`nicheAudit`) fields:

```
SPEED (0-20 points):
  20 - clamp((pageSpeedSeconds - 2) * 2, 0, 20)
  → 2s or faster = 20, 12s = 0

TRUST (0-20 points):
  hasSsl = 5
  httpRedirectsToHttps = 5
  hasLicenseNumber = 5
  hasReviewsOnSite = 5

LEAD CAPTURE (0-25 points):
  hasClearCtaAboveFold = 5
  hasClickToCall = 5
  hasBookingWidget = 5
  hasContactForm = 5
  hasAfterHoursCapture = 5

SEO (0-15 points):
  hasMetaTitle && hasMetaDescription = 5
  hasLocalBusinessSchema = 5
  hasXmlSitemap = 5

CONTENT (0-10 points):
  serviceAreaPageCount > 0 = 5
  hasAboutPage = 5

MOBILE (0-10 points):
  isMobileResponsive = 5 (from enrichment or viewport meta)
  hasStickyContactOnMobile = 5
```

**Total: 100 points. Higher = better website.**

### Simplified Score (for leads without deep audit)

Uses direct enrichment columns only (available for all enriched leads):

```
has_ssl = 15
has_online_booking = 15
has_reviews_displayed = 15
has_clear_cta = 10
has_contact_form = 10
is_mobile_responsive = 10
has_meta_seo = 10
page_speed_seconds <= 3 = 15
```

**Total: 100 points.** Less granular but covers all enriched leads.

### Which Score to Use

- Pages report the **full score** for deep-audited leads, **simplified score** for enrichment-only leads
- Aggregated stats always note the sample size: "Based on {N} audited websites" / "Based on {N} deep audits"
- The `sync-market-data.mjs` script computes BOTH scores and stores:
  - `avgQualityScore` (simplified, all enriched leads)
  - `avgDeepScore` (full formula, deep-audited leads only)
  - `totalLeads` and `deepAudited` counts for transparency

### Sample Size Disclosure

Every market page displays two data confidence levels:

```
Performance data: Based on {totalLeads} HVAC websites
Deep analysis: Based on {deepAudited} in-depth audits
```

This prevents the gap frequency source conflict — readers know broad stats (booking %, SSL %) come from the full dataset, while gap severity/cost estimates come from deep audits.

---

## Architecture Overview

```
creative-axe PostgreSQL (Railway)
        ↓
scripts/sync-market-data.mjs          ← NEW: aggregation query
        ↓
src/data/market-data.json              ← NEW: aggregated stats per city/state/national + problem
        ↓
src/pages/market/[service]/index.astro           ← National pillar
src/pages/market/[service]/[state].astro         ← State report
src/pages/market/[service]/[city].astro          ← City report
src/pages/market/[service]/[problem].astro       ← Problem report (national)
src/pages/market/[service]/[problem]/[state].astro ← Problem × state
        ↓
Astro static build → Vercel
```

---

## Step 0: Data Inventory Script

**File**: `scripts/inventory-market-data.mjs`
**Purpose**: Run once to understand what data exists before building anything.
**Run**: `export $(cat .env | xargs) && node scripts/inventory-market-data.mjs`

### What it queries

```sql
-- 1. Total leads with deep audits (nicheAudit IS NOT NULL), grouped by city + state
SELECT city, state, COUNT(*) as total,
  COUNT(*) FILTER (WHERE niche_audit IS NOT NULL) as deep_audited
FROM leads
WHERE category = 'hvac' AND city IS NOT NULL AND state IS NOT NULL
GROUP BY city, state
ORDER BY total DESC;

-- 2. Which cities hit the 10+ threshold
-- (filtered from above)

-- 3. Aggregate stats per qualifying city
-- avg page_speed_seconds, % has_online_booking, % has_ssl, % has_reviews_displayed,
-- % has_clear_cta, % has_contact_form, % is_mobile_responsive, % has_meta_seo

-- 4. State-level rollups (same stats grouped by state only)

-- 5. National rollup (same stats, no grouping)

-- 6. Gap frequency analysis from niche_audit->>'gapSummary'
-- Which gaps appear most often across all deep-audited leads

-- 7. Sub-niche distribution
-- How many leads have each sub_niche tag (ac_repair, heating_repair, etc.)
```

### Output

Prints a report to console:
```
=== MARKET DATA INVENTORY ===

National: 945 leads (412 deep audited)

States:
  TX: 393 leads (187 deep) ✅
  FL: 348 leads (142 deep) ✅
  AZ: 66 leads (31 deep) ✅

Cities (10+ threshold):
  Houston, TX: 85 leads (41 deep) ✅
  Dallas, TX: 72 leads (35 deep) ✅
  Tampa, FL: 68 leads (28 deep) ✅
  ...
  Corpus Christi, TX: 8 leads ❌ (below threshold)

Top Gaps (frequency across deep-audited leads):
  No online booking: 68%
  Slow page load: 55%
  No reviews displayed: 47%
  No clear CTA: 42%
  ...

Sub-niche coverage:
  ac_repair: 812/945 (86%)
  heating_repair: 634/945 (67%)
  ...
```

This tells us exactly how many pages we can generate and what content each will have.

**Deliverable**: Console output + JSON file at `src/data/market-inventory.json` for reference.

---

## Step 1: Data Sync Script

**File**: `scripts/sync-market-data.mjs`
**Purpose**: Query DB, aggregate stats, write `src/data/market-data.json`.
**Run**: `export $(cat .env | xargs) && node scripts/sync-market-data.mjs`
**When**: Before every deploy. Add to build pipeline alongside `sync-reports`.

### Data Sources (Two Layers)

**Layer A — Direct columns on `leads` table** (all enriched leads):
- `page_speed_seconds` → avg speed
- `has_ssl` → % with SSL
- `has_online_booking` → % with booking
- `has_reviews_displayed` → % with reviews
- `is_mobile_responsive` → % mobile-ready
- `has_clear_cta` → % with CTA
- `has_contact_form` → % with forms
- `has_meta_seo` → % with SEO basics
- `total_score` → avg lead score (note: this is lead score, not audit quality score)
- `rating` → avg Google rating
- `review_count` → avg review count

**Layer B — `niche_audit` JSONB** (deep-audited leads only):
- `niche_audit->'pageSpeedSeconds'` → more accurate speed
- `niche_audit->'hasSsl'` + `niche_audit->'httpRedirectsToHttps'` → SSL quality
- `niche_audit->'hasBookingWidget'` → booking widget specifically
- `niche_audit->'hasClickToCall'` → click-to-call
- `niche_audit->'hasAfterHoursCapture'` → after-hours
- `niche_audit->'hasReviewsOnSite'` → reviews on site
- `niche_audit->'hasClearCtaAboveFold'` → CTA above fold
- `niche_audit->'serviceAreaPageCount'` → service area pages
- `niche_audit->'hasLocalBusinessSchema'` → schema markup
- `niche_audit->'hasGoogleAnalytics'` → analytics tracking
- `niche_audit->'hasGoogleAdsTag'` → running ads
- `niche_audit->'gapSummary'` → array of `{ gap, impact, severity, category, fixEffort, estimatedMonthlyCost }`

**Strategy**: Use Layer A for broad stats (count, speed, booking %, etc.). Use Layer B for narrative insights (top gaps, severity distribution, cost estimates). Report both `total_leads` and `deep_audited` counts so templates know data confidence.

### Aggregation Levels

The script produces one JSON file with four sections:

```typescript
interface MarketData {
  generatedAt: string;   // ISO timestamp
  national: NationalStats;
  states: StateStats[];
  cities: CityStats[];
  problems: ProblemStats[];
}
```

#### National Stats
```typescript
interface NationalStats {
  service: "hvac";             // For now, only HVAC. Expand later.
  totalLeads: number;
  deepAudited: number;
  avgSpeed: number;
  avgRating: number;
  avgReviewCount: number;
  bookingRate: number;         // 0-1
  sslRate: number;
  reviewsDisplayedRate: number;
  mobileRate: number;
  ctaRate: number;
  contactFormRate: number;
  seoRate: number;
  clickToCallRate: number;     // from deep audit
  afterHoursRate: number;      // from deep audit
  schemaRate: number;          // from deep audit
  scoreDistribution: {         // buckets for visualization
    "0-20": number;
    "21-40": number;
    "41-60": number;
    "61-80": number;
    "81-100": number;
  };
  topGaps: GapFrequency[];     // sorted by frequency desc
  states: string[];            // list of states with data
  cities: string[];            // list of cities with data
}
```

#### State Stats
```typescript
interface StateStats {
  state: string;               // "TX", "FL", "AZ"
  stateName: string;           // "Texas", "Florida", "Arizona"
  slug: string;                // "texas", "florida", "arizona"
  totalLeads: number;
  deepAudited: number;
  avgSpeed: number;
  avgRating: number;
  bookingRate: number;
  sslRate: number;
  reviewsDisplayedRate: number;
  mobileRate: number;
  ctaRate: number;
  contactFormRate: number;
  seoRate: number;
  clickToCallRate: number;
  afterHoursRate: number;
  scoreDistribution: { ... };
  topGaps: GapFrequency[];
  cities: string[];            // cities in this state with data
  // Comparison deltas vs national
  vsNational: {
    speedDelta: number;        // positive = slower than national
    bookingDelta: number;      // positive = better than national
    sslDelta: number;
    reviewsDelta: number;
  };
}
```

#### City Stats
```typescript
interface CityStats {
  city: string;                // "Houston"
  state: string;               // "TX"
  slug: string;                // "houston-tx"
  totalLeads: number;
  deepAudited: number;
  avgSpeed: number;
  avgRating: number;
  avgReviewCount: number;
  bookingRate: number;
  sslRate: number;
  reviewsDisplayedRate: number;
  mobileRate: number;
  ctaRate: number;
  contactFormRate: number;
  seoRate: number;
  clickToCallRate: number;
  afterHoursRate: number;
  scoreDistribution: { ... };
  topGaps: GapFrequency[];
  // Comparison deltas
  vsState: {
    speedDelta: number;
    bookingDelta: number;
    sslDelta: number;
    reviewsDelta: number;
  };
  vsNational: { ... };
  // Nearby cities for comparison table
  nearbyCities: {
    city: string;
    state: string;
    slug: string;
    totalLeads: number;
    avgSpeed: number;
    bookingRate: number;
    sslRate: number;
  }[];
  // Anonymized entity signals
  bestScore: number;           // highest website quality score (no name)
  worstScore: number;          // lowest website quality score (no name)
  medianScore: number;
  // Quality scores
  avgQualityScore: number;     // simplified score (all enriched leads)
  avgDeepScore: number | null; // full score (deep-audited leads only, null if <5 deep)
}

// Nearby Cities Selection Rule:
// Top 5 cities in the SAME STATE, sorted by audit count descending.
// If fewer than 5 cities in state, include all qualifying cities.
// "Qualifying" = 10+ leads (same threshold as page generation).
```

#### Problem Stats
```typescript
interface GapFrequency {
  gap: string;                 // "No online booking"
  slug: string;                // "no-online-booking"
  frequency: number;           // 0-1 (what % of sites have this gap)
  count: number;               // absolute count
  avgSeverity: string;         // most common severity level
  category: string;            // "lead-capture", "speed", "trust", etc.
  impact: string;              // standard impact text
}

interface ProblemStats {
  gap: string;
  slug: string;
  category: string;
  // National stats for this problem
  nationalFrequency: number;
  nationalCount: number;
  impact: string;
  // Per-state breakdown
  byState: {
    state: string;
    stateName: string;
    slug: string;
    frequency: number;
    count: number;
  }[];
  // Per-city breakdown (cities with 10+ audits only)
  byCity: {
    city: string;
    state: string;
    slug: string;
    frequency: number;
    count: number;
  }[];
  // Worst/best markets for this problem
  worstCity: { city: string; state: string; frequency: number };
  bestCity: { city: string; state: string; frequency: number };
}
```

### Minimum Thresholds

Built into the sync script:

| Level | Minimum Leads | What gets generated |
|-------|--------------|-------------------|
| City page | 10 | Basic city report |
| City comparisons | 30 | Cross-city comparison sections enabled |
| State page | 20 | State report (aggregating all cities in state) |
| National page | 50 | National pillar (always met for HVAC) |
| Problem page | 30% frequency nationally | Problem page generated |
| Problem × state | 10 leads in state with this gap | Problem × state page generated |

### Output

Single file: `src/data/market-data.json`

---

## Step 2: URL Structure & Page Types

### URLs

```
/market/hvac/                                    ← National pillar
/market/hvac/texas/                              ← State report
/market/hvac/houston-tx/                         ← City report
/market/hvac/no-online-booking/                  ← Problem (national)
/market/hvac/no-online-booking/texas/            ← Problem × state
```

### Why `/market/hvac/` not `/market/ac-repair/`

Right now you only have HVAC data. All leads are `category = 'hvac'`. Sub-niches (ac_repair, heating_repair, etc.) classify what services each company OFFERS, but most HVAC companies offer multiple services.

Splitting by sub-niche would:
- Fragment your data (fewer leads per page → thin content)
- Create overlapping pages (a company appears in both ac-repair and heating-repair)
- Not match how people search (they search "HVAC websites in Houston", not "AC repair websites in Houston")

**Start with HVAC-wide pages.** When you have 2,000+ leads AND sub-niche analysis shows meaningful differences between markets, THEN add service-specific pages.

### Astro File Structure

```
src/pages/market/
├── index.astro                          ← /market/ landing (links to all market reports)
└── hvac/
    ├── index.astro                      ← /market/hvac/ national pillar (getStaticPaths not needed — single page)
    ├── [state].astro                    ← /market/hvac/texas/ etc. (getStaticPaths from market-data.json states)
    ├── [city].astro                     ← /market/hvac/houston-tx/ etc. (getStaticPaths from market-data.json cities)
    └── [problem].astro                  ← /market/hvac/no-online-booking/ etc.
```

Wait — `[state].astro` and `[city].astro` and `[problem].astro` all share the same URL depth (`/market/hvac/[slug]/`). Astro can't have three dynamic routes at the same level.

**Solution**: One dynamic route that determines the page type from the slug.

```
src/pages/market/
├── index.astro                          ← /market/ landing
└── hvac/
    ├── index.astro                      ← /market/hvac/ national pillar
    ├── [...slug].astro                  ← Handles state, city, problem, and problem/state
```

The `[...slug].astro` file uses `getStaticPaths()` to enumerate all valid slugs:

```typescript
export function getStaticPaths() {
  const data = marketData;
  const paths = [];

  // State pages: /market/hvac/texas/
  for (const state of data.states) {
    paths.push({ params: { slug: state.slug }, props: { type: 'state', data: state } });
  }

  // City pages: /market/hvac/houston-tx/
  for (const city of data.cities) {
    paths.push({ params: { slug: city.slug }, props: { type: 'city', data: city } });
  }

  // Problem pages: /market/hvac/no-online-booking/
  for (const problem of data.problems) {
    paths.push({ params: { slug: problem.slug }, props: { type: 'problem', data: problem } });
  }

  // Problem × state: /market/hvac/no-online-booking/texas/
  for (const problem of data.problems) {
    for (const stateData of problem.byState) {
      if (stateData.count >= 10) {
        paths.push({
          params: { slug: `${problem.slug}/${stateData.slug}` },
          props: { type: 'problem-state', problem, state: stateData }
        });
      }
    }
  }

  return paths;
}
```

**Slug collision prevention**: State slugs are full state names ("texas", "florida"), city slugs have state suffix ("houston-tx", "tampa-fl"), problem slugs are descriptive ("no-online-booking", "slow-websites"). No collisions possible.

---

## Step 3: Page Templates

### Shared Components (New)

```
src/components/market/
├── MarketHero.astro           ← "We Audited N HVAC Websites in {Market}"
├── StatCards.astro            ← Grid of 4-6 key stats (avg speed, booking %, etc.)
├── ScoreDistribution.astro   ← Bar chart / histogram of score buckets
├── GapSection.astro           ← Deep section for a single gap finding
├── ComparisonTable.astro      ← City vs city or state vs national table
├── MarketBreadcrumb.astro     ← Breadcrumb trail
└── MarketCTA.astro            ← "Get Your Free HVAC Website Audit"
```

All CSS-only. No JS libraries. Must maintain Lighthouse 100.

### National Pillar Page (`/market/hvac/`)

**Title**: "HVAC Website Audit Report: {N} Sites Analyzed | HVAC Audit"
**H1**: "We Audited {N} HVAC Websites Across the United States"

Sections:
1. **Hero** — Total audited, last updated date, one-line summary
2. **National Snapshot** — StatCards: avg speed, booking %, SSL %, reviews %, mobile %, CTA %
3. **Key Finding #1** — Biggest gap nationally (driven by topGaps[0])
4. **Score Distribution** — How sites spread across 0-100 buckets
5. **Key Finding #2** — Second biggest gap
6. **State-by-State Comparison** — ComparisonTable with all qualifying states
7. **Key Finding #3** — Third biggest gap
8. **Methodology** — "How We Audit" section (critical for E-E-A-T, see below)
9. **Explore by State** — Link cards to each state page
10. **All Cities** — Full list linking directly to every city page (crawl depth: max 2 clicks from national to any city)
11. **Explore by Problem** — Link cards to each problem page
12. **CTA** — MarketCTA

**Crawl Depth Rule**: Every city page must be reachable in ≤2 clicks from `/market/hvac/`. The national page links to states AND directly to all cities. State pages also link to their cities. This ensures Google discovers city pages quickly.

**Methodology Section Content** (shared component, used on national + state pages):

```
How We Audit HVAC Websites

We use automated tools to analyze HVAC company websites across {N} measurable factors:

Data Collection: We identify HVAC businesses through Google Maps, then visit each company's
website using a headless browser that simulates a real mobile visitor.

What We Measure:
- Page speed (time to fully load on a standard connection)
- SSL security (HTTPS certificate and proper redirect)
- Lead capture (online booking, contact forms, click-to-call, after-hours capture)
- Trust signals (reviews displayed, license numbers, real team photos)
- SEO fundamentals (meta tags, structured data, sitemap)
- Mobile experience (responsive design, sticky contact options)
- Content depth (service area pages, about page, blog)

Scoring: Each website receives a Website Quality Score from 0-100 based on a weighted
formula across Speed (20%), Trust (20%), Lead Capture (25%), SEO (15%), Content (10%),
and Mobile (10%).

Sample Size: This report is based on {totalLeads} HVAC websites, of which {deepAudited}
received in-depth audits. Performance statistics (speed, booking, SSL) use the full dataset.
Gap severity and cost estimates use the deep audit subset.

Limitations: Our audits measure website quality, not business quality. A company with a
low-scoring website may still provide excellent service. Scores reflect the digital presence only.

Last Updated: {generatedAt}
```

This section is critical for E-E-A-T. Without it, Google treats the pages as marketing, not research.

Schema: `WebPage` + `BreadcrumbList` + `Dataset` (schema.org/Dataset)

### State Report Page (`/market/hvac/texas/`)

**Title**: "{State} HVAC Website Report: {N} Sites Audited | HVAC Audit"
**H1**: "HVAC Websites in {State}: {N} Sites Audited"

Sections:
1. **Hero** — State total, last updated
2. **State vs National** — Comparison card showing deltas ("Texas scores X points above/below national average")
3. **State Snapshot** — StatCards with state-level stats
4. **Key Finding #1** — Top gap for THIS state (may differ from national)
5. **City Rankings** — ComparisonTable of all qualifying cities in this state
6. **Key Finding #2** — Second gap
7. **Score Distribution** — State-level distribution
8. **Key Finding #3** — Third gap
9. **Explore Cities** — Link cards to each city page in this state
10. **CTA**

Schema: `WebPage` + `BreadcrumbList`

### City Report Page (`/market/hvac/houston-tx/`)

**Title**: "Houston HVAC Websites: {N} Sites Audited — Score, Speed & Gaps | HVAC Audit"
**H1**: "We Audited {N} HVAC Websites in Houston, TX"

Sections:
1. **Hero** — City total, last updated, one-line summary
2. **Market Snapshot** — StatCards: avg speed, booking %, SSL %, etc.
3. **Key Finding #1** — Top gap for THIS city
   - Heading adapts to gap: "73% of Houston HVAC Websites Have No Online Booking"
   - Why it matters paragraph
   - What top-scoring sites do differently
4. **Score Distribution** — City-level distribution + anonymized best/worst/median
5. **Key Finding #2** — Second gap (different heading, different narrative)
6. **Key Finding #3** — Third gap
7. **How Houston Compares** — ComparisonTable vs nearby cities (nearbyCities data)
8. **Houston vs {State} vs National** — Three-way comparison showing where Houston stands
9. **What Top-Scoring Houston HVAC Sites Do Differently** — Patterns from 80+ scoring sites
10. **CTA** — "Get Your Free Houston HVAC Website Audit"

Schema: `WebPage` + `BreadcrumbList`

### Problem Report Page (`/market/hvac/no-online-booking/`)

**Title**: "{X}% of HVAC Websites Have No Online Booking | HVAC Audit"
**H1**: "{X}% of HVAC Websites Have No Online Booking"

Sections:
1. **Hero** — National frequency, total count, impact summary
2. **Why This Matters** — Business impact of this specific gap
3. **State Breakdown** — ComparisonTable showing frequency by state ("Texas: 72%, Florida: 61%, Arizona: 68%")
4. **Worst Markets** — Cities where this problem is most prevalent
5. **Best Markets** — Cities where this problem is least prevalent
6. **What Good Looks Like** — Description of what top-scoring sites do
7. **Related Problems** — Links to other problem pages
8. **CTA** — "Check if your HVAC website has this problem"

Schema: `WebPage` + `BreadcrumbList`

### Problem × State Page (`/market/hvac/no-online-booking/texas/`)

**Title**: "{X}% of Texas HVAC Websites Have No Online Booking | HVAC Audit"
**H1**: "{X}% of Texas HVAC Websites Have No Online Booking"

Sections:
1. **Hero** — State-specific frequency + vs national comparison
2. **City Breakdown** — Which Texas cities are worst/best for this problem
3. **Impact in Texas** — State-specific context
4. **CTA**

Schema: `WebPage` + `BreadcrumbList`

---

## Step 4: Narrative Engine

The key innovation — content sections are data-driven, not template-fixed.

### How It Works

Each page gets its topGaps array sorted by frequency. The template renders the top 3 as "Key Finding" sections. Since different markets have different top gaps, the sections — including **headings** — are unique per page.

```typescript
// Pseudo-code for gap section rendering
function getGapHeading(gap: GapFrequency, market: string): string {
  const pct = Math.round(gap.frequency * 100);
  switch (gap.slug) {
    case "no-online-booking":
      return `${pct}% of ${market} HVAC Websites Have No Online Booking`;
    case "slow-page-load":
      return `${market} HVAC Websites Average ${avgSpeed}s Load Time`;
    case "no-reviews-displayed":
      return `${pct}% of ${market} HVAC Sites Hide Their Google Reviews`;
    case "no-clear-cta":
      return `${pct}% of ${market} HVAC Websites Have No Clear Call-to-Action`;
    case "no-contact-form":
      return `Only ${100 - pct}% of ${market} HVAC Sites Have a Contact Form`;
    case "not-mobile-responsive":
      return `${pct}% of ${market} HVAC Websites Fail Mobile Responsiveness`;
    case "missing-seo-basics":
      return `${pct}% of ${market} HVAC Sites Are Invisible to Google`;
    case "no-ssl":
      return `${pct}% of ${market} HVAC Websites Show "Not Secure" Warning`;
    default:
      return `${pct}% of ${market} HVAC Websites: ${gap.gap}`;
  }
}
```

### Gap Explanatory Text

Each gap slug maps to a body paragraph template that includes:
- **Why it matters** — business impact with data
- **What top sites do** — contrast with successful competitors
- **The cost** — estimated revenue impact (from avgSeverity / estimatedMonthlyCost data)

These are stored in a `src/data/gap-narratives.ts` file — one entry per gap type with placeholder tokens for market-specific numbers.

```typescript
export const GAP_NARRATIVES: Record<string, {
  whyItMatters: string;
  whatTopSitesDo: string;
  costTemplate: string;
}> = {
  "no-online-booking": {
    whyItMatters: "68% of homeowners book with whichever company makes it easiest. When your competitors offer online scheduling and you don't, those after-hours leads — the ones searching at 11 PM when their AC dies — go to them.",
    whatTopSitesDo: "The highest-scoring HVAC sites in {market} use booking widgets like Housecall Pro or Calendly. They let visitors schedule without a phone call.",
    costTemplate: "In {market}, {pct}% of HVAC sites have no booking option. That's {count} companies losing after-hours leads every night."
  },
  // ... one per gap type
};
```

---

## Step 5: Comparison Engine

### City vs City (within state)

ComparisonTable component renders a table like:

| Metric | Houston | Dallas | Austin | San Antonio |
|--------|---------|--------|--------|------------|
| Sites audited | 85 | 72 | 45 | 38 |
| Avg speed | 12.3s | 8.7s | 9.1s | 11.5s |
| Online booking | 27% | 52% | 48% | 31% |
| SSL | 78% | 85% | 91% | 72% |
| Reviews displayed | 34% | 41% | 55% | 29% |

Data source: `nearbyCities` array in each CityStats object.

### City vs State vs National

Three-column comparison showing where this city falls:

| Metric | Houston | Texas Avg | National Avg |
|--------|---------|-----------|-------------|
| Speed | 12.3s | 10.1s | 11.8s |
| Booking | 27% | 38% | 42% |

Data source: `vsState` and `vsNational` delta objects.

### State vs National

Two-column comparison on state pages.

---

## Step 6: Entity Signals

Anonymized but present. Each city page includes:

```
"The highest-scoring HVAC website in Houston earned a 92.
 The lowest scored 18 — primarily due to a 24-second load time
 and no SSL certificate."
```

No company names. But Google sees entity-like references and unique data points.

Data source: `bestScore`, `worstScore`, `medianScore` in CityStats.

Later (optional): Add "Top 5 HVAC Websites in Houston" section with company names linking to their `/report/[slug]/` pages. Only for companies with public reports.

---

## Step 7: Schema & SEO

### JSON-LD

Every market page gets a JSON-LD array:

1. **`WebPage`** — with `name`, `description`, `dateModified`, `author`, `publisher`
2. **`BreadcrumbList`** — proper hierarchy:
   - National: Home → Market Reports → HVAC Website Report
   - State: Home → Market Reports → HVAC → Texas
   - City: Home → Market Reports → HVAC → Texas → Houston
   - Problem: Home → Market Reports → HVAC → No Online Booking
3. **`Dataset`** (schema.org/Dataset) — on national page only:
   - `name`: "HVAC Website Quality Index"
   - `description`: "Analysis of {N} HVAC company websites..."
   - `measurementTechnique`: "Automated website audit"
   - `temporalCoverage`: date range
   - `spatialCoverage`: "United States"

### Meta Tags

Each page type has unique title/description templates:

| Type | Title Template | Description Template |
|------|---------------|---------------------|
| National | "HVAC Website Report: {N} Sites Analyzed \| HVAC Audit" | "We audited {N} HVAC websites. Average score: {score}. Only {booking}% offer online booking. See the full data." |
| State | "{State} HVAC Websites: {N} Audited \| HVAC Audit" | "{State} HVAC websites average {speed}s load time. {booking}% have online booking vs {natBooking}% nationally." |
| City | "{City} HVAC Websites: {N} Audited \| HVAC Audit" | "We audited {N} HVAC websites in {City}. {topGap}. See how {City} compares." |
| Problem | "{pct}% of HVAC Sites: {Gap} \| HVAC Audit" | "{pct}% of HVAC websites have {gap}. {worstCity} is the worst market. See the data." |

### Sitemap

Add `market-sitemap.xml.ts` to the sitemap index:

```typescript
// src/pages/market-sitemap.xml.ts
// Lists: /market/, /market/hvac/, all state/city/problem pages
// lastmod: from market-data.json generatedAt timestamp
```

Update `sitemap.xml.ts` to include `market-sitemap.xml` in the index.

### Robots

No changes needed — all market pages should be indexable.

---

## Step 8: Internal Linking

### Market pages → Market pages

- National page links to all state pages and problem pages
- State pages link to all city pages in that state + back to national
- City pages link to other cities in the same state (horizontal) + back to state + back to national
- Problem pages link to other problem pages + back to national
- Problem × state pages link to state page + problem page

### Market pages → Report pages

City pages link to public `/report/[slug]/` pages for companies in that city:

```
"See individual audit reports from Houston HVAC companies:"
→ Tiger Air and Heating (Score: 60)
→ The Chill Brothers (Score: 70)
→ Air Tech of Houston (Score: 30)
```

Data source: cross-reference `reports.json` with market-data city to find matching reports.

### Market pages → Blog posts

Each gap section can link to relevant blog posts:

```
"No online booking" section → links to blog post about booking importance
"Slow load time" section → links to blog post about page speed
```

Create a mapping in `src/data/gap-blog-links.ts`:

```typescript
export const GAP_BLOG_LINKS: Record<string, { slug: string; title: string }[]> = {
  "no-online-booking": [
    { slug: "hvac-booking-system", title: "Why HVAC Companies Need Online Booking" }
  ],
  "slow-page-load": [
    { slug: "hvac-website-speed", title: "HVAC Website Speed: Why It Matters" }
  ],
};
```

### Blog posts → Market pages

Update existing blog posts that reference aggregate stats to link to the relevant market page:

- "Our 147-site study found..." → link to `/market/hvac/`
- "Houston HVAC companies average..." → link to `/market/hvac/houston-tx/`
- "68% of HVAC sites lack booking..." → link to `/market/hvac/no-online-booking/`

This is a manual update done after market pages are live.

### Report pages → Market pages

Each `/report/[slug]/` page can link to its city's market page:

```
"See how {city} HVAC companies compare overall →"
```

---

## Step 9: The Metric Name

Brand the score system: **HVAC Website Index**

Every page says:

> "Houston HVAC websites score 58 on the HVAC Website Index"

Not:

> "Average website score: 58"

This is a one-line change in templates but a significant authority signal.

Implementation: Add `indexName` constant to market data config. Use in all templates.

---

## Step 10: Freshness Signals

Every market page includes:

```html
<p class="text-ink-faint text-sm">
  Last updated: March 2026 · {N} sites audited
</p>
```

Data source: `generatedAt` timestamp from `market-data.json`.

Every new scrape batch + `sync-market-data.mjs` + Vercel deploy = pages auto-update.

No extra work needed — Astro static build handles this.

---

## Step 11: Design

Follow existing hvacaudit.co design system:
- Dark theme (`#0b1220` base)
- Sky blue accent (`#0ea5e9`)
- `px-6 md:px-12 lg:px-16` container pattern
- CSS-only animations (`data-reveal`)
- Self-hosted Geist VF fonts
- Same Navbar/Footer as rest of site

### New design elements needed:

1. **Stat cards** — Grid of 4-6 cards showing key metrics. Each card: icon + number + label. Similar to report page severity cards but for market stats.

2. **Score distribution chart** — CSS-only horizontal bar chart. Five bars (0-20, 21-40, 41-60, 61-80, 81-100) with widths proportional to count. No JS charting library.

3. **Comparison table** — Styled table matching existing report page tables. Highlight best/worst values per column.

4. **Gap finding section** — Full-width section with large heading (the gap), stat callout, explanatory paragraph, and "what good looks like" subsection.

Must score Lighthouse 100. No exceptions.

---

## Step 12: Build & Deploy Pipeline

### Current flow:
```
sync-reports.mjs → reports.json → astro build → vercel deploy
```

### New flow:
```
sync-reports.mjs → reports.json ─┐
sync-market-data.mjs → market-data.json ─┤→ astro build → vercel deploy
```

### package.json scripts:
```json
{
  "sync-reports": "node scripts/sync-reports.mjs",
  "sync-market": "node scripts/sync-market-data.mjs",
  "sync-all": "node scripts/sync-reports.mjs && node scripts/sync-market-data.mjs",
  "prebuild": "npm run sync-all"
}
```

Note: `prebuild` requires `DATABASE_URL` in Vercel environment variables. If you don't want DB queries during Vercel build, run `sync-all` locally and commit the JSON files.

**Recommended approach**: Run sync scripts locally (or in CI), commit the JSON files, push to Vercel. This keeps the build simple and doesn't require DB access from Vercel.

---

## Step 13: Scaling Strategy

### Phase 1 (Now): HVAC Only
- Run inventory script to confirm data
- Build sync script + templates
- Launch ~40 pages (1 national + 3 state + ~17 city + ~7 problem + ~12 problem × state)

### Phase 2 (When data exists): More HVAC data
- Run targeted scrapes for underserved cities
- Each scrape batch → sync → rebuild → pages auto-update
- New cities cross 10-lead threshold → new pages appear automatically

### Phase 3 (Future): Sub-service pages
- When 2,000+ HVAC leads exist
- Add `/market/hvac/ac-repair/` sub-service pages IF sub-niche data shows meaningful variance
- Only if ac_repair markets genuinely differ from heating_repair markets

### Phase 4 (Future): Other niches
- When cleaning/garage-door/pest-control data exists in creative-axe
- Repeat the entire structure under `/market/house-cleaning/`, `/market/garage-door/`, etc.
- Separate domains for non-HVAC niches (per existing plan) — or keep on hvacaudit.co if rebranding to broader scope

---

## Implementation Order

| # | Task | Depends On | Output |
|---|------|-----------|--------|
| 1 | Write `inventory-market-data.mjs` | Nothing | Console report + JSON showing what data exists |
| 2 | Run inventory, analyze results | Step 1 | Decision on which pages to generate |
| 3 | Write `sync-market-data.mjs` | Step 2 | `market-data.json` with all aggregated data |
| 4 | Write `gap-narratives.ts` | Step 3 | Narrative templates for each gap type |
| 5 | Write `gap-blog-links.ts` | Step 3 | Blog post mapping for each gap |
| 6 | Build shared components | Step 3 | MarketHero, StatCards, ScoreDistribution, GapSection, ComparisonTable, MarketCTA, MarketBreadcrumb |
| 7 | Build national pillar page | Steps 4-6 | `/market/hvac/` |
| 8 | Build `[...slug].astro` with state template | Steps 4-6 | `/market/hvac/texas/` etc. |
| 9 | Add city template to `[...slug].astro` | Steps 4-6 | `/market/hvac/houston-tx/` etc. |
| 10 | Add problem template to `[...slug].astro` | Steps 4-6 | `/market/hvac/no-online-booking/` etc. |
| 11 | Add problem × state template | Steps 4-6 | `/market/hvac/no-online-booking/texas/` etc. |
| 12 | Add `market-sitemap.xml.ts` | Steps 7-11 | Market pages in sitemap |
| 13 | Update sitemap index | Step 12 | Include market sitemap |
| 14 | Add market page links to report pages | Step 9 | `/report/[slug]` links to city market page |
| 15 | Update package.json scripts | Step 3 | `sync-market`, `sync-all` |
| 16 | Write `/market/` index page | Steps 7-11 | Landing page linking to all reports |
| 17 | Test Lighthouse 100 | All | Verify no performance regression |
| 18 | Deploy | All | Live on hvacaudit.co |
| 19 | Update blog posts with market page links | Step 18 | Internal linking upgrade |
| 20 | Submit new sitemap to GSC | Step 18 | Indexing |

---

## Files Created/Modified Summary

### New Files
```
scripts/inventory-market-data.mjs        ← Step 1
scripts/sync-market-data.mjs            ← Step 3
src/data/market-data.json                ← Generated by sync script
src/data/gap-narratives.ts               ← Step 4
src/data/gap-blog-links.ts              ← Step 5
src/components/market/MarketHero.astro   ← Step 6
src/components/market/StatCards.astro    ← Step 6
src/components/market/ScoreDistribution.astro ← Step 6
src/components/market/GapSection.astro   ← Step 6
src/components/market/ComparisonTable.astro ← Step 6
src/components/market/MarketCTA.astro    ← Step 6
src/components/market/MarketBreadcrumb.astro ← Step 6
src/pages/market/index.astro             ← Step 16
src/pages/market/hvac/index.astro        ← Step 7
src/pages/market/hvac/[...slug].astro    ← Steps 8-11
src/pages/market-sitemap.xml.ts          ← Step 12
```

### Modified Files
```
src/pages/sitemap.xml.ts                 ← Add market sitemap to index
src/pages/report/[slug].astro            ← Add link to city market page
package.json                             ← Add sync-market, sync-all scripts
programmatic-seo.md                      ← Update status to "in progress"
```

### NOT Modified (important)
```
src/layouts/Base.astro                   ← No changes needed
src/styles/global.css                    ← May add market-specific styles
vercel.json                              ← No new security header changes needed
```
