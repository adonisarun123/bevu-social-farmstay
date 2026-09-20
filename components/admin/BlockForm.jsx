"use client";

import { useFormState } from "react-dom";
import { addBlockAction } from "@/actions/admin";
import SubmitButton from "@/components/SubmitButton";
import { field, label, Notice } from "@/components/ui";

export default function BlockForm({ rooms }) {
  const [state, action] = useFormState(addBlockAction, {});
  return (
    <form action={action} className="card grid gap-4 p-6 sm:grid-cols-2 md:p-8">
      <div className="sm:col-span-2"><label className={label} htmlFor="room_slug">What to block</label><select id="room_slug" name="room_slug" className={field}><option value="">Whole property (all rooms)</option>{rooms.map((r) => <option key={r.slug} value={r.slug}>{r.name} only</option>)}</select></div>
      <div><label className={label} htmlFor="start_date">From (first blocked night)</label><input id="start_date" name="start_date" type="date" required className={field} /></div>
      <div><label className={label} htmlFor="end_date">To (last blocked night)</label><input id="end_date" name="end_date" type="date" required className={field} /></div>
      <div className="sm:col-span-2"><label className={label} htmlFor="reason">Reason</label><input id="reason" name="reason" className={field} placeholder="Family visit, pool maintenance, …" /></div>
      <div className="sm:col-span-2"><Notice error={state?.error} ok={state?.ok} /></div>
      <div><SubmitButton pendingText="Saving…">Block dates</SubmitButton></div>
    </form>
  );
}
