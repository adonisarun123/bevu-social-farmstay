import { sql, toDateStr, nightsBetween } from "./db";

export const STATUS = {
  requested: { label: "Requested", cls: "bg-brass/20 text-bark" },
  confirmed: { label: "Confirmed", cls: "bg-moss/20 text-forest" },
  declined: { label: "Declined", cls: "bg-ink/10 text-stone" },
  cancelled: { label: "Cancelled", cls: "bg-terracotta/15 text-brick-dark" },
  completed: { label: "Completed", cls: "bg-sand text-bark" },
};

export function newRef() {
  const a = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 6; i++) s += a[Math.floor(Math.random() * a.length)];
  return `BV-${s}`;
}

/**
 * Availability for [checkIn, checkOut) — half-open range in nights.
 * kind 'house' conflicts with ANY confirmed booking or ANY block.
 * kind 'room' conflicts with confirmed bookings touching those rooms (or any house booking) and blocks for those rooms or whole-house blocks.
 * Returns { ok, conflicts:[...], pending:[...] } — pending = overlapping *requested* bookings (soft warning).
 */
export async function checkAvailability({ kind, roomSlugs = [], checkIn, checkOut, excludeBookingId = null }) {
  const ci = toDateStr(checkIn), co = toDateStr(checkOut);
  const slugs = kind === "house" ? [] : roomSlugs;
  const bookings = await sql`
    SELECT id, ref, kind, room_slugs, check_in, check_out, status, guest_name
    FROM bookings
    WHERE status IN ('requested','confirmed')
      AND check_in < ${co}::date AND check_out > ${ci}::date
      AND (${excludeBookingId}::uuid IS NULL OR id <> ${excludeBookingId}::uuid)
      AND (
        ${kind} = 'house'
        OR kind = 'house'
        OR room_slugs && ${slugs}::text[]
      )`;
  const blocks = await sql`
    SELECT id, room_slug, start_date, end_date, reason
    FROM blocked_dates
    WHERE start_date < ${co}::date AND end_date >= ${ci}::date
      AND (${kind} = 'house' OR room_slug IS NULL OR room_slug = ANY(${slugs}::text[]))`;
  const conflicts = [
    ...bookings.filter((b) => b.status === "confirmed").map((b) => ({ type: "booking", ...b })),
    ...blocks.map((b) => ({ type: "block", ...b })),
  ];
  const pending = bookings.filter((b) => b.status === "requested");
  return { ok: conflicts.length === 0, conflicts, pending };
}

// Per-day availability map for a month (for calendars): { 'YYYY-MM-DD': { rooms: {slug: 'free'|'confirmed'|'requested'|'blocked'}, house: same } }
export async function monthAvailability(year, month /* 1-12 */, roomSlugs) {
  const first = `${year}-${String(month).padStart(2, "0")}-01`;
  const last = toDateStr(new Date(year, month, 0));
  const bookings = await sql`SELECT ref, kind, room_slugs, check_in, check_out, status, guest_name, id FROM bookings WHERE status IN ('requested','confirmed') AND check_in <= ${last}::date AND check_out > ${first}::date`;
  const blocks = await sql`SELECT room_slug, start_date, end_date, reason FROM blocked_dates WHERE start_date <= ${last}::date AND end_date >= ${first}::date`;
  const days = {};
  const d = new Date(first + "T00:00:00"), end = new Date(last + "T00:00:00");
  for (; d <= end; d.setDate(d.getDate() + 1)) {
    const key = toDateStr(d);
    const rooms = Object.fromEntries(roomSlugs.map((s) => [s, "free"]));
    let house = "free";
    const items = [];
    for (const b of blocks) {
      if (toDateStr(b.start_date) <= key && toDateStr(b.end_date) >= key) {
        if (b.room_slug) rooms[b.room_slug] = "blocked"; else { roomSlugs.forEach((s) => (rooms[s] = "blocked")); house = "blocked"; }
        items.push({ type: "block", label: b.reason || "Blocked", room: b.room_slug });
      }
    }
    for (const b of bookings) {
      if (toDateStr(b.check_in) <= key && toDateStr(b.check_out) > key) {
        const st = b.status;
        const targets = b.kind === "house" ? roomSlugs : b.room_slugs;
        targets.forEach((s) => { if (rooms[s] !== "blocked" && !(rooms[s] === "confirmed")) rooms[s] = st; });
        if (b.kind === "house" && house === "free") house = st;
        items.push({ type: "booking", id: b.id, ref: b.ref, label: b.guest_name, status: st, kind: b.kind, rooms: targets });
      }
    }
    if (house === "free" && Object.values(rooms).some((v) => v !== "free")) house = "partial";
    days[key] = { rooms, house, items };
  }
  return days;
}

const today = () => toDateStr(new Date());

export const HOUSE_SLEEPS = 12; // beds for 12 (adults + children); larger groups are accepted subject to the owners' discretion
export const HOUSE_MAX_GUESTS = 30; // hard ceiling — beyond this, talk to us first

// Soft warning (not an error) for a valid stay that needs the owners' say-so.
export function stayWarning({ kind, adults = 0, children = 0 }) {
  const total = Number(adults) + Number(children);
  if (kind === "house" && total > HOUSE_SLEEPS) {
    return `Our current bedding is for ${HOUSE_SLEEPS} guests. Your group of ${total} is welcome to request the stay — extra guests are subject to the owners' discretion and we may suggest floor mattresses or a split stay.`;
  }
  return null;
}

export function validateStay({ kind, roomSlugs, checkIn, checkOut, adults, children = 0 }) {
  if (!["room", "house"].includes(kind)) return "Choose a room or the whole house.";
  if (kind === "room" && (!roomSlugs || roomSlugs.length === 0)) return "Pick at least one room.";
  if (!checkIn || !checkOut) return "Pick your dates.";
  if (checkIn < today()) return "Check-in can't be in the past.";
  const n = nightsBetween(checkIn, checkOut);
  if (n < 1) return "Check-out must be after check-in.";
  if (n > 30) return "For stays over 30 nights, please WhatsApp us.";
  if (adults < 1) return "At least one adult.";
  if (kind === "room" && adults > roomSlugs.length * 2 + roomSlugs.length) return `Too many adults for ${roomSlugs.length} room(s) — each sleeps 2 adults + 1 child. Consider the whole house.`;
  if (kind === "house" && Number(adults) + Number(children) > HOUSE_MAX_GUESTS) return `For groups over ${HOUSE_MAX_GUESTS}, please WhatsApp us first.`;
  return null;
}
