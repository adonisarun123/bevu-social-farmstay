"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

// Floating back-to-top button; appears after the guest scrolls past the hero.
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-6 right-5 z-50 grid h-12 w-12 place-items-center rounded-full border border-[var(--line)] bg-night/70 text-gold shadow-[0_6px_24px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-500 hover:scale-105 hover:border-gold sm:right-6 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ChevronUp className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
    </button>
  );
}
