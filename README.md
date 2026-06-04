# Bevu Social Farmstay — Website

A premium, sustainable farmstay website built with **Next.js 14 (App Router)**, **Tailwind CSS**, **Framer Motion**, and **Lucide icons** — fully SEO and AEO (Answer Engine Optimization) ready.

## Run Locally

```bash
cd bevu-social-farmstay
npm install
npm run dev
```

Open http://localhost:3000

Production build:

```bash
npm run build
npm start
```

## Pages

| Route | Page |
|---|---|
| `/` | Home (hero, why Bevu, stay, experiences, food & sustainability, ideal for, location, testimonials, FAQ, CTA) |
| `/about` | Story, "Social Farmstay" meaning, philosophy, what makes Bevu different |
| `/stay` | Stay overview, units (placeholder), amenities, inclusions, expectations |
| `/experiences` | All 13 experiences |
| `/sustainability` | Six sustainability pillars + responsible tourism guidelines |
| `/gallery` | Filterable gallery (categories: Farm Life, Stay Spaces, Food, People & Gatherings, Nature, Evening Moments) |
| `/location` | Where we are, distance, drive, map placeholder, travel tips |
| `/contact` | Inquiry form, WhatsApp/call/email CTAs, full FAQ |

## SEO & AEO Built In

- **Server-rendered HTML** — every page is statically generated; crawlers and answer engines see full content.
- **Per-page metadata** — unique titles, descriptions, canonical URLs via the Next.js Metadata API.
- **Open Graph + Twitter cards** with the farmstay hero image.
- **JSON-LD structured data**:
  - `LodgingBusiness` + `Resort` (site-wide, with amenities, area served, keywords)
  - `WebSite`
  - `FAQPage` (Home + Contact — strong AEO signal)
  - `BreadcrumbList` on every inner page
- **`/sitemap.xml`** and **`/robots.txt`** auto-generated (`app/sitemap.js`, `app/robots.js`), with AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.) explicitly allowed.
- One `H1` per page, `H2`/`H3` hierarchy, alt text on all images, lazy loading, `next/image` optimization.

## Updating Content

- **Contact details (phone / WhatsApp / email)**: edit `data/site.js` — used everywhere automatically. Replace the `XXXXXXXXXX` placeholders.
- **Production domain**: update `url` in `data/site.js` (drives canonical URLs, sitemap, JSON-LD).
- **Experiences / features / FAQs / gallery**: edit files in `data/`.
- **Real photos**: drop into `public/images/` and update `data/gallery.js`. The uploaded farmstay photo is at `public/images/bevu-hero.jpeg` (hero + about + contact).
- **Inquiry form**: currently shows a success message client-side; wire `components/InquiryForm.jsx` `handleSubmit` to an API/booking engine later.

## Brand Theme (tailwind.config.js)

Forest `#1F3D2B` · Olive `#6F7D4E` · Beige `#F4EBDD` · Clay `#A46A3F` · Terracotta `#B5552D` · Laterite `#8C4A2F` · Sand `#E8D8BF` · Charcoal `#222222` · Off-white `#FAF7F1` · Amber `#E8A84C`

Terracotta/laterite/amber tones were drawn from the farmstay's handcrafted brick architecture photo.

Fonts: Playfair Display (headings) + Inter (body), loaded from Google Fonts.

## Deploy

Works out of the box on Vercel/Netlify: `npm run build`. Remember to set the real domain in `data/site.js` before going live, and submit `/sitemap.xml` in Google Search Console.
