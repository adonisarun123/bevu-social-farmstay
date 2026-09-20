import { sql, toDateStr } from "@/lib/db";
import { site } from "@/data/site";
import { rooms } from "@/data/rooms";

export const dynamic = "force-dynamic";
const names = Object.fromEntries(rooms.map((r) => [r.slug, r.name]));
const ics = (s) => String(s || "").replace(/\\/g, "\\\\").replace(/;/g, "\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
const ymd = (d) => toDateStr(d).replace(/-/g, "");

// GET /api/calendar?token=… — iCalendar feed of confirmed bookings and blocks. Subscribe to it in Google/Apple Calendar.
export async function GET(req) {
  const token = req.nextUrl.searchParams.get("token") || "";
  const t = await sql`SELECT value FROM settings WHERE key = 'calendar_token'`;
  if (!token || token !== t[0]?.value) return new Response("Forbidden", { status: 403 });
  const [bookings, blocks] = await Promise.all([
    sql`SELECT * FROM bookings WHERE status IN ('confirmed','requested') AND check_out >= current_date - 30 ORDER BY check_in`,
    sql`SELECT * FROM blocked_dates WHERE end_date >= current_date - 30 ORDER BY start_date`,
  ]);
  const stamp = new Date().toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";
  const L = ["BEGIN:VCALENDAR", "VERSION:2.0", `PRODID:-//${ics(site.name)}//Bookings//EN`, "CALSCALE:GREGORIAN", "METHOD:PUBLISH", `X-WR-CALNAME:${ics(site.name)} bookings`, "X-WR-TIMEZONE:Asia/Kolkata"];
  for (const b of bookings) {
    const what = b.kind === "house" ? "Whole house" : b.room_slugs.map((s) => names[s] || s).join(", ");
    L.push("BEGIN:VEVENT", `UID:${b.id}@bevu`, `DTSTAMP:${stamp}`, `DTSTART;VALUE=DATE:${ymd(b.check_in)}`, `DTEND;VALUE=DATE:${ymd(b.check_out)}`,
      `SUMMARY:${ics(`${b.status === "requested" ? "? " : ""}${b.guest_name} — ${what}`)}`,
      `DESCRIPTION:${ics(`${b.ref} · ${b.status} · ${b.adults} adults, ${b.children} children${b.pets ? `, ${b.pets} dogs` : ""}\nPhone: ${b.guest_phone || "-"}\n${b.admin_notes || ""}\n${site.url}/admin/bookings/${b.id}`)}`,
      `URL:${site.url}/admin/bookings/${b.id}`, `STATUS:${b.status === "confirmed" ? "CONFIRMED" : "TENTATIVE"}`, "END:VEVENT");
  }
  for (const x of blocks) {
    const end = new Date(toDateStr(x.end_date) + "T00:00:00"); end.setDate(end.getDate() + 1);
    L.push("BEGIN:VEVENT", `UID:block-${x.id}@bevu`, `DTSTAMP:${stamp}`, `DTSTART;VALUE=DATE:${ymd(x.start_date)}`, `DTEND;VALUE=DATE:${ymd(end)}`, `SUMMARY:${ics(`Blocked — ${x.room_slug ? names[x.room_slug] : "whole property"}${x.reason ? ` (${x.reason})` : ""}`)}`, "TRANSP:TRANSPARENT", "END:VEVENT");
  }
  L.push("END:VCALENDAR");
  return new Response(L.join("\r\n"), { headers: { "Content-Type": "text/calendar; charset=utf-8", "Cache-Control": "private, no-store" } });
}
