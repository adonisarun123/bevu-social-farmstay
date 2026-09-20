"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { sql, toDateStr, nightsBetween, fmtDate } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { checkAvailability, newRef, validateStay } from "@/lib/bookings";
import { getRates, estimateAmount } from "@/lib/rates";
import { sendMail, adminEmail } from "@/lib/mail";
import { site } from "@/data/site";


export async function requestBookingAction(prev, formData) {
  const user = await requireUser();
  const kind = String(formData.get("kind") || "room");
  const roomSlugs = kind === "house" ? [] : formData.getAll("rooms").map(String);
  const checkIn = String(formData.get("check_in") || "");
  const checkOut = String(formData.get("check_out") || "");
  const adults = Number(formData.get("adults") || 0);
  const children = Number(formData.get("children") || 0);
  const pets = Number(formData.get("pets") || 0);
  const notes = String(formData.get("notes") || "").trim().slice(0, 2000);
  const phone = String(formData.get("phone") || "").trim();

  const err = validateStay({ kind, roomSlugs, checkIn, checkOut, adults });
  if (err) return { error: err };
  if (!phone) return { error: "We need a phone number to confirm on WhatsApp." };

  const avail = await checkAvailability({ kind, roomSlugs, checkIn, checkOut });
  if (!avail.ok) return { error: "Those dates are no longer available. Pick different dates or rooms." };

  const rates = await getRates();
  const amount = estimateAmount(rates, kind, checkIn, checkOut, roomSlugs.length || 1);
  const ref = newRef();
  await sql`UPDATE users SET phone = COALESCE(NULLIF(${phone}, ''), phone) WHERE id = ${user.id}`;
  const rows = await sql`
    INSERT INTO bookings (ref, user_id, guest_name, guest_email, guest_phone, kind, room_slugs, check_in, check_out, adults, children, pets, guest_notes, amount, source)
    VALUES (${ref}, ${user.id}, ${user.name}, ${user.email}, ${phone}, ${kind}, ${roomSlugs}, ${checkIn}, ${checkOut}, ${adults}, ${children}, ${pets}, ${notes || null}, ${amount}, 'web')
    RETURNING id`;
  const id = rows[0].id;
  await sql`INSERT INTO booking_events (booking_id, actor_id, action) VALUES (${id}, ${user.id}, 'requested')`;

  const summary = `${ref} · ${kind === "house" ? "Whole house" : roomSlugs.join(", ")} · ${fmtDate(checkIn)} → ${fmtDate(checkOut)} · ${adults} adults, ${children} children${pets ? `, ${pets} pets` : ""}`;
  await sendMail({ to: adminEmail(), subject: `New booking request ${ref} — ${user.name}`, text: `${summary}\nPhone: ${phone}\nEmail: ${user.email}\nNotes: ${notes || "-"}\n\nReview: ${site.url}/admin/bookings/${id}` });
  await sendMail({ to: user.email, subject: `We've received your request ${ref} — ${site.name}`, text: `Hi ${user.name},\n\nThanks — we've received your booking request:\n${summary}\n\nWe'll confirm availability on WhatsApp shortly and hold the booking on a part advance. You can track it at ${site.url}/account.\n\n${site.name}` });

  revalidatePath("/account");
  revalidatePath("/admin");
  redirect(`/account/bookings/${id}?new=1`);
}

export async function cancelMyBookingAction(formData) {
  const user = await requireUser();
  const id = String(formData.get("id"));
  const rows = await sql`SELECT id, status, ref, check_in FROM bookings WHERE id = ${id}::uuid AND user_id = ${user.id}`;
  const b = rows[0];
  if (!b || !["requested", "confirmed"].includes(b.status)) return;
  await sql`UPDATE bookings SET status = 'cancelled', updated_at = now() WHERE id = ${id}::uuid`;
  await sql`INSERT INTO booking_events (booking_id, actor_id, action, note) VALUES (${id}::uuid, ${user.id}, 'cancelled', 'Cancelled by guest')`;
  await sendMail({ to: adminEmail(), subject: `Booking ${b.ref} cancelled by guest`, text: `${user.name} cancelled ${b.ref} (check-in ${fmtDate(b.check_in)}).` });
  revalidatePath("/account");
  revalidatePath(`/account/bookings/${id}`);
  revalidatePath("/admin");
}
