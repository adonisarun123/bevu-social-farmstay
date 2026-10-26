"use client";

import { useFormState } from "react-dom";
import { saveInvoiceSettingsAction } from "@/actions/invoices";
import SubmitButton from "@/components/SubmitButton";
import { field, label, Notice, Card } from "@/components/ui";

const F = ({ name, l, seller, ...p }) => <div><label className={label} htmlFor={`inv_${name}`}>{l}</label><input id={`inv_${name}`} name={name} defaultValue={seller[name] || ""} className={field} {...p} /></div>;

export default function InvoiceSettingsForm({ seller }) {
  const [state, action] = useFormState(saveInvoiceSettingsAction, {});
  return (
    <Card>
      <h2 className="font-display text-xl">Invoice details</h2>
      <p className="mt-2 text-sm text-bark/75">These print on every GST invoice. Each issued invoice keeps a copy of the details it was issued with, so later changes don't alter old invoices.</p>
      <form action={action} className="mt-5 grid gap-4 md:grid-cols-2">
        <F name="gstin" l="GSTIN (required to issue)" seller={seller} maxLength={15} placeholder="33ABCDE1234F1Z5" className={`${field} uppercase`} />
        <F name="prefix" l="Invoice number prefix" seller={seller} maxLength={6} placeholder="BSF" />
        <F name="legal_name" l="Legal name (as on GST certificate)" seller={seller} />
        <F name="trade_name" l="Trade name" seller={seller} />
        <div className="md:col-span-2"><label className={label} htmlFor="inv_address">Registered address</label><textarea id="inv_address" name="address" rows={2} defaultValue={seller.address} className={field} /></div>
        <F name="state" l="State" seller={seller} />
        <F name="state_code" l="State code" seller={seller} maxLength={2} />
        <F name="phone" l="Phone" seller={seller} />
        <F name="email" l="Email" seller={seller} />
        <div><label className={label} htmlFor="inv_bank">Payment details (bank / UPI)</label><textarea id="inv_bank" name="bank" rows={3} defaultValue={seller.bank} className={field} placeholder={"A/c name, number, IFSC\nUPI: name@bank"} /></div>
        <div><label className={label} htmlFor="inv_terms">Footer / terms</label><textarea id="inv_terms" name="terms" rows={3} defaultValue={seller.terms} className={field} /></div>
        <div className="md:col-span-2"><Notice error={state?.error} ok={state?.ok} /></div>
        <div><SubmitButton className="btn-dark" pendingText="Saving…">Save invoice details</SubmitButton></div>
      </form>
      <p className="mt-4 text-xs text-stone">Numbers look like <code>BSF/2026-27/0001</code>: sequential, restart every 1 April, 16 characters max as GST rules require. A number is only used when an invoice is issued, so drafts never leave gaps.</p>
    </Card>
  );
}
