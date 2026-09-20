import { NextResponse } from "next/server";
import { sql, hasDb } from "@/lib/db";
import { notifyAdmins } from "@/lib/notify";

export const runtime = "nodejs";

export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }
  if (body?.website) return NextResponse.json({ ok: true }); // honeypot: pretend success
  const { name = "", phone = "", checkin = "", checkout = "", adults = "", kids = "", type = "", message = "" } = body || {};
  if (!name.trim() || !phone.trim()) return NextResponse.json({ ok: false, error: "missing-fields" }, { status: 400 });

  const text =
    `New enquiry — Bevu Social Farmstay\n\n` +
    `Name: ${name}\nPhone: ${phone}\nCheck-in: ${checkin || "flexible"}\nCheck-out: ${checkout || "flexible"}\n` +
    `Guests: ${adults} adults, ${kids} children\nBooking: ${type === "house" ? "Whole house" : "Room(s)"}\n\n${message}`;

  let stored = false;
  if (hasDb()) {
    try {
      await sql`INSERT INTO enquiries (name, phone, email, check_in, check_out, adults, children, kind, message)
        VALUES (${name}, ${phone}, ${body.email || null}, ${checkin || null}, ${checkout || null}, ${Number(adults) || null}, ${Number(kids) || 0}, ${type || null}, ${message || null})`;
      stored = true;
    } catch (e) { console.error("enquiry insert failed", e?.message); }
  }
  const [mailed] = await notifyAdmins({ subject: `Enquiry: ${name} · ${checkin || "flexible"} · ${type === "house" ? "whole house" : "room"}`, text });
  if (!stored && !mailed) return NextResponse.json({ ok: false, error: "not-configured" }, { status: 503 });
  return NextResponse.json({ ok: true });
}
