"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, MessageCircle, UserRound } from "lucide-react";
import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, site } from "@/data/site";
import Logo from "./Logo";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;
  const accountHref = user ? (user.role === "admin" ? "/admin" : "/account") : "/login";
  const accountLabel = user ? (user.role === "admin" ? "Admin" : "My stays") : "Sign in";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const transparentAtTop = pathname === "/"; // home has a full-bleed dark hero

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const solid = scrolled || !transparentAtTop || open;
  const tone = solid ? "dark" : "light";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? "bg-cream/90 shadow-[0_1px_0_rgba(30,26,22,0.08)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="wrap flex h-[76px] items-center justify-between">
        <Logo tone={tone} height={52} />

        <nav className="hidden items-center gap-5 lg:flex xl:gap-7" aria-label="Primary">
          {navLinks.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative whitespace-nowrap text-[13.5px] font-medium tracking-wide transition-colors ${l.compact ? "hidden xl:inline-block" : ""} ${
                  solid ? "text-ink/80 hover:text-brick" : "text-cream/85 hover:text-cream"
                } ${active ? (solid ? "text-brick" : "text-cream") : ""}`}
              >
                {l.label}
                {active && <span className="absolute -bottom-2 left-0 h-px w-full bg-current" />}
              </Link>
            );
          })}
          <Link href={accountHref} className={`inline-flex items-center gap-1.5 whitespace-nowrap text-[13.5px] font-medium ${solid ? "text-ink/80 hover:text-brick" : "text-cream/85 hover:text-cream"}`}><UserRound size={15} /> {accountLabel}</Link>
          <Link href={user ? "/account/book" : "/login?next=/account/book"} className={`whitespace-nowrap ${solid ? "btn-primary !py-2.5" : "btn-light !py-2.5"}`}>
            Book a stay
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`inline-flex h-11 w-11 items-center justify-center rounded-full lg:hidden ${solid ? "text-ink" : "text-cream"}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden"
          >
            <nav className="wrap flex h-[calc(100dvh-76px)] flex-col gap-1 overflow-y-auto bg-cream pb-10 pt-4" aria-label="Mobile">
              {[{ href: "/", label: "Home" }, ...navLinks].map((l, i) => (
                <motion.div key={l.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                  <Link
                    href={l.href}
                    className={`block border-b border-ink/10 py-4 font-display text-3xl ${pathname === l.href ? "text-brick" : "text-ink"}`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-8 flex flex-col gap-3">
                <Link href={user ? "/account/book" : "/login?next=/account/book"} className="btn-primary">Book a stay online</Link>
                <Link href={accountHref} className="btn-ghost"><UserRound size={16} /> {accountLabel}</Link>
                <a href={site.whatsappHref()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                  <MessageCircle size={18} /> WhatsApp us
                </a>
                <a href={site.phoneHref} className="btn-ghost">Call {site.phoneDisplay}</a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
