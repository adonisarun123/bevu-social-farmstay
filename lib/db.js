// Neon serverless Postgres. Use as a tagged template: sql`SELECT * FROM users WHERE id = ${id}`
import { neon, neonConfig } from "@neondatabase/serverless";

// Local testing only: point the HTTP driver at a mock endpoint (see README → Testing). Never set in production.
if (process.env.NEON_FETCH_ENDPOINT) neonConfig.fetchEndpoint = () => process.env.NEON_FETCH_ENDPOINT;

let _sql;
export function sql(strings, ...values) {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
  if (!_sql) _sql = neon(process.env.DATABASE_URL, { fetchOptions: { cache: "no-store" } }); // never let Next's fetch cache serve stale rows
  return _sql(strings, ...values);
}

export const hasDb = () => Boolean(process.env.DATABASE_URL);

// Format a JS Date / ISO string as YYYY-MM-DD in local terms (no TZ shift).
export function toDateStr(d) {
  if (!d) return null;
  if (typeof d === "string") return d.slice(0, 10);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function fmtDate(d, opts = { day: "numeric", month: "short", year: "numeric" }) {
  const s = toDateStr(d);
  if (!s) return "";
  return new Date(s + "T00:00:00").toLocaleDateString("en-IN", opts);
}

export function nightsBetween(a, b) {
  const A = new Date(toDateStr(a) + "T00:00:00"), B = new Date(toDateStr(b) + "T00:00:00");
  return Math.round((B - A) / 86400000);
}
