"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, MessageCircle } from "lucide-react";
import { site } from "@/data/site";
import { quickFacts } from "@/data/amenities";

const fade = (d) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay: d, ease: [0.22, 1, 0.36, 1] } });

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink text-cream">
      <div className="absolute inset-0 animate-kenburns">
        <Image
          src="/images/hero.jpg"
          alt="Bevu Social Farmstay at dusk — a handcrafted brick house glowing among granite boulders and trees"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 55%" }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/20" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/50 to-transparent" />

      <div className="wrap relative pb-10 pt-40 md:pb-16">
        <motion.span {...fade(0.1)} className="eyebrow !text-brass-light before:!bg-brass-light">
          Near Bangalore · Berigai, Hosur
        </motion.span>
        <motion.h1 {...fade(0.25)} className="mt-5 max-w-4xl font-display text-[2.9rem] leading-[1.02] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          Brick, boulders,
          <br />
          <em className="font-light italic text-brass-light">and a pool</em> under the neem trees.
        </motion.h1>
        <motion.p {...fade(0.4)} className="mt-6 max-w-xl text-lg leading-relaxed text-cream/80 md:text-xl">
          An eco-conscious, pet-friendly farmstay with four ensuite rooms, a swimming pool and an open lawn — an hour and a bit from south Bangalore.
        </motion.p>
        <motion.div {...fade(0.55)} className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link href="/account/book" className="btn-primary">Check availability & book</Link>
          <a href={site.whatsappHref()} target="_blank" rel="noopener noreferrer" className="btn-light">
            <MessageCircle size={18} /> WhatsApp us
          </a>
        </motion.div>

        <motion.dl {...fade(0.75)} className="mt-14 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-cream/15 pt-8 sm:grid-cols-4">
          {quickFacts.map((f) => (
            <div key={f.label}>
              <dt className="text-[11px] uppercase tracking-[0.22em] text-cream/55">{f.label}</dt>
              <dd className="mt-1.5 font-display text-2xl md:text-3xl">{f.value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <motion.a
        href="#intro"
        aria-label="Scroll to content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 right-6 hidden h-12 w-12 items-center justify-center rounded-full border border-cream/30 text-cream/70 transition hover:border-cream hover:text-cream md:flex"
      >
        <ArrowDown size={18} className="animate-bounce" />
      </motion.a>
    </section>
  );
}
