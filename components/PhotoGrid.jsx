"use client";

import { useEffect, useState } from "react";
import Image from "@/components/Image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// A simple masonry photo grid with a lightbox. Pass items: [{ src, alt, tall? }].
// (GalleryGrid is bound to the main /gallery data; this one takes any list.)
export default function PhotoGrid({ items, columns = "columns-2 md:columns-3" }) {
  const [active, setActive] = useState(null);

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
      <div className={`${columns} gap-4 [&>*]:mb-4`}>
        {items.map((g, i) => (
          <motion.button
            key={g.src}
            type="button"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.05 }}
            onClick={() => setActive(i)}
            className="group relative block w-full overflow-hidden rounded-xl bg-sand break-inside-avoid"
            aria-label={`Open photo: ${g.alt}`}
          >
            <div className={`relative w-full ${g.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
              <Image src={g.src} alt={g.alt} fill loading="lazy" quality={75} sizes="(min-width: 1024px) 30vw, (min-width: 768px) 33vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
            </div>
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
              <Image src={items[active].src} alt={items[active].alt} fill quality={85} sizes="(min-width: 1280px) 1024px, 100vw" className="object-contain" />
              <p className="absolute inset-x-0 -bottom-8 text-center text-sm text-cream/70">{items[active].alt}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
