import { sql, hasDb, toDateStr } from "./db";
import { pricing as staticPricing } from "@/data/site";

// Current rate rows from DB. A row with valid_from/valid_to applies only in that window ("seasonal");
// rows with NULL dates are the default. Falls back to data/site.js when no DB / no rows.
// Not memoised on purpose: public pages are ISR (revalidate = 300 + revalidatePath on save),
// and dynamic routes must always see the latest rates.
export async function getRates() {
  if (!hasDb()) return null;
  try {
    return await sql`SELECT id, kind, label, weekday::float AS weekday, weekend::float AS weekend, valid_from, valid_to FROM rates ORDER BY valid_from NULLS FIRST, created_at`;
  } catch {
    return null;
  }
}

// Rate applying to a given date (YYYY-MM-DD) for a kind. Seasonal rows win over defaults.
export function rateFor(rows, kind, dateStr) {
  const list = (rows || []).filter((r) => r.kind === kind);
  const seasonal = list.find((r) => r.valid_from && r.valid_to && toDateStr(r.valid_from) <= dateStr && toDateStr(r.valid_to) >= dateStr);
  const base = list.find((r) => !r.valid_from && !r.valid_to);
  const row = seasonal || base;
  if (!row) return null;
  const d = new Date(dateStr + "T00:00:00").getDay();
  const weekend = d === 5 || d === 6; // Fri, Sat nights
  return { amount: weekend ? row.weekend : row.weekday, weekend, label: row.label };
}

// Shape used by PricingCards and room pages: { perRoom:{weekday,weekend}, wholeHouse:{weekday,weekend} }
export async function getPricing() {
  const rows = await getRates();
  const pick = (kind) => (rows || []).find((r) => r.kind === kind && !r.valid_from && !r.valid_to);
  const room = pick("room"), house = pick("house");
  return {
    ...staticPricing,
    perRoom: { ...staticPricing.perRoom, weekday: room?.weekday ?? staticPricing.perRoom.weekday, weekend: room?.weekend ?? staticPricing.perRoom.weekend },
    wholeHouse: { ...staticPricing.wholeHouse, weekday: house?.weekday ?? staticPricing.wholeHouse.weekday, weekend: house?.weekend ?? staticPricing.wholeHouse.weekend },
    fromDb: Boolean(room || house),
  };
}

// Estimate for a stay: sums nightly rate over [checkIn, checkOut). Returns null if no rate exists.
export function estimateAmount(rows, kind, checkIn, checkOut, roomCount = 1) {
  let total = 0;
  const d = new Date(toDateStr(checkIn) + "T00:00:00"), end = new Date(toDateStr(checkOut) + "T00:00:00");
  for (; d < end; d.setDate(d.getDate() + 1)) {
    const r = rateFor(rows, kind, toDateStr(d));
    if (!r) return null;
    total += r.amount * (kind === "room" ? roomCount : 1);
  }
  return total;
}
