"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { gallery, galleryCategories } from "@/data/gallery";

export default function GalleryGrid() {
  const [cat, setCat] = useState("All");
  const [active, setActive] = useState(null);
  const items = cat === "All" ? gallery : gallery.filter((g) => g.category === cat);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % items.length);
      if (e.key === "ArrowLeft") setActive((i) => (i - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, items.length]);

  return (
    <>
      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {galleryCategories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={`shrink-0 rounded-full border px-4 py-2 text-xs font-medium tracking-wide transition ${
              cat === c ? "border-ink bg-ink text-cream" : "border-ink/15 text-ink/70 hover:border-ink"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 columns-2 gap-4 md:columns-3 [&>*]:mb-4">
        {items.map((g, i) => (
          <motion.button
            key={g.src}
            type="button"
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setActive(i)}
            className="group relative block w-full overflow-hidden rounded-xl bg-sand break-inside-avoid"
            aria-label={`Open photo: ${g.alt}`}
          >
            <div className={`relative w-full ${g.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
              <Image src={g.src} alt={g.alt} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
            </div>
            {!g.real && <span className="absolute bottom-2 right-2 rounded bg-ink/60 px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-cream/80">placeholder</span>}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && items[active] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4"
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
          >
            <button type="button" className="absolute right-4 top-4 rounded-full border border-cream/20 p-2 text-cream" aria-label="Close" onClick={() => setActive(null)}><X /></button>
            <button type="button" className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-cream/20 p-2 text-cream" aria-label="Previous" onClick={(e) => { e.stopPropagation(); setActive((i) => (i - 1 + items.length) % items.length); }}><ChevronLeft /></button>
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-cream/20 p-2 text-cream" aria-label="Next" onClick={(e) => { e.stopPropagation(); setActive((i) => (i + 1) % items.length); }}><ChevronRight /></button>
            <motion.div key={items[active].src} initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative h-[80vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <Image src={items[active].src} alt={items[active].alt} fill sizes="100vw" className="object-contain" />
              <p className="absolute inset-x-0 -bottom-8 text-center text-sm text-cream/70">{items[active].alt}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
