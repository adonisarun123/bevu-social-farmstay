import Link from "next/link";
import { notFound } from "next/navigation";
import { loadInvoice } from "@/lib/invoice-server";
import { recordPaymentAction, cancelInvoiceAction, deleteDraftAction, emailInvoiceAction } from "@/actions/invoices";
import { GSTIN_RE, rupees } from "@/lib/invoice";
import { site } from "@/data/site";
import { PageTitle, Card, Notice, field, label } from "@/components/ui";
import SubmitButton from "@/components/SubmitButton";
import InvoiceEditor from "@/components/admin/InvoiceEditor";
import InvoiceDocument from "@/components/invoice/InvoiceDocument";

export const metadata = { title: "Invoice" };

const msgs = { reason: ["error", "Give a reason to cancel."], noemail: ["error", "This invoice has no guest email. Share the link on WhatsApp instead."], smtp: ["error", "Email isn't set up on the site (SMTP). Share the link on WhatsApp instead."] };

export default async function InvoicePage({ params, searchParams }) {
  const data = await loadInvoice({ id: params.id });
  if (!data) notFound();
  const { inv, items, seller } = data;
  const publicUrl = `${site.url}/invoice/${inv.public_token}`;
  const due = Math.max(0, Number(inv.total || 0) - Number(inv.amount_paid || 0));
  const flash = searchParams?.issued ? ["ok", `Issued as ${inv.number}.`] : searchParams?.emailed ? ["ok", `Emailed to ${inv.bill_email}.`] : msgs[searchParams?.error];
  const wa = inv.bill_phone ? `https://wa.me/${inv.bill_phone.replace(/\D/g, "").replace(/^(\d{10})$/, "91$1")}?text=${encodeURIComponent(`Hi ${inv.bill_name}, here is your invoice ${inv.number} from ${site.name} for ${rupees(inv.total)}: ${publicUrl}`)}` : null;

  return (
    <>
      <div className="flex flex-wrap gap-4 text-sm"><Link href="/admin/invoices" className="text-brick">← Invoices</Link>{inv.booking_id && <Link href={`/admin/bookings/${inv.booking_id}`} className="text-brick">← Booking {inv.booking_ref}</Link>}</div>
      <div className="mt-3"><PageTitle eyebrow={inv.status === "draft" ? "Draft invoice" : `Invoice · ${inv.status}`} title={inv.number || inv.bill_name} /></div>
      {flash && <div className="mt-4"><Notice {...{ [flash[0]]: flash[1] }} /></div>}

      {inv.status === "draft" ? (
        <div className="mt-8 grid gap-8 2xl:grid-cols-[1fr_820px]">
          <div>
            <InvoiceEditor invoice={{ ...inv, invoice_date: String(inv.invoice_date).slice(0, 10) }} items={items} sellerGstinSet={GSTIN_RE.test(seller.gstin || "")} />
            <form action={deleteDraftAction} className="mt-6"><input type="hidden" name="id" value={inv.id} /><SubmitButton className="text-sm text-brick-dark hover:underline" pendingText="Deleting…">Delete this draft</SubmitButton></form>
          </div>
          <div><h2 className="mb-3 font-display text-xl">Preview <span className="text-sm text-stone">(updates when you save)</span></h2><InvoiceDocument inv={inv} items={items} seller={seller} /></div>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_320px]">
          <InvoiceDocument inv={inv} items={items} seller={seller} />
          <div className="space-y-6">
            <Card>
              <h2 className="font-display text-xl">Share</h2>
              <div className="mt-4 flex flex-col gap-2">
                <a href={`/invoice/${inv.public_token}`} target="_blank" rel="noopener noreferrer" className="btn-dark justify-center">Open / print / PDF</a>
                {wa && <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-whatsapp justify-center">Send on WhatsApp</a>}
                {inv.status === "issued" && <form action={emailInvoiceAction}><input type="hidden" name="id" value={inv.id} /><SubmitButton className="btn-ghost w-full justify-center" pendingText="Sending…">Email to guest</SubmitButton></form>}
              </div>
              <code className="mt-4 block break-all rounded-xl bg-cream p-3 text-[11px]">{publicUrl}</code>
            </Card>
            {inv.status === "issued" && (
              <Card>
                <h2 className="font-display text-xl">Payment</h2>
                <p className="mt-1 text-sm text-stone">Balance due: <strong className="text-ink">{rupees(due)}</strong></p>
                <form action={recordPaymentAction} className="mt-4 space-y-3">
                  <input type="hidden" name="id" value={inv.id} />
                  <div><label className={label} htmlFor="amount_paid">Total received (₹)</label><input id="amount_paid" name="amount_paid" type="number" min="0" step="1" defaultValue={Number(inv.amount_paid || 0)} className={field} /></div>
                  <SubmitButton className="btn-dark" pendingText="Saving…">Update</SubmitButton>
                </form>
              </Card>
            )}
            {inv.status === "issued" && (
              <Card>
                <h2 className="font-display text-xl">Cancel invoice</h2>
                <p className="mt-1 text-xs text-stone">Issued invoices can't be edited. To fix one, cancel it and create a new one. The cancelled number stays on record and isn't reused.</p>
                <form action={cancelInvoiceAction} className="mt-4 space-y-3">
                  <input type="hidden" name="id" value={inv.id} />
                  <input name="reason" required className={field} placeholder="Reason, e.g. wrong GSTIN" />
                  <SubmitButton className="btn-ghost text-brick-dark" pendingText="Cancelling…">Cancel invoice</SubmitButton>
                </form>
              </Card>
            )}
          </div>
        </div>
      )}
    </>
  );
}
