import { Plus } from "lucide-react";
import RichText from "./RichText";

// Native <details> accordion. Server-rendered on purpose: every answer is in the HTML whether or not
// it is expanded, so search engines and AI crawlers read the same text the FAQPage JSON-LD claims.
// (The previous client-side version removed closed answers from the DOM.)
export default function FAQ({ items, openFirst = true }) {
  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map((f, i) => (
        <details key={f.question} open={openFirst && i === 0} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
            <h3 className="font-display text-lg md:text-xl">{f.question}</h3>
            <Plus size={20} className="shrink-0 text-brick transition-transform duration-300 group-open:rotate-45" />
          </summary>
          <p className="max-w-2xl pb-6 leading-relaxed text-bark/80"><RichText text={f.answer} /></p>
        </details>
      ))}
    </div>
  );
}
