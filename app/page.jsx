import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Waves, Trees, UtensilsCrossed, Flame, Wifi, PawPrint } from "lucide-react";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import RoomCard from "@/components/RoomCard";
import ExperienceCard from "@/components/ExperienceCard";
import PricingCards from "@/components/PricingCards";
import FAQ from "@/components/FAQ";
import CTABand from "@/components/CTABand";
import JsonLd from "@/components/JsonLd";
import { rooms } from "@/data/rooms";
import { amenities } from "@/data/amenities";
import { experiences, homeExperienceSlugs, idealFor } from "@/data/experiences";
import { faqs } from "@/data/faqs";
import { faqSchema } from "@/data/schema";
import { site } from "@/data/site";
import { posts } from "@/data/posts";
import PostCard from "@/components/PostCard";

const homeExperiences = homeExperienceSlugs.map((s) => experiences.find((e) => e.slug === s)).filter(Boolean);
const pool = amenities.find((a) => a.slug === "pool");
const lawn = amenities.find((a) => a.slug === "lawn");

const essentials = [
  { Icon: Waves, t: "Private pool", d: "Freshwater, floodlit, sunrise to sunset" },
  { Icon: Trees, t: "Open lawn", d: "Bonfire pit, outdoor dining, lawn games" },
  { Icon: UtensilsCrossed, t: "Farm kitchen", d: "Breakfast included, meals on request" },
  { Icon: Flame, t: "Bonfire nights", d: "On request, weather permitting" },
  { Icon: Wifi, t: "Fast Wi-Fi", d: "Throughout the house" },
  { Icon: PawPrint, t: "Pet-friendly", d: "Dogs welcome, tell us when booking" },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <Hero />

      {/* Intro */}
      <section id="intro" className="section">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="The farmstay" title="Built by hand, from what the land gave us." />
          </div>
          <Reveal delay={0.1} className="lg:col-span-7">
            <p className="lead">
              Bevu means <em>neem</em> in Kannada — the tree that shades the house. The home is built of handcrafted brick and stone, set among the granite boulders it was designed around, and opens onto a lawn and a swimming pool that catch the last of the evening light.
            </p>
            <p className="mt-5 leading-relaxed text-bark/80">
              We call it a <strong>social</strong> farmstay because it works best when it is full: four ensuite rooms, one long table, a fire pit, and enough sky for everyone. Come as a couple and share the house, or take all four rooms and make it yours.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/about" className="btn-ghost">Our story <ArrowRight size={16} /></Link>
              <Link href="/gallery" className="inline-flex items-center gap-2 px-2 py-3 text-sm font-medium text-brick">See the photos →</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Essentials strip */}
      <section className="border-y border-ink/10 bg-parchment">
        <div className="wrap grid grid-cols-2 gap-x-6 gap-y-8 py-12 sm:grid-cols-3 lg:grid-cols-6">
          {essentials.map(({ Icon, t, d }, i) => (
            <Reveal key={t} delay={i * 0.05} className="flex gap-3">
              <Icon size={22} className="mt-0.5 shrink-0 text-brick" strokeWidth={1.6} />
              <div><div className="font-medium">{t}</div><div className="mt-0.5 text-xs text-stone">{d}</div></div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Rooms */}
      <section className="section">
        <div className="wrap">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="Stay" title="Four rooms, named for the trees outside." lead="Each is an ensuite king room with air-conditioning, hot water and a view of something green. Take one, or take them all." />
            <Reveal delay={0.1}><Link href="/stay" className="btn-ghost shrink-0">All rooms & rates <ArrowRight size={16} /></Link></Reveal>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {rooms.map((r, i) => <RoomCard key={r.slug} room={r} index={i} compact />)}
          </div>
        </div>
      </section>

      {/* Pool & Lawn feature */}
      <section className="grain relative overflow-hidden bg-ink text-cream">
        <div className="wrap section">
          <SectionHeading tone="light" eyebrow="Pool & lawn" title="The part of the weekend nobody wants to leave." />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {[pool, lawn].map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.1} className="group relative aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-[16/10]">
                <Image src={a.image} alt={a.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
                  <span className="text-[11px] uppercase tracking-[0.22em] text-brass-light">{a.kicker}</span>
                  <h3 className="mt-2 font-display text-3xl">{a.title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/80">{a.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2} className="mt-10">
            <Link href="/amenities" className="btn-light">Everything on the property <ArrowRight size={16} /></Link>
          </Reveal>
        </div>
      </section>

      {/* Experiences */}
      <section className="section">
        <div className="wrap">
          <SectionHeading align="center" eyebrow="Experiences" title="Days that fill themselves." lead="No itinerary. Just a pool, a lawn, a farm, a fire, and the kind of quiet that makes people talk." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {homeExperiences.map((e, i) => <ExperienceCard key={e.slug} item={e} index={i} />)}
          </div>
          <Reveal className="mt-10 text-center"><Link href="/experiences" className="btn-ghost">All experiences <ArrowRight size={16} /></Link></Reveal>
        </div>
      </section>

      {/* Ideal for */}
      <section className="border-y border-ink/10 bg-sand/50">
        <div className="wrap section">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading eyebrow="Who it's for" title="Made for groups who actually want to be together." />
            </div>
            <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-8">
              {idealFor.map((x, i) => (
                <Reveal key={x.title} delay={i * 0.06} className="border-l-2 border-brick pl-5">
                  <h3 className="font-display text-2xl">{x.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-bark/75">{x.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section">
        <div className="wrap">
          <SectionHeading eyebrow="Rates" title="Room-wise, or the whole house." lead="Breakfast is always included. Lunch and dinner are cooked on site on request." />
          <div className="mt-12"><PricingCards /></div>
        </div>
      </section>

      {/* Location teaser */}
      <section className="border-t border-ink/10 bg-parchment">
        <div className="wrap section grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Getting here" title="Close enough for a Friday-evening drive." lead={`${site.location.area}. Take NH44 past Electronic City towards Hosur; the last stretch is village road, boulders and tamarind trees.`} />
            <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-3">
              <a href={site.location.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">Open in Google Maps</a>
              <Link href="/location" className="btn-ghost">Directions & tips</Link>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="lg:col-span-7">
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-ink/10 ring-1 ring-ink/10">
              {site.location.distances.map((d) => (
                <div key={d.from} className="bg-cream p-6">
                  <dt className="text-xs uppercase tracking-[0.18em] text-stone">{d.from}</dt>
                  <dd className="mt-2 font-display text-2xl">{d.time}</dd>
                  <dd className="text-xs text-stone">{d.km}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Journal */}
      <section className="section border-t border-ink/10">
        <div className="wrap">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="Journal" title="Notes from the farm." lead="How to get here, why the house is built the way it is, and what to pack for the dog." />
            <Reveal delay={0.1}><Link href="/blog" className="btn-ghost shrink-0">All posts <ArrowRight size={16} /></Link></Reveal>
          </div>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map((p, i) => <PostCard key={p.slug} post={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4"><SectionHeading eyebrow="Good to know" title="Questions we get asked most." /></div>
          <Reveal delay={0.1} className="lg:col-span-8"><FAQ items={faqs.slice(0, 6)} /></Reveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
