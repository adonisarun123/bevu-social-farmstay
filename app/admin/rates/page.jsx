import { sql, fmtDate } from "@/lib/db";
import { deleteRateAction } from "@/actions/admin";
import RateForm from "@/components/admin/RateForm";
import { PageTitle, money } from "@/components/ui";
import SubmitButton from "@/components/SubmitButton";

export default async function RatesPage() {
  const rates = await sql`SELECT id, kind, label, weekday::float AS weekday, weekend::float AS weekend, valid_from, valid_to FROM rates ORDER BY kind, valid_from NULLS FIRST`;
  const defaults = rates.filter((r) => !r.valid_from), seasonal = rates.filter((r) => r.valid_from);
  return (
    <>
      <PageTitle eyebrow="Rates" title="Pricing" />
      <p className="mt-3 max-w-2xl text-sm text-bark/75">The default rate shows on the public site and prices new requests. Seasonal rates override the default for their dates (Diwali, Christmas week, summer). Weekend = Friday and Saturday nights. Public pages refresh within 5 minutes.</p>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-xl">Current rates</h2>
          <div className="mt-4 space-y-3">
            {rates.length === 0 && <p className="text-sm text-stone">No rates yet — the site shows "On request" until you add one.</p>}
            {[...defaults, ...seasonal].map((r) => (
              <div key={r.id} className="rounded-2xl bg-parchment p-5 ring-1 ring-ink/5">
                <div className="flex items-start justify-between gap-3">
                  <div><div className="font-display text-lg">{r.kind === "house" ? "Whole house" : "Per room"} · {r.label}</div><div className="text-sm text-bark/75">{money(r.weekday)} weekday · {money(r.weekend)} weekend{r.valid_from ? ` · ${fmtDate(r.valid_from)} → ${fmtDate(r.valid_to)}` : " · default"}</div></div>
                  <form action={deleteRateAction}><input type="hidden" name="id" value={r.id} /><SubmitButton className="text-xs text-brick hover:underline" pendingText="…">Delete</SubmitButton></form>
                </div>
                <details className="mt-3"><summary className="cursor-pointer text-xs text-stone">Edit</summary><div className="mt-3"><RateForm rate={r} /></div></details>
              </div>
            ))}
          </div>
        </div>
        <div><h2 className="font-display text-xl">Add a rate</h2><div className="mt-4"><RateForm /></div></div>
      </div>
    </>
  );
}
