"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { loginAction, registerAction } from "@/actions/auth";
import SubmitButton from "./SubmitButton";
import { field, label, Notice } from "./ui";

export default function AuthForm({ mode = "login", next = "" }) {
  const isLogin = mode === "login";
  const [state, action] = useFormState(isLogin ? loginAction : registerAction, {});
  return (
    <form action={action} className="card p-6 md:p-8">
      <input type="hidden" name="next" value={next} />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="space-y-4">
        {!isLogin && <div><label className={label} htmlFor="name">Name</label><input id="name" name="name" required className={field} placeholder="Your name" autoComplete="name" /></div>}
        <div><label className={label} htmlFor="email">Email</label><input id="email" name="email" type="email" required className={field} placeholder="you@example.com" autoComplete="email" /></div>
        {!isLogin && <div><label className={label} htmlFor="phone">Phone / WhatsApp</label><input id="phone" name="phone" type="tel" className={field} placeholder="+91" autoComplete="tel" /></div>}
        <div><label className={label} htmlFor="password">Password</label><input id="password" name="password" type="password" required minLength={8} className={field} placeholder={isLogin ? "Your password" : "At least 8 characters"} autoComplete={isLogin ? "current-password" : "new-password"} /></div>
        {isLogin && <p className="text-right text-xs"><Link href="/forgot-password" className="text-brick">Forgot password?</Link></p>}
        <Notice error={state?.error} />
        <SubmitButton className="btn-primary w-full" pendingText={isLogin ? "Signing in…" : "Creating account…"}>{isLogin ? "Sign in" : "Create account"}</SubmitButton>
      </div>
      <p className="mt-6 text-center text-sm text-bark/70">
        {isLogin ? <>New here? <Link href={`/register${next ? `?next=${encodeURIComponent(next)}` : ""}`} className="font-medium text-brick">Create an account</Link></> : <>Already have an account? <Link href={`/login${next ? `?next=${encodeURIComponent(next)}` : ""}`} className="font-medium text-brick">Sign in</Link></>}
      </p>
    </form>
  );
}
