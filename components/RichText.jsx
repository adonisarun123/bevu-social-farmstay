import Link from "next/link";

// Minimal inline formatter for content in data/*.js: turns [label](/path) or [label](https://…)
// into links so body copy can link internally. Everything else renders as plain text.
const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

export function plainText(text = "") {
  return String(text).replace(LINK, "$1");
}

export default function RichText({ text = "", linkClass = "font-medium text-brick underline decoration-brick/30 underline-offset-4 transition hover:decoration-brick" }) {
  const out = [];
  let last = 0;
  let m;
  LINK.lastIndex = 0;
  while ((m = LINK.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const [, label, href] = m;
    out.push(
      href.startsWith("/") ? (
        <Link key={m.index} href={href} className={linkClass}>{label}</Link>
      ) : (
        <a key={m.index} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>{label}</a>
      )
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}
