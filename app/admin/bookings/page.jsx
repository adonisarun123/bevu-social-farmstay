import Link from "next/link";
import { sql, fmtDate } from "@/lib/db";
import { monthAvailability } from "@/lib/bookings";
import { rooms } from "@/data/rooms";
import Calendar from "@/components/admin/Calendar";
import { StatusBadge, PageTitle, money, roomsLabel } from "@/components/ui";

const names = Object.fromEntries(rooms.map((r) => [r.slug, r.name]));
const slugs = rooms.map((r) => r.slug);
const statuses = ["all", "requested", "confirmed", "completed", "declined", "cancelled"];

export default async function BookingsPage({ searchParams }) {
  const now = new Date();
  const y = Number(searchParams?.y) || now.getFullYear();
  const m = Number(searchParams?.m) || now.getMonth() + 1;
  const status = statuses.includes(searchParams?.status) ? searchParams.status : "all";
  const q = (searchParams?.q || "").trim();

  const [days, list] = await Promise.all([
    monthAvailability(y, m, slugs),
    sql`SELECT * FROM bookings
        WHERE (${status} = 'all' OR status = ${status})
          AND (${q} = '' OR guest_name ILIKE ${"%" + q + "%"} OR ref ILIKE ${"%" + q + "%"} OR guest_phone ILIKE ${"%" + q + "%"} OR guest_email ILIKE ${"%" + q + "%"})
        ORDER BY CASE status WHEN 'requested' THEN 0 ELSE 1 END, check_in DESC
        LIMIT 200`,
  ]);

  return (
    <>
      <PageTitle eyebrow="Bookings" title="Calendar & requests" right={<Link href="/admin/bookings/new" className="btn-primary">Add booking</Link>} />
      <div className="mt-8"><Calendar year={y} month={m} days={days} rooms={rooms.map((r) => ({ slug: r.slug, name: r.name }))} /></div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {statuses.map((s) => <Link key={s} href={`/admin/bookings?status=${s}&y=${y}&m=${m}`} className={`rounded-full border px-3 py-1 text-xs capitalize ${status === s ? "border-ink bg-ink text-cream" : "border-ink/15 hover:border-ink"}`}>{s}</Link>)}
        </div>
        <form className="flex gap-2"><input type="hidden" name="status" value={status} /><input name="q" defaultValue={q} placeholder="Search name, ref, phone" className="rounded-full border border-ink/15 bg-white/70 px-4 py-1.5 text-sm" /><button className="btn-ghost !px-4 !py-1.5 text-xs">Search</button></form>
      </div>

      <div className="mt-4 overflow-x-auto rounded-2xl bg-parchment ring-1 ring-ink/5">
        <table className="w-full text-sm">
          <thead className="text-left text-[11px] uppercase tracking-wider text-stone"><tr><th className="p-3">Guest</th><th className="p-3">Stay</th><th className="p-3">Dates</th><th className="p-3">Pax</th><th className="p-3">Amount</th><th className="p-3">Status</th><th className="p-3">Ref</th></tr></thead>
          <tbody className="divide-y divide-ink/5">
            {list.length === 0 && <tr><td colSpan={7} className="p-6 text-center text-stone">No bookings match.</td></tr>}
            {list.map((b) => (
              <tr key={b.id} className="hover:bg-brick/5">
                <td className="p-3"><Link href={`/admin/bookings/${b.id}`} className="font-medium hover:text-brick">{b.guest_name}</Link><div className="text-xs text-stone">{b.guest_phone}</div></td>
                <td className="p-3">{roomsLabel(b, names)}</td>
                <td className="p-3 whitespace-nowrap">{fmtDate(b.check_in)} → {fmtDate(b.check_out)}</td>
                <td className="p-3 whitespace-nowrap">{b.adults}A {b.children}C{b.pets ? ` ${b.pets}🐾` : ""}</td>
                <td className="p-3">{money(b.amount)}</td>
                <td className="p-3"><StatusBadge status={b.status} /></td>
                <td className="p-3 text-xs text-stone">{b.ref}<div>{b.source}</div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
