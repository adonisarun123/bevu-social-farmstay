import Link from "next/link";
import { sql, fmtDate } from "@/lib/db";
import { createInvoiceAction } from "@/actions/invoices";
import { rupees } from "@/lib/invoice";
import { PageTitle } from "@/components/ui";
import SubmitButton from "@/components/SubmitButton";

export const metadata = { title: "Invoices" };
const badge = { draft: "bg-ink/10 text-stone", issued: "bg-moss/15 text-forest", cancelled: "bg-terracotta/15 text-brick-dark" };

export default async function InvoicesPage({ searchParams }) {
  const q = (searchParams?.q || "").trim();
  const list = await sql`SELECT i.id, i.number, i.status, i.invoice_date, i.bill_name, i.total, i.amount_paid, b.ref AS booking_ref
    FROM invoices i LEFT JOIN bookings b ON b.id = i.booking_id
    WHERE ${q} = '' OR i.bill_name ILIKE ${"%" + q + "%"} OR i.number ILIKE ${"%" + q + "%"} OR b.ref ILIKE ${"%" + q + "%"}
    ORDER BY (i.status = 'draft') DESC, i.invoice_date DESC, i.number DESC NULLS FIRST LIMIT 300`;
  return (
    <>
      <PageTitle eyebrow="Invoices" title="GST invoices" right={<form action={createInvoiceAction}><SubmitButton pendingText="Creating…">New blank invoice</SubmitButton></form>} />
      <p className="mt-3 max-w-2xl text-sm text-bark/75">The quickest way to invoice a stay is <strong>Create invoice</strong> on the booking. It fills in the guest, dates, amount and advance for you.</p>
      <form className="mt-6 flex gap-2"><input name="q" defaultValue={q} placeholder="Search number, guest, booking ref" className="rounded-full border border-ink/15 bg-white/70 px-4 py-1.5 text-sm" /><button className="btn-ghost !px-4 !py-1.5 text-xs">Search</button></form>
      <div className="mt-4 overflow-x-auto rounded-2xl bg-parchment ring-1 ring-ink/5">
        <table className="w-full text-sm">
          <thead className="text-left text-[11px] uppercase tracking-wider text-stone"><tr><th className="p-3">Number</th><th className="p-3">Date</th><th className="p-3">Billed to</th><th className="p-3">Booking</th><th className="p-3 text-right">Total</th><th className="p-3 text-right">Due</th><th className="p-3">Status</th></tr></thead>
          <tbody className="divide-y divide-ink/5">
            {list.length === 0 && <tr><td colSpan={7} className="p-6 text-center text-stone">No invoices yet.</td></tr>}
            {list.map((i) => (
              <tr key={i.id} className="hover:bg-brick/5">
                <td className="p-3"><Link href={`/admin/invoices/${i.id}`} className="font-medium hover:text-brick">{i.number || "Draft"}</Link></td>
                <td className="p-3">{fmtDate(i.invoice_date)}</td>
                <td className="p-3">{i.bill_name}</td>
                <td className="p-3 text-stone">{i.booking_ref || "—"}</td>
                <td className="p-3 text-right">{i.total == null ? "—" : rupees(i.total)}</td>
                <td className="p-3 text-right">{i.status === "issued" ? rupees(Math.max(0, Number(i.total) - Number(i.amount_paid))) : "—"}</td>
                <td className="p-3"><span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider ${badge[i.status]}`}>{i.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
