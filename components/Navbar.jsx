"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Leaf } from "lucide-react";
import { navLinks } from "@/data/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-offwhite/90 shadow-sm backdrop-blur-md"
          : "bg-gradient-to-b from-charcoal/50 to-transparent"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-content items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
      >
        <Link href="/" className="flex items-center gap-2" aria-label="Bevu Social Farmstay — Home">
          <Leaf
            className={`h-6 w-6 ${scrolled || open ? "text-forest" : "text-beige"}`}
            aria-hidden="true"
          />
          <span
            className={`font-heading text-lg font-semibold tracking-wide sm:text-xl ${
              scrolled || open ? "text-forest" : "text-offwhite"
            }`}
          >
            Bevu Social Farmstay
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-clay ${
                  pathname === link.href
                    ? "text-clay"
                    : scrolled
                      ? "text-charcoal"
                      : "text-offwhite"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              className="rounded-full bg-clay px-5 py-2 text-sm font-semibold text-offwhite transition-colors hover:bg-laterite"
            >
              Book Now
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className={`lg:hidden ${scrolled || open ? "text-forest" : "text-offwhite"}`}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-sand bg-offwhite px-4 pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block rounded-lg px-3 py-2.5 text-base font-medium ${
                    pathname === link.href
                      ? "bg-beige text-clay"
                      : "text-charcoal hover:bg-beige"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-3">
              <Link
                href="/contact"
                className="block rounded-full bg-clay px-5 py-3 text-center text-base font-semibold text-offwhite"
              >
                Book Now
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
