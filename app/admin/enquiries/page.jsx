import { sql, fmtDate } from "@/lib/db";
import { updateEnquiryAction } from "@/actions/admin";
import { PageTitle, field, label } from "@/components/ui";
import SubmitButton from "@/components/SubmitButton";

const cls = { new: "bg-brass/20 text-bark", replied: "bg-moss/20 text-forest", closed: "bg-ink/10 text-stone" };

export default async function EnquiriesPage({ searchParams }) {
  const status = ["new", "replied", "closed", "all"].includes(searchParams?.status) ? searchParams.status : "new";
  const list = await sql`SELECT * FROM enquiries WHERE ${status} = 'all' OR status = ${status} ORDER BY created_at DESC LIMIT 200`;
  return (
    <>
      <PageTitle eyebrow="Enquiries" title="Contact-form enquiries" />
      <div className="mt-6 flex gap-2">{["new", "replied", "closed", "all"].map((s) => <a key={s} href={`/admin/enquiries?status=${s}`} className={`rounded-full border px-3 py-1 text-xs capitalize ${status === s ? "border-ink bg-ink text-cream" : "border-ink/15"}`}>{s}</a>)}</div>
      <div className="mt-4 space-y-3">
        {list.length === 0 && <p className="text-sm text-stone">Nothing here.</p>}
        {list.map((e) => (
          <details key={e.id} className="rounded-2xl bg-parchment p-5 ring-1 ring-ink/5">
            <summary className="flex cursor-pointer flex-wrap items-center justify-between gap-3">
              <div><span className="font-medium">{e.name}</span> <span className="text-stone">· {e.phone}{e.email ? ` · ${e.email}` : ""}</span><div className="text-xs text-stone">{e.check_in ? `${fmtDate(e.check_in)} → ${fmtDate(e.check_out)} · ` : ""}{e.adults != null ? `${e.adults}A ${e.children}C · ` : ""}{e.kind === "house" ? "Whole house" : "Rooms"} · {new Date(e.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</div></div>
              <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider ${cls[e.status]}`}>{e.status}</span>
            </summary>
            <p className="mt-4 whitespace-pre-line text-sm text-bark/85">{e.message || "—"}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href={`https://wa.me/${(e.phone || "").replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${e.name}, thanks for your enquiry to Bevu Social Farmstay.`)}`} target="_blank" rel="noopener noreferrer" className="btn-whatsapp !py-2 text-xs">WhatsApp</a>
              {e.email && <a href={`mailto:${e.email}`} className="btn-ghost !py-2 text-xs">Email</a>}
            </div>
            <form action={updateEnquiryAction} className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto_auto] sm:items-end">
              <input type="hidden" name="id" value={e.id} />
              <div><label className={label}>Notes</label><input name="admin_notes" defaultValue={e.admin_notes || ""} className={field} /></div>
              <div><label className={label}>Status</label><select name="status" defaultValue={e.status} className={field}><option value="new">New</option><option value="replied">Replied</option><option value="closed">Closed</option></select></div>
              <SubmitButton className="btn-dark !py-2.5" pendingText="…">Save</SubmitButton>
            </form>
          </details>
        ))}
      </div>
    </>
  );
}
