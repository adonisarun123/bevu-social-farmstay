# Bevu Social Farmstay — Website

Marketing and booking-enquiry site for Bevu Social Farmstay: a handcrafted brick farmstay near Hosur (Krishnagiri district, Tamil Nadu) with four ensuite rooms, a private swimming pool and an open lawn. Built with **Next.js 14 (App Router)**, **Tailwind CSS**, **Framer Motion** and **Lucide** icons. Fully responsive, SEO/AEO-ready (JSON-LD `LodgingBusiness`, `FAQPage`, breadcrumbs, sitemap, robots).

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Before go-live — fill these in

All in `data/site.js` unless noted:

1. **Phone / WhatsApp** — `PHONE_DIGITS` and `phoneDisplay` (currently `919999999999` placeholders). Drives every tel:, wa.me link and the floating button.
2. **Email** and **production domain** (`url`) — drives canonical URLs, sitemap and JSON-LD.
3. **Rates** — `pricing.perRoom` / `pricing.wholeHouse` weekday & weekend. `null` shows "On request".
4. **Drive times** — `location.distances` are approximate; adjust to your own drives.
5. **Social links** — `social.instagram` etc. (blank = hidden).
6. **Photos** — only `public/images/hero.jpg` and `house-build.jpg` are real. Rooms (`data/rooms.js`), amenities (`data/amenities.js`), experiences (`data/experiences.js`) and gallery (`data/gallery.js`) use Unsplash placeholders marked with a small "placeholder" tag in the gallery. Drop real photos into `public/images/` and update the `image`/`src` fields.
7. **Room copy** — `data/rooms.js`. Rooms are named Neem, Tamarind, Jamun, Amla; tags (garden-facing, pool-side, upper floor) are guesses — correct them.
8. **Journal covers** — `data/posts.js`; 5 of 6 are Unsplash placeholders.
9. **Enquiry email (optional)** — set `SMTP_USER`, `SMTP_PASS` (Gmail App Password) and `ENQUIRY_TO` in Vercel env vars. Without them the form falls back to opening WhatsApp with the enquiry pre-filled.

## Pages

| Route | Content |
|---|---|
| `/` | Hero, intro, essentials strip, rooms, pool & lawn, experiences, who it's for, rates, location, FAQ, CTA |
| `/stay` | 4 rooms, in-room list, rates (room-wise / whole house), inclusions, house notes |
| `/amenities` | Pool, lawn, living & dining, farm kitchen |
| `/experiences` | 12 experiences |
| `/about` | Story, "why social", sustainability pillars |
| `/gallery` | Filterable masonry gallery with lightbox |
| `/location` | Drive times, embedded map, route and tips |
| `/blog`, `/blog/[slug]` | Journal — 6 posts in `data/posts.js`; add a post by appending an object (no other file changes) |
| `/contact` | Channels, enquiry form (email → WhatsApp fallback), full FAQ |

## Structure

- `data/` — all editable content (site config, rooms, amenities, experiences, FAQs, gallery, schema).
- `components/` — Navbar, Hero, RoomCard, PricingCards, GalleryGrid, EnquiryForm, FAQ, CTABand, etc.
- `app/api/enquiry/route.js` — nodemailer endpoint for the form.
- `archive/` — the June 2026 Griha Pravesh invitation site and the earlier draft, kept for reference (not deployed).

## Theme

Brick/earth `#7A6140` (from the logo) · Terracotta `#A9553A` · Leaf `#4F6A3D` · Clay `#C8804F` · Cream `#F7F1E6` · Sand `#EADCC6` · Ink `#1E1A16` · Forest `#2E4A3A` · Moss `#6F7D4E` · Brass `#C99A4B` — drawn from the house's brick, laterite soil and evening light. Fonts: Fraunces (display) + Outfit (body) via Google Fonts.

## Logo

`public/images/logo.png` (dark text), `logo-light.png` (cream text, for dark backgrounds), `logo-mark.png` (arches + leaf only). Favicons: `app/icon.png`, `app/apple-icon.png`. Used by `components/Logo.jsx`.

## Deploy

Vercel: root of this repo, `npm run build`. Set the env vars above, then submit `/sitemap.xml` in Search Console. Google Analytics ID is in `data/site.js` (`gaId`).
