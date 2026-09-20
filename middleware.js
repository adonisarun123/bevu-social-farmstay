import NextAuth from "next-auth";
import { authConfig } from "./lib/auth.config";

// Edge middleware: redirects unauthenticated users away from /account and non-admins away from /admin.
export default NextAuth(authConfig).auth;

export const config = { matcher: ["/account/:path*", "/admin/:path*"] };
