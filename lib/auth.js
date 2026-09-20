import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";
import { sql } from "./db";

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
export async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== "admin") throw new Error("FORBIDDEN");
  return user;
}
