export interface Gap {
  gap: string;
  impact: string;
  severity: "critical" | "high" | "medium" | "low";
  category: string;
  fixEffort: "quick-win" | "moderate" | "major";
  estimatedMonthlyCost: string;
}

export interface BusinessSummary {
  oneLiner: string;
  topThreeGaps: string[];
  estimatedTotalMonthlyCost: string;
  estimatedAnnualLtvLost: string;
  competitivePosition: string;
  seasonalUrgency: string;
  recommendedFirstProject: string;
  recommendedFirstProjectPrice: string;
  recommendedFirstProjectTimeline: string;
  growthOpportunity: string;
}

export interface ImpactEstimate {
  monthlyVisitors: number;
  bounceReason: string;
  bouncePercent: number;
  bouncedVisitors: number;
  bookingRate: number;
  missedLeads: string;
  avgServiceCall: number;
  missedRepairRevenue: string;
  installNote: string;
}

export interface Report {
  slug: string;
  name: string;
  domain: string;
  website: string;
  rating: number;
  reviewCount: number;
  city: string;
  state: string;
  totalScore: number;
  impactEstimate: ImpactEstimate;
  businessSummary: BusinessSummary;
  gapSummary: Gap[];
}

export const reports: Report[] = [
  {
    slug: "tiger-air-and-heating",
    name: "Tiger Air and Heating",
    domain: "tigerairtx.com",
    website: "http://www.tigerairtx.com",
    rating: 5,
    reviewCount: 457,
    city: "Dallas",
    state: "TX",
    totalScore: 60,
    impactEstimate: {
      monthlyVisitors: 400,
      bounceReason: "Chrome \"Not Secure\" warning + no contact form",
      bouncePercent: 35,
      bouncedVisitors: 140,
      bookingRate: 5,
      missedLeads: "5-7",
      avgServiceCall: 400,
      missedRepairRevenue: "$2,000-$2,800",
      installNote: "If even 1 of those was a system replacement, that's another $8,000-$15,000.",
    },
    businessSummary: {
      oneLiner: "HTTP visitors see a \"Not Secure\" warning because the site doesn't redirect to HTTPS, 457 5\u2605 reviews are invisible to website visitors, and ac season starts in ~12 weeks. every gap fixed now will pay dividends when search volume triples.",
      topThreeGaps: [
        "HTTP does not redirect to HTTPS \u2014 some visitors see 'Not Secure'",
        "No contact form",
        "457 Google reviews not displayed on website",
      ],
      estimatedTotalMonthlyCost: "$9K-$23K",
      estimatedAnnualLtvLost: "$324K-$540K",
      competitivePosition: "Tiger Air and Heating has a 5\u2605 rating with 457 reviews in Dallas.",
      seasonalUrgency: "AC season starts in ~12 weeks. Every gap fixed now will pay dividends when search volume triples.",
      recommendedFirstProject: "HTTP does not redirect to HTTPS \u2014 some visitors see 'Not Secure' + No contact form",
      recommendedFirstProjectPrice: "$1,000-$3,000",
      recommendedFirstProjectTimeline: "1-2 weeks",
      growthOpportunity: "Full website rebuild + 25 service area pages + SEO optimization + monthly maintenance retainer ($1,500-$2,500/month)",
    },
    gapSummary: [
      {
        gap: "HTTP does not redirect to HTTPS \u2014 some visitors see 'Not Secure'",
        impact: "Tiger Air and Heating's site has SSL but doesn't force HTTPS. Anyone clicking an old HTTP link or typing the URL without https:// sees Chrome's \"Not Secure\" warning. A simple redirect rule fixes this.",
        severity: "high",
        category: "trust",
        fixEffort: "quick-win",
        estimatedMonthlyCost: "$500-$1,500",
      },
      {
        gap: "No contact form",
        impact: "Only a phone number. Forms capture 3x more leads than phone-only. Many homeowners prefer to submit a request rather than call \u2014 especially after hours.",
        severity: "high",
        category: "lead-capture",
        fixEffort: "quick-win",
        estimatedMonthlyCost: "$1,500-$3,000",
      },
      {
        gap: "457 Google reviews not displayed on website",
        impact: "Tiger Air and Heating has a 5 rating with 457 reviews \u2014 but visitors never see them on the website. On-site reviews increase conversions by 270%. Each lost lead isn't a $400 repair \u2014 it's a $15,000 lifetime customer.",
        severity: "high",
        category: "trust",
        fixEffort: "quick-win",
        estimatedMonthlyCost: "$2,000-$6,000",
      },
      {
        gap: "No license number displayed",
        impact: "Texas requires TDLR/TACL licensing for HVAC work. Not showing the license number makes the business look less legitimate than competitors who display theirs.",
        severity: "medium",
        category: "trust",
        fixEffort: "quick-win",
        estimatedMonthlyCost: "$500-$1,000",
      },
      {
        gap: "No \"Licensed & Insured\" mention",
        impact: "Homeowners hiring for expensive HVAC work want to know they're protected. \"Licensed, Bonded & Insured\" is a trust signal every serious competitor displays.",
        severity: "medium",
        category: "trust",
        fixEffort: "quick-win",
        estimatedMonthlyCost: "$300-$800",
      },
      {
        gap: "No industry trust badges",
        impact: "No BBB, NATE, ACCA, or manufacturer certifications visible. These badges are instant credibility \u2014 homeowners comparing HVAC sites pick the one that looks \"official\".",
        severity: "medium",
        category: "trust",
        fixEffort: "quick-win",
        estimatedMonthlyCost: "$300-$800",
      },
      {
        gap: "54 unoptimized images",
        impact: "54 images aren't in modern WebP/AVIF format. Converting them would cut page size and improve load time.",
        severity: "low",
        category: "speed",
        fixEffort: "moderate",
        estimatedMonthlyCost: "$100-$500",
      },
    ],
  },
  {
    slug: "harlen-johnson-hvac",
    name: "Harlen Johnson HVAC, Plumbing & Electrical",
    domain: "hjac.com",
    website: "https://hjac.com",
    rating: 4.8,
    reviewCount: 1158,
    city: "Dallas",
    state: "TX",
    totalScore: 60,
    impactEstimate: {
      monthlyVisitors: 800,
      bounceReason: "Phone not clickable on mobile + no contact form + no after-hours capture",
      bouncePercent: 40,
      bouncedVisitors: 320,
      bookingRate: 5,
      missedLeads: "12-16",
      avgServiceCall: 400,
      missedRepairRevenue: "$4,800-$6,400",
      installNote: "If even 2 of those were system replacements, that's another $16,000-$30,000.",
    },
    businessSummary: {
      oneLiner: "HTTP visitors see a \"Not Secure\" warning because the site doesn't redirect to HTTPS, 1158 4.8\u2605 reviews are invisible to website visitors, and ac season starts in ~12 weeks. every gap fixed now will pay dividends when search volume triples.",
      topThreeGaps: [
        "HTTP does not redirect to HTTPS \u2014 some visitors see 'Not Secure'",
        "Phone number not clickable on mobile",
        "No way to capture leads after 6PM",
      ],
      estimatedTotalMonthlyCost: "$42K-$105K",
      estimatedAnnualLtvLost: "$1.5M-$2.5M",
      competitivePosition: "Harlen Johnson HVAC, Plumbing & Electrical has a 4.8\u2605 rating with 1158 reviews in Dallas. No service area pages means invisible for local searches. Missing online booking puts them behind competitors who offer it.",
      seasonalUrgency: "AC season starts in ~12 weeks. Every gap fixed now will pay dividends when search volume triples.",
      recommendedFirstProject: "Fix phone number not clickable on mobile + phone number mismatch with google business profile",
      recommendedFirstProjectPrice: "$500-$1,500",
      recommendedFirstProjectTimeline: "3-5 days",
      growthOpportunity: "Full website rebuild + 25 service area pages + SEO optimization + monthly maintenance retainer ($1,500-$2,500/month)",
    },
    gapSummary: [
      {
        gap: "HTTP does not redirect to HTTPS \u2014 some visitors see 'Not Secure'",
        impact: "Harlen Johnson HVAC, Plumbing & Electrical's site has SSL but doesn't force HTTPS. Anyone clicking an old HTTP link or typing the URL without https:// sees Chrome's \"Not Secure\" warning. A simple redirect rule fixes this.",
        severity: "high",
        category: "trust",
        fixEffort: "quick-win",
        estimatedMonthlyCost: "$500-$1,500",
      },
      {
        gap: "Phone number not clickable on mobile",
        impact: "60%+ of visitors are on mobile. They have to manually type the number instead of tapping to call. In a Dallas AC emergency, they'll tap the back button and call whoever makes it easiest.",
        severity: "critical",
        category: "lead-capture",
        fixEffort: "quick-win",
        estimatedMonthlyCost: "$2,000-$5,000",
      },
      {
        gap: "No way to capture leads after 6PM",
        impact: "No form, no booking widget, no chat. The website is effectively closed 14 hours a day. AC emergencies at 2AM go straight to the competitor with online booking.",
        severity: "critical",
        category: "lead-capture",
        fixEffort: "moderate",
        estimatedMonthlyCost: "$3,000-$8,000",
      },
      {
        gap: "Phone number mismatch with Google Business Profile",
        impact: "Website: 972-241-7771, GBP: +1 972-402-6198. Google uses NAP consistency to rank local businesses. This mismatch is actively hurting the map pack position.",
        severity: "critical",
        category: "business",
        fixEffort: "quick-win",
        estimatedMonthlyCost: "$1,500-$4,000",
      },
      {
        gap: "No clear CTA above the fold",
        impact: "Visitors land on the page and don't know what to do next. No \"Call Now\", no \"Book Online\", no \"Get a Quote\" visible without scrolling. Above-fold CTAs increase conversions 3x.",
        severity: "high",
        category: "lead-capture",
        fixEffort: "quick-win",
        estimatedMonthlyCost: "$1,500-$4,000",
      },
      {
        gap: "No contact form",
        impact: "Only a phone number. Forms capture 3x more leads than phone-only. Many homeowners prefer to submit a request rather than call \u2014 especially after hours.",
        severity: "high",
        category: "lead-capture",
        fixEffort: "quick-win",
        estimatedMonthlyCost: "$1,500-$3,000",
      },
      {
        gap: "1158 Google reviews not displayed on website",
        impact: "Harlen Johnson HVAC, Plumbing & Electrical has a 4.8 rating with 1158 reviews \u2014 but visitors never see them on the website. On-site reviews increase conversions by 270%. Each lost lead isn't a $400 repair \u2014 it's a $15,000 lifetime customer.",
        severity: "high",
        category: "trust",
        fixEffort: "quick-win",
        estimatedMonthlyCost: "$2,000-$6,000",
      },
      {
        gap: "No emergency/24-7 messaging",
        impact: "HVAC emergencies don't wait for business hours. No \"24/7\", \"Same-Day Service\", or \"Emergency\" messaging means panicked homeowners assume the business is closed and keep searching.",
        severity: "high",
        category: "lead-capture",
        fixEffort: "quick-win",
        estimatedMonthlyCost: "$1,000-$3,000",
      },
      {
        gap: "No financing page for $5k-$15k replacements",
        impact: "HVAC replacement is the biggest purchase a homeowner makes outside of their house. If the site doesn't mention financing, homeowners assume they can't afford it and call the company that offers 0% APR.",
        severity: "high",
        category: "lead-capture",
        fixEffort: "quick-win",
        estimatedMonthlyCost: "$2,000-$5,000",
      },
      {
        gap: "No online scheduling",
        impact: "No ServiceTitan, Housecall Pro, or any booking widget. 68% of customers book with whoever makes it easiest. After-hours leads go to the competitor who lets them schedule at 11PM.",
        severity: "high",
        category: "lead-capture",
        fixEffort: "moderate",
        estimatedMonthlyCost: "$2,000-$5,000",
      },
      {
        gap: "No service area pages",
        impact: "Zero location-specific pages. When someone Googles \"AC repair Dallas\", they're invisible. Each service area page is a new net catching local searches.",
        severity: "high",
        category: "seo",
        fixEffort: "moderate",
        estimatedMonthlyCost: "$1,000-$3,000",
      },
      {
        gap: "No maintenance plan page",
        impact: "Maintenance plans are recurring revenue goldmines for HVAC companies. No \"membership\", \"club\", or \"annual service agreement\" page means leaving money on the table every month.",
        severity: "high",
        category: "content",
        fixEffort: "quick-win",
        estimatedMonthlyCost: "$1,000-$3,000",
      },
      {
        gap: "Paying for traffic that lands on a no-trust site",
        impact: "Running ads (Facebook Pixel, Call Tracking detected) but the site has zero social proof. 1158 reviews exist but visitors can't see them. Ad conversion rate could jump 2-3x with a review widget.",
        severity: "high",
        category: "business",
        fixEffort: "quick-win",
        estimatedMonthlyCost: "$2,000-$6,000",
      },
      {
        gap: "No LocalBusiness schema markup",
        impact: "Google can't understand the business type, service area, or hours from the code. Schema markup helps Google show rich results in search.",
        severity: "medium",
        category: "seo",
        fixEffort: "quick-win",
        estimatedMonthlyCost: "$500-$1,500",
      },
      {
        gap: "Missing or weak meta description",
        impact: "The meta description controls what people see in Google search results. Without one, Google picks random text from the page.",
        severity: "medium",
        category: "seo",
        fixEffort: "quick-win",
        estimatedMonthlyCost: "$500-$1,500",
      },
      {
        gap: "No blog or content hub",
        impact: "No blog means no long-tail SEO. Competitors writing \"How much does AC repair cost in Dallas?\" capture searches this site never will.",
        severity: "medium",
        category: "content",
        fixEffort: "moderate",
        estimatedMonthlyCost: "$500-$2,000",
      },
      {
        gap: "No license number displayed",
        impact: "Texas requires TDLR/TACL licensing for HVAC work. Not showing the license number makes the business look less legitimate than competitors who display theirs.",
        severity: "medium",
        category: "trust",
        fixEffort: "quick-win",
        estimatedMonthlyCost: "$500-$1,000",
      },
      {
        gap: "No \"Licensed & Insured\" mention",
        impact: "Homeowners hiring for expensive HVAC work want to know they're protected. \"Licensed, Bonded & Insured\" is a trust signal every serious competitor displays.",
        severity: "medium",
        category: "trust",
        fixEffort: "quick-win",
        estimatedMonthlyCost: "$300-$800",
      },
      {
        gap: "No industry trust badges",
        impact: "No BBB, NATE, ACCA, or manufacturer certifications visible. These badges are instant credibility \u2014 homeowners comparing HVAC sites pick the one that looks \"official\".",
        severity: "medium",
        category: "trust",
        fixEffort: "quick-win",
        estimatedMonthlyCost: "$300-$800",
      },
      {
        gap: "No specials or coupons page",
        impact: "\"$50 off AC repair\" or \"Free diagnostic\" gives hesitant homeowners the push to call. Competitors with visible offers convert 2-3x better.",
        severity: "medium",
        category: "content",
        fixEffort: "quick-win",
        estimatedMonthlyCost: "$500-$1,500",
      },
      {
        gap: "No video content",
        impact: "No YouTube or video on the site. Video builds trust faster than text \u2014 a 60-second \"Meet the Owner\" video can increase conversions by 80%.",
        severity: "medium",
        category: "content",
        fixEffort: "moderate",
        estimatedMonthlyCost: "$300-$1,000",
      },
      {
        gap: "No analytics tracking installed",
        impact: "No GA4, no GTM \u2014 the business is flying blind. No way to know which pages work, where visitors come from, or what's generating calls.",
        severity: "medium",
        category: "tracking",
        fixEffort: "quick-win",
        estimatedMonthlyCost: "$500-$1,500",
      },
      {
        gap: "Image alt tag coverage only 0%",
        impact: "Most images lack alt text. Hurts SEO (Google can't \"see\" images) and accessibility.",
        severity: "low",
        category: "seo",
        fixEffort: "quick-win",
        estimatedMonthlyCost: "$100-$500",
      },
      {
        gap: "34 unoptimized images",
        impact: "34 images aren't in modern WebP/AVIF format. Converting them would cut page size and improve load time.",
        severity: "low",
        category: "speed",
        fixEffort: "moderate",
        estimatedMonthlyCost: "$100-$500",
      },
    ],
  },
  {
    slug: "rescue-air-and-plumbing",
    name: "Rescue Air and Plumbing",
    domain: "rescueairtx.com",
    website: "https://www.rescueairtx.com",
    rating: 4.9,
    reviewCount: 3691,
    city: "Dallas",
    state: "TX",
    totalScore: 80,
    impactEstimate: {
      monthlyVisitors: 1500,
      bounceReason: "9.3s load time (53% leave after 3s) + no visible reviews",
      bouncePercent: 53,
      bouncedVisitors: 795,
      bookingRate: 5,
      missedLeads: "8-12",
      avgServiceCall: 400,
      missedRepairRevenue: "$3,200-$4,800",
      installNote: "If even 1 of those was a system replacement, that's another $8,000-$15,000.",
    },
    businessSummary: {
      oneLiner: "HTTP visitors see a \"Not Secure\" warning because the site doesn't redirect to HTTPS, 3691 4.9\u2605 reviews are invisible to website visitors, and ac season starts in ~12 weeks. every gap fixed now will pay dividends when search volume triples.",
      topThreeGaps: [
        "HTTP does not redirect to HTTPS \u2014 some visitors see 'Not Secure'",
        "Site loads in 9.3s",
        "3691 Google reviews not displayed on website",
      ],
      estimatedTotalMonthlyCost: "$14K-$34K",
      estimatedAnnualLtvLost: "$486K-$810K",
      competitivePosition: "Rescue Air and Plumbing has a 4.9\u2605 rating with 3691 reviews in Dallas.",
      seasonalUrgency: "AC season starts in ~12 weeks. Every gap fixed now will pay dividends when search volume triples.",
      recommendedFirstProject: "HTTP does not redirect to HTTPS \u2014 some visitors see 'Not Secure' + 3691 Google reviews not displayed on website",
      recommendedFirstProjectPrice: "$1,000-$3,000",
      recommendedFirstProjectTimeline: "1-2 weeks",
      growthOpportunity: "Full website rebuild + 25 service area pages + SEO optimization + monthly maintenance retainer ($1,500-$2,500/month)",
    },
    gapSummary: [
      {
        gap: "HTTP does not redirect to HTTPS \u2014 some visitors see 'Not Secure'",
        impact: "Rescue Air and Plumbing's site has SSL but doesn't force HTTPS. Anyone clicking an old HTTP link or typing the URL without https:// sees Chrome's \"Not Secure\" warning. A simple redirect rule fixes this.",
        severity: "high",
        category: "trust",
        fixEffort: "quick-win",
        estimatedMonthlyCost: "$500-$1,500",
      },
      {
        gap: "Site loads in 9.3s",
        impact: "Google says 53% of visitors leave after 3 seconds. At 9.3s, more than half of potential customers never see the site. Each lost lead isn't a $400 repair \u2014 it's a $15,000 lifetime customer.",
        severity: "critical",
        category: "speed",
        fixEffort: "moderate",
        estimatedMonthlyCost: "$2,000-$5,000",
      },
      {
        gap: "3691 Google reviews not displayed on website",
        impact: "Rescue Air and Plumbing has a 4.9 rating with 3691 reviews \u2014 but visitors never see them on the website. On-site reviews increase conversions by 270%. Each lost lead isn't a $400 repair \u2014 it's a $15,000 lifetime customer.",
        severity: "high",
        category: "trust",
        fixEffort: "quick-win",
        estimatedMonthlyCost: "$2,000-$6,000",
      },
      {
        gap: "Paying for traffic that lands on a no-trust site",
        impact: "Running ads (GTM, Facebook Pixel detected) but the site has zero social proof. 3691 reviews exist but visitors can't see them. Ad conversion rate could jump 2-3x with a review widget.",
        severity: "high",
        category: "business",
        fixEffort: "quick-win",
        estimatedMonthlyCost: "$2,000-$6,000",
      },
      {
        gap: "No \"Licensed & Insured\" mention",
        impact: "Homeowners hiring for expensive HVAC work want to know they're protected. \"Licensed, Bonded & Insured\" is a trust signal every serious competitor displays.",
        severity: "medium",
        category: "trust",
        fixEffort: "quick-win",
        estimatedMonthlyCost: "$300-$800",
      },
      {
        gap: "Running ads without call tracking",
        impact: "Ad pixels detected but no call tracking (CallRail, etc.). Impossible to know which ads are actually generating phone calls \u2014 could be wasting half the ad budget.",
        severity: "medium",
        category: "tracking",
        fixEffort: "quick-win",
        estimatedMonthlyCost: "$500-$2,000",
      },
      {
        gap: "Image alt tag coverage only 47%",
        impact: "Most images lack alt text. Hurts SEO (Google can't \"see\" images) and accessibility.",
        severity: "low",
        category: "seo",
        fixEffort: "quick-win",
        estimatedMonthlyCost: "$100-$500",
      },
      {
        gap: "9 unoptimized images",
        impact: "9 images aren't in modern WebP/AVIF format. Converting them would cut page size and improve load time.",
        severity: "low",
        category: "speed",
        fixEffort: "moderate",
        estimatedMonthlyCost: "$100-$500",
      },
    ],
  },
];

export function getReport(slug: string): Report | undefined {
  return reports.find((r) => r.slug === slug);
}

export function getAllSlugs(): string[] {
  return reports.map((r) => r.slug);
}

export const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };

export const severityColors = {
  critical: { bg: "bg-red-500/10", border: "border-red-500/30", text: "text-red-400", dot: "bg-red-500" },
  high: { bg: "bg-orange-500/10", border: "border-orange-500/30", text: "text-orange-400", dot: "bg-orange-500" },
  medium: { bg: "bg-yellow-500/10", border: "border-yellow-500/30", text: "text-yellow-400", dot: "bg-yellow-500" },
  low: { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-400", dot: "bg-blue-500" },
};

export const categoryLabels: Record<string, string> = {
  trust: "Trust & Credibility",
  "lead-capture": "Lead Capture",
  speed: "Page Speed",
  seo: "SEO",
  content: "Content",
  business: "Business Impact",
  tracking: "Tracking & Analytics",
};

export const categoryIcons: Record<string, string> = {
  trust: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  "lead-capture": "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
  speed: "M13 10V3L4 14h7v7l9-11h-7z",
  seo: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  content: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  business: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  tracking: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
};
