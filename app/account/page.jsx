import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { sql, fmtDate, nightsBetween, toDateStr } from "@/lib/db";
import { rooms } from "@/data/rooms";
import { StatusBadge, PageTitle, Card, money, roomsLabel } from "@/components/ui";

export const dynamic = "force-dynamic";
const names = Object.fromEntries(rooms.map((r) => [r.slug, r.name]));

export default async function AccountHome() {
  const user = await requireUser();
  const bookings = await sql`SELECT * FROM bookings WHERE user_id = ${user.id} OR (guest_email = ${user.email} AND user_id IS NULL) ORDER BY check_in DESC`;
  const today = toDateStr(new Date());
  const upcoming = bookings.filter((b) => toDateStr(b.check_out) >= today && !["declined", "cancelled"].includes(b.status));
  const past = bookings.filter((b) => !upcoming.includes(b));

  const Row = ({ b }) => (
    <Link href={`/account/bookings/${b.id}`} className="flex flex-col gap-2 rounded-2xl bg-parchment p-5 ring-1 ring-ink/5 transition hover:ring-brick/40 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-3"><span className="font-display text-xl">{roomsLabel(b, names)}</span><StatusBadge status={b.status} /></div>
        <div className="mt-1 text-sm text-bark/75">{fmtDate(b.check_in)} → {fmtDate(b.check_out)} · {nightsBetween(b.check_in, b.check_out)} nights · {b.adults} adults{b.children ? `, ${b.children} children` : ""}{b.pets ? `, ${b.pets} dogs` : ""}</div>
      </div>
      <div className="text-right text-sm"><div className="font-medium">{money(b.amount)}</div><div className="text-xs text-stone">{b.ref}</div></div>
    </Link>
  );

  return (
    <>
      <PageTitle eyebrow="My stays" title={`Hello, ${user.name.split(" ")[0]}.`} right={<Link href="/account/book" className="btn-primary">Request a stay</Link>} />
      <div className="mt-10 space-y-10">
        <section>
          <h2 className="font-display text-2xl">Upcoming</h2>
          <div className="mt-4 space-y-3">
            {upcoming.length === 0 && <Card><p className="text-sm text-bark/75">Nothing booked yet. <Link href="/account/book" className="text-brick">Check availability and request a stay →</Link></p></Card>}
            {upcoming.map((b) => <Row key={b.id} b={b} />)}
          </div>
        </section>
        {past.length > 0 && (
          <section>
            <h2 className="font-display text-2xl">Past & cancelled</h2>
            <div className="mt-4 space-y-3">{past.map((b) => <Row key={b.id} b={b} />)}</div>
          </section>
        )}
      </div>
    </>
  );
}
