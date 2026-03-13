import type { DiagnosticType } from "./reports";

export interface PainPage {
  slug: string;
  diagnosticType: DiagnosticType;
  title: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  heroStat: string;
  heroStatLabel: string;
  sections: {
    whatWeFind: {
      heading: string;
      intro: string;
      findings: { stat: string; label: string; detail: string }[];
    };
    whyItHappens: {
      heading: string;
      reasons: { title: string; description: string }[];
    };
    whatToFix: {
      heading: string;
      intro: string;
      steps: { title: string; description: string; effort: string; impact: string }[];
    };
  };
}

export const painPages: PainPage[] = [
  {
    slug: "hvac-not-getting-calls",
    diagnosticType: "blind-spender",
    title: "HVAC Website Not Getting Calls? Here's Why | HVAC Audit",
    metaDescription:
      "We audited 147+ HVAC websites. The average scores 34/100. If you're not getting calls, your website has problems you can't see. Free diagnostic report.",
    h1: "Your HVAC website isn't getting calls.\nHere's what's actually wrong.",
    subtitle:
      "You built a website, maybe paid someone to set it up. But the phone isn't ringing. No form submissions. No booked jobs from online. You're wondering if digital even works for HVAC.",
    heroStat: "34",
    heroStatLabel: "avg HVAC website score out of 100",
    sections: {
      whatWeFind: {
        heading: "What We Find When We Audit \"No Calls\" HVAC Websites",
        intro:
          "We've audited 147+ HVAC websites. When a business says \"I'm not getting calls,\" the audit reveals a pattern every time.",
        findings: [
          {
            stat: "18.4s",
            label: "average load time",
            detail:
              "Google recommends under 3 seconds. At 18.4 seconds, 53% of your visitors are gone before they see your homepage. They don't bounce because your service is bad — they bounce because your site never loaded.",
          },
          {
            stat: "60%",
            label: "have no SSL certificate",
            detail:
              "Chrome shows a \"Not Secure\" warning before visitors see anything else. For a business asking people to trust them with a $15,000 system replacement, that warning is a deal-killer.",
          },
          {
            stat: "40%",
            label: "have no clear CTA",
            detail:
              "No \"Book Now,\" no \"Call Us,\" no obvious next step. Visitors land, scroll, see nothing to click, and leave. Your website is a brochure, not a lead generator.",
          },
          {
            stat: "50%",
            label: "have no contact form",
            detail:
              "Half the HVAC sites we audit have no way for a visitor to reach the business other than finding a phone number buried in the footer. After 6 PM, that visitor is lost forever.",
          },
        ],
      },
      whyItHappens: {
        heading: "Why This Happens to HVAC Businesses",
        reasons: [
          {
            title: "The website was built once and never touched",
            description:
              "Most HVAC websites are set up by a local agency or a nephew who knows WordPress. It worked fine in 2019. But Google's algorithm has changed, mobile usage has doubled, and your competitors have caught up.",
          },
          {
            title: "Nobody is measuring anything",
            description:
              "No Google Analytics, no call tracking, no form tracking. You have no idea how many people visit your site, where they come from, or why they leave. You're running a business blind.",
          },
          {
            title: "The site looks fine on your desktop",
            description:
              "You check your website on your office computer and it looks okay. But 65%+ of your customers are on mobile. On a phone, your site might take 20 seconds to load, have tiny unclickable buttons, and no sticky call button.",
          },
        ],
      },
      whatToFix: {
        heading: "What to Fix First",
        intro:
          "You don't need a $15,000 website redesign. You need to fix the 3-4 things that are actually killing your leads.",
        steps: [
          {
            title: "Fix SSL and speed",
            description:
              "Get an SSL certificate (free with most hosts) and compress your images. This alone can cut bounce rate by 30%.",
            effort: "1-2 days",
            impact: "Critical — stops Chrome warnings, cuts bounce rate",
          },
          {
            title: "Add a clickable phone number and contact form",
            description:
              "Every page needs a tap-to-call button on mobile and a simple contact form. Name, phone, \"What's wrong?\" — that's all you need.",
            effort: "1 day",
            impact: "High — captures leads who are ready to book",
          },
          {
            title: "Put a clear CTA above the fold",
            description:
              "\"Need AC Repair? Call Now\" with your phone number. Visible without scrolling. On every page.",
            effort: "2 hours",
            impact: "High — tells visitors exactly what to do",
          },
          {
            title: "Display your Google reviews",
            description:
              "You probably have dozens of 5-star reviews on Google. Put them on your website. Social proof converts browsers into callers.",
            effort: "1 day",
            impact: "Medium — builds instant trust",
          },
        ],
      },
    },
  },
  {
    slug: "hvac-website-not-converting",
    diagnosticType: "pretty-and-broken",
    title: "HVAC Website Not Converting? Hidden Issues Killing Your Leads | HVAC Audit",
    metaDescription:
      "Your HVAC website looks great but isn't converting? We find the hidden gaps — no booking widget, slow speed, missing trust signals — that are quietly losing you leads.",
    h1: "Your HVAC website looks great.\nIt's quietly losing you leads.",
    subtitle:
      "You spent money on a professional website. You're running ads. The traffic is there. But the leads aren't coming in like they should. The site looks fine — so what's wrong?",
    heroStat: "68%",
    heroStatLabel: "of leads lost to hidden conversion gaps",
    sections: {
      whatWeFind: {
        heading: "The Hidden Gaps We Find in \"Good\" HVAC Websites",
        intro:
          "When a website scores above average but conversions are low, the problems are invisible to the naked eye. Here's what our audits reveal.",
        findings: [
          {
            stat: "0",
            label: "after-hours lead capture",
            detail:
              "Your site looks great at 2 PM. But at 11 PM when a homeowner's AC dies, there's no booking widget, no after-hours form, no way to capture that lead. They find your competitor who has online scheduling.",
          },
          {
            stat: "5-8s",
            label: "mobile load time",
            detail:
              "Your desktop site loads fast. But on mobile — where 65%+ of your traffic is — large images and unoptimized code drag load time to 5-8 seconds. That's enough to lose 40% of visitors.",
          },
          {
            stat: "0",
            label: "reviews displayed on site",
            detail:
              "You have 150+ five-star Google reviews. But your website shows zero of them. Visitors who land from an ad have no social proof. They see a clean site with no reason to trust you over the next result.",
          },
          {
            stat: "No",
            label: "call tracking installed",
            detail:
              "You're spending on Google Ads but have no call tracking. You don't know which ads generate calls, which keywords convert, or where your budget is being wasted.",
          },
        ],
      },
      whyItHappens: {
        heading: "Why Good-Looking Websites Still Fail",
        reasons: [
          {
            title: "Design ≠ conversion optimization",
            description:
              "Web designers build beautiful sites. But beauty doesn't capture leads. Conversion requires specific elements — sticky CTAs, booking widgets, trust signals, speed optimization — that most designers don't specialize in.",
          },
          {
            title: "Nobody tested the mobile experience",
            description:
              "The site was approved on a 27-inch monitor in a design review. Nobody tested it on an iPhone SE with a 4G connection at 11 PM when the AC went out.",
          },
          {
            title: "The site was built for the owner, not the customer",
            description:
              "The homepage talks about the company's history, certifications, and values. But the customer searching \"emergency AC repair\" needs a phone number, a price range, and a booking button — not a brand story.",
          },
        ],
      },
      whatToFix: {
        heading: "How to Turn Traffic Into Leads",
        intro:
          "Your foundation is solid. These fixes plug the leaks without rebuilding anything.",
        steps: [
          {
            title: "Add online scheduling",
            description:
              "ServiceTitan, Housecall Pro, or even Calendly. Let visitors book without calling. This single change captures every after-hours lead you're currently losing.",
            effort: "1-2 days",
            impact: "Critical — captures 11 PM emergency leads",
          },
          {
            title: "Add a review widget",
            description:
              "Embed your Google reviews on the homepage and service pages. Birdeye, Grade.us, or a simple embed. Let your 5-star reputation do the selling.",
            effort: "1 day",
            impact: "High — builds trust from ad traffic",
          },
          {
            title: "Install call tracking",
            description:
              "CallRail or similar. Know which ads, keywords, and pages generate phone calls. Stop guessing where your ad budget should go.",
            effort: "2 hours",
            impact: "High — stops ad waste",
          },
          {
            title: "Optimize mobile speed",
            description:
              "Compress images to WebP, defer non-critical scripts, add a sticky call button on mobile. Target under 3 seconds on 4G.",
            effort: "1-2 days",
            impact: "Medium — reduces mobile bounce rate 30-40%",
          },
        ],
      },
    },
  },
  {
    slug: "hvac-ads-not-working",
    diagnosticType: "half-built",
    title: "HVAC Ads Not Working? Your Website Is the Problem | HVAC Audit",
    metaDescription:
      "Running Google Ads for your HVAC business but not getting leads? Your website is killing your ad spend. Free audit shows exactly what's broken.",
    h1: "Your HVAC ads aren't broken.\nYour website is.",
    subtitle:
      "You're spending $2,000-$5,000/month on Google Ads or Facebook. The clicks are there. But the calls aren't. Every click that bounces is money wasted — and your website is the reason.",
    heroStat: "$12K+",
    heroStatLabel: "wasted per month on avg by HVAC businesses",
    sections: {
      whatWeFind: {
        heading: "What Happens When Ad Traffic Hits a Broken HVAC Website",
        intro:
          "We've audited HVAC businesses spending thousands on ads. When their site scores below 50/100, here's what the data shows.",
        findings: [
          {
            stat: "53%",
            label: "bounce before the site loads",
            detail:
              "You're paying $15-$50 per click. At 18.4 seconds average load time, more than half those clicks bounce before your homepage even appears. That's $7.50-$25 per wasted click.",
          },
          {
            stat: "\"Not Secure\"",
            label: "Chrome warning on landing",
            detail:
              "Google Ads sends visitors to your site. Chrome immediately shows \"Not Secure.\" The visitor — who was ready to book — hits the back button and clicks your competitor's ad instead. You still pay for the click.",
          },
          {
            stat: "0",
            label: "way to book after hours",
            detail:
              "Your ads run 24/7. But your site has no booking widget, no after-hours form. Every click after 6 PM is wasted because there's no way to convert. That's 50%+ of your ad spend with zero capture mechanism.",
          },
          {
            stat: "No",
            label: "landing page optimization",
            detail:
              "Your ads point to your homepage — a generic page that talks about everything. High-converting HVAC ads point to dedicated landing pages: \"Emergency AC Repair in [City]\" with a single CTA.",
          },
        ],
      },
      whyItHappens: {
        heading: "Why Your Ad Agency Can't Fix This",
        reasons: [
          {
            title: "They optimize ads, not websites",
            description:
              "Your ad agency optimizes bids, keywords, and ad copy. They don't fix your website's speed, SSL, or conversion elements. They send great traffic to a broken destination.",
          },
          {
            title: "Quality Score tanks your cost per click",
            description:
              "Google's Quality Score depends on landing page experience. A slow, insecure site with poor mobile experience means you pay MORE per click than competitors with better websites. You're in a bidding war with a handicap.",
          },
          {
            title: "Nobody measures past the click",
            description:
              "Your ad dashboard shows clicks and impressions. But nobody tracks what happens AFTER the click — how many visitors actually call, fill out a form, or book. Without that data, you can't fix the leak.",
          },
        ],
      },
      whatToFix: {
        heading: "Fix Your Website Before Spending Another Dollar on Ads",
        intro:
          "Pause isn't the answer. But fixing these issues before your next ad dollar will 2-3x your return.",
        steps: [
          {
            title: "Fix SSL and page speed immediately",
            description:
              "Every second your site takes to load costs you 7% in conversions. SSL costs nothing. Image compression takes an afternoon. These two fixes alone can cut your cost-per-lead in half.",
            effort: "1-2 days",
            impact: "Critical — stops bleeding ad spend",
          },
          {
            title: "Add dedicated landing pages",
            description:
              "Create one page per service: \"Emergency AC Repair in [City].\" Big phone number, 3 trust badges, 2 review quotes, one booking button. Point your ads here instead of the homepage.",
            effort: "3-5 days",
            impact: "Critical — can 2-3x conversion rate",
          },
          {
            title: "Install call tracking and form tracking",
            description:
              "CallRail for calls, form tracking in GA4. Now you know exactly which ads generate leads and which are burning money.",
            effort: "2 hours",
            impact: "High — reveals where to cut and where to scale",
          },
          {
            title: "Add after-hours capture",
            description:
              "Your ads run at night. Add a booking widget or after-hours form so those 11 PM emergency searches convert instead of bouncing.",
            effort: "1 day",
            impact: "High — captures 50% of ad traffic that currently bounces",
          },
        ],
      },
    },
  },
  {
    slug: "hvac-website-good-no-leads",
    diagnosticType: "invisible",
    title: "Good HVAC Website But No Leads? You're Invisible | HVAC Audit",
    metaDescription:
      "Your HVAC website is solid but you're not getting leads? The problem isn't your site — it's that nobody can find it. Free audit with visibility analysis.",
    h1: "Your HVAC website is solid.\nThe problem is nobody sees it.",
    subtitle:
      "Your website scores above the 34-point industry average. It loads fast, has good content, looks professional. But the phone isn't ringing because your online presence has zero visibility.",
    heroStat: "0",
    heroStatLabel: "organic search visibility",
    sections: {
      whatWeFind: {
        heading: "What We Find When a Good HVAC Site Gets No Traffic",
        intro:
          "When the website itself is solid but leads are flat, the issue is always the same: nobody can find it.",
        findings: [
          {
            stat: "0",
            label: "service area pages",
            detail:
              "When someone searches \"AC repair in [your city],\" Google looks for a page about AC repair in that city. If you don't have one, you're invisible for that search. Your competitors with 20+ city pages are getting those calls.",
          },
          {
            stat: "No",
            label: "Google Business Profile optimization",
            detail:
              "Your GBP listing has your name and phone number. But no photos, no service descriptions, no regular posts, and the website link might not even match. Google rewards active, complete profiles.",
          },
          {
            stat: "0",
            label: "ad budget or SEO strategy",
            detail:
              "No Google Ads, no Facebook ads, no SEO agency. You built a website and expected it to generate leads on its own. That worked in 2015. In 2026, you need active promotion.",
          },
          {
            stat: "No",
            label: "local schema markup",
            detail:
              "Your website doesn't tell Google what type of business you are, what areas you serve, or what services you offer. Without LocalBusiness schema, you're relying on Google to guess — and it guesses wrong.",
          },
        ],
      },
      whyItHappens: {
        heading: "Why a Good Website Isn't Enough Anymore",
        reasons: [
          {
            title: "Build it and they'll come hasn't worked since 2015",
            description:
              "There are 60,000+ HVAC businesses in the US. Just having a website puts you in a pool of thousands. Without SEO, ads, or local marketing, you're a needle in a haystack with a nice paint job.",
          },
          {
            title: "Your competitors are investing in visibility",
            description:
              "The companies getting calls aren't necessarily better than you. They're spending $2,000-$5,000/month on Google Ads, posting weekly on GBP, and have 25+ service area pages. They're visible. You're not.",
          },
          {
            title: "Word of mouth doesn't scale online",
            description:
              "You get referrals because your work is excellent. But the 80% of homeowners who search Google first never find you. You're winning repeat business while losing all new business to competitors with worse service but better online presence.",
          },
        ],
      },
      whatToFix: {
        heading: "How to Get Your Good Website in Front of Customers",
        intro:
          "Your website is the foundation. Now you need to drive traffic to it.",
        steps: [
          {
            title: "Build 15-25 service area pages",
            description:
              "One page per city you serve: \"AC Repair in [City, State].\" Each page targets a local search term. This is the highest-ROI SEO investment for HVAC companies.",
            effort: "1-2 weeks",
            impact: "Critical — opens up dozens of local search terms",
          },
          {
            title: "Optimize your Google Business Profile",
            description:
              "Add photos weekly, write service descriptions, post updates. Respond to every review. An active GBP with a linked website ranks higher in the map pack.",
            effort: "Ongoing (30 min/week)",
            impact: "High — map pack drives 42% of local clicks",
          },
          {
            title: "Add LocalBusiness schema markup",
            description:
              "Tell Google exactly what you are, where you serve, and what you offer. JSON-LD markup takes 30 minutes to add and helps Google match you to local searches.",
            effort: "1 hour",
            impact: "Medium — helps Google understand your business",
          },
          {
            title: "Start with Google Local Services Ads",
            description:
              "LSAs show at the very top of search results with a \"Google Guaranteed\" badge. You only pay per lead, not per click. For HVAC, this is the fastest path to phone calls.",
            effort: "1-2 days to set up",
            impact: "High — pay-per-lead, top placement, trust badge",
          },
        ],
      },
    },
  },
];
