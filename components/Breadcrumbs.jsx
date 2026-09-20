import Link from "next/link";
import { ChevronRight } from "lucide-react";

// Visible breadcrumb trail (pairs with breadcrumbSchema JSON-LD). Pass [{name, path}], home included.
export default function Breadcrumbs({ items, tone = "dark" }) {
  const base = tone === "light" ? "text-cream/70" : "text-stone";
  const link = tone === "light" ? "hover:text-cream" : "hover:text-brick";
  return (
    <nav aria-label="Breadcrumb" className={`text-xs ${base}`}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={it.path} className="flex items-center gap-1.5">
              {last ? <span aria-current="page" className="truncate">{it.name}</span> : <Link href={it.path} className={link}>{it.name}</Link>}
              {!last && <ChevronRight size={12} aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
