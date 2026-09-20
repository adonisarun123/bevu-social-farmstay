"use client";

import { useFormState } from "react-dom";
import { saveRateAction } from "@/actions/admin";
import SubmitButton from "@/components/SubmitButton";
import { field, label, Notice } from "@/components/ui";

export default function RateForm({ rate }) {
  const [state, action] = useFormState(saveRateAction, {});
  const r = rate || {};
  return (
    <form action={action} className="card grid gap-4 p-6 sm:grid-cols-2">
      {r.id && <input type="hidden" name="id" value={r.id} />}
      <div><label className={label}>Applies to</label><select name="kind" defaultValue={r.kind || "room"} className={field}><option value="room">Per room / night</option><option value="house">Whole house / night</option></select></div>
      <div><label className={label}>Label</label><input name="label" defaultValue={r.label || "Standard"} className={field} placeholder="Standard, Diwali, Summer…" /></div>
      <div><label className={label}>Weekday (Sun–Thu nights) ₹</label><input name="weekday" type="number" min="0" required defaultValue={r.weekday ?? ""} className={field} /></div>
      <div><label className={label}>Weekend (Fri, Sat nights) ₹</label><input name="weekend" type="number" min="0" required defaultValue={r.weekend ?? ""} className={field} /></div>
      <div><label className={label}>Season from <span className="normal-case tracking-normal text-stone">(blank = default)</span></label><input name="valid_from" type="date" defaultValue={r.valid_from ? String(r.valid_from).slice(0, 10) : ""} className={field} /></div>
      <div><label className={label}>Season to</label><input name="valid_to" type="date" defaultValue={r.valid_to ? String(r.valid_to).slice(0, 10) : ""} className={field} /></div>
      <div className="sm:col-span-2"><Notice error={state?.error} ok={state?.ok} /></div>
      <div><SubmitButton pendingText="Saving…">{r.id ? "Update" : "Add rate"}</SubmitButton></div>
    </form>
  );
}
