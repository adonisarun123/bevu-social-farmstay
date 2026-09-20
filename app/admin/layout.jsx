import Link from "next/link";
import { LayoutDashboard, CalendarDays, Ban, IndianRupee, Users, Inbox, LogOut, PlusCircle, Settings } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import SignOutButton from "@/components/SignOutButton";
import Logo from "@/components/Logo";

export const metadata = { title: "Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const nav = [
  { href: "/admin", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/admin/bookings", label: "Bookings", Icon: CalendarDays },
  { href: "/admin/availability", label: "Blocks", Icon: Ban },
  { href: "/admin/rates", label: "Rates", Icon: IndianRupee },
  { href: "/admin/guests", label: "Guests", Icon: Users },
  { href: "/admin/enquiries", label: "Enquiries", Icon: Inbox },
  { href: "/admin/settings", label: "Settings", Icon: Settings },
];

export default async function AdminLayout({ children }) {
  const admin = await requireAdmin();
  return (
    <div className="min-h-screen bg-cream pt-[76px] lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="border-b border-ink/10 bg-parchment lg:border-b-0 lg:border-r">
        <div className="wrap flex items-center gap-2 overflow-x-auto py-3 lg:flex-col lg:items-stretch lg:gap-1 lg:px-4 lg:py-6">
          <div className="hidden pb-4 lg:block"><span className="eyebrow">Admin</span><div className="mt-1 text-sm text-stone">{admin.name}</div></div>
          {nav.map(({ href, label, Icon }) => (
            <Link key={href} href={href} className="flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-ink/80 transition hover:bg-brick/10 hover:text-brick"><Icon size={16} />{label}</Link>
          ))}
          <Link href="/admin/bookings/new" className="flex shrink-0 items-center gap-2 rounded-xl bg-brick px-3 py-2 text-sm font-medium text-cream lg:mt-3"><PlusCircle size={16} />Add booking</Link>
          <div className="lg:mt-auto lg:pt-6"><SignOutButton className="flex items-center gap-2 px-3 py-2 text-sm text-stone hover:text-brick"><LogOut size={16} />Sign out</SignOutButton></div>
        </div>
      </aside>
      <main className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">{children}</main>
    </div>
  );
}
