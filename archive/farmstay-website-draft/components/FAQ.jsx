"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

// Accessible accordion. Content stays in the DOM for SEO/AEO crawlers.
export default function FAQ({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="divide-y divide-sand rounded-2xl border border-sand bg-offwhite">
      {items.map((faq, i) => {
        const open = openIndex === i;
        return (
          <div key={faq.question}>
            <h3>
              <button
                type="button"
                onClick={() => setOpenIndex(open ? -1 : i)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-medium text-forest transition-colors hover:text-clay"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-sm leading-relaxed text-charcoal/75">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
