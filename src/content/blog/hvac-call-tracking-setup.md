---
title: "Call Tracking for HVAC Contractors: The $0 Setup That Shows Where Every Lead Comes From"
description: "Most HVAC companies can't tell which marketing channel generates their best leads. Here's a free setup that fixes that in 30 minutes."
date: 2026-03-07
lastModified: 2026-03-08
readTime: "10 min read"
cover: "/blog/cover-calltrack.webp"
---

"Where did you hear about us?"

That's not a marketing strategy. That's a guess wrapped in a question most customers can't accurately answer. They'll say "Google" whether they clicked an ad, an organic result, or your Google Business listing — three completely different channels with completely different costs.

If you can't tell whether your leads come from Google Ads, organic search, your [Google Business Profile](/blog/hvac-google-business-profile/), or a yard sign, you're making every marketing decision blind. You might be spending [$5,000/month on a channel](/blog/hvac-marketing-budget/) that produces zero revenue while neglecting the one that generates 80% of your bookings.

Here's how to fix that — starting with a free setup you can do this afternoon.

## Why HVAC specifically needs call tracking

HVAC is a phone-first industry. Unlike e-commerce or SaaS, most of your conversions happen over the phone, not through online forms. A homeowner with a broken AC at 2pm isn't filling out a form and waiting for a callback. They're calling the first company they find.

This makes phone calls your most valuable conversion — and the hardest to attribute without tracking. You might be getting 50 calls per month, but without tracking, you have no idea which 20 came from Google Ads, which 15 came from organic search, and which 15 came from your GBP listing.

That breakdown matters enormously for your [marketing budget decisions](/blog/hvac-marketing-budget/). The channel producing $400 customers is worth 5x more than the one producing $2,000 customers.

## The free Google setup (30 minutes)

Google provides free call tracking through Google Ads and Google Business Profile. If you're running Google Ads (even at a small budget), you already have access.

### Google Ads call tracking

Step-by-step setup:

1. **Log into Google Ads** and navigate to Goals > Conversions > Summary
2. **Click the "+" button** to create a new conversion action
3. **Select "Phone calls"** as the conversion type
4. **Choose "Calls from ads using call extensions or call-only ads"** — this tracks calls that happen when someone taps the phone number directly from your ad
5. **Also set up "Calls to a phone number on your website"** — this installs a Google forwarding number on your website. When someone clicks your ad, visits your site, and then calls, Google tracks that entire journey
6. **Set minimum call duration** to 60 seconds — this filters out wrong numbers and spam. A real HVAC inquiry almost always takes at least a minute

Google replaces your phone number on the website with a tracking number (only for visitors who came from ads). When that number rings, Google records it as a conversion. Your phone rings exactly the same — the customer notices nothing.

Now you know: this call came from Google Ads. This one didn't.

### Google Analytics 4 click-to-call tracking

If your website has click-to-call links (and it should — if it doesn't, that's [problem #1 to fix](/blog/hvac-website-not-getting-calls/)), you can track how many people tap them:

1. In GA4, go to Admin > Events
2. Create a new event for `click` where the `link_url` contains `tel:`
3. Name it `phone_call_click`
4. Mark it as a conversion

This doesn't tell you who actually spoke to you, but it tells you how many mobile visitors tapped your phone number and from which source. If 30 people per month tap "Call Now" from organic search but only 10 tap it from Facebook Ads, you know where your engaged traffic lives.

### Google Business Profile call tracking

If someone taps "Call" on your GBP listing, Google already tracks this. Check it in your GBP dashboard under Performance > Calls.

You'll see:
- Total calls from your listing per month
- Which day of the week gets the most calls
- Whether calls come from Maps vs. Search

This is free. It's already running. Most HVAC contractors have never looked at it. Check it now — you might be surprised how many calls come directly from your Map listing without the customer ever visiting your website.

## The $30/month upgrade (dedicated tracking numbers)

For contractors who want complete attribution across every channel, call tracking services like CallRail, WhatConverts, or CallTrackingMetrics offer dedicated tracking numbers.

### How it works

You get a unique phone number for each marketing channel:

- **Number 1** — displayed on your website for organic visitors
- **Number 2** — on your Google Ads landing pages
- **Number 3** — on your GBP listing
- **Number 4** — on your truck wraps and yard signs
- **Number 5** — on your direct mail pieces
- **Number 6** — on your Facebook page

All numbers forward to your main office line instantly. The customer notices nothing different — they call, you answer. But you see exactly which channel each call came from.

### Setup with CallRail (15 minutes)

1. Create a CallRail account ($30-$50/month for 5 local numbers)
2. Add your main business number as the destination
3. Create tracking numbers for each source
4. Install the JavaScript snippet on your website (this automatically swaps the number for web visitors based on their source)
5. Replace the GBP phone number with your GBP tracking number
6. Print new yard sign / truck wrap numbers as needed

At $30-$50/month for 5 tracking numbers, this is the highest-ROI marketing expense you'll ever make. One data-driven decision — like cutting a $500/month channel that generates zero leads — pays for years of tracking.

### Automation with Zapier

Connect CallRail to your CRM or Google Sheets via Zapier so every call automatically logs:
- Caller's phone number
- Which tracking number they called (source)
- Call duration
- Call recording (if enabled)
- Date and time

No manual data entry. No "I forgot to ask where they heard about us." Every call is automatically attributed.

## What to track (and what it tells you)

### Calls per channel per month

| Channel | Calls | Booked Jobs | Revenue | Cost | Cost/Customer |
|---------|-------|-------------|---------|------|---------------|
| Google Ads | 45 | 12 | $18,000 | $3,000 | $250 |
| Organic | 30 | 10 | $15,000 | $1,500 | $150 |
| GBP | 25 | 8 | $12,000 | $0 | $0 |
| HomeAdvisor | 20 | 3 | $4,500 | $2,000 | $667 |

Without tracking, these numbers are invisible. With tracking, the decision is obvious: organic and GBP are your best channels. [HomeAdvisor is your worst](/blog/best-lead-source-hvac/). You're paying $667 per customer from HomeAdvisor vs. $0 from GBP. Now you know where to invest more and what to cut.

### Call duration (lead quality filter)

Not every call is a lead. Call duration tells you which ones are real:

- **Under 30 seconds** — wrong number, spam, hang-up. Not a lead.
- **30-60 seconds** — existing customer checking hours, quick question. Probably not a new lead.
- **60-120 seconds** — possible lead. Asking about services, pricing.
- **Over 2 minutes** — almost certainly a real prospect. Describing their problem, asking about availability, discussing pricing.

Filter your conversion data by call duration to get accurate lead counts. Most contractors overcount leads because they count every call, including the 15-second ones. A contractor who thinks they got "40 leads" this month might have only had 18 qualified conversations.

### Peak call times

When do most of your calls come in? Track this weekly and you'll find patterns:

- **Monday morning** — homeowners calling about problems discovered over the weekend
- **Early afternoon (1-3pm)** — people calling during lunch breaks or after the house heats up
- **After 5pm** — emergency calls that many contractors miss entirely

If 35% of your calls come after 5pm but your office closes at 5, you need an [after-hours solution](/blog/hvac-website-not-getting-calls/) — whether that's a contact form, an answering service, or extended hours. Without tracking, you'd never know 35% of your opportunity window is going unanswered.

### First-time vs. repeat callers

Track whether callers are new or returning. Repeat callers are existing customers (maintenance, follow-ups). New callers are leads. If your marketing is generating 40 calls but 25 are repeat customers, your actual lead count from marketing is 15, not 40.

## Form tracking (the other half)

Phone calls aren't your only conversions. Form submissions matter too — especially on mobile where some users prefer to submit a request rather than call, and especially after hours when calling feels intrusive.

### Setting up form tracking

1. **Google Analytics 4** — add event tracking to every form submission. When a form is submitted, fire a `form_submit` event with the form name (e.g., "audit_request", "contact_form", "emergency_form")
2. **Tag the source** — GA4 automatically attributes form submissions to the traffic source (organic, paid, direct, social)
3. **CRM integration** — if you use a CRM (ServiceTitan, Housecall Pro, Jobber), tag each form submission with its source

The combination of call tracking + form tracking gives you a complete picture of your lead flow. Without it, the [$4,200/month you're losing](/blog/hvac-website-costing-4200-per-month/) stays invisible.

## The monthly optimization process

Once you have tracking data, follow this monthly review process:

1. **Pull the numbers** — calls and forms per channel, with cost and booked jobs
2. **Calculate cost per customer** for each channel
3. **Identify the winner** — which channel has the lowest cost per customer?
4. **Identify the loser** — which channel has the highest cost per customer?
5. **Shift budget** — move 20-30% of the losing channel's budget to the winning one
6. **Repeat next month**

This is iterative optimization. You don't need to make dramatic changes. Small, data-driven shifts compound over time. After 6 months of monthly optimization, most contractors have doubled their marketing efficiency — same budget, twice the leads.

### Seasonal adjustments

HVAC is seasonal, and your tracking data will reflect that. Summer months spike with AC calls. Winter spikes with heating. [Shoulder seasons](/blog/hvac-off-season-marketing/) require different strategies entirely.

Track your channel performance by season. Google Ads might be your best channel in peak season when search volume is high, but organic might outperform in shoulder months when fewer contractors are advertising.

## Start today

Set up Google's free call tracking this afternoon. It takes 30 minutes. Next month, you'll have data. The month after, you'll make your first data-driven marketing decision.

And you'll wonder how you ever ran a business without it.

## Keep reading

- [How Much Should an HVAC Company Spend on Marketing?](/blog/hvac-marketing-budget/)
- [HomeAdvisor vs Google Ads vs SEO: Where Contractors Get the Best Leads](/blog/best-lead-source-hvac/)
- [The HVAC Marketing Agency Checklist: How to Stop Getting Burned](/blog/hvac-marketing-agency-red-flags/)
