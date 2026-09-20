import Link from "next/link";
import { sql, fmtDate } from "@/lib/db";
import { PageTitle, money } from "@/components/ui";

export default async function GuestsPage({ searchParams }) {
  const q = (searchParams?.q || "").trim();
  const guests = await sql`
    SELECT u.id, u.name, u.email, u.phone, u.role, u.created_at, u.last_login_at,
           count(b.id) FILTER (WHERE b.status IN ('confirmed','completed'))::int AS stays,
           coalesce(sum(b.amount) FILTER (WHERE b.status IN ('confirmed','completed')),0)::float AS spent,
           max(b.check_in) AS last_stay
    FROM users u LEFT JOIN bookings b ON b.user_id = u.id
    WHERE ${q} = '' OR u.name ILIKE ${"%" + q + "%"} OR u.email ILIKE ${"%" + q + "%"} OR u.phone ILIKE ${"%" + q + "%"}
    GROUP BY u.id ORDER BY u.created_at DESC LIMIT 300`;
  return (
    <>
      <PageTitle eyebrow="Guests" title="Guest list" right={<a href="/admin/guests/export" className="btn-ghost">Export CSV</a>} />
      <form className="mt-6 flex gap-2"><input name="q" defaultValue={q} placeholder="Search name, email, phone" className="rounded-full border border-ink/15 bg-white/70 px-4 py-1.5 text-sm" /><button className="btn-ghost !px-4 !py-1.5 text-xs">Search</button></form>
      <div className="mt-4 overflow-x-auto rounded-2xl bg-parchment ring-1 ring-ink/5">
        <table className="w-full text-sm">
          <thead className="text-left text-[11px] uppercase tracking-wider text-stone"><tr><th className="p-3">Name</th><th className="p-3">Contact</th><th className="p-3">Stays</th><th className="p-3">Spent</th><th className="p-3">Last stay</th><th className="p-3">Role</th><th className="p-3">Joined</th></tr></thead>
          <tbody className="divide-y divide-ink/5">
            {guests.map((g) => (
              <tr key={g.id} className="hover:bg-brick/5">
                <td className="p-3"><Link href={`/admin/guests/${g.id}`} className="font-medium hover:text-brick">{g.name}</Link></td>
                <td className="p-3">{g.phone || "—"}<div className="text-xs text-stone">{g.email}</div></td>
                <td className="p-3">{g.stays}</td><td className="p-3">{money(g.spent)}</td>
                <td className="p-3">{g.last_stay ? fmtDate(g.last_stay) : "—"}</td>
                <td className="p-3 capitalize">{g.role}</td>
                <td className="p-3 text-xs text-stone">{fmtDate(g.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
