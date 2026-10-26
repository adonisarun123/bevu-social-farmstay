"use client";

import { Fragment, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { Trash2 } from "lucide-react";
import { saveInvoiceAction } from "@/actions/invoices";
import { computeInvoice, rupees, TAX_RATES, SAC, UNITS, STAY_THRESHOLD } from "@/lib/invoice";
import SubmitButton from "@/components/SubmitButton";
import { field, label, Notice, Card } from "@/components/ui";

const blank = { stay: { description: "Accommodation", sac: SAC.stay, qty: 1, unit: "night", rate: 0, tax_rate: 5 },
  food: { description: "Food & beverages", sac: SAC.food, qty: 1, unit: "plate", rate: 0, tax_rate: 5 },
  other: { description: "", sac: SAC.other, qty: 1, unit: "nos", rate: 0, tax_rate: 18 },
  discount: { description: "Discount", sac: SAC.stay, qty: 1, unit: "nos", rate: 0, tax_rate: 5 } };

export default function InvoiceEditor({ invoice: inv, items: initial, sellerGstinSet }) {
  const [state, action] = useFormState(saveInvoiceAction, {});
  const [items, setItems] = useState(initial.length ? initial : [blank.stay]);
  const [inclusive, setInclusive] = useState(inv.tax_inclusive);
  const intent = useRef(null);
  const t = computeInvoice(items, inclusive);
  const set = (i, k, v) => setItems((xs) => xs.map((x, j) => (j === i ? { ...x, [k]: v } : x)));
  const cell = "w-full rounded-lg border border-ink/15 bg-white/80 px-2 py-1.5 text-sm outline-none focus:border-brick";

  return (
    <form action={action} className="space-y-6">
      <input type="hidden" name="id" value={inv.id} />
      <input type="hidden" name="items" value={JSON.stringify(items)} />
      <input type="hidden" name="tax_inclusive" value={inclusive ? "1" : "0"} />
      <input type="hidden" name="intent" ref={intent} defaultValue="save" />

      <Card>
        <h2 className="font-display text-xl">Billed to</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div><label className={label} htmlFor="bill_name">Name / company</label><input id="bill_name" name="bill_name" defaultValue={inv.bill_name} required className={field} /></div>
          <div><label className={label} htmlFor="invoice_date">Invoice date</label><input id="invoice_date" name="invoice_date" type="date" defaultValue={String(inv.invoice_date).slice(0, 10)} className={field} /></div>
          <div><label className={label} htmlFor="bill_phone">Phone</label><input id="bill_phone" name="bill_phone" defaultValue={inv.bill_phone || ""} className={field} /></div>
          <div><label className={label} htmlFor="bill_email">Email</label><input id="bill_email" name="bill_email" type="email" defaultValue={inv.bill_email || ""} className={field} /></div>
          <div className="sm:col-span-2"><label className={label} htmlFor="bill_address">Address (needed for company invoices)</label><textarea id="bill_address" name="bill_address" rows={2} defaultValue={inv.bill_address || ""} className={field} /></div>
          <div><label className={label} htmlFor="bill_gstin">Guest GSTIN (companies, optional)</label><input id="bill_gstin" name="bill_gstin" defaultValue={inv.bill_gstin || ""} className={`${field} uppercase`} placeholder="29ABCDE1234F1Z5" maxLength={15} /></div>
          <div><label className={label} htmlFor="bill_state">Guest state</label><input id="bill_state" name="bill_state" defaultValue={inv.bill_state || ""} className={field} placeholder="Karnataka" /></div>
        </div>
      </Card>

      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-xl">Line items</h2>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={inclusive} onChange={(e) => setInclusive(e.target.checked)} className="accent-brick" /> Rates include GST</label>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead className="text-left text-[11px] uppercase tracking-wider text-stone"><tr><th className="pb-2 pr-2">Description</th><th className="w-24 pb-2 pr-2">SAC</th><th className="w-20 pb-2 pr-2">Qty</th><th className="w-28 pb-2 pr-2">Unit</th><th className="w-32 pb-2 pr-2">Rate (₹)</th><th className="w-20 pb-2 pr-2">GST</th><th className="w-28 pb-2 text-right">Taxable</th><th className="w-8" /></tr></thead>
            <tbody>
              {items.map((it, i) => (
                <tr key={i} className="align-top">
                  <td className="py-1 pr-2"><textarea rows={1} value={it.description} onChange={(e) => set(i, "description", e.target.value)} className={cell} placeholder="What was supplied" /></td>
                  <td className="py-1 pr-2"><input value={it.sac || ""} onChange={(e) => set(i, "sac", e.target.value)} className={cell} /></td>
                  <td className="py-1 pr-2"><input type="number" step="0.5" min="0" value={it.qty} onChange={(e) => set(i, "qty", e.target.value)} className={cell} /></td>
                  <td className="py-1 pr-2"><select value={it.unit || ""} onChange={(e) => set(i, "unit", e.target.value)} className={cell}><option value="">—</option>{UNITS.map((u) => <option key={u}>{u}</option>)}</select></td>
                  <td className="py-1 pr-2"><input type="number" step="0.01" value={it.rate} onChange={(e) => set(i, "rate", e.target.value)} className={cell} /></td>
                  <td className="py-1 pr-2"><select value={it.tax_rate} onChange={(e) => set(i, "tax_rate", Number(e.target.value))} className={cell}>{TAX_RATES.map((r) => <option key={r} value={r}>{r}%</option>)}</select></td>
                  <td className="py-2 text-right tabular-nums">{t.lines[i]?.taxable.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                  <td className="py-1 pl-1"><button type="button" onClick={() => setItems((xs) => xs.filter((_, j) => j !== i))} className="p-1.5 text-stone hover:text-brick" aria-label="Remove line"><Trash2 size={15} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {[["stay", "+ Stay"], ["food", "+ Food"], ["other", "+ Other service"], ["discount", "+ Discount"]].map(([k, l]) => (
            <button key={k} type="button" onClick={() => setItems((xs) => [...xs, { ...blank[k] }])} className="btn-ghost !px-3 !py-1 text-xs">{l}</button>
          ))}
        </div>
        <p className="mt-3 text-xs text-stone">GST guide (confirm with your CA): rooms at ₹{STAY_THRESHOLD.toLocaleString("en-IN")} or less per room per night before tax: 5%; above: 18%. Food: 5% (18% if Bevu counts as "specified premises"). Enter a discount as a negative rate. Accommodation is always taxed in Tamil Nadu, so it's always CGST + SGST.</p>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className={label} htmlFor="amount_paid">Amount received so far (₹)</label><input id="amount_paid" name="amount_paid" type="number" step="1" min="0" defaultValue={Number(inv.amount_paid || 0)} className={field} /></div>
            <div className="sm:col-span-2"><label className={label} htmlFor="notes">Note on invoice (optional)</label><textarea id="notes" name="notes" rows={2} defaultValue={inv.notes || ""} className={field} placeholder="e.g. Corporate offsite for Acme Ltd" /></div>
          </div>
        </Card>
        <Card>
          <dl className="grid grid-cols-[1fr_auto] gap-y-1 text-sm">
            <dt className="text-stone">Taxable value</dt><dd className="text-right tabular-nums">{rupees(t.subtotal)}</dd>
            {t.slabs.filter((s) => s.rate > 0).map((s) => <Fragment key={s.rate}><dt className="text-stone">CGST + SGST @ {s.rate}%</dt><dd className="text-right tabular-nums">{rupees(s.cgst + s.sgst)}</dd></Fragment>)}
            {t.round_off !== 0 && <><dt className="text-stone">Round off</dt><dd className="text-right tabular-nums">{rupees(t.round_off)}</dd></>}
            <dt className="mt-1 border-t border-ink/10 pt-2 font-semibold">Total</dt><dd className="mt-1 border-t border-ink/10 pt-2 text-right font-display text-2xl">{rupees(t.total)}</dd>
          </dl>
        </Card>
      </div>

      <Notice error={state?.error} ok={state?.ok} />
      {!sellerGstinSet && <Notice error="Bevu's GSTIN isn't set yet, so you can save drafts but not issue them. An admin can add it in Settings → Invoice details." />}
      <div className="flex flex-wrap gap-3">
        <SubmitButton className="btn-ghost" pendingText="Saving…" onClick={() => { intent.current.value = "save"; }}>Save draft</SubmitButton>
        <SubmitButton className="btn-primary" pendingText="Issuing…" onClick={(e) => { if (!confirm("Issue this invoice? It gets the next invoice number and can't be edited afterwards (only cancelled).")) { e.preventDefault(); return; } intent.current.value = "issue"; }}>Issue invoice</SubmitButton>
      </div>
    </form>
  );
}
