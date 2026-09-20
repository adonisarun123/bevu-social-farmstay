"use client";

import { useFormState } from "react-dom";
import { updateProfileAction } from "@/actions/auth";
import SubmitButton from "@/components/SubmitButton";
import { field, label, Notice } from "@/components/ui";

export default function ProfileForm({ user }) {
  const [state, action] = useFormState(updateProfileAction, {});
  return (
    <form action={action} className="card space-y-4 p-6 md:p-8">
      <div><label className={label} htmlFor="name">Name</label><input id="name" name="name" defaultValue={user.name} required className={field} /></div>
      <div><label className={label} htmlFor="email">Email</label><input id="email" value={user.email} disabled className={`${field} opacity-60`} /></div>
      <div><label className={label} htmlFor="phone">Phone / WhatsApp</label><input id="phone" name="phone" type="tel" defaultValue={user.phone || ""} className={field} /></div>
      <div><label className={label} htmlFor="password">New password <span className="normal-case tracking-normal text-stone">(leave blank to keep)</span></label><input id="password" name="password" type="password" minLength={8} className={field} autoComplete="new-password" /></div>
      <Notice error={state?.error} ok={state?.ok} />
      <SubmitButton pendingText="Saving…">Save</SubmitButton>
    </form>
  );
}
