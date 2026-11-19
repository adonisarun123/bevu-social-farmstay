// Guest reviews. EMPTY ON PURPOSE — add only real reviews from real guests, word for word.
//
// Why this file is strict:
//   • Google's review-snippet rules ban fake, edited-to-flatter and undisclosed incentivised reviews in
//     markup, and a manual action removes rich results for the whole site.
//   • Stars will NOT appear under bevusocialfarmstay.com in Google for these anyway: reviews of a
//     business on that business's own site are "self-serving" and ineligible. The stars that count are
//     on the Google Business Profile, Airbnb and Booking.com. This file is for on-page trust and for
//     AI assistants, which do read it.
//
// Shape: { name: "Meera S.", date: "2026-12-06", rating: 5, text: "…", source: "Google", url: "https://…" }
//   name   — first name + initial is enough; ask the guest before publishing
//   rating — the whole-number star rating the guest actually gave (1–5)
//   source — where it was originally posted: "Google", "Airbnb", "Booking.com", "WhatsApp" …
//   url    — link to the original, when it is public
//
// Once this array has entries, <Reviews /> appears on the home page and on the landing pages, and emits
// Review + AggregateRating JSON-LD computed from these entries (never typed in by hand).
export const reviews = [];

export function ratingSummary(list = reviews) {
  const rated = list.filter((r) => Number(r.rating) >= 1 && Number(r.rating) <= 5);
  if (!rated.length) return null;
  const avg = rated.reduce((n, r) => n + Number(r.rating), 0) / rated.length;
  return { count: rated.length, value: Math.round(avg * 10) / 10 };
}
