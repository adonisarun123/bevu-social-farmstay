"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { sql, toDateStr, fmtDate } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { checkAvailability, newRef, validateStay } from "@/lib/bookings";
import { getRates, estimateAmount } from "@/lib/rates";
import { sendMail } from "@/lib/mail";
import { notifyAdmins } from "@/lib/notify";
import { site } from "@/data/site";

const s = (fd, k) => String(fd.get(k) ?? "").trim();
const n = (fd, k, d = 0) => { const v = Number(fd.get(k)); return Number.isFinite(v) ? v : d; };

function bumpBookingPaths(id) {
  revalidatePath("/admin"); revalidatePath("/admin/bookings"); revalidatePath(`/admin/bookings/${id}`);
  revalidatePath("/account"); revalidatePath(`/account/bookings/${id}`); revalidatePath("/admin/guests");
}

// ── Bookings ────────────────────────────────────────────────────────────────
export async function setBookingStatusAction(formData) {
  const admin = await requireAdmin();
  const id = s(formData, "id"), status = s(formData, "status"), note = s(formData, "note");
  if (!["requested", "confirmed", "declined", "cancelled", "completed"].includes(status)) return;
  const rows = await sql`SELECT * FROM bookings WHERE id = ${id}::uuid`;
  const b = rows[0]; if (!b) return;
  if (status === "confirmed") {
    const avail = await checkAvailability({ kind: b.kind, roomSlugs: b.room_slugs, checkIn: b.check_in, checkOut: b.check_out, excludeBookingId: b.id });
    if (!avail.ok) { redirect(`/admin/bookings/${id}?error=conflict`); }
  }
  await sql`UPDATE bookings SET status = ${status}, updated_at = now() WHERE id = ${id}::uuid`;
  await sql`INSERT INTO booking_events (booking_id, actor_id, action, note) VALUES (${id}::uuid, ${admin.id}, ${status}, ${note || null})`;
  if (b.guest_email && (status === "confirmed" || status === "declined")) {
    const when = `${fmtDate(b.check_in)} → ${fmtDate(b.check_out)}`;
    await sendMail({
      to: b.guest_email,
      subject: status === "confirmed" ? `Confirmed: ${b.ref} at ${site.name}` : `About your request ${b.ref} — ${site.name}`,
      text: status === "confirmed"
        ? `Hi ${b.guest_name},\n\nYour stay is confirmed: ${b.kind === "house" ? "the whole house" : b.room_slugs.join(", ")}, ${when}.${b.amount ? ` Total ₹${Number(b.amount).toLocaleString("en-IN")}.` : ""}\n${note ? `\n${note}\n` : ""}\nCheck-in ${site.checkIn}, check-out ${site.checkOut}. We'll send the location pin on WhatsApp.\n\n${site.name}`
        : `Hi ${b.guest_name},\n\nUnfortunately we can't host you on ${when}.${note ? `\n\n${note}` : ""}\n\nWe'd love to find another date — reply to this email or WhatsApp us.\n\n${site.name}`,
    });
  }
  bumpBookingPaths(id);
}

export async function updateBookingAction(formData) {
  const admin = await requireAdmin();
  const id = s(formData, "id");
  const amount = formData.get("amount") === "" ? null : n(formData, "amount", null);
  const advance = n(formData, "advance_paid", 0);
  const adminNotes = s(formData, "admin_notes");
  await sql`UPDATE bookings SET amount = ${amount}, advance_paid = ${advance}, admin_notes = ${adminNotes || null}, updated_at = now() WHERE id = ${id}::uuid`;
  await sql`INSERT INTO booking_events (booking_id, actor_id, action, note) VALUES (${id}::uuid, ${admin.id}, 'updated', 'Amount/notes updated')`;
  bumpBookingPaths(id);
}

export async function createManualBookingAction(prev, formData) {
  const admin = await requireAdmin();
  const kind = s(formData, "kind") || "room";
  const roomSlugs = kind === "house" ? [] : formData.getAll("rooms").map(String);
  const checkIn = s(formData, "check_in"), checkOut = s(formData, "check_out");
  const adults = n(formData, "adults", 2), children = n(formData, "children", 0), pets = n(formData, "pets", 0);
  const guestName = s(formData, "guest_name"), guestPhone = s(formData, "guest_phone"), guestEmail = s(formData, "guest_email").toLowerCase();
  const status = s(formData, "status") || "confirmed";
  const notes = s(formData, "admin_notes");
  if (!guestName) return { error: "Guest name is required." };
  const err = validateStay({ kind, roomSlugs, checkIn, checkOut, adults });
  if (err && !err.startsWith("Check-in can't be in the past")) return { error: err };
  if (status === "confirmed") {
    const avail = await checkAvailability({ kind, roomSlugs, checkIn, checkOut });
    if (!avail.ok && !formData.get("force")) return { error: "Those dates clash with a confirmed booking or a block. Tick 'override' to add anyway.", conflict: true };
  }
  // Link to an existing user by email if one exists.
  const u = guestEmail ? await sql`SELECT id FROM users WHERE email = ${guestEmail}` : [];
  const rates = await getRates();
  const amountIn = formData.get("amount");
  const amount = amountIn ? Number(amountIn) : estimateAmount(rates, kind, checkIn, checkOut, roomSlugs.length || 1);
  const ref = newRef();
  const rows = await sql`
    INSERT INTO bookings (ref, user_id, guest_name, guest_email, guest_phone, kind, room_slugs, check_in, check_out, adults, children, pets, status, source, admin_notes, amount)
    VALUES (${ref}, ${u[0]?.id || null}, ${guestName}, ${guestEmail || null}, ${guestPhone || null}, ${kind}, ${roomSlugs}, ${checkIn}, ${checkOut}, ${adults}, ${children}, ${pets}, ${status}, 'manual', ${notes || null}, ${amount})
    RETURNING id`;
  await sql`INSERT INTO booking_events (booking_id, actor_id, action, note) VALUES (${rows[0].id}, ${admin.id}, ${status}, 'Added manually')`;
  const summary = `${ref} · ${kind === "house" ? "Whole house" : roomSlugs.join(", ")} · ${fmtDate(checkIn)} → ${fmtDate(checkOut)} · ${adults} adults, ${children} children${pets ? `, ${pets} pets` : ""} · ${status}`;
  await notifyAdmins({
    subject: `Booking ${ref} added by ${admin.name} — ${guestName}`,
    text: `${summary}\nGuest: ${guestName} · ${guestPhone || "-"} · ${guestEmail || "-"}\n\n${site.url}/admin/bookings/${rows[0].id}`,
    whatsapp: `🌿 Booking ${ref} added by ${admin.name}\n${guestName} · ${guestPhone || "-"}\n${summary}\n${site.url}/admin/bookings/${rows[0].id}`,
  });
  bumpBookingPaths(rows[0].id);
  redirect(`/admin/bookings/${rows[0].id}`);
}

// ── Blocks ──────────────────────────────────────────────────────────────────
export async function addBlockAction(prev, formData) {
  await requireAdmin();
  const room = s(formData, "room_slug"); const start = s(formData, "start_date"); const end = s(formData, "end_date"); const reason = s(formData, "reason");
  if (!start || !end || end < start) return { error: "Pick a valid date range." };
  await sql`INSERT INTO blocked_dates (room_slug, start_date, end_date, reason) VALUES (${room || null}, ${start}, ${end}, ${reason || null})`;
  revalidatePath("/admin/availability"); revalidatePath("/admin/bookings");
  return { ok: "Block added." };
}
export async function deleteBlockAction(formData) {
  await requireAdmin();
  await sql`DELETE FROM blocked_dates WHERE id = ${s(formData, "id")}::uuid`;
  revalidatePath("/admin/availability"); revalidatePath("/admin/bookings");
}

// ── Rates ───────────────────────────────────────────────────────────────────
export async function saveRateAction(prev, formData) {
  await requireAdmin();
  const id = s(formData, "id"); const kind = s(formData, "kind"); const label = s(formData, "label") || "Standard";
  const weekday = n(formData, "weekday", 0), weekend = n(formData, "weekend", 0);
  const from = s(formData, "valid_from") || null, to = s(formData, "valid_to") || null;
  if (!["room", "house"].includes(kind)) return { error: "Kind must be room or house." };
  if (weekday <= 0 || weekend <= 0) return { error: "Enter both weekday and weekend rates." };
  if ((from && !to) || (!from && to)) return { error: "Seasonal rates need both a start and an end date." };
  if (id) await sql`UPDATE rates SET kind=${kind}, label=${label}, weekday=${weekday}, weekend=${weekend}, valid_from=${from}, valid_to=${to} WHERE id = ${id}::uuid`;
  else {
    if (!from) await sql`DELETE FROM rates WHERE kind = ${kind} AND valid_from IS NULL`; // one default per kind
    await sql`INSERT INTO rates (kind, label, weekday, weekend, valid_from, valid_to) VALUES (${kind}, ${label}, ${weekday}, ${weekend}, ${from}, ${to})`;
  }
  revalidatePath("/admin/rates"); revalidatePath("/"); revalidatePath("/stay"); revalidatePath("/stay/[slug]", "page"); revalidatePath("/llms.txt");
  return { ok: "Rate saved. Public pages update within 5 minutes." };
}
export async function deleteRateAction(formData) {
  await requireAdmin();
  await sql`DELETE FROM rates WHERE id = ${s(formData, "id")}::uuid`;
  revalidatePath("/admin/rates"); revalidatePath("/"); revalidatePath("/stay"); revalidatePath("/stay/[slug]", "page"); revalidatePath("/llms.txt");
}

// ── Guests ──────────────────────────────────────────────────────────────────
export async function updateGuestAction(formData) {
  await requireAdmin();
  const id = s(formData, "id"); const notes = s(formData, "admin_notes"); const role = s(formData, "role");
  await sql`UPDATE users SET admin_notes = ${notes || null} WHERE id = ${id}::uuid`;
  if (["guest", "admin"].includes(role)) {
    const admins = await sql`SELECT count(*)::int AS n FROM users WHERE role = 'admin' AND id <> ${id}::uuid`;
    if (role === "guest" && admins[0].n === 0) return; // never remove the last admin
    await sql`UPDATE users SET role = ${role} WHERE id = ${id}::uuid`;
  }
  revalidatePath(`/admin/guests/${id}`); revalidatePath("/admin/guests");
}

// ── Enquiries ───────────────────────────────────────────────────────────────
export async function updateEnquiryAction(formData) {
  await requireAdmin();
  const id = s(formData, "id"); const status = s(formData, "status"); const notes = s(formData, "admin_notes");
  if (!["new", "replied", "closed"].includes(status)) return;
  await sql`UPDATE enquiries SET status = ${status}, admin_notes = ${notes || null} WHERE id = ${id}::uuid`;
  revalidatePath("/admin/enquiries"); revalidatePath("/admin");
}

// ── Edit a booking's stay (dates, rooms, pax) ───────────────────────────────
export async function editBookingStayAction(prev, formData) {
  const admin = await requireAdmin();
  const id = s(formData, "id");
  const kind = s(formData, "kind") || "room";
  const roomSlugs = kind === "house" ? [] : formData.getAll("rooms").map(String);
  const checkIn = s(formData, "check_in"), checkOut = s(formData, "check_out");
  const adults = n(formData, "adults", 2), children = n(formData, "children", 0), pets = n(formData, "pets", 0);
  const rows = await sql`SELECT * FROM bookings WHERE id = ${id}::uuid`;
  const b = rows[0]; if (!b) return { error: "Booking not found." };
  const err = validateStay({ kind, roomSlugs, checkIn, checkOut, adults });
  if (err && !err.startsWith("Check-in can't be in the past")) return { error: err };
  if (["requested", "confirmed"].includes(b.status)) {
    const avail = await checkAvailability({ kind, roomSlugs, checkIn, checkOut, excludeBookingId: b.id });
    if (!avail.ok && !formData.get("force")) return { error: "New dates clash with a confirmed booking or a block. Tick 'override' to save anyway.", conflict: true };
  }
  const rates = await getRates();
  const keepAmount = formData.get("keep_amount");
  const amount = keepAmount ? b.amount : estimateAmount(rates, kind, checkIn, checkOut, roomSlugs.length || 1);
  await sql`UPDATE bookings SET kind=${kind}, room_slugs=${roomSlugs}, check_in=${checkIn}, check_out=${checkOut}, adults=${adults}, children=${children}, pets=${pets}, amount=${amount}, updated_at=now() WHERE id = ${id}::uuid`;
  const summary = `${kind === "house" ? "Whole house" : roomSlugs.join(", ")} · ${fmtDate(checkIn)} → ${fmtDate(checkOut)} · ${adults}A ${children}C${pets ? ` ${pets} dogs` : ""}`;
  await sql`INSERT INTO booking_events (booking_id, actor_id, action, note) VALUES (${id}::uuid, ${admin.id}, 'updated', ${"Stay changed to: " + summary})`;
  if (b.guest_email && b.status === "confirmed") await sendMail({ to: b.guest_email, subject: `Your booking ${b.ref} has been updated — ${site.name}`, text: `Hi ${b.guest_name},\n\nWe've updated your booking:\n${summary}${amount ? `\nEstimated total ₹${Number(amount).toLocaleString("en-IN")}` : ""}\n\nReply on WhatsApp if anything looks wrong.\n\n${site.name}` });
  bumpBookingPaths(id);
  return { ok: "Saved." };
}

// ── Settings ────────────────────────────────────────────────────────────────
export async function rotateCalendarTokenAction() {
  await requireAdmin();
  const token = Array.from(crypto.getRandomValues(new Uint8Array(18)), (b) => b.toString(16).padStart(2, "0")).join("");
  await sql`INSERT INTO settings (key, value, updated_at) VALUES ('calendar_token', ${token}, now()) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`;
  revalidatePath("/admin/settings");
}
