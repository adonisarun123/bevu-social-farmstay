// ─────────────────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH for contact details, pricing and location.
// Everything marked TODO must be filled in before go-live.
// ─────────────────────────────────────────────────────────────────────────────

// Digits only, with country code — used for tel: links, WhatsApp deep links and
// the floating WhatsApp button.
const PHONE_DIGITS = "917795207779";

export const site = {
  name: "Bevu Social Farmstay",
  shortName: "Bevu",
  tagline: "A private farmstay of brick, boulders and open sky — near Bangalore, in Tamil Nadu.",
  description:
    "Bevu Social Farmstay is an eco-conscious, pet-friendly luxury farmstay near Berigai, Hosur — a hand-built brick home with four ensuite rooms, a private swimming pool, open lawns and farm-to-table food, an hour and a bit from Bangalore.",
  url: "https://www.bevusocialfarmstay.com", // TODO: confirm production domain
  phoneDigits: PHONE_DIGITS,
  phoneDisplay: "+91 77952 07779",
  phoneHref: `tel:+${PHONE_DIGITS}`,
  whatsappHref: (text = "Hi Bevu Social Farmstay, I'd like to plan a stay.") =>
    `https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(text)}`,
  email: "bevusocialfarmstay@gmail.com",
  hosts: "Ankit, Priyanka & family",
  gaId: "G-D6WV75F4CD",
  verification: { google: "" }, // TODO: Search Console HTML-tag token (content value only)
  social: {
    instagram: "https://www.instagram.com/bevusocialfarmstay/",
    facebook: "",
    youtube: "",
  },
  location: {
    label: "Plot 59, SF3 (Divine Groves), Shoolagiri Road",
    area: "Seekanapalli Village, Post Berigai, Hosur, Tamil Nadu 635105",
    street: "Plot 59, SF3 (Divine Groves), Shoolagiri Road, Seekanapalli Village, Post Berigai",
    city: "Hosur",
    short: "Krishnagiri district, Tamil Nadu — near Bangalore",
    lat: 12.7754752,
    lng: 77.9884156,
    mapsUrl: "https://maps.app.goo.gl/k3zPnMTPRaQUdeFZ9",
    postalCode: "635105",
    // Approximate — confirm against your own drives. Used on the Location page.
    distances: [
      { from: "Electronic City, Bangalore", km: "~50 km", time: "1 h 15 min" },
      { from: "Hosur", km: "~25 km", time: "40 min" },
      { from: "Koramangala / HSR", km: "~65 km", time: "1 h 45 min" },
      { from: "Kempegowda Int'l Airport", km: "~100 km", time: "2 h 30 min" },
    ],
  },
  checkIn: "1:00 PM",
  checkOut: "11:00 AM",
  capacity: { rooms: 4, adults: 8, withKids: "up to 12 with children" },
};

// Pricing — leave a rate as null to show "on request" instead of a number.
export const pricing = {
  currency: "₹",
  perRoom: { weekday: null, weekend: null, note: "per room per night, breakfast included" }, // TODO e.g. 6500 / 7500
  wholeHouse: { weekday: null, weekend: null, note: "entire farmstay, all 4 rooms, exclusive pool & lawn" }, // TODO
  meals: "Lunch and dinner on request — home-style South Indian and North Indian, priced per person.",
  extraGuest: "Extra mattress for a child or third adult on request.",
};

export const navLinks = [
  { href: "/stay", label: "Stay" },
  { href: "/amenities", label: "Pool & Lawn" },
  { href: "/experiences", label: "Experiences" },
  { href: "/meetups", label: "Meetups" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery", compact: true },
  { href: "/blog", label: "Journal", compact: true },
  { href: "/location", label: "Location", compact: true },
  { href: "/contact", label: "Contact" },
];

export function formatRate(n) {
  if (n == null) return "On request";
  return `${pricing.currency}${Number(n).toLocaleString("en-IN")}`;
}
