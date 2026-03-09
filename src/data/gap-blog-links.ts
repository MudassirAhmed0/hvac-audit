export interface BlogLink {
  slug: string;
  title: string;
}

/** Maps gap slugs to relevant blog posts */
export const gapBlogLinks: Record<string, BlogLink[]> = {
  "no-online-scheduling": [
    { slug: "hvac-after-hours-calls", title: "Why HVAC Companies Lose After-Hours Calls" },
    { slug: "hvac-speed-to-lead", title: "Speed to Lead: Why Response Time Wins HVAC Jobs" },
    { slug: "hvac-website-conversion-rate", title: "HVAC Website Conversion Rate Benchmarks" },
  ],
  "no-license-number": [
    { slug: "hvac-how-homeowners-choose", title: "How Homeowners Choose an HVAC Company" },
    { slug: "hvac-audit-homeowner-view", title: "What Homeowners See When They Visit Your HVAC Site" },
  ],
  "no-https-redirect": [
    { slug: "hvac-website-design-mistakes", title: "HVAC Website Design Mistakes That Cost You Calls" },
    { slug: "53-percent-leave-before-site-loads", title: "53% Leave Before Your Site Loads" },
  ],
  "no-service-area-pages": [
    { slug: "hvac-city-landing-pages", title: "HVAC City Landing Pages That Actually Rank" },
    { slug: "hvac-multi-location-seo", title: "Multi-Location HVAC SEO Strategy" },
    { slug: "hvac-audit-local-presence", title: "Your HVAC Local Presence Audit" },
  ],
  "no-trust-badges": [
    { slug: "hvac-how-homeowners-choose", title: "How Homeowners Choose an HVAC Company" },
    { slug: "hvac-compete-with-franchises", title: "How to Compete with HVAC Franchises" },
  ],
  "no-licensed-insured-mention": [
    { slug: "hvac-how-homeowners-choose", title: "How Homeowners Choose an HVAC Company" },
  ],
  "no-schema-markup": [
    { slug: "hvac-google-business-profile", title: "HVAC Google Business Profile Optimization" },
    { slug: "hvac-ai-search-2026", title: "HVAC and AI Search in 2026" },
  ],
  "no-contact-form": [
    { slug: "hvac-website-not-getting-calls", title: "Why Your HVAC Website Isn't Getting Calls" },
    { slug: "hvac-website-pages-that-generate-leads", title: "HVAC Website Pages That Generate Leads" },
  ],
  "no-specials-page": [
    { slug: "hvac-off-season-marketing", title: "HVAC Off-Season Marketing That Works" },
    { slug: "hvac-website-pages-that-generate-leads", title: "HVAC Website Pages That Generate Leads" },
  ],
  "no-financing-page": [
    { slug: "hvac-financing-close-rate", title: "How Financing Options Increase HVAC Close Rates" },
    { slug: "hvac-close-rate-options", title: "HVAC Close Rate: How to Win More Jobs" },
  ],
  "no-blog": [
    { slug: "hvac-website-audit-147-sites", title: "We Audited 147 HVAC Websites" },
    { slug: "hvac-ai-search-2026", title: "HVAC and AI Search in 2026" },
  ],
  "no-after-hours-capture": [
    { slug: "hvac-after-hours-calls", title: "Why HVAC Companies Lose After-Hours Calls" },
    { slug: "hvac-audit-emergency-ux", title: "HVAC Emergency UX Audit" },
    { slug: "hvac-speed-to-lead", title: "Speed to Lead: Why Response Time Wins HVAC Jobs" },
  ],
  "no-emergency-messaging": [
    { slug: "hvac-audit-emergency-ux", title: "HVAC Emergency UX Audit" },
    { slug: "hvac-website-speed-emergency-calls", title: "How Website Speed Affects Emergency HVAC Calls" },
  ],
  "phone-mismatch": [
    { slug: "hvac-google-profile-audit", title: "HVAC Google Profile Audit Checklist" },
    { slug: "hvac-call-tracking-setup", title: "HVAC Call Tracking Setup Guide" },
  ],
  "no-maintenance-plan": [
    { slug: "hvac-maintenance-agreements-online", title: "Selling HVAC Maintenance Agreements Online" },
    { slug: "hvac-customer-lifetime-value", title: "HVAC Customer Lifetime Value" },
  ],
  "missing-meta-description": [
    { slug: "hvac-website-audit-147-sites", title: "We Audited 147 HVAC Websites" },
    { slug: "hvac-audit-scorecard", title: "HVAC Audit Scorecard" },
  ],
};
