import Link from "next/link";

// Wordmark with a small neem-leaf mark. `tone` = "light" on dark backgrounds.
export default function Logo({ tone = "dark", className = "" }) {
  const text = tone === "light" ? "text-cream" : "text-ink";
  const sub = tone === "light" ? "text-cream/70" : "text-bark/70";
  return (
    <Link href="/" className={`group inline-flex items-center gap-3 ${className}`} aria-label="Bevu Social Farmstay — home">
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true" className="shrink-0">
        <circle cx="17" cy="17" r="16" className="fill-brick" />
        <path d="M17 7c-5 3-8 8-8 13 0 3 1.5 5.5 4 7 0-6 2-11 6-16-2 5-3.5 10-3.5 16 4 0 8-3 9-8 1-5-2-9-7.5-12z" fill="#F7F1E6" />
      </svg>
      <span className="leading-none">
        <span className={`block font-display text-[1.35rem] tracking-tight ${text}`}>
          Bevu <em className="not-italic font-light">Social</em>
        </span>
        <span className={`mt-1 block text-[10px] font-medium uppercase tracking-[0.32em] ${sub}`}>Farmstay</span>
      </span>
    </Link>
  );
}
