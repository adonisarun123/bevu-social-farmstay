import Image from "next/image";

export default function PageHero({ eyebrow, title, lead, image = "/images/hero.jpg", alt = "", position = "center 60%" }) {
  return (
    <section className="relative flex min-h-[62vh] items-end overflow-hidden bg-ink pt-[76px] text-cream">
      <Image src={image} alt={alt} fill priority sizes="100vw" className="object-cover opacity-70" style={{ objectPosition: position }} />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/30" />
      <div className="wrap relative pb-14 pt-24 md:pb-20">
        {eyebrow && <span className="eyebrow !text-brass before:!bg-brass">{eyebrow}</span>}
        <h1 className="h-display mt-4 max-w-3xl">{title}</h1>
        {lead && <p className="lead mt-5 max-w-2xl !text-cream/75">{lead}</p>}
      </div>
    </section>
  );
}
