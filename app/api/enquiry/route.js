import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req) {
  const { SMTP_USER, SMTP_PASS, ENQUIRY_TO } = process.env;
  if (!SMTP_USER || !SMTP_PASS) {
    return NextResponse.json({ ok: false, error: "email-not-configured" }, { status: 503 });
  }
  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }
  const { name = "", phone = "", checkin = "", checkout = "", adults = "", kids = "", type = "", message = "" } = body || {};
  if (!name.trim() || !phone.trim()) return NextResponse.json({ ok: false, error: "missing-fields" }, { status: 400 });

  const text =
    `New enquiry — Bevu Social Farmstay\n\n` +
    `Name: ${name}\nPhone: ${phone}\nCheck-in: ${checkin || "flexible"}\nCheck-out: ${checkout || "flexible"}\n` +
    `Guests: ${adults} adults, ${kids} children\nBooking: ${type === "house" ? "Whole house" : "Room(s)"}\n\n${message}`;

  try {
    const transporter = nodemailer.createTransport({ service: "gmail", auth: { user: SMTP_USER, pass: SMTP_PASS } });
    await transporter.sendMail({
      from: `"Bevu Social Farmstay" <${SMTP_USER}>`,
      to: ENQUIRY_TO || SMTP_USER,
      subject: `Enquiry: ${name} · ${checkin || "flexible"} · ${type === "house" ? "whole house" : "room"}`,
      text,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("enquiry mail failed", err);
    return NextResponse.json({ ok: false, error: "send-failed" }, { status: 500 });
  }
}
