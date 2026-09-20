import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BedDouble, Bath, Snowflake, Users, Layers, Eye, Ruler, Check, MessageCircle } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import RoomCard from "@/components/RoomCard";
import CTABand from "@/components/CTABand";
import JsonLd from "@/components/JsonLd";
import { rooms, getRoom, inclusions, houseRules } from "@/data/rooms";
import { breadcrumbSchema, roomSchema, webPageSchema } from "@/data/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import { site, pricing, formatRate } from "@/data/site";

export function generateStaticParams() {
  return rooms.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }) {
  const room = getRoom(params.slug);
  if (!room) return {};
  return {
    title: `${room.name} Room — ${room.tag}`,
    description: `${room.blurb} ${room.bed}, ensuite, ${room.ac.toLowerCase()}, sleeps ${room.occupancy}. Book at Bevu Social Farmstay near Bangalore.`.replace(/^(.{0,157})\s.*$/s, "$1…").slice(0, 160),
    alternates: { canonical: `/stay/${room.slug}` },
    openGraph: { title: `${room.name} Room · ${site.name}`, description: room.blurb, images: [{ url: room.image }] },
  };
}

export default function RoomPage({ params }) {
  const room = getRoom(params.slug);
  if (!room) notFound();
  const others = rooms.filter((r) => r.slug !== room.slug);
  const crumbs = [{ name: "Home", path: "/" }, { name: "Stay", path: "/stay" }, { name: `${room.name} Room`, path: `/stay/${room.slug}` }];
  const waMsg = `Hi Bevu Social Farmstay, I'd like to check availability for the ${room.name} room. Dates: ___ · Guests: ___`;


  const facts = [
    { Icon: BedDouble, k: "Bed", v: room.bed },
    { Icon: Bath, k: "Bathroom", v: room.bath },
    { Icon: Snowflake, k: "Climate", v: room.ac },
    { Icon: Users, k: "Sleeps", v: room.occupancy },
    { Icon: Layers, k: "Floor", v: room.floor },
    { Icon: Eye, k: "View", v: room.view },
    { Icon: Ruler, k: "Size", v: room.size },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={webPageSchema({ path: `/stay/${room.slug}`, title: `${room.name} Room — ${room.tag}`, description: room.blurb, type: "ItemPage", image: room.gallery[0], extra: { mainEntity: { "@id": `${site.url}/stay/${room.slug}#room` } } })} />
      <JsonLd data={roomSchema(room)} />

      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-ink pt-[76px] text-cream">
        <Image src={room.gallery[0]} alt={room.alt} fill priority sizes="100vw" className="object-cover opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/20" />
        <div className="wrap relative pb-14 pt-24 md:pb-20">
          <Breadcrumbs items={crumbs} tone="light" />
          <div className="mt-8"><span className="eyebrow !text-brass-light before:!bg-brass-light">{room.tag}{room.tag.toLowerCase() !== room.floor.toLowerCase() ? ` · ${room.floor}` : ""}</span></div>
          <h1 className="h-display mt-4">
            {room.name} <span className="font-light italic text-cream/70">· {room.kannada}</span>
          </h1>
          <p className="lead mt-5 max-w-2xl !text-cream/80">{room.blurb}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={site.whatsappHref(waMsg)} target="_blank" rel="noopener noreferrer" className="btn-primary"><MessageCircle size={18} /> Check availability</a>
            <Link href="/stay#rates" className="btn-light">See rates</Link>
          </div>
        </div>
      </section>

      {/* Facts + story */}
      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <dl className="divide-y divide-ink/10 rounded-2xl bg-parchment px-6 ring-1 ring-ink/5">
              {facts.map(({ Icon, k, v }) => (
                <div key={k} className="flex items-start gap-4 py-4">
                  <Icon size={18} className="mt-0.5 shrink-0 text-brick" strokeWidth={1.6} />
                  <div><dt className="text-[11px] uppercase tracking-[0.2em] text-stone">{k}</dt><dd className="mt-0.5 text-sm text-ink">{v}</dd></div>
                </div>
              ))}
            </dl>
            <div className="mt-6 rounded-2xl bg-ink p-6 text-cream">
              <div className="text-[11px] uppercase tracking-[0.2em] text-brass">Per night</div>
              <div className="mt-2 flex items-baseline gap-4">
                <div><div className="font-display text-2xl">{formatRate(pricing.perRoom.weekday)}</div><div className="text-[11px] text-cream/50">weekday</div></div>
                <div><div className="font-display text-2xl">{formatRate(pricing.perRoom.weekend)}</div><div className="text-[11px] text-cream/50">weekend</div></div>
              </div>
              <p className="mt-3 text-xs text-cream/60">{pricing.perRoom.note}. {pricing.extraGuest}</p>
              <a href={site.whatsappHref(waMsg)} target="_blank" rel="noopener noreferrer" className="btn mt-5 w-full bg-brass text-ink hover:bg-brass-light">Enquire for {room.name}</a>
            </div>
          </Reveal>

          <div className="lg:col-span-8">
            <Reveal>
              <span className="eyebrow">The room</span>
              <h2 className="h-section mt-4">What it's like to wake up here.</h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-6 space-y-5 text-bark/85 md:text-lg md:leading-relaxed">
              {room.story.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}
            </Reveal>
            <Reveal delay={0.15} className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="font-display text-xl">Good for</h3>
                <ul className="mt-4 space-y-2 text-sm text-bark/85">
                  {room.goodFor.map((g) => <li key={g} className="flex gap-3"><Check size={16} className="mt-0.5 shrink-0 text-moss" />{g}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-xl">In the room</h3>
                <ul className="mt-4 space-y-2 text-sm text-bark/85">
                  {room.extras.map((x) => <li key={x} className="flex gap-3"><Check size={16} className="mt-0.5 shrink-0 text-brick" />{x}</li>)}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="border-y border-ink/10 bg-parchment">
        <div className="wrap section">
          <SectionHeading eyebrow="Gallery" title={`${room.name}, in pictures.`} />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {room.gallery.map((src, i) => (
              <Reveal key={src} delay={i * 0.07} className={`relative overflow-hidden rounded-2xl bg-sand ${i === 0 ? "aspect-[4/3] md:col-span-2 md:row-span-2 md:aspect-auto" : "aspect-[4/3]"}`}>
                <Image src={src} alt={`${room.name} room — photo ${i + 1}`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </Reveal>
            ))}
          </div>
          <p className="mt-4 text-xs text-stone">Placeholder photography — real room photos coming soon.</p>
        </div>
      </section>

      {/* Included + notes */}
      <section className="section">
        <div className="wrap grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Included" title="Every stay comes with" />
            <ul className="mt-8 grid gap-3 text-sm text-bark/85">
              {inclusions.map((x) => <li key={x} className="flex gap-3 border-b border-ink/10 pb-3"><Check size={16} className="mt-0.5 shrink-0 text-moss" />{x}</li>)}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="House notes" title="Worth knowing" />
            <dl className="mt-8 space-y-5">
              {houseRules.slice(0, 4).map((r) => (
                <div key={r.title}><dt className="font-display text-lg">{r.title}</dt><dd className="mt-1 text-sm leading-relaxed text-bark/75">{r.text}</dd></div>
              ))}
            </dl>
            <p className="mt-6 text-sm">Want all four rooms? <Link href="/stay#rates" className="font-medium text-brick">See the whole-house rate →</Link></p>
          </div>
        </div>
      </section>

      {/* Other rooms */}
      <section className="border-t border-ink/10 bg-sand/50">
        <div className="wrap section">
          <SectionHeading eyebrow="The other rooms" title="Or one of these." />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((r, i) => <RoomCard key={r.slug} room={r} index={i} />)}
          </div>
        </div>
      </section>

      <CTABand title={`Book the ${room.name} room.`} text="Send your dates on WhatsApp — we'll confirm it's free, share the rate, and hold it on a part advance." />
    </>
  );
}
