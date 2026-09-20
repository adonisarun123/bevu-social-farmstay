import Image from "next/image";
import Reveal from "./Reveal";

export default function ExperienceCard({ item, index = 0 }) {
  return (
    <Reveal delay={index * 0.06} className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink text-cream">
      <Image src={item.image} alt={item.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className="font-display text-2xl">{item.title}</h3>
        <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-cream/80 transition-all duration-500 group-hover:max-h-40 md:max-h-0 max-md:max-h-40">{item.description}</p>
      </div>
    </Reveal>
  );
}
