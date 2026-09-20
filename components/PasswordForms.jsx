"use client";

import { useFormState } from "react-dom";
import { forgotPasswordAction, resetPasswordAction } from "@/actions/auth";
import SubmitButton from "./SubmitButton";
import { field, label, Notice } from "./ui";

export function ForgotForm() {
  const [state, action] = useFormState(forgotPasswordAction, {});
  return (
    <form action={action} className="card space-y-4 p-6 md:p-8">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div><label className={label} htmlFor="email">Email</label><input id="email" name="email" type="email" required className={field} autoComplete="email" /></div>
      <Notice error={state?.error} ok={state?.ok} />
      {!state?.ok && <SubmitButton className="btn-primary w-full" pendingText="Sending…">Send reset link</SubmitButton>}
    </form>
  );
}

export function ResetForm({ token }) {
  const [state, action] = useFormState(resetPasswordAction, {});
  return (
    <form action={action} className="card space-y-4 p-6 md:p-8">
      <input type="hidden" name="token" value={token} />
      <div><label className={label} htmlFor="password">New password</label><input id="password" name="password" type="password" minLength={8} required className={field} autoComplete="new-password" /></div>
      <Notice error={state?.error} />
      <SubmitButton className="btn-primary w-full" pendingText="Saving…">Set new password</SubmitButton>
    </form>
  );
}
