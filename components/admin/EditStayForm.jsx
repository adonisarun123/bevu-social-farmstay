"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { editBookingStayAction } from "@/actions/admin";
import SubmitButton from "@/components/SubmitButton";
import { field, label, Notice } from "@/components/ui";

export default function EditStayForm({ booking: b, rooms }) {
  const [state, action] = useFormState(editBookingStayAction, {});
  const [kind, setKind] = useState(b.kind);
  const d = (v) => (v ? String(v).slice(0, 10) : "");
  return (
    <details className="rounded-2xl bg-parchment p-6 ring-1 ring-ink/5">
      <summary className="cursor-pointer font-display text-xl">Change dates, rooms or guests</summary>
      <form action={action} className="mt-4 grid gap-4 sm:grid-cols-2">
        <input type="hidden" name="id" value={b.id} />
        <div className="sm:col-span-2 flex gap-2">
          {[{ v: "room", t: "Rooms" }, { v: "house", t: "Whole house" }].map((o) => <label key={o.v} className={`cursor-pointer rounded-xl border px-4 py-2 text-sm ${kind === o.v ? "border-brick bg-brick text-cream" : "border-ink/15"}`}><input type="radio" name="kind" value={o.v} checked={kind === o.v} onChange={() => setKind(o.v)} className="sr-only" />{o.t}</label>)}
        </div>
        {kind === "room" && <div className="sm:col-span-2 flex flex-wrap gap-2">{rooms.map((r) => <label key={r.slug} className="flex items-center gap-2 rounded-xl border border-ink/15 px-3 py-2 text-sm"><input type="checkbox" name="rooms" value={r.slug} defaultChecked={b.room_slugs.includes(r.slug)} />{r.name}</label>)}</div>}
        <div><label className={label}>Check-in</label><input name="check_in" type="date" required defaultValue={d(b.check_in)} className={field} /></div>
        <div><label className={label}>Check-out</label><input name="check_out" type="date" required defaultValue={d(b.check_out)} className={field} /></div>
        <div><label className={label}>Adults</label><input name="adults" type="number" min="1" defaultValue={b.adults} className={field} /></div>
        <div><label className={label}>Children</label><input name="children" type="number" min="0" defaultValue={b.children} className={field} /></div>
        <div><label className={label}>Dogs</label><input name="pets" type="number" min="0" defaultValue={b.pets} className={field} /></div>
        <div className="flex flex-col justify-end gap-2 text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" name="keep_amount" value="1" /> Keep the current total (don't re-estimate)</label>
          {state?.conflict && <label className="flex items-center gap-2"><input type="checkbox" name="force" value="1" /> Override the clash</label>}
        </div>
        <div className="sm:col-span-2"><Notice error={state?.error} ok={state?.ok} /></div>
        <div><SubmitButton className="btn-dark" pendingText="Saving…">Save changes</SubmitButton></div>
      </form>
      <p className="mt-3 text-xs text-stone">Confirmed guests get an email with the new details (if SMTP is set up). The timeline records the change.</p>
    </details>
  );
}
