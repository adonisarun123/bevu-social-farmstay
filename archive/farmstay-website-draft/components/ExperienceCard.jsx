import Image from "next/image";
import Reveal from "./Reveal";

export default function ExperienceCard({ title, description, image, alt, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <article className="group h-full overflow-hidden rounded-2xl bg-offwhite shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="relative h-52 overflow-hidden">
          <Image
            src={image}
            alt={alt}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <h3 className="font-heading text-xl font-semibold text-forest">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-charcoal/75">{description}</p>
        </div>
      </article>
    </Reveal>
  );
}
