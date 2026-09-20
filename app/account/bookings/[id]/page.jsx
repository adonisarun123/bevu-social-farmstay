import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { sql, fmtDate, nightsBetween } from "@/lib/db";
import { cancelMyBookingAction } from "@/actions/bookings";
import { rooms } from "@/data/rooms";
import { site } from "@/data/site";
import { StatusBadge, PageTitle, Card, Notice, money, roomsLabel } from "@/components/ui";
import SubmitButton from "@/components/SubmitButton";

export const dynamic = "force-dynamic";
const names = Object.fromEntries(rooms.map((r) => [r.slug, r.name]));

export default async function MyBookingPage({ params, searchParams }) {
  const user = await requireUser();
  const rows = await sql`SELECT * FROM bookings WHERE id = ${params.id}::uuid AND (user_id = ${user.id} OR guest_email = ${user.email})`;
  const b = rows[0];
  if (!b) notFound();
  const events = await sql`SELECT action, note, created_at FROM booking_events WHERE booking_id = ${b.id} ORDER BY created_at`;
  const canCancel = ["requested", "confirmed"].includes(b.status);

  return (
    <>
      <Link href="/account" className="text-sm text-brick">← My stays</Link>
      <div className="mt-4"><PageTitle eyebrow={b.ref} title={roomsLabel(b, names)} right={<StatusBadge status={b.status} />} /></div>
      {searchParams?.new && <div className="mt-6"><Notice ok="Request sent. We'll confirm on WhatsApp shortly — you'll also get an email when it's confirmed." /></div>}

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            <div><dt className="text-[11px] uppercase tracking-[0.2em] text-stone">Dates</dt><dd className="mt-1">{fmtDate(b.check_in)} → {fmtDate(b.check_out)} <span className="text-stone">({nightsBetween(b.check_in, b.check_out)} nights)</span></dd></div>
            <div><dt className="text-[11px] uppercase tracking-[0.2em] text-stone">Guests</dt><dd className="mt-1">{b.adults} adults{b.children ? `, ${b.children} children` : ""}{b.pets ? `, ${b.pets} dogs` : ""}</dd></div>
            <div><dt className="text-[11px] uppercase tracking-[0.2em] text-stone">Estimated total</dt><dd className="mt-1">{money(b.amount)} <span className="text-xs text-stone">incl. breakfast; meals extra</span></dd></div>
            <div><dt className="text-[11px] uppercase tracking-[0.2em] text-stone">Advance received</dt><dd className="mt-1">{money(b.advance_paid)}</dd></div>
            <div className="sm:col-span-2"><dt className="text-[11px] uppercase tracking-[0.2em] text-stone">Your notes</dt><dd className="mt-1 whitespace-pre-line text-sm text-bark/80">{b.guest_notes || "—"}</dd></div>
          </dl>
          <div className="mt-6 flex flex-wrap gap-3 border-t border-ink/10 pt-6">
            <a href={site.whatsappHref(`Hi, this is ${user.name} about booking ${b.ref} (${fmtDate(b.check_in)} → ${fmtDate(b.check_out)}).`)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">WhatsApp us about this stay</a>
            {canCancel && (
              <form action={cancelMyBookingAction}>
                <input type="hidden" name="id" value={b.id} />
                <SubmitButton className="btn-ghost" pendingText="Cancelling…">Cancel request</SubmitButton>
              </form>
            )}
          </div>
        </Card>
        <Card>
          <h2 className="font-display text-xl">Timeline</h2>
          <ol className="mt-4 space-y-3 text-sm">
            {events.map((e, i) => (
              <li key={i} className="border-l-2 border-brick/40 pl-3"><div className="font-medium capitalize">{e.action}</div>{e.note && <div className="text-bark/75">{e.note}</div>}<div className="text-xs text-stone">{new Date(e.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</div></li>
            ))}
          </ol>
          <p className="mt-6 text-xs text-stone">Check-in {site.checkIn} · Check-out {site.checkOut}. The location pin is shared on WhatsApp once confirmed.</p>
        </Card>
      </div>
    </>
  );
}
