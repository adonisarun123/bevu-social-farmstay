import { sql, fmtDate, toDateStr } from "@/lib/db";
import { deleteBlockAction } from "@/actions/admin";
import { rooms } from "@/data/rooms";
import BlockForm from "@/components/admin/BlockForm";
import { PageTitle } from "@/components/ui";
import SubmitButton from "@/components/SubmitButton";

const names = Object.fromEntries(rooms.map((r) => [r.slug, r.name]));

export default async function AvailabilityPage() {
  const blocks = await sql`SELECT * FROM blocked_dates WHERE end_date >= ${toDateStr(new Date())}::date ORDER BY start_date`;
  return (
    <>
      <PageTitle eyebrow="Availability" title="Blocked dates" />
      <p className="mt-3 max-w-2xl text-sm text-bark/75">Blocks stop guests from requesting those nights and stop you from confirming a clashing booking. Nights are inclusive: blocking 3–5 Oct blocks the nights of the 3rd, 4th and 5th.</p>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <BlockForm rooms={rooms.map((r) => ({ slug: r.slug, name: r.name }))} />
        <div className="rounded-2xl bg-parchment p-6 ring-1 ring-ink/5">
          <h2 className="font-display text-xl">Upcoming blocks</h2>
          <ul className="mt-4 divide-y divide-ink/5 text-sm">
            {blocks.length === 0 && <li className="py-3 text-stone">None.</li>}
            {blocks.map((b) => (
              <li key={b.id} className="flex items-center justify-between gap-3 py-3">
                <div><div className="font-medium">{b.room_slug ? names[b.room_slug] : "Whole property"}</div><div className="text-stone">{fmtDate(b.start_date)} → {fmtDate(b.end_date)}{b.reason ? ` · ${b.reason}` : ""}</div></div>
                <form action={deleteBlockAction}><input type="hidden" name="id" value={b.id} /><SubmitButton className="text-xs text-brick hover:underline" pendingText="…">Remove</SubmitButton></form>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
