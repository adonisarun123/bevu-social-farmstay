import Image from "next/image";
import { BedDouble, Bath, Snowflake, Users } from "lucide-react";
import { site } from "@/data/site";
import Reveal from "./Reveal";

export default function RoomCard({ room, index = 0, compact = false }) {
  const specs = [
    { Icon: BedDouble, text: room.bed },
    { Icon: Bath, text: room.bath },
    { Icon: Snowflake, text: room.ac },
    { Icon: Users, text: room.occupancy },
  ];
  return (
    <Reveal delay={index * 0.08} className="card group flex h-full flex-col">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image src={room.image} alt={room.alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-brick backdrop-blur">{room.tag}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-baseline justify-between">
          <h3 className="font-display text-2xl">{room.name}</h3>
          <span className="text-xs italic text-stone">{room.kannada}</span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-bark/75">{room.blurb}</p>
        <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-2 text-xs text-bark/80">
          {specs.map(({ Icon, text }) => (
            <li key={text} className="flex items-center gap-2"><Icon size={14} className="shrink-0 text-brick" />{text}</li>
          ))}
        </ul>
        {!compact && (
          <a
            href={site.whatsappHref(`Hi Bevu Social Farmstay, I'd like to check availability for the ${room.name} room.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brick transition group-hover:gap-3"
          >
            Check availability <span aria-hidden>→</span>
          </a>
        )}
      </div>
    </Reveal>
  );
}
