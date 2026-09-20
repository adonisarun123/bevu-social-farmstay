import Link from "next/link";
import { notFound } from "next/navigation";
import { sql, fmtDate, nightsBetween } from "@/lib/db";
import { checkAvailability } from "@/lib/bookings";
import { setBookingStatusAction, updateBookingAction } from "@/actions/admin";
import { rooms } from "@/data/rooms";
import { site } from "@/data/site";
import { StatusBadge, PageTitle, Card, Notice, money, roomsLabel, field, label } from "@/components/ui";
import SubmitButton from "@/components/SubmitButton";
import EditStayForm from "@/components/admin/EditStayForm";

const names = Object.fromEntries(rooms.map((r) => [r.slug, r.name]));

export default async function AdminBookingPage({ params, searchParams }) {
  const rows = await sql`SELECT b.*, u.id AS uid, u.admin_notes AS guest_admin_notes FROM bookings b LEFT JOIN users u ON u.id = b.user_id WHERE b.id = ${params.id}::uuid`;
  const b = rows[0];
  if (!b) notFound();
  const [events, history] = await Promise.all([
    sql`SELECT e.action, e.note, e.created_at, u.name AS actor FROM booking_events e LEFT JOIN users u ON u.id = e.actor_id WHERE e.booking_id = ${b.id} ORDER BY e.created_at`,
    sql`SELECT id, ref, check_in, check_out, status FROM bookings WHERE id <> ${b.id} AND (user_id = ${b.user_id} OR (guest_phone IS NOT NULL AND guest_phone = ${b.guest_phone})) ORDER BY check_in DESC LIMIT 6`,
  ]);
  const avail = ["requested", "confirmed"].includes(b.status) ? await checkAvailability({ kind: b.kind, roomSlugs: b.room_slugs, checkIn: b.check_in, checkOut: b.check_out, excludeBookingId: b.id }) : null;
  const wa = b.guest_phone ? `https://wa.me/${b.guest_phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${b.guest_name}, this is ${site.name} about your booking ${b.ref} (${fmtDate(b.check_in)} → ${fmtDate(b.check_out)}).`)}` : null;

  const Action = ({ status, cls, children, note }) => (
    <form action={setBookingStatusAction} className="contents">
      <input type="hidden" name="id" value={b.id} /><input type="hidden" name="status" value={status} />{note && <input type="hidden" name="note" value={note} />}
      <SubmitButton className={cls} pendingText="…">{children}</SubmitButton>
    </form>
  );

  return (
    <>
      <Link href="/admin/bookings" className="text-sm text-brick">← Bookings</Link>
      <div className="mt-3"><PageTitle eyebrow={`${b.ref} · ${b.source}`} title={b.guest_name} right={<StatusBadge status={b.status} />} /></div>
      {searchParams?.error === "conflict" && <div className="mt-4"><Notice error="Can't confirm — these dates now clash with another confirmed booking or a block. Decline this one or fix the clash first." /></div>}
      {avail && !avail.ok && <div className="mt-4"><Notice error={`Clash: ${avail.conflicts.map((c) => (c.type === "block" ? `block (${c.room_slug || "whole house"})` : `${c.ref} ${c.guest_name}`)).join(", ")}`} /></div>}
      {avail && avail.ok && avail.pending.length > 0 && <div className="mt-4"><Notice ok={`Other pending requests on these dates: ${avail.pending.map((p) => `${p.ref} ${p.guest_name}`).join(", ")}`} /></div>}

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              <div><dt className="text-[11px] uppercase tracking-[0.2em] text-stone">Stay</dt><dd className="mt-1 font-display text-xl">{roomsLabel(b, names)}</dd></div>
              <div><dt className="text-[11px] uppercase tracking-[0.2em] text-stone">Dates</dt><dd className="mt-1">{fmtDate(b.check_in)} → {fmtDate(b.check_out)} <span className="text-stone">({nightsBetween(b.check_in, b.check_out)} nights)</span></dd></div>
              <div><dt className="text-[11px] uppercase tracking-[0.2em] text-stone">Guests</dt><dd className="mt-1">{b.adults} adults, {b.children} children{b.pets ? `, ${b.pets} dogs` : ""}</dd></div>
              <div><dt className="text-[11px] uppercase tracking-[0.2em] text-stone">Contact</dt><dd className="mt-1">{b.guest_phone || "—"}<br /><span className="text-sm text-bark/75">{b.guest_email || "—"}</span></dd></div>
              <div className="sm:col-span-2"><dt className="text-[11px] uppercase tracking-[0.2em] text-stone">Guest's notes</dt><dd className="mt-1 whitespace-pre-line text-sm text-bark/80">{b.guest_notes || "—"}</dd></div>
            </dl>
            <div className="mt-6 flex flex-wrap gap-2 border-t border-ink/10 pt-6">
              {b.status === "requested" && <><Action status="confirmed" cls="btn-primary">Confirm</Action><Action status="declined" cls="btn-ghost">Decline</Action></>}
              {b.status === "confirmed" && <><Action status="completed" cls="btn-dark">Mark completed</Action><Action status="cancelled" cls="btn-ghost">Cancel</Action></>}
              {["declined", "cancelled"].includes(b.status) && <Action status="requested" cls="btn-ghost">Reopen as request</Action>}
              {wa && <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">WhatsApp guest</a>}
              {b.guest_email && <a href={`mailto:${b.guest_email}?subject=${encodeURIComponent(`${b.ref} — ${site.name}`)}`} className="btn-ghost">Email</a>}
            </div>
          </Card>

          <Card>
            <h2 className="font-display text-xl">Money & notes</h2>
            <form action={updateBookingAction} className="mt-4 grid gap-4 sm:grid-cols-2">
              <input type="hidden" name="id" value={b.id} />
              <div><label className={label} htmlFor="amount">Total (₹)</label><input id="amount" name="amount" type="number" step="1" min="0" defaultValue={b.amount ?? ""} className={field} placeholder="Auto from rates if blank" /></div>
              <div><label className={label} htmlFor="advance_paid">Advance received (₹)</label><input id="advance_paid" name="advance_paid" type="number" step="1" min="0" defaultValue={b.advance_paid ?? 0} className={field} /></div>
              <div className="sm:col-span-2"><label className={label} htmlFor="admin_notes">Internal notes</label><textarea id="admin_notes" name="admin_notes" rows={3} defaultValue={b.admin_notes || ""} className={field} placeholder="Diet, arrival time, who's paying, anything the caretaker should know" /></div>
              <div><SubmitButton className="btn-dark" pendingText="Saving…">Save</SubmitButton></div>
            </form>
            <p className="mt-3 text-xs text-stone">Balance due: {money((b.amount || 0) - (b.advance_paid || 0))}</p>
          </Card>

          {!["completed"].includes(b.status) && <EditStayForm booking={{ id: b.id, kind: b.kind, room_slugs: b.room_slugs, check_in: String(b.check_in).slice(0, 10), check_out: String(b.check_out).slice(0, 10), adults: b.adults, children: b.children, pets: b.pets }} rooms={rooms.map((r) => ({ slug: r.slug, name: r.name }))} />}
        </div>

        <div className="space-y-6">
          <Card>
            <h2 className="font-display text-xl">Timeline</h2>
            <ol className="mt-4 space-y-3 text-sm">{events.map((e, i) => <li key={i} className="border-l-2 border-brick/40 pl-3"><div className="font-medium capitalize">{e.action} <span className="font-normal text-stone">· {e.actor || "guest"}</span></div>{e.note && <div className="text-bark/75">{e.note}</div>}<div className="text-xs text-stone">{new Date(e.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</div></li>)}</ol>
          </Card>
          <Card>
            <h2 className="font-display text-xl">This guest</h2>
            {b.uid ? <Link href={`/admin/guests/${b.uid}`} className="mt-2 block text-sm text-brick">Open guest profile →</Link> : <p className="mt-2 text-sm text-stone">No account (manual booking).</p>}
            {b.guest_admin_notes && <p className="mt-2 text-sm text-bark/75">{b.guest_admin_notes}</p>}
            {history.length > 0 && <ul className="mt-4 space-y-2 text-sm">{history.map((h) => <li key={h.id}><Link href={`/admin/bookings/${h.id}`} className="hover:text-brick">{fmtDate(h.check_in)} → {fmtDate(h.check_out)}</Link> <StatusBadge status={h.status} /></li>)}</ul>}
          </Card>
        </div>
      </div>
    </>
  );
}
