"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import CTAButton from "./CTAButton";

export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden">
      <Image
        src="/images/bevu-hero.jpeg"
        alt="Bevu Social Farmstay — handcrafted brick and earth architecture among rocks and native trees at dusk"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Earthy overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/55 via-charcoal/35 to-forest/70" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-xs font-semibold uppercase tracking-[0.3em] text-amber"
        >
          Tamil Nadu · Near Bangalore
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-4 font-heading text-4xl font-semibold leading-tight text-offwhite sm:text-5xl lg:text-6xl"
        >
          A Premium Sustainable Farmstay Near Bangalore
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-beige/90 sm:text-lg"
        >
          Escape into nature, slow down with farm life, enjoy soulful food, and
          reconnect with people who matter at Bevu Social Farmstay in Tamil Nadu.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <CTAButton href="/contact" icon="arrow">Book Your Stay</CTAButton>
          <CTAButton href="/experiences" variant="outline">Explore the Farmstay</CTAButton>
        </motion.div>
      </div>
    </section>
  );
}
