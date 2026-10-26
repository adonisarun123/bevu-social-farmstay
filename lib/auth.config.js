import { isStaff, isAdminOnlyPath } from "./roles";

// Edge-safe part of the Auth.js config (no DB, no bcrypt) — used by middleware.
export const authConfig = {
  pages: { signIn: "/login" },
  session: { strategy: "jwt", maxAge: 30 * 24 * 3600 },
  trustHost: true,
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
        token.phone = user.phone;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.phone = token.phone;
      return session;
    },
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      const user = auth?.user;
      if (pathname.startsWith("/admin")) {
        if (!isStaff(user?.role)) return false;
        if (user.role !== "admin" && isAdminOnlyPath(pathname)) return Response.redirect(new URL("/admin", request.nextUrl));
        return true;
      }
      if (pathname.startsWith("/account")) return Boolean(user);
      return true;
    },
  },
  providers: [],
};
