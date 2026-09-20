"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { createManualBookingAction } from "@/actions/admin";
import SubmitButton from "@/components/SubmitButton";
import { field, label, Notice } from "@/components/ui";

export default function ManualBookingForm({ rooms }) {
  const [state, action] = useFormState(createManualBookingAction, {});
  const [kind, setKind] = useState("room");
  return (
    <form action={action} className="card p-6 md:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className={label} htmlFor="guest_name">Guest name</label><input id="guest_name" name="guest_name" required className={field} /></div>
        <div><label className={label} htmlFor="guest_phone">Phone / WhatsApp</label><input id="guest_phone" name="guest_phone" type="tel" className={field} placeholder="+91" /></div>
        <div className="sm:col-span-2"><label className={label} htmlFor="guest_email">Email <span className="normal-case tracking-normal text-stone">(links to their account if they have one)</span></label><input id="guest_email" name="guest_email" type="email" className={field} /></div>
        <div className="sm:col-span-2">
          <span className={label}>Stay</span>
          <div className="flex gap-2">{[{ v: "room", t: "Rooms" }, { v: "house", t: "Whole house" }].map((o) => <label key={o.v} className={`cursor-pointer rounded-xl border px-4 py-2 text-sm ${kind === o.v ? "border-brick bg-brick text-cream" : "border-ink/15"}`}><input type="radio" name="kind" value={o.v} checked={kind === o.v} onChange={() => setKind(o.v)} className="sr-only" />{o.t}</label>)}</div>
        </div>
        {kind === "room" && <div className="sm:col-span-2"><span className={label}>Rooms</span><div className="flex flex-wrap gap-2">{rooms.map((r) => <label key={r.slug} className="flex items-center gap-2 rounded-xl border border-ink/15 px-3 py-2 text-sm"><input type="checkbox" name="rooms" value={r.slug} defaultChecked={r.slug === rooms[0].slug} />{r.name}</label>)}</div></div>}
        <div><label className={label} htmlFor="check_in">Check-in</label><input id="check_in" name="check_in" type="date" required className={field} /></div>
        <div><label className={label} htmlFor="check_out">Check-out</label><input id="check_out" name="check_out" type="date" required className={field} /></div>
        <div><label className={label} htmlFor="adults">Adults</label><input id="adults" name="adults" type="number" min="1" defaultValue={2} className={field} /></div>
        <div><label className={label} htmlFor="children">Children</label><input id="children" name="children" type="number" min="0" defaultValue={0} className={field} /></div>
        <div><label className={label} htmlFor="pets">Dogs</label><input id="pets" name="pets" type="number" min="0" defaultValue={0} className={field} /></div>
        <div><label className={label} htmlFor="status">Status</label><select id="status" name="status" defaultValue="confirmed" className={field}><option value="confirmed">Confirmed</option><option value="requested">Requested (tentative)</option><option value="completed">Completed (past stay)</option></select></div>
        <div><label className={label} htmlFor="amount">Total (₹) <span className="normal-case tracking-normal text-stone">(blank = from rates)</span></label><input id="amount" name="amount" type="number" min="0" className={field} /></div>
        <div className="sm:col-span-2"><label className={label} htmlFor="admin_notes">Internal notes</label><textarea id="admin_notes" name="admin_notes" rows={2} className={field} /></div>
        {state?.conflict && <label className="flex items-center gap-2 text-sm sm:col-span-2"><input type="checkbox" name="force" value="1" /> Override the clash and add anyway</label>}
      </div>
      <div className="mt-4"><Notice error={state?.error} /></div>
      <div className="mt-4"><SubmitButton pendingText="Saving…">Add booking</SubmitButton></div>
    </form>
  );
}
