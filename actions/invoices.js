"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { sql, fmtDate, nightsBetween, toDateStr } from "@/lib/db";
import { requireStaff, requireAdmin } from "@/lib/auth";
import { getRates, estimateAmount } from "@/lib/rates";
import { sendMail } from "@/lib/mail";
import { getSeller } from "@/lib/invoice-server";
import { computeInvoice, financialYear, suggestStayRate, SAC, TAX_RATES, GSTIN_RE, SELLER_KEYS, rupees } from "@/lib/invoice";
import { rooms } from "@/data/rooms";
import { site } from "@/data/site";

const s = (fd, k) => String(fd.get(k) ?? "").trim();
const token = () => crypto.randomUUID().replace(/-/g, "") + crypto.randomUUID().replace(/-/g, "").slice(0, 8);
const roomNames = Object.fromEntries(rooms.map((r) => [r.slug, r.name]));

function bump(id, bookingId) {
  revalidatePath("/admin/invoices"); if (id) revalidatePath(`/admin/invoices/${id}`);
  if (bookingId) revalidatePath(`/admin/bookings/${bookingId}`);
}

// ── Create a draft (blank, or prefilled from a booking) ─────────────────────
export async function createInvoiceAction(formData) {
  const staff = await requireStaff();
  const bookingId = s(formData, "booking_id");
  let draft = { bill_name: "Guest", items: [{ description: "", sac: SAC.stay, qty: 1, unit: "night", rate: 0, tax_rate: 5 }], amount_paid: 0 };
  if (bookingId) {
    const rows = await sql`SELECT * FROM bookings WHERE id = ${bookingId}::uuid`;
    const b = rows[0];
    if (b) {
      const nights = Math.max(1, nightsBetween(b.check_in, b.check_out));
      const units = b.kind === "house" ? rooms.length : Math.max(1, b.room_slugs.length);
      const est = b.amount == null ? estimateAmount(await getRates(), b.kind, toDateStr(b.check_in), toDateStr(b.check_out), units) : null;
      const amount = Number(b.amount ?? est ?? 0);
      const perNight = Math.round((amount / nights) * 100) / 100;
      const what = b.kind === "house" ? `Whole house (all ${rooms.length} rooms)` : b.room_slugs.map((x) => roomNames[x] || x).join(", ") + (units > 1 ? ` (${units} rooms)` : " room");
      draft = {
        bill_name: b.guest_name, bill_phone: b.guest_phone, bill_email: b.guest_email,
        amount_paid: Number(b.advance_paid || 0),
        items: [{
          description: `Accommodation: ${what}, ${fmtDate(b.check_in)} to ${fmtDate(b.check_out)}, ${b.adults} adults${b.children ? ` + ${b.children} children` : ""}`,
          sac: SAC.stay, qty: nights, unit: "night", rate: perNight,
          // Inclusive pricing: compare the pre-tax value per room per night with the ₹7,500 threshold.
          tax_rate: suggestStayRate(perNight / units / 1.05),
        }],
      };
    }
  }
  const ins = await sql`INSERT INTO invoices (public_token, booking_id, bill_name, bill_phone, bill_email, amount_paid, created_by)
    VALUES (${token()}, ${bookingId || null}, ${draft.bill_name}, ${draft.bill_phone || null}, ${draft.bill_email || null}, ${draft.amount_paid}, ${staff.id}) RETURNING id`;
  const id = ins[0].id;
  for (const [i, it] of draft.items.entries()) {
    await sql`INSERT INTO invoice_items (invoice_id, sort, description, sac, qty, unit, rate, tax_rate) VALUES (${id}, ${i}, ${it.description}, ${it.sac}, ${it.qty}, ${it.unit}, ${it.rate}, ${it.tax_rate})`;
  }
  bump(id, bookingId);
  redirect(`/admin/invoices/${id}`);
}

// ── Save a draft; with intent=issue, also validate, number and freeze it ────
export async function saveInvoiceAction(prev, formData) {
  await requireStaff();
  const id = s(formData, "id");
  const cur = await sql`SELECT status, booking_id FROM invoices WHERE id = ${id}::uuid`;
  if (!cur[0]) return { error: "Invoice not found." };
  if (cur[0].status !== "draft") return { error: "Issued invoices can't be edited. Cancel it and create a new one." };

  let items;
  try { items = JSON.parse(s(formData, "items") || "[]"); } catch { return { error: "Couldn't read the line items." }; }
  items = items
    .map((it) => ({ description: String(it.description || "").trim(), sac: String(it.sac || "").trim(), qty: Number(it.qty), unit: String(it.unit || "").trim(), rate: Number(it.rate), tax_rate: Number(it.tax_rate) }))
    .filter((it) => it.description || it.rate);
  for (const it of items) {
    if (!it.description) return { error: "Every line needs a description." };
    if (!Number.isFinite(it.qty) || it.qty <= 0) return { error: `Quantity must be more than 0 (“${it.description}”).` };
    if (!Number.isFinite(it.rate)) return { error: `Enter a rate for “${it.description}”.` };
    if (!TAX_RATES.includes(it.tax_rate)) return { error: "GST rate must be 0, 5, 12 or 18%." };
  }
  const f = {
    invoice_date: s(formData, "invoice_date") || toDateStr(new Date()),
    bill_name: s(formData, "bill_name"), bill_phone: s(formData, "bill_phone"), bill_email: s(formData, "bill_email").toLowerCase(),
    bill_address: s(formData, "bill_address"), bill_gstin: s(formData, "bill_gstin").toUpperCase(), bill_state: s(formData, "bill_state"),
    tax_inclusive: s(formData, "tax_inclusive") === "1", amount_paid: Number(s(formData, "amount_paid") || 0), notes: s(formData, "notes"),
  };
  if (!f.bill_name) return { error: "Enter who the invoice is billed to." };
  if (f.bill_gstin && !GSTIN_RE.test(f.bill_gstin)) return { error: "The guest's GSTIN doesn't look valid (15 characters, e.g. 29ABCDE1234F1Z5)." };

  await sql`UPDATE invoices SET invoice_date = ${f.invoice_date}, bill_name = ${f.bill_name}, bill_phone = ${f.bill_phone || null}, bill_email = ${f.bill_email || null},
    bill_address = ${f.bill_address || null}, bill_gstin = ${f.bill_gstin || null}, bill_state = ${f.bill_state || null}, tax_inclusive = ${f.tax_inclusive},
    amount_paid = ${Number.isFinite(f.amount_paid) ? f.amount_paid : 0}, notes = ${f.notes || null}, updated_at = now() WHERE id = ${id}::uuid AND status = 'draft'`;
  await sql`DELETE FROM invoice_items WHERE invoice_id = ${id}::uuid`;
  for (const [i, it] of items.entries()) {
    await sql`INSERT INTO invoice_items (invoice_id, sort, description, sac, qty, unit, rate, tax_rate) VALUES (${id}::uuid, ${i}, ${it.description}, ${it.sac || null}, ${it.qty}, ${it.unit || null}, ${it.rate}, ${it.tax_rate})`;
  }

  if (s(formData, "intent") !== "issue") { bump(id, cur[0].booking_id); return { ok: "Draft saved." }; }

  const seller = await getSeller();
  if (!seller.gstin || !GSTIN_RE.test(seller.gstin)) return { error: "Draft saved, but it can't be issued until an admin adds Bevu's GSTIN in Settings → Invoice details." };
  if (!items.length) return { error: "Add at least one line before issuing." };
  const t = computeInvoice(items, f.tax_inclusive);
  if (t.total <= 0) return { error: "The total must be more than ₹0." };
  if (f.invoice_date > toDateStr(new Date())) return { error: "Invoice date can't be in the future." };
  const fy = financialYear(f.invoice_date);
  const prefix = (seller.prefix || "BSF").replace(/[^A-Za-z0-9-]/g, "").slice(0, 6) || "BSF";
  // One statement: bump this FY's counter and stamp the number, so numbers stay sequential with no gaps.
  const done = await sql`
    WITH c AS (INSERT INTO invoice_counters (fy, last) VALUES (${fy}, 1) ON CONFLICT (fy) DO UPDATE SET last = invoice_counters.last + 1 RETURNING last)
    UPDATE invoices SET number = ${`${prefix}/${fy}/`}::text || lpad(c.last::text, 4, '0'), status = 'issued', issued_at = now(), updated_at = now(),
      seller = ${JSON.stringify(seller)}::jsonb, subtotal = ${t.subtotal}, cgst = ${t.cgst}, sgst = ${t.sgst}, round_off = ${t.round_off}, total = ${t.total}
    FROM c WHERE invoices.id = ${id}::uuid AND invoices.status = 'draft' RETURNING invoices.number`;
  bump(id, cur[0].booking_id);
  if (!done[0]) return { error: "This invoice was already issued." };
  redirect(`/admin/invoices/${id}?issued=1`);
}

// ── After issue ─────────────────────────────────────────────────────────────
export async function recordPaymentAction(formData) {
  await requireStaff();
  const id = s(formData, "id"); const paid = Number(s(formData, "amount_paid") || 0);
  if (!Number.isFinite(paid) || paid < 0) return;
  await sql`UPDATE invoices SET amount_paid = ${paid}, updated_at = now() WHERE id = ${id}::uuid AND status <> 'cancelled'`;
  bump(id);
}

export async function cancelInvoiceAction(formData) {
  await requireStaff();
  const id = s(formData, "id"); const reason = s(formData, "reason");
  if (!reason) redirect(`/admin/invoices/${id}?error=reason`);
  const r = await sql`UPDATE invoices SET status = 'cancelled', cancel_reason = ${reason}, cancelled_at = now(), updated_at = now() WHERE id = ${id}::uuid AND status = 'issued' RETURNING booking_id`;
  bump(id, r[0]?.booking_id);
}

export async function deleteDraftAction(formData) {
  await requireStaff();
  const id = s(formData, "id");
  const r = await sql`DELETE FROM invoices WHERE id = ${id}::uuid AND status = 'draft' RETURNING booking_id`;
  bump(null, r[0]?.booking_id);
  redirect(r[0]?.booking_id ? `/admin/bookings/${r[0].booking_id}` : "/admin/invoices");
}

export async function emailInvoiceAction(formData) {
  await requireStaff();
  const id = s(formData, "id");
  const rows = await sql`SELECT number, public_token, bill_name, bill_email, total, amount_paid FROM invoices WHERE id = ${id}::uuid AND status = 'issued'`;
  const inv = rows[0];
  if (!inv?.bill_email) redirect(`/admin/invoices/${id}?error=noemail`);
  const link = `${site.url}/invoice/${inv.public_token}`;
  const due = Number(inv.total) - Number(inv.amount_paid);
  const sent = await sendMail({
    to: inv.bill_email,
    subject: `Invoice ${inv.number} from ${site.name}`,
    text: `Hi ${inv.bill_name},\n\nThank you for staying with us. Your tax invoice ${inv.number} for ${rupees(inv.total)} is here:\n${link}\n\n${due > 0 ? `Balance due: ${rupees(due)}.` : "This invoice is fully paid."}\nYou can print it or save it as a PDF from that page.\n\n${site.name}\n${site.phoneDisplay}`,
  });
  redirect(`/admin/invoices/${id}?${sent ? "emailed=1" : "error=smtp"}`);
}

// ── Settings (admin only) ───────────────────────────────────────────────────
export async function saveInvoiceSettingsAction(prev, formData) {
  await requireAdmin();
  const gstin = s(formData, "gstin").toUpperCase();
  if (gstin && !GSTIN_RE.test(gstin)) return { error: "That GSTIN doesn't look valid (15 characters, e.g. 33ABCDE1234F1Z5)." };
  if (gstin && !gstin.startsWith("33")) return { error: "A Tamil Nadu GSTIN starts with 33. Check the number." };
  for (const k of SELLER_KEYS) {
    let v = k === "gstin" ? gstin : s(formData, k);
    if (k === "prefix") v = v.replace(/[^A-Za-z0-9-]/g, "").slice(0, 6).toUpperCase();
    await sql`INSERT INTO settings (key, value, updated_at) VALUES (${"invoice_" + k}, ${v}, now()) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`;
  }
  revalidatePath("/admin/settings");
  return { ok: "Invoice details saved. They apply to invoices issued from now on; already-issued invoices keep the details they were issued with." };
}
