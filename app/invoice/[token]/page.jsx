import { notFound } from "next/navigation";
import { loadInvoice } from "@/lib/invoice-server";
import InvoiceDocument from "@/components/invoice/InvoiceDocument";
import PrintButton from "@/components/invoice/PrintButton";

// Guest-facing invoice: unguessable link, issued/cancelled invoices only, never indexed.
export const dynamic = "force-dynamic";
export const metadata = { title: "Invoice", robots: { index: false, follow: false } };

export default async function PublicInvoicePage({ params }) {
  if (!/^[a-f0-9]{40}$/.test(params.token || "")) notFound();
  const data = await loadInvoice({ token: params.token });
  if (!data || data.inv.status === "draft") notFound();
  return (
    <section className="bg-cream px-4 pb-16 pt-[100px]">
      <div className="mx-auto mb-6 flex max-w-[820px] flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-bark/75">Invoice {data.inv.number}</p>
        <PrintButton />
      </div>
      <InvoiceDocument {...data} />
    </section>
  );
}
