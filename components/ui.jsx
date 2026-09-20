// Small shared primitives for the account/admin areas (server-safe).
import { STATUS } from "@/lib/bookings";

export const field = "w-full rounded-xl border border-ink/15 bg-white/70 px-4 py-2.5 text-sm outline-none transition placeholder:text-stone focus:border-brick focus:ring-2 focus:ring-brick/20";
export const label = "mb-1.5 block text-[11px] font-medium uppercase tracking-[0.2em] text-bark/70";

export function StatusBadge({ status }) {
  const s = STATUS[status] || { label: status, cls: "bg-ink/10 text-stone" };
  return <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider ${s.cls}`}>{s.label}</span>;
}

export function Notice({ error, ok }) {
  if (!error && !ok) return null;
  return <p className={`rounded-xl px-4 py-3 text-sm ${error ? "bg-terracotta/10 text-brick-dark" : "bg-moss/10 text-forest"}`}>{error || ok}</p>;
}

export function Card({ children, className = "" }) {
  return <div className={`rounded-2xl bg-parchment p-6 ring-1 ring-ink/5 ${className}`}>{children}</div>;
}

export function PageTitle({ eyebrow, title, right }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="mt-2 font-display text-3xl md:text-4xl">{title}</h1>
      </div>
      {right}
    </div>
  );
}

export const money = (v) => (v == null ? "—" : `₹${Number(v).toLocaleString("en-IN")}`);
export const roomsLabel = (b, names = {}) => (b.kind === "house" ? "Whole house" : b.room_slugs.map((s) => names[s] || s).join(", "));
