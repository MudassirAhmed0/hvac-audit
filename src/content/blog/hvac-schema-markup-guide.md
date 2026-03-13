---
title: "HVAC Schema Markup: The 30-Minute Fix That Tells Google What You Do"
description: "Most HVAC websites have no schema markup. Google has to guess what your business does and where you serve. Here's how to add LocalBusiness schema in 30 minutes."
date: 2026-03-13
readTime: "8 min read"
cover: "/blog/cover-audit-local.webp"
---

Google is trying to figure out what your HVAC business does. Without schema markup, it reads your website like a human reads a foreign language — it gets the general idea, but misses important details. Your service area, your hours, your services, your reviews, your license number — Google has to guess at all of it.

**Schema markup is structured code that tells Google exactly what your business is, what you do, and where you serve.** It takes 30 minutes to add, costs nothing, and helps Google match your business to the right local searches. Yet most HVAC websites we audit have zero schema markup.

If your [HVAC website is good but nobody can find it](/hvac-website-good-no-leads/), missing schema markup might be part of the reason. Here's how to fix it.

## What schema markup does

When someone searches "AC repair near me," Google needs to match that search with relevant local businesses. It uses several signals: your Google Business Profile, your website content, backlinks, and structured data (schema markup).

Without schema, Google has to parse your website content and infer:
- You're an HVAC company (not an HVAC parts supplier, not an HVAC training school)
- You serve specific cities (not just the one in your address)
- You offer specific services (AC repair vs. installation vs. maintenance)
- You're currently open for business
- You have a certain number of reviews at a certain rating

With schema, you tell Google all of this explicitly. No inference needed. No guessing wrong.

**Schema markup doesn't guarantee rankings.** But it removes ambiguity. Google recommends it for all local businesses. And in competitive HVAC markets where multiple businesses have similar websites and similar content, schema can be the tiebreaker that determines who shows in the [map pack](/blog/hvac-audit-local-presence/) and who doesn't.

## The LocalBusiness schema for HVAC

Here's the schema markup every HVAC website should have. This goes in a `<script type="application/ld+json">` tag in the `<head>` of your homepage:

```json
{
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  "name": "Your Company Name",
  "image": "https://yourwebsite.com/logo.png",
  "url": "https://yourwebsite.com",
  "telephone": "+1-555-123-4567",
  "email": "info@yourwebsite.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street",
    "addressLocality": "Houston",
    "addressRegion": "TX",
    "postalCode": "77001",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 29.7604,
    "longitude": -95.3698
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Houston",
      "sameAs": "https://en.wikipedia.org/wiki/Houston"
    },
    {
      "@type": "City",
      "name": "Katy"
    },
    {
      "@type": "City",
      "name": "Sugar Land"
    }
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "07:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday","Sunday"],
      "opens": "08:00",
      "closes": "14:00"
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "HVAC Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AC Repair",
          "description": "Same-day air conditioning repair service"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Heating Repair",
          "description": "Furnace and heat pump repair service"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "HVAC Installation",
          "description": "New AC and heating system installation"
        }
      }
    ]
  },
  "priceRange": "$$",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "247"
  },
  "sameAs": [
    "https://www.facebook.com/yourcompany",
    "https://www.google.com/maps/place/your+listing"
  ]
}
```

Replace every value with your actual business information. The schema type `HVACBusiness` is a specific subtype of `LocalBusiness` — Google recognizes it and associates your business with HVAC-specific searches.

## What each field does

**@type: HVACBusiness** — Tells Google you're specifically an HVAC company. More precise than "LocalBusiness" or "HomeAndConstructionBusiness."

**telephone** — The phone number Google should associate with your business. Use the same number as your [Google Business Profile](/blog/hvac-google-business-profile/) for consistency.

**areaServed** — The cities you serve. This is critical for local SEO. If you serve 15 cities, list all 15. Google uses this to determine which "near me" searches should show your business.

**openingHoursSpecification** — Your actual business hours. If you offer 24/7 emergency service, add that as a separate specification. Google can show "Open Now" badges in search results based on this data.

**hasOfferCatalog** — Your services listed explicitly. When someone searches "AC repair," Google can directly match this to your schema — no inference needed.

**aggregateRating** — Your review rating and count. This should match your Google reviews. Keep it updated when you get new reviews.

**priceRange** — A general indicator. Use "$" for budget, "$$" for mid-range, "$$$" for premium. This helps Google match you to searches with pricing intent.

## Service page schema

Each service page should have its own schema. For your AC repair page:

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AC Repair in Houston, TX",
  "description": "Same-day air conditioning repair in Houston. $89 diagnostic fee. NATE-certified technicians. Available 24/7.",
  "provider": {
    "@type": "HVACBusiness",
    "name": "Your Company Name",
    "url": "https://yourwebsite.com"
  },
  "areaServed": {
    "@type": "City",
    "name": "Houston",
    "addressRegion": "TX"
  },
  "offers": {
    "@type": "Offer",
    "price": "89",
    "priceCurrency": "USD",
    "description": "AC diagnostic fee"
  }
}
```

This tells Google: this specific page is about AC repair, in Houston, with a $89 price point. When someone searches "AC repair Houston," Google has an explicit match — not an inference from page content.

## How to add schema to your website

### WordPress (most common for HVAC)

Install the **Yoast SEO** or **Rank Math** plugin. Both generate LocalBusiness schema automatically based on your settings. Go to the SEO plugin settings, find the "Local SEO" or "Schema" section, and fill in your business details.

For custom service page schema, Rank Math has a schema generator built into each page editor. Yoast requires the premium version or a separate plugin like Schema Pro.

### Manually (any website)

Add the `<script type="application/ld+json">` tag in the `<head>` section of each page. Copy the templates above, replace with your information, and paste into your HTML.

### Wix / Squarespace / GoDaddy

These platforms have limited schema support. Wix allows JSON-LD in the "Custom Code" section under Settings > Advanced. Squarespace allows it in "Code Injection" under Settings. GoDaddy Website Builder has minimal schema support — you may need to switch platforms for proper implementation.

## How to verify your schema works

After adding schema, test it:

1. **Google Rich Results Test** — Paste your URL. Google shows what it can read from your schema. Fix any errors or warnings.
2. **Schema.org Validator** — Paste your JSON-LD code. Validates the syntax and structure.
3. **Google Search Console** — After a few days, check the "Enhancements" section. Google reports schema it found on your site and any issues.

Common errors:
- Missing required fields (telephone, address, name)
- Invalid phone number format (use +1-555-123-4567)
- aggregateRating that doesn't match your actual Google reviews
- Opening hours that don't match your GBP

## Schema alone won't rank you

Schema markup is one signal among many. It won't take a site from page 5 to page 1. But it removes ambiguity, helps Google understand your business precisely, and can improve how your listing appears in search results.

Combined with [service area pages](/blog/hvac-city-landing-pages/), an [optimized Google Business Profile](/blog/hvac-google-business-profile/), and [consistent local SEO signals](/blog/hvac-audit-local-presence/), schema markup completes the picture that Google needs to rank you for local searches.

If your [website is solid but nobody can find you](/hvac-website-good-no-leads/), schema is one of the fastest, cheapest fixes you can make. Thirty minutes of work, permanent benefit.

## Keep reading

- [Google Business Profile for HVAC: The Setup Most Get Wrong](/blog/hvac-google-business-profile/)
- [City Landing Pages for HVAC: How to Rank in Every Area You Serve](/blog/hvac-city-landing-pages/)
- [Your HVAC Website Is Good — But Nobody Can Find It](/blog/hvac-website-good-but-invisible/)
