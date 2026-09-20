import Link from "next/link";
import { notFound } from "next/navigation";
import { sql, fmtDate } from "@/lib/db";
import { updateGuestAction } from "@/actions/admin";
import { rooms } from "@/data/rooms";
import { StatusBadge, PageTitle, Card, money, roomsLabel, field, label } from "@/components/ui";
import SubmitButton from "@/components/SubmitButton";

const names = Object.fromEntries(rooms.map((r) => [r.slug, r.name]));

export default async function GuestPage({ params }) {
  const rows = await sql`SELECT * FROM users WHERE id = ${params.id}::uuid`;
  const g = rows[0]; if (!g) notFound();
  const bookings = await sql`SELECT * FROM bookings WHERE user_id = ${g.id} OR (guest_email = ${g.email} AND user_id IS NULL) ORDER BY check_in DESC`;
  return (
    <>
      <Link href="/admin/guests" className="text-sm text-brick">← Guests</Link>
      <div className="mt-3"><PageTitle eyebrow={g.role} title={g.name} /></div>
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <dl className="grid gap-4 sm:grid-cols-3 text-sm">
              <div><dt className="text-[11px] uppercase tracking-[0.2em] text-stone">Phone</dt><dd className="mt-1">{g.phone || "—"}</dd></div>
              <div><dt className="text-[11px] uppercase tracking-[0.2em] text-stone">Email</dt><dd className="mt-1">{g.email}</dd></div>
              <div><dt className="text-[11px] uppercase tracking-[0.2em] text-stone">Joined</dt><dd className="mt-1">{fmtDate(g.created_at)}{g.last_login_at ? ` · last seen ${fmtDate(g.last_login_at)}` : ""}</dd></div>
            </dl>
            {g.phone && <a href={`https://wa.me/${g.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-5">WhatsApp</a>}
          </Card>
          <Card>
            <h2 className="font-display text-xl">Stays</h2>
            <ul className="mt-3 divide-y divide-ink/5 text-sm">
              {bookings.length === 0 && <li className="py-3 text-stone">No bookings yet.</li>}
              {bookings.map((b) => <li key={b.id} className="flex items-center justify-between gap-3 py-3"><div><Link href={`/admin/bookings/${b.id}`} className="font-medium hover:text-brick">{roomsLabel(b, names)}</Link><div className="text-stone">{fmtDate(b.check_in)} → {fmtDate(b.check_out)} · {b.ref}</div></div><div className="flex items-center gap-3">{money(b.amount)}<StatusBadge status={b.status} /></div></li>)}
            </ul>
          </Card>
        </div>
        <Card>
          <h2 className="font-display text-xl">Notes & role</h2>
          <form action={updateGuestAction} className="mt-4 space-y-4">
            <input type="hidden" name="id" value={g.id} />
            <div><label className={label} htmlFor="admin_notes">Internal notes</label><textarea id="admin_notes" name="admin_notes" rows={5} defaultValue={g.admin_notes || ""} className={field} placeholder="Preferences, allergies, how they found us…" /></div>
            <div><label className={label} htmlFor="role">Role</label><select id="role" name="role" defaultValue={g.role} className={field}><option value="guest">Guest</option><option value="admin">Admin</option></select></div>
            <SubmitButton className="btn-dark" pendingText="Saving…">Save</SubmitButton>
          </form>
        </Card>
      </div>
    </>
  );
}
