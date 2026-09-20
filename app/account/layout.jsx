import Link from "next/link";
import { auth } from "@/lib/auth";
import SignOutButton from "@/components/SignOutButton";

export const metadata = { title: "My account", robots: { index: false, follow: false } };

export default async function AccountLayout({ children }) {
  const session = await auth();
  const user = session?.user;
  return (
    <div className="pt-[76px]">
      <div className="border-b border-ink/10 bg-parchment">
        <div className="wrap flex flex-wrap items-center justify-between gap-3 py-4">
          <nav className="flex flex-wrap gap-5 text-sm" aria-label="Account">
            <Link href="/account" className="font-medium hover:text-brick">My stays</Link>
            <Link href="/account/book" className="font-medium hover:text-brick">Request a stay</Link>
            <Link href="/account/profile" className="font-medium hover:text-brick">Profile</Link>
            {user?.role === "admin" && <Link href="/admin" className="font-medium text-brick">Admin →</Link>}
          </nav>
          <div className="flex items-center gap-4 text-sm text-stone">
            <span>{user?.name}</span>
            <SignOutButton />
          </div>
        </div>
      </div>
      <div className="wrap py-10 md:py-14">{children}</div>
    </div>
  );
}
