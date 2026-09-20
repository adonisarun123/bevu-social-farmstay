import Link from "next/link";
import { sql, fmtDate, toDateStr } from "@/lib/db";
import { rooms } from "@/data/rooms";
import { StatusBadge, PageTitle, Card, money, roomsLabel } from "@/components/ui";

const names = Object.fromEntries(rooms.map((r) => [r.slug, r.name]));

export default async function AdminDashboard() {
  const today = toDateStr(new Date());
  const [pending, arriving, inHouse, newEnq, month] = await Promise.all([
    sql`SELECT * FROM bookings WHERE status = 'requested' ORDER BY created_at DESC`,
    sql`SELECT * FROM bookings WHERE status = 'confirmed' AND check_in >= ${today}::date ORDER BY check_in LIMIT 8`,
    sql`SELECT * FROM bookings WHERE status = 'confirmed' AND check_in <= ${today}::date AND check_out > ${today}::date`,
    sql`SELECT count(*)::int AS n FROM enquiries WHERE status = 'new'`,
    sql`SELECT count(*)::int AS n, coalesce(sum(amount),0)::float AS revenue FROM bookings WHERE status IN ('confirmed','completed') AND date_trunc('month', check_in) = date_trunc('month', ${today}::date)`,
  ]);

  const Stat = ({ label, value, href }) => (
    <Link href={href} className="rounded-2xl bg-parchment p-5 ring-1 ring-ink/5 transition hover:ring-brick/40"><div className="text-[11px] uppercase tracking-[0.2em] text-stone">{label}</div><div className="mt-2 font-display text-3xl">{value}</div></Link>
  );
  const Row = ({ b }) => (
    <Link href={`/admin/bookings/${b.id}`} className="flex flex-col gap-1 rounded-xl px-3 py-3 transition hover:bg-brick/5 sm:flex-row sm:items-center sm:justify-between">
      <div><span className="font-medium">{b.guest_name}</span> <span className="text-stone">· {roomsLabel(b, names)}</span><div className="text-xs text-stone">{fmtDate(b.check_in)} → {fmtDate(b.check_out)} · {b.adults}A {b.children}C{b.pets ? ` ${b.pets}🐾` : ""} · {b.ref}</div></div>
      <div className="flex items-center gap-3 text-sm"><span>{money(b.amount)}</span><StatusBadge status={b.status} /></div>
    </Link>
  );

  return (
    <>
      <PageTitle eyebrow="Dashboard" title={`Today, ${fmtDate(today, { weekday: "long", day: "numeric", month: "long" })}`} right={<Link href="/admin/bookings/new" className="btn-primary">Add booking</Link>} />
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Pending requests" value={pending.length} href="/admin/bookings?status=requested" />
        <Stat label="In house now" value={inHouse.length} href="/admin/bookings" />
        <Stat label="New enquiries" value={newEnq[0].n} href="/admin/enquiries" />
        <Stat label="This month" value={`${month[0].n} · ${money(month[0].revenue)}`} href="/admin/bookings" />
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="flex items-center justify-between"><h2 className="font-display text-2xl">Needs a decision</h2><Link href="/admin/bookings?status=requested" className="text-sm text-brick">All →</Link></div>
          <div className="mt-3 divide-y divide-ink/5">{pending.length === 0 ? <p className="py-3 text-sm text-stone">No pending requests.</p> : pending.slice(0, 8).map((b) => <Row key={b.id} b={b} />)}</div>
        </Card>
        <Card>
          <div className="flex items-center justify-between"><h2 className="font-display text-2xl">Arriving next</h2><Link href="/admin/bookings" className="text-sm text-brick">Calendar →</Link></div>
          <div className="mt-3 divide-y divide-ink/5">{arriving.length === 0 ? <p className="py-3 text-sm text-stone">Nothing confirmed ahead.</p> : arriving.map((b) => <Row key={b.id} b={b} />)}</div>
          {inHouse.length > 0 && <><h3 className="mt-6 font-display text-lg">In house today</h3><div className="divide-y divide-ink/5">{inHouse.map((b) => <Row key={b.id} b={b} />)}</div></>}
        </Card>
      </div>
    </>
  );
}
