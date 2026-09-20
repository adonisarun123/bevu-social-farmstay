"use server";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { sql } from "@/lib/db";
import { signIn, requireUser } from "@/lib/auth";
import { sendMail, adminEmails } from "@/lib/mail";
import { site } from "@/data/site";

const clean = (v) => String(v || "").trim();

export async function registerAction(prev, formData) {
  if (String(formData.get("website") || "")) return { error: "Something went wrong. Please try again." }; // honeypot
  const name = clean(formData.get("name"));
  const email = clean(formData.get("email")).toLowerCase();
  const phone = clean(formData.get("phone"));
  const password = String(formData.get("password") || "");
  const next = clean(formData.get("next")) || "/account";
  if (name.length < 2) return { error: "Please enter your name." };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { error: "Please enter a valid email." };
  if (password.length < 8) return { error: "Password must be at least 8 characters." };
  const existing = await sql`SELECT 1 FROM users WHERE email = ${email}`;
  if (existing.length) return { error: "An account with this email already exists. Sign in instead." };
  const hash = await bcrypt.hash(password, 11);
  // First user, or any address listed in ADMIN_EMAIL (comma-separated), becomes admin.
  const count = await sql`SELECT count(*)::int AS n FROM users`;
  const isAdmin = count[0].n === 0 || adminEmails().includes(email);
  await sql`INSERT INTO users (email, password_hash, name, phone, role) VALUES (${email}, ${hash}, ${name}, ${phone || null}, ${isAdmin ? "admin" : "guest"})`;
  try {
    await signIn("credentials", { email, password, redirect: false });
  } catch (e) {
    if (!(e instanceof AuthError)) throw e;
    return { error: "Account created, but sign-in failed. Please sign in." };
  }
  redirect(isAdmin ? "/admin" : next);
}

export async function loginAction(prev, formData) {
  const email = clean(formData.get("email")).toLowerCase();
  const password = String(formData.get("password") || "");
  const next = clean(formData.get("next")) || "";
  try {
    await signIn("credentials", { email, password, redirect: false });
  } catch (e) {
    if (e instanceof AuthError) return { error: "Wrong email or password." };
    throw e;
  }
  const rows = await sql`SELECT role FROM users WHERE email = ${email}`;
  redirect(next || (rows[0]?.role === "admin" ? "/admin" : "/account"));
}

export async function updateProfileAction(prev, formData) {
  const user = await requireUser();
  const name = clean(formData.get("name"));
  const phone = clean(formData.get("phone"));
  if (name.length < 2) return { error: "Please enter your name." };
  await sql`UPDATE users SET name = ${name}, phone = ${phone || null} WHERE id = ${user.id}`;
  const pw = String(formData.get("password") || "");
  if (pw) {
    if (pw.length < 8) return { error: "New password must be at least 8 characters." };
    const hash = await bcrypt.hash(pw, 11);
    await sql`UPDATE users SET password_hash = ${hash} WHERE id = ${user.id}`;
  }
  return { ok: "Saved. Sign out and back in to refresh your name in the menu." };
}

// ── Password reset ───────────────────────────────────────────────────────────
export async function forgotPasswordAction(prev, formData) {
  if (String(formData.get("website") || "")) return { ok: "If that email exists, we've sent a reset link." }; // honeypot
  const email = clean(formData.get("email")).toLowerCase();
  if (!email) return { error: "Enter your email." };
  const rows = await sql`SELECT id, name FROM users WHERE email = ${email}`;
  if (rows[0]) {
    const token = crypto.randomUUID().replace(/-/g, "") + crypto.randomUUID().replace(/-/g, "");
    await sql`DELETE FROM password_resets WHERE user_id = ${rows[0].id}`;
    await sql`INSERT INTO password_resets (token, user_id, expires_at) VALUES (${token}, ${rows[0].id}, now() + interval '1 hour')`;
    const url = `${site.url}/reset-password?token=${token}`;
    const sent = await sendMail({ to: email, subject: `Reset your password — ${site.name}`, text: `Hi ${rows[0].name},\n\nUse this link within the next hour to set a new password:\n${url}\n\nIf you didn't ask for this, ignore this email.\n\n${site.name}` });
    if (!sent) console.warn("[forgot-password] SMTP not configured; reset link:", url);
  }
  return { ok: "If that email exists, we've sent a reset link. Check spam too." };
}

export async function resetPasswordAction(prev, formData) {
  const token = clean(formData.get("token"));
  const password = String(formData.get("password") || "");
  if (password.length < 8) return { error: "Password must be at least 8 characters." };
  const rows = await sql`SELECT r.user_id, u.email FROM password_resets r JOIN users u ON u.id = r.user_id WHERE r.token = ${token} AND r.used_at IS NULL AND r.expires_at > now()`;
  if (!rows[0]) return { error: "This reset link is invalid or has expired. Request a new one." };
  const hash = await bcrypt.hash(password, 11);
  await sql`UPDATE users SET password_hash = ${hash} WHERE id = ${rows[0].user_id}`;
  await sql`UPDATE password_resets SET used_at = now() WHERE token = ${token}`;
  try { await signIn("credentials", { email: rows[0].email, password, redirect: false }); } catch (e) { if (!(e instanceof AuthError)) throw e; }
  redirect("/account?reset=1");
}
