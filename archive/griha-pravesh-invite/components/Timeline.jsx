"use client";

import { motion } from "framer-motion";
import { Sun, BookOpen, UtensilsCrossed, Waves } from "lucide-react";

const events = [
  {
    icon: Sun,
    time: "8:00 AM onwards",
    name: "Pooja",
    desc: "Auspicious beginnings, blessings for the home.",
  },
  {
    icon: BookOpen,
    time: "10:00 AM onwards",
    name: "Sunderkand Path",
    desc: "A devotional recital filling the home with grace.",
  },
  {
    icon: UtensilsCrossed,
    time: "12:30 PM onwards",
    name: "Lunch",
    desc: "A warm meal shared, the way a home should begin.",
  },
  {
    icon: Waves,
    time: "Afternoon",
    name: "Relax & Explore",
    desc: "Swim, wander the grounds, and glimpse our upcoming farmhouse project.",
  },
];

export default function Timeline() {
  return (
    <div className="timeline mx-auto mt-9 max-w-[540px]">
      {events.map((ev, i) => (
        <motion.div
          key={ev.name}
          className="relative flex gap-4 py-4 sm:gap-[22px]"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: i * 0.16, ease: "easeOut" }}
        >
          <div className="relative z-[2] grid h-12 w-12 flex-none place-items-center rounded-full border border-[var(--line)] bg-dusk text-gold">
            <ev.icon className="h-[22px] w-[22px]" strokeWidth={1.3} aria-hidden="true" />
          </div>
          <div className="pt-[3px]">
            <div className="font-smallcaps text-[0.9rem] tracking-[0.12em] text-goldsoft">{ev.time}</div>
            <div className="font-serif text-[1.3rem] leading-tight text-cream">{ev.name}</div>
            <div className="mt-[2px] text-[0.92rem] text-creamdim">{ev.desc}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
