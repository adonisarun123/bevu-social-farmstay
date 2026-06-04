"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { galleryCategories, galleryImages } from "@/data/gallery";

export default function GalleryGrid() {
  const [active, setActive] = useState("All");

  const images =
    active === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === active);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2.5" role="tablist" aria-label="Gallery categories">
        {galleryCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={active === cat}
            onClick={() => setActive(cat)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active === cat
                ? "bg-forest text-offwhite"
                : "bg-beige text-charcoal hover:bg-sand"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {images.map((img) => (
            <motion.figure
              key={img.image}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="group relative h-64 overflow-hidden rounded-2xl"
            >
              <Image
                src={img.image}
                alt={img.alt}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/70 to-transparent p-4 text-xs font-medium text-offwhite">
                {img.category}
              </figcaption>
            </motion.figure>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
