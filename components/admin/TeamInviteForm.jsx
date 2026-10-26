"use client";

import { useFormState } from "react-dom";
import { addTeamMemberAction } from "@/actions/admin";
import SubmitButton from "@/components/SubmitButton";
import { field, label, Notice } from "@/components/ui";

export default function TeamInviteForm() {
  const [state, action] = useFormState(addTeamMemberAction, {});
  return (
    <form action={action} className="grid gap-4 sm:grid-cols-2">
      <div><label className={label} htmlFor="tm_name">Name</label><input id="tm_name" name="name" className={field} placeholder="Only needed if they're new" /></div>
      <div><label className={label} htmlFor="tm_email">Email</label><input id="tm_email" name="email" type="email" required className={field} placeholder="name@example.com" /></div>
      <div className="sm:col-span-2">
        <label className={label} htmlFor="tm_role">Role</label>
        <select id="tm_role" name="role" defaultValue="manager" className={field}>
          <option value="manager">Manager: bookings, blocks, guests, enquiries</option>
          <option value="admin">Admin: everything, incl. rates, media, settings, team</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <Notice error={state?.error} ok={state?.ok} />
        {state?.link && <code className="mt-2 block break-all rounded-xl bg-cream p-3 text-xs">{state.link}</code>}
      </div>
      <div><SubmitButton pendingText="Adding…">Add to team</SubmitButton></div>
    </form>
  );
}
