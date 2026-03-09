export interface GapNarrative {
  heading: string;
  whyItMatters: string;
  whatTopSitesDo: string;
  costLine: string;
}

export const gapNarratives: Record<string, GapNarrative> = {
  "no-online-scheduling": {
    heading: "{pct}% of {market} HVAC Websites Have No Online Scheduling",
    whyItMatters:
      "Homeowners searching for HVAC service at 11 PM — when their AC just failed — can't call during business hours. Without an online scheduling option, those emergency leads go to whichever competitor lets them book immediately. Studies show that businesses with online booking convert 2-3x more after-hours visitors.",
    whatTopSitesDo:
      "The highest-scoring HVAC websites in {market} embed booking widgets from platforms like Housecall Pro, ServiceTitan, or Calendly directly on their homepage. Visitors can select a time slot without picking up the phone.",
    costLine:
      "In {market}, {pct}% of HVAC websites ({count} companies) have no online scheduling. Every one of them is losing after-hours leads to competitors who do.",
  },
  "no-license-number": {
    heading: "{pct}% of {market} HVAC Sites Don't Display Their License Number",
    whyItMatters:
      "Displaying a license number is one of the simplest trust signals a contractor can show. Homeowners checking multiple HVAC companies will choose the one that visibly proves they're licensed. In many states, displaying your license number on your website is a legal requirement.",
    whatTopSitesDo:
      "Top-scoring sites in {market} display their license number in the footer, on their About page, and often in the hero section. Some link directly to the state licensing board verification page.",
    costLine:
      "In {market}, {pct}% of HVAC sites ({count} businesses) don't show their license number anywhere on their website. It takes five minutes to add — and it immediately increases trust.",
  },
  "no-https-redirect": {
    heading: "{pct}% of {market} HVAC Websites Show a 'Not Secure' Warning",
    whyItMatters:
      "When a site loads over HTTP instead of HTTPS, browsers display a 'Not Secure' warning in the address bar. For a homeowner about to submit their address and phone number to schedule an HVAC service call, that warning kills trust instantly. Google also uses HTTPS as a ranking signal.",
    whatTopSitesDo:
      "Top-performing HVAC websites in {market} have SSL certificates installed and properly redirect all HTTP traffic to HTTPS. This is a one-time server configuration that eliminates the warning permanently.",
    costLine:
      "{pct}% of HVAC sites in {market} ({count} businesses) either lack an SSL certificate or don't redirect HTTP to HTTPS. Visitors see 'Not Secure' before they even read the homepage.",
  },
  "no-service-area-pages": {
    heading: "{pct}% of {market} HVAC Sites Have Zero Service Area Pages",
    whyItMatters:
      "Service area pages are how local businesses rank in searches like 'HVAC repair in [neighborhood]' or 'AC installation near [suburb].' Without them, a company relies entirely on their Google Business Profile to appear in local searches — missing organic traffic from dozens of nearby cities and neighborhoods.",
    whatTopSitesDo:
      "High-scoring HVAC sites in {market} create individual pages for each city and neighborhood they serve. Each page includes unique content about that area, driving organic traffic from hyperlocal searches.",
    costLine:
      "In {market}, {pct}% of HVAC websites ({count} companies) have zero service area pages. They're invisible in local organic search beyond their primary city.",
  },
  "no-trust-badges": {
    heading: "{pct}% of {market} HVAC Sites Have No Industry Trust Badges",
    whyItMatters:
      "Trust badges — BBB accreditation, manufacturer certifications (Carrier, Trane, Lennox), NATE certification, EPA Section 608 — signal professionalism and credibility. Homeowners comparing HVAC companies gravitate toward sites that display recognizable third-party endorsements.",
    whatTopSitesDo:
      "The best HVAC sites in {market} display trust badges prominently, often in a horizontal strip near the hero section or in the footer. They include manufacturer partnerships, industry certifications, and local chamber of commerce memberships.",
    costLine:
      "{pct}% of HVAC websites in {market} ({count} businesses) display no industry trust badges. Even companies with legitimate certifications are failing to show them on their websites.",
  },
  "no-licensed-insured-mention": {
    heading: "{pct}% of {market} HVAC Sites Don't Mention 'Licensed & Insured'",
    whyItMatters:
      "The phrase 'Licensed & Insured' is one of the most searched qualifiers when homeowners vet contractors. Not mentioning it on your website — even if you are licensed and insured — creates doubt. Competitors who state it plainly get the edge.",
    whatTopSitesDo:
      "Top HVAC sites in {market} include 'Licensed & Insured' in their hero section, footer, and About page. Some add their specific license number alongside the statement for extra credibility.",
    costLine:
      "In {market}, {pct}% of HVAC sites ({count} businesses) never mention being licensed and insured. Homeowners assume the worst when this basic trust signal is missing.",
  },
  "no-schema-markup": {
    heading: "{pct}% of {market} HVAC Sites Have No Google Business Schema",
    whyItMatters:
      "LocalBusiness schema markup tells Google exactly what your business is, where it's located, what hours you operate, and what services you offer. Without it, Google has to guess — and it often guesses wrong. Schema-enabled sites are more likely to appear in rich results, knowledge panels, and local packs.",
    whatTopSitesDo:
      "The highest-scoring HVAC sites in {market} implement LocalBusiness or HVACBusiness schema with complete information: name, address, phone, hours, service area, and price ranges. This structured data gives them a measurable advantage in search visibility.",
    costLine:
      "{pct}% of HVAC sites in {market} ({count} businesses) have no structured data markup. Google sees their content but can't easily extract business details for rich results.",
  },
  "no-contact-form": {
    heading: "{pct}% of {market} HVAC Websites Have No Contact Form",
    whyItMatters:
      "Not every visitor wants to call. Some prefer to describe their issue in writing, especially after hours. A contact form captures leads that a phone number alone cannot. Without one, HVAC companies lose visitors who aren't ready for a phone conversation.",
    whatTopSitesDo:
      "Top HVAC sites in {market} feature contact forms prominently — on the homepage, in the header, and on dedicated Contact pages. The best forms are short (name, phone, issue) and include an auto-response confirming receipt.",
    costLine:
      "In {market}, {pct}% of HVAC sites ({count} businesses) have no contact form. Visitors who don't want to call have no way to reach them through the website.",
  },
  "no-specials-page": {
    heading: "{pct}% of {market} HVAC Sites Have No Specials or Coupons Page",
    whyItMatters:
      "A dedicated specials page serves two purposes: it gives price-conscious homeowners a reason to choose you, and it creates a high-intent landing page that ranks for searches like 'HVAC coupon [city]' or 'AC tune-up special near me.' Without one, you miss both conversion and SEO opportunities.",
    whatTopSitesDo:
      "High-performing HVAC sites in {market} maintain a dedicated Specials or Coupons page with current offers. They update it seasonally — AC tune-up specials in spring, heating check specials in fall — keeping the page fresh for both visitors and search engines.",
    costLine:
      "{pct}% of HVAC sites in {market} ({count} businesses) have no specials or coupons page. They're missing a proven conversion driver and an SEO opportunity.",
  },
  "no-financing-page": {
    heading: "{pct}% of {market} HVAC Sites Don't Show Financing Options",
    whyItMatters:
      "HVAC system replacements cost $5,000-$15,000+. Many homeowners can't pay upfront. Companies that prominently display financing options — monthly payment calculators, approved lender partnerships, 'as low as $X/month' messaging — remove the biggest barrier to closing high-ticket jobs.",
    whatTopSitesDo:
      "Top HVAC sites in {market} have dedicated financing pages that explain options clearly: approved lender partnerships, monthly payment examples, and application links. The best ones embed payment calculators directly on the page.",
    costLine:
      "In {market}, {pct}% of HVAC sites ({count} businesses) don't mention financing anywhere. On a $10,000 system replacement, the company that shows '$89/month financing available' wins the job.",
  },
  "no-blog": {
    heading: "{pct}% of {market} HVAC Sites Have No Blog or Content Hub",
    whyItMatters:
      "A blog drives organic traffic from informational searches — 'why is my AC blowing warm air,' 'how often should I change my furnace filter,' 'HVAC maintenance checklist.' These searches represent homeowners with active HVAC concerns. Without a blog, companies rely entirely on branded and commercial searches.",
    whatTopSitesDo:
      "The best HVAC sites in {market} publish regularly on seasonal topics, troubleshooting guides, and maintenance tips. This content ranks for long-tail keywords and builds topical authority that lifts commercial page rankings too.",
    costLine:
      "{pct}% of HVAC sites in {market} ({count} businesses) have no blog or content section. They're invisible for the hundreds of informational HVAC searches homeowners make every day.",
  },
  "no-after-hours-capture": {
    heading: "{pct}% of {market} HVAC Sites Can't Capture After-Hours Leads",
    whyItMatters:
      "HVAC emergencies don't follow business hours. When an AC fails at midnight in {market}, the homeowner searches immediately. If your website has no way to capture that lead — no booking widget, no after-hours form, no chat — you lose them to the competitor who does. After-hours leads are often the highest-urgency, highest-value calls.",
    whatTopSitesDo:
      "Top-scoring sites in {market} use a combination of 24/7 answering services, chat widgets, and online booking to ensure no lead falls through the cracks outside business hours.",
    costLine:
      "In {market}, {pct}% of HVAC sites ({count} businesses) have no after-hours lead capture mechanism. Every night, potential emergency calls go to competitors.",
  },
  "no-emergency-messaging": {
    heading: "{pct}% of {market} HVAC Sites Have No Emergency/24-7 Messaging",
    whyItMatters:
      "Homeowners with HVAC emergencies look for explicit signals: '24/7 Emergency Service,' 'Same-Day Repair Available,' or 'Call Now for Emergency AC Repair.' Without this messaging, even companies that offer emergency service fail to communicate it — and lose those urgent, high-margin calls.",
    whatTopSitesDo:
      "The best HVAC sites in {market} feature emergency messaging prominently in their hero section and navigation. They use contrasting colors or banner bars to ensure visitors know emergency service is available before scrolling.",
    costLine:
      "{pct}% of HVAC sites in {market} ({count} businesses) have no visible emergency or 24/7 messaging. Homeowners in crisis can't tell if these companies will respond urgently.",
  },
  "phone-mismatch": {
    heading: "{pct}% of {market} HVAC Sites Have Phone Number Mismatches",
    whyItMatters:
      "When the phone number on your website doesn't match your Google Business Profile, it creates a NAP (Name, Address, Phone) inconsistency. This directly hurts local search rankings. It also confuses customers who find one number on Google and a different one on your site.",
    whatTopSitesDo:
      "Top HVAC sites in {market} use a single primary business number consistently across their website, Google Business Profile, Yelp, and all directory listings. They audit their citations regularly to catch mismatches.",
    costLine:
      "In {market}, {pct}% of HVAC sites ({count} businesses) have phone numbers on their website that don't match their Google listing. This NAP inconsistency hurts both trust and local SEO rankings.",
  },
  "no-maintenance-plan": {
    heading: "{pct}% of {market} HVAC Sites Have No Maintenance Plan Page",
    whyItMatters:
      "Maintenance plans are the highest-LTV product an HVAC company offers — recurring revenue, guaranteed repeat visits, and priority service for members. A dedicated page ranks for searches like 'HVAC maintenance plan [city]' and converts visitors into long-term customers.",
    whatTopSitesDo:
      "Top HVAC sites in {market} have dedicated maintenance plan pages with clear tier breakdowns, pricing transparency, and member benefits. The best ones include a sign-up form directly on the page.",
    costLine:
      "{pct}% of HVAC sites in {market} ({count} businesses) have no maintenance plan page. They're either not offering plans or failing to promote their most profitable service online.",
  },
  "missing-meta-description": {
    heading: "{pct}% of {market} HVAC Sites Have Missing or Weak Meta Descriptions",
    whyItMatters:
      "The meta description appears in Google search results below your page title. Without one, Google auto-generates a snippet from random page content — often pulling unhelpful text. A well-crafted meta description with a call to action can significantly improve click-through rates from search results.",
    whatTopSitesDo:
      "High-ranking HVAC sites in {market} write custom meta descriptions for every page, including their city name, key services, and a call to action. Each description is unique and under 160 characters.",
    costLine:
      "In {market}, {pct}% of HVAC sites ({count} businesses) have missing or generic meta descriptions. Their search results show auto-generated snippets instead of compelling copy.",
  },
};

/** Replace tokens {market}, {pct}, {count} in a string */
export function interpolate(
  template: string,
  vars: { market: string; pct: number; count: number }
): string {
  return template
    .replace(/\{market\}/g, vars.market)
    .replace(/\{pct\}/g, String(vars.pct))
    .replace(/\{count\}/g, String(vars.count));
}
