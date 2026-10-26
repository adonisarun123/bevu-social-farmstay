import { sql } from "./db";
import { SELLER_DEFAULTS, SELLER_KEYS } from "./invoice";

// Seller details: SELLER_DEFAULTS overridden by settings rows "invoice_<key>".
export async function getSeller() {
  const rows = await sql`SELECT key, value FROM settings WHERE key LIKE 'invoice_%'`;
  const out = { ...SELLER_DEFAULTS };
  for (const r of rows) { const k = r.key.slice(8); if (SELLER_KEYS.includes(k)) out[k] = r.value; }
  return out;
}

export async function loadInvoice(where) {
  if (where.id && !/^[0-9a-f-]{36}$/i.test(where.id)) return null;
  const rows = where.token
    ? await sql`SELECT i.*, b.ref AS booking_ref, b.check_in, b.check_out FROM invoices i LEFT JOIN bookings b ON b.id = i.booking_id WHERE i.public_token = ${where.token}`
    : await sql`SELECT i.*, b.ref AS booking_ref, b.check_in, b.check_out FROM invoices i LEFT JOIN bookings b ON b.id = i.booking_id WHERE i.id = ${where.id}::uuid`;
  const inv = rows[0];
  if (!inv) return null;
  const items = await sql`SELECT description, sac, qty::float AS qty, unit, rate::float AS rate, tax_rate::float AS tax_rate FROM invoice_items WHERE invoice_id = ${inv.id} ORDER BY sort, id`;
  const seller = inv.status === "draft" || !inv.seller ? await getSeller() : inv.seller;
  return { inv, items, seller };
}
