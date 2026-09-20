import { NextResponse } from "next/server";
import { checkAvailability, validateStay, stayWarning } from "@/lib/bookings";
import { getRates, estimateAmount } from "@/lib/rates";
import { hasDb, nightsBetween } from "@/lib/db";

export const dynamic = "force-dynamic";

// GET /api/availability?kind=room&rooms=neem,jamun&check_in=2026-10-03&check_out=2026-10-05&adults=2
export async function GET(req) {
  if (!hasDb()) return NextResponse.json({ ok: false, error: "Booking system not configured" }, { status: 503 });
  const p = req.nextUrl.searchParams;
  const kind = p.get("kind") || "room";
  const roomSlugs = (p.get("rooms") || "").split(",").filter(Boolean);
  const checkIn = p.get("check_in"), checkOut = p.get("check_out");
  const adults = Number(p.get("adults") || 1);
  const children = Number(p.get("children") || 0);
  const err = validateStay({ kind, roomSlugs, checkIn, checkOut, adults, children });
  if (err) return NextResponse.json({ ok: false, error: err }, { status: 400 });
  const avail = await checkAvailability({ kind, roomSlugs, checkIn, checkOut });
  const rates = await getRates();
  const amount = estimateAmount(rates, kind, checkIn, checkOut, roomSlugs.length || 1);
  return NextResponse.json({
    ok: avail.ok,
    nights: nightsBetween(checkIn, checkOut),
    amount,
    warning: stayWarning({ kind, adults, children }),
    pending: avail.pending.length,
    conflicts: avail.conflicts.map((c) => (c.type === "block" ? { type: "block", room: c.room_slug } : { type: "booking", rooms: c.kind === "house" ? "all" : c.room_slugs })),
  });
}
