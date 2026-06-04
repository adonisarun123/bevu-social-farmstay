# Bevu Social Farmstay — Griha Pravesh Invitation

The default site: an elegant dusk-and-gold house warming invitation for 20th June at SF 3, built with Next.js 14, Tailwind CSS, and Framer Motion. Design ported from the reference HTML (Fraunces / Marcellus / Outfit typography, dark dusk-blue theme, gold accents, film-grain texture).

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Sections

Hero (house photo, slow zoom, tree emblem) → Invitation copy + date card → The Day's Rhythm timeline (Pooja 8 AM, Sunderkand Path 10 AM, Lunch 12:30 PM, Relax & Explore) → Experience chips → Quote + "With Love, Ankit & Family" → Gift note → Interactive RSVP → Google Maps CTA → Footer logo.

## RSVP

WhatsApp-only: name, accept/decline toggle, guest stepper, optional note → opens WhatsApp to **+91 97173 34639** with the message pre-filled (`components/RSVPForm.jsx`).

## Assets

- `public/images/hero.jpg` — house photo (extracted from reference)
- `public/images/emblem.svg` — neem tree badge (hero)
- `public/images/footer-logo.svg` — full wordmark logo (footer)
- `app/icon.svg` / `app/apple-icon.png` — favicons

## Also in This Repo

`farmstay-website/` — the full Bevu Social Farmstay marketing site (8 pages, SEO/AEO-ready), kept for later. It is not deployed; the invite at the repo root is the live site.
