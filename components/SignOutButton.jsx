"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton({ className = "text-brick hover:underline", children = "Sign out" }) {
  return (
    <button type="button" onClick={() => signOut({ callbackUrl: "/" })} className={className}>
      {children}
    </button>
  );
}
