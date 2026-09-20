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
| `/stay/[slug]` | One page per room (neem, tamarind, jamun, amla): hero, facts, story, gallery, rate, other rooms, HotelRoom JSON-LD |
| `/stay` | 4 rooms, in-room list, rates (room-wise / whole house), inclusions, house notes |
| `/amenities` | Pool, lawn, living & dining, farm kitchen |
| `/experiences` | 12 experiences |
| `/meetups`, `/meetups/[slug]` | 9 group formats (cyclists, bikers, naturalists, fitness, culinary, astronomy, photographers, writers, wellness) in `data/meetups.js`; each page has schedule, inclusions, FAQ (+FAQPage schema), Service schema |
| `/about` | Story, "why social", sustainability pillars |
| `/gallery` | Filterable masonry gallery with lightbox |
| `/location` | Drive times, embedded map, route and tips |
| `/blog`, `/blog/[slug]` | Journal — 6 posts in `data/posts.js`; add a post by appending an object (no other file changes) |
| `/policies/[slug]` | Booking & cancellation, house rules, privacy, terms — `data/policies.js` (review before go-live) |
| `/forgot-password`, `/reset-password` | Email-based password reset (1-hour token; link logged to server when SMTP is off) |
| `/api/calendar?token=` | iCalendar feed of confirmed bookings + blocks (token in Admin → Settings) |
| `/login`, `/register`, `/account/*` | Guest accounts and booking requests (see Booking backend) |
| `/admin/*` | Admin console (admins only) |
| `/contact` | Channels, enquiry form (email → WhatsApp fallback), full FAQ |

## Structure

- `data/` — all editable content (site config, rooms, amenities, experiences, FAQs, gallery, schema).
- `components/` — Navbar, Hero, RoomCard, PricingCards, GalleryGrid, EnquiryForm, FAQ, CTABand, etc.
- `lib/` — db, auth, availability/booking rules, rates, mail. `actions/` — server actions (auth, guest bookings, admin).
- `app/api/enquiry/route.js` — contact form → `enquiries` table + email.
- `archive/` — the June 2026 Griha Pravesh invitation site and the earlier draft, kept for reference (not deployed).

## Theme

Brick/earth `#7A6140` (from the logo) · Terracotta `#A9553A` · Leaf `#4F6A3D` · Clay `#C8804F` · Cream `#F7F1E6` · Sand `#EADCC6` · Ink `#1E1A16` · Forest `#2E4A3A` · Moss `#6F7D4E` · Brass `#C99A4B` — drawn from the house's brick, laterite soil and evening light. Fonts: Fraunces (display) + Outfit (body) via Google Fonts.

## Logo

`public/images/logo.png` (dark text), `logo-light.png` (cream text, for dark backgrounds), `logo-mark.png` (arches + leaf only). Favicons: `app/icon.png`, `app/apple-icon.png`. Used by `components/Logo.jsx`.

## Booking backend

Guests create an account, see live availability, request a stay; admins confirm/decline, add WhatsApp bookings, block dates, set rates, keep guest notes and work the enquiry inbox.

- **Database:** Neon Postgres, project "Bevu Social Farmstay". Tables: `users`, `rooms`, `bookings`, `booking_events`, `blocked_dates`, `rates`, `enquiries` (schema already applied). Access via `lib/db.js` (`sql` tagged template, `@neondatabase/serverless`).
- **Auth:** Auth.js v5 (`next-auth@beta`), email + password (bcrypt), JWT sessions, roles `guest` | `admin`. `middleware.js` guards `/account/*` (signed in) and `/admin/*` (admin). The **first account ever registered becomes admin**, as does any registration matching `ADMIN_EMAIL`. Admins can promote/demote from `/admin/guests/[id]` (the last admin can't be demoted).
- **Guest:** `/register`, `/login`, `/account` (my stays), `/account/book` (live availability via `/api/availability`, request a room or the whole house), `/account/bookings/[id]` (status, timeline, cancel), `/account/profile`.
- **Admin edits:** `/admin/bookings/[id]` → "Change dates, rooms or guests" re-checks clashes, re-estimates the amount (or keeps it), emails a confirmed guest, and logs the change.
- **Admin:** `/admin` dashboard · `/admin/bookings` (month calendar + filterable list) · `/admin/bookings/[id]` (confirm / decline / complete / cancel, amount, advance, notes, clash check) · `/admin/bookings/new` (manual booking, clash override) · `/admin/availability` (block whole property or a room) · `/admin/rates` (default + seasonal, weekday/weekend) · `/admin/guests` (+ CSV export) · `/admin/enquiries` · `/admin/settings` (calendar feed link, env health).
- **Rules:** a request never blocks dates; only *confirmed* bookings and *blocks* do. Confirming re-checks for clashes. Whole-house bookings block every room; a room booking blocks the whole house. Weekend = Friday and Saturday nights. Amount is estimated from rates at request time; admin can override.
- **Public site reads the DB:** rates on `/`, `/stay`, room pages and `/llms.txt` (5-minute cache, refreshed on save); the contact form writes to `enquiries` and emails you.
- **Email:** best-effort via SMTP env vars — new request → admin; request received / confirmed / declined → guest. Without SMTP everything still works, just no mail.
- **Env:** `DATABASE_URL`, `AUTH_SECRET`, `AUTH_URL` (local only), `ADMIN_EMAIL`, plus the SMTP vars. See `.env.example`. Set them all in Vercel → Environment Variables before deploying.

### Testing the backend locally (no Neon needed)

`scripts/neon-shim.mjs` runs an in-process Postgres (pglite) behind the Neon HTTP protocol, so the real driver and the real SQL run against a throwaway DB. `scripts/schema.sql` mirrors the live Neon schema (keep them in sync). `scripts/e2e.mjs` drives the whole flow in a headless browser (register → rates → block → guest request → admin confirm → clash → cancel; 22 checks).

```bash
npm i -D @electric-sql/pglite@0.2 playwright && npx playwright install chromium
node scripts/neon-shim.mjs scripts/schema.sql &          # port 5555
NEON_FETCH_ENDPOINT=http://127.0.0.1:5555/sql DATABASE_URL=postgresql://u:p@x.neon.tech/db AUTH_SECRET=test AUTH_URL=http://localhost:3111 npm run build && npx next start -p 3111 &
node scripts/e2e.mjs
```

`NEON_FETCH_ENDPOINT` must never be set in production.

## SEO / AEO checklist (built in)

- One `<h1>` per page, titles ≤ 60 chars (`title.template` adds " · Bevu Social Farmstay"), descriptions ≤ 160, canonical + OG/Twitter on every route, `lang="en-IN"`.
- Visible breadcrumbs on every inner page (`components/Breadcrumbs.jsx`) mirrored by `BreadcrumbList` JSON-LD.
- Site-wide JSON-LD `@graph` in `app/layout.jsx`: `Organization` (logo, contactPoint, sameAs) → `LodgingBusiness`+`BedAndBreakfast` (address, geo, rooms, amenities, `makesOffer` once rates are set, petsAllowed) → `WebSite`.
- Per-page JSON-LD (`data/schema.js`): `WebPage`/`AboutPage`/`ContactPage`/`CollectionPage`/`ItemPage`, `FAQPage` (home + contact), `ItemList` (rooms, experiences, facilities), `ImageGallery`, `Place`, `HotelRoom` per room, `Blog` + `BlogPosting` per post, `speakable` on home and posts.
- `/sitemap.xml` (all 19 URLs), `/robots.txt` (AI crawlers explicitly allowed), `/llms.txt` (AEO brief generated from the data files), `/manifest.webmanifest`.
- Security/perf headers in `next.config.mjs` (HSTS, nosniff, frame, referrer, permissions; immutable cache on `/images`).
- Search Console: paste the HTML-tag token into `site.verification.google` in `data/site.js`.
- Audit after edits: `npm run build` then check `.next/server/app/**/*.html` for title/description length and JSON-LD validity (a 20-line Python script does it; see chat history) — or run the URLs through Google's Rich Results Test once live.

## Deploy

Vercel: root of this repo, `npm run build`. Set the env vars above, then submit `/sitemap.xml` in Search Console. Google Analytics ID is in `data/site.js` (`gaId`).
