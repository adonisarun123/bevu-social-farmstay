// Pure invoice helpers — safe on server and client (no DB imports).

export const TAX_RATES = [0, 5, 12, 18];
export const SAC = { stay: "996311", food: "996331", other: "999799" }; // accommodation, F&B in hotel, other services
export const UNITS = ["night", "room-night", "person", "plate", "item", "event", "hour", "nos"];

// GST on accommodation (from 22 Sep 2025, per secondary sources — confirm with your CA):
// value per unit per night ≤ ₹7,500 → 5% (no ITC); above → 18%.
export const STAY_THRESHOLD = 7500;
export const suggestStayRate = (perUnitPerNight) => (Number(perUnitPerNight) > STAY_THRESHOLD ? 18 : 5);

const r2 = (n) => Math.round((Number(n) + Number.EPSILON) * 100) / 100;

// items: [{ qty, rate, tax_rate }]. When inclusive, `rate` already includes GST.
// Returns per-line taxable values, a per-rate GST summary and grand totals (CGST = SGST = half each).
export function computeInvoice(items, inclusive) {
  const lines = (items || []).map((it) => {
    const gross = r2(Number(it.qty || 0) * Number(it.rate || 0));
    const t = Number(it.tax_rate || 0);
    const taxable = inclusive ? r2(gross / (1 + t / 100)) : gross;
    return { ...it, gross, taxable, tax_rate: t };
  });
  const byRate = {};
  for (const l of lines) {
    const k = l.tax_rate;
    byRate[k] = byRate[k] || { rate: k, taxable: 0 };
    byRate[k].taxable = r2(byRate[k].taxable + l.taxable);
  }
  const slabs = Object.values(byRate).sort((a, b) => a.rate - b.rate).map((s) => {
    const half = r2((s.taxable * s.rate) / 200);
    return { ...s, cgst: half, sgst: half };
  });
  const subtotal = r2(slabs.reduce((a, s) => a + s.taxable, 0));
  const cgst = r2(slabs.reduce((a, s) => a + s.cgst, 0));
  const sgst = r2(slabs.reduce((a, s) => a + s.sgst, 0));
  const exact = r2(subtotal + cgst + sgst);
  const total = Math.round(exact);
  return { lines, slabs, subtotal, cgst, sgst, round_off: r2(total - exact), total };
}

// Indian financial year label for a date string: 2026-10-26 → "2026-27"
export function financialYear(dateStr) {
  const d = new Date(String(dateStr).slice(0, 10) + "T00:00:00");
  const y = d.getMonth() >= 3 ? d.getFullYear() : d.getFullYear() - 1;
  return `${y}-${String((y + 1) % 100).padStart(2, "0")}`;
}
// GST rule 46: ≤16 chars, unique per FY. "BSF/2026-27/0001" is exactly 16.
export const formatInvoiceNumber = (prefix, fy, n) => `${prefix}/${fy}/${String(n).padStart(4, "0")}`;

export const GSTIN_RE = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;

const inr = (n) => Number(n || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const rupees = (n) => `₹${inr(n)}`;

// 125430 → "One Lakh Twenty-Five Thousand Four Hundred Thirty"
const ONES = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
function twoDigits(n) { return n < 20 ? ONES[n] : TENS[Math.floor(n / 10)] + (n % 10 ? "-" + ONES[n % 10] : ""); }
function threeDigits(n) { const h = Math.floor(n / 100), r = n % 100; return [h ? ONES[h] + " Hundred" : "", r ? twoDigits(r) : ""].filter(Boolean).join(" "); }
export function amountInWords(amount) {
  let n = Math.round(Math.abs(Number(amount) || 0));
  if (n === 0) return "Zero Rupees Only";
  const parts = [];
  const crore = Math.floor(n / 1e7); n %= 1e7;
  const lakh = Math.floor(n / 1e5); n %= 1e5;
  const thousand = Math.floor(n / 1e3); n %= 1e3;
  if (crore) parts.push((crore > 99 ? threeDigits(crore) : twoDigits(crore)) + " Crore");
  if (lakh) parts.push(twoDigits(lakh) + " Lakh");
  if (thousand) parts.push(twoDigits(thousand) + " Thousand");
  if (n) parts.push(threeDigits(n));
  return "Rupees " + parts.join(" ") + " Only";
}

// Seller defaults; overridden by settings rows prefixed "invoice_".
export const SELLER_DEFAULTS = {
  legal_name: "Bevu Social Farmstay",
  trade_name: "Bevu Social Farmstay",
  gstin: "",
  address: "Plot 59, SF3 (Divine Groves), Shoolagiri Road, Seekanapalli Village, Post Berigai, Hosur, Tamil Nadu 635105",
  state: "Tamil Nadu",
  state_code: "33",
  phone: "+91 77952 07779",
  email: "bevusocialfarmstay@gmail.com",
  prefix: "BSF",
  bank: "",
  terms: "Check-in 1 PM, check-out 11 AM. This is a computer-generated invoice.",
};
export const SELLER_KEYS = Object.keys(SELLER_DEFAULTS);
