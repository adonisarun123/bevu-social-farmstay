// Printable GST tax invoice. Server-safe; used in the admin panel and on the public /invoice/[token] page.
import { computeInvoice, amountInWords, rupees } from "@/lib/invoice";
import { fmtDate } from "@/lib/db";

const n2 = (v) => Number(v || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function InvoiceDocument({ inv, items, seller }) {
  const t = computeInvoice(items, inv.tax_inclusive);
  const total = inv.status === "draft" ? t.total : Number(inv.total);
  const paid = Number(inv.amount_paid || 0);
  const due = Math.max(0, total - paid);
  const isDraft = inv.status === "draft", isCancelled = inv.status === "cancelled";
  const th = "border-b border-ink/20 px-2 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-bark/70";
  const td = "border-b border-ink/10 px-2 py-2 align-top";
  return (
    <article className="invoice-doc relative mx-auto max-w-[820px] bg-white p-6 text-[13px] leading-relaxed text-ink shadow-card print:max-w-none print:p-0 print:shadow-none sm:p-10">
      {(isDraft || isCancelled) && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden" aria-hidden="true">
          <span className="rotate-[-24deg] select-none text-[72px] font-bold uppercase tracking-widest text-terracotta/15 sm:text-[110px]">{isDraft ? "Draft" : "Cancelled"}</span>
        </div>
      )}
      <header className="flex flex-col gap-6 border-b-2 border-brick pb-6 sm:flex-row sm:justify-between">
        <div>
          <div className="font-display text-2xl text-brick-dark">{seller.trade_name || seller.legal_name}</div>
          {seller.legal_name && seller.legal_name !== seller.trade_name && <div className="text-xs text-bark/70">{seller.legal_name}</div>}
          <div className="mt-2 max-w-xs text-xs text-bark/80">{seller.address}</div>
          <div className="mt-1 text-xs text-bark/80">{seller.phone} · {seller.email}</div>
          <div className="mt-1 text-xs"><span className="font-semibold">GSTIN:</span> {seller.gstin || <span className="text-terracotta">not set</span>} · State: {seller.state} ({seller.state_code})</div>
        </div>
        <div className="sm:text-right">
          <div className="font-display text-xl uppercase tracking-[0.18em]">Tax invoice</div>
          <dl className="mt-2 grid grid-cols-[auto_auto] gap-x-3 gap-y-0.5 text-xs sm:justify-end">
            <dt className="text-bark/70">Invoice no.</dt><dd className="font-semibold">{inv.number || "— (assigned on issue)"}</dd>
            <dt className="text-bark/70">Date</dt><dd>{fmtDate(inv.invoice_date)}</dd>
            <dt className="text-bark/70">Place of supply</dt><dd>{seller.state} ({seller.state_code})</dd>
            {inv.booking_ref && <><dt className="text-bark/70">Booking</dt><dd>{inv.booking_ref}</dd></>}
            {inv.check_in && <><dt className="text-bark/70">Stay</dt><dd>{fmtDate(inv.check_in)} – {fmtDate(inv.check_out)}</dd></>}
          </dl>
        </div>
      </header>

      <section className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-bark/60">Billed to</div>
          <div className="mt-1 font-semibold">{inv.bill_name}</div>
          {inv.bill_address && <div className="whitespace-pre-line text-xs text-bark/80">{inv.bill_address}</div>}
          <div className="text-xs text-bark/80">{[inv.bill_phone, inv.bill_email].filter(Boolean).join(" · ")}</div>
          {inv.bill_gstin && <div className="text-xs"><span className="font-semibold">GSTIN:</span> {inv.bill_gstin}{inv.bill_state ? ` · ${inv.bill_state}` : ""}</div>}
        </div>
        {isCancelled && <div className="rounded-lg bg-terracotta/10 p-3 text-xs text-brick-dark"><strong>Cancelled</strong>{inv.cancelled_at ? ` on ${fmtDate(inv.cancelled_at)}` : ""}. {inv.cancel_reason}</div>}
      </section>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse">
          <thead><tr><th className={th}>#</th><th className={th}>Description</th><th className={th}>SAC</th><th className={`${th} text-right`}>Qty</th><th className={`${th} text-right`}>Rate{inv.tax_inclusive ? " (incl. GST)" : ""}</th><th className={`${th} text-right`}>GST</th><th className={`${th} text-right`}>Taxable value</th></tr></thead>
          <tbody>
            {t.lines.map((l, i) => (
              <tr key={i}>
                <td className={td}>{i + 1}</td>
                <td className={td}>{l.description}</td>
                <td className={td}>{l.sac || "—"}</td>
                <td className={`${td} text-right`}>{l.qty} {l.unit || ""}</td>
                <td className={`${td} text-right`}>{n2(l.rate)}</td>
                <td className={`${td} text-right`}>{l.tax_rate}%</td>
                <td className={`${td} text-right`}>{n2(l.taxable)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="mt-6 grid gap-6 sm:grid-cols-[1fr_280px]">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead><tr><th className={th}>GST rate</th><th className={`${th} text-right`}>Taxable</th><th className={`${th} text-right`}>CGST</th><th className={`${th} text-right`}>SGST</th></tr></thead>
            <tbody>{t.slabs.map((sl) => <tr key={sl.rate}><td className={td}>{sl.rate}%</td><td className={`${td} text-right`}>{n2(sl.taxable)}</td><td className={`${td} text-right`}>{n2(sl.cgst)} <span className="text-bark/60">@{sl.rate / 2}%</span></td><td className={`${td} text-right`}>{n2(sl.sgst)} <span className="text-bark/60">@{sl.rate / 2}%</span></td></tr>)}</tbody>
          </table>
          <p className="mt-3 text-xs"><span className="text-bark/70">Amount in words:</span> <span className="font-medium">{amountInWords(total)}</span></p>
        </div>
        <dl className="grid grid-cols-[1fr_auto] gap-y-1 text-sm">
          <dt className="text-bark/70">Taxable value</dt><dd className="text-right">{n2(t.subtotal)}</dd>
          <dt className="text-bark/70">CGST</dt><dd className="text-right">{n2(t.cgst)}</dd>
          <dt className="text-bark/70">SGST</dt><dd className="text-right">{n2(t.sgst)}</dd>
          {t.round_off !== 0 && <><dt className="text-bark/70">Round off</dt><dd className="text-right">{n2(t.round_off)}</dd></>}
          <dt className="mt-1 border-t border-ink/20 pt-2 font-semibold">Total</dt><dd className="mt-1 border-t border-ink/20 pt-2 text-right font-display text-lg">{rupees(total)}</dd>
          {paid > 0 && <><dt className="text-bark/70">Paid</dt><dd className="text-right">{n2(paid)}</dd><dt className="font-semibold">Balance due</dt><dd className="text-right font-semibold">{rupees(due)}</dd></>}
        </dl>
      </section>

      {(inv.notes || seller.bank || seller.terms) && (
        <section className="mt-6 grid gap-4 border-t border-ink/10 pt-4 text-xs text-bark/80 sm:grid-cols-2">
          <div>
            {inv.notes && <p className="whitespace-pre-line">{inv.notes}</p>}
            {seller.bank && <><div className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-bark/60">Payment details</div><p className="whitespace-pre-line">{seller.bank}</p></>}
          </div>
          <div className="sm:text-right">
            {seller.terms && <p className="whitespace-pre-line">{seller.terms}</p>}
            <p className="mt-8 font-medium">For {seller.legal_name || seller.trade_name}</p>
            <p className="text-bark/60">Authorised signatory</p>
          </div>
        </section>
      )}
      <p className="mt-6 text-[10px] text-bark/50">Supply is not subject to reverse charge.</p>
    </article>
  );
}
