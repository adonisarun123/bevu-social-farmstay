import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";
import { sql } from "./db";
import { redirect } from "next/navigation";
import { isStaff } from "./roles";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Email & password",
      credentials: { email: { label: "Email", type: "email" }, password: { label: "Password", type: "password" } },
      async authorize(creds) {
        const email = String(creds?.email || "").trim().toLowerCase();
        const password = String(creds?.password || "");
        if (!email || !password) return null;
        const rows = await sql`SELECT id, email, name, phone, role, password_hash FROM users WHERE email = ${email} LIMIT 1`;
        const u = rows[0];
        if (!u) return null;
        const ok = await bcrypt.compare(password, u.password_hash);
        if (!ok) return null;
        await sql`UPDATE users SET last_login_at = now() WHERE id = ${u.id}`;
        return { id: u.id, email: u.email, name: u.name, phone: u.phone, role: u.role };
      },
    }),
  ],
});

// Helpers for server components / actions
export async function requireUser() {
  const session = await auth();
  if (!session?.user) throw new Error("UNAUTHENTICATED");
  return session.user;
}
// Staff checks re-read the role from the database, so promoting, demoting or removing
// a team member takes effect on their next request (the JWT can be up to 30 days old).
async function currentRole(user) {
  const rows = await sql`SELECT role FROM users WHERE id = ${user.id}::uuid`;
  return rows[0]?.role || "guest";
}
export async function requireStaff() {
  const user = await requireUser();
  const role = await currentRole(user);
  if (!isStaff(role)) throw new Error("FORBIDDEN");
  return { ...user, role };
}
export async function requireAdmin() {
  const user = await requireUser();
  const role = await currentRole(user);
  if (role !== "admin") throw new Error("FORBIDDEN");
  return { ...user, role };
}
// For admin-only pages: managers are sent back to the dashboard instead of an error page.
export async function requireAdminPage() {
  const user = await requireStaff();
  if (user.role !== "admin") redirect("/admin");
  return user;
}
