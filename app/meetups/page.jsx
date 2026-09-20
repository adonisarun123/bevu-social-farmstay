import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, Clock } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import CTABand from "@/components/CTABand";
import JsonLd from "@/components/JsonLd";
import { meetups } from "@/data/meetups";
import { breadcrumbSchema, webPageSchema, meetupsListSchema } from "@/data/schema";
import { site } from "@/data/site";

export const metadata = {
  title: "Meetups & Group Weekends",
  description: "Group weekends at Bevu Social Farmstay near Bangalore: cyclists, bikers, naturalists, fitness, culinary, astronomy, photography, writers and wellness. Whole house, your programme.",
  alternates: { canonical: "/meetups" },
};

export default function MeetupsPage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Meetups", path: "/meetups" }];
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={webPageSchema({ path: "/meetups", title: metadata.title, description: metadata.description, type: "CollectionPage" })} />
      <JsonLd data={meetupsListSchema} />
      <PageHero crumbs={crumbs} eyebrow="Meetups" title="Bring your people. We'll bring the place." lead="Bevu was built for groups who share something — a sport, a hobby, a practice, a deadline. Take the whole house and run your weekend the way your group likes it; we handle the beds, the food and the pool." />

      <section className="section">
        <div className="wrap">
          <SectionHeading eyebrow="Formats we host" title="Pick a weekend, or tell us yours." lead="Each of these is a format we've thought through — routes, timings, kit, food. None is fixed. If your group doesn't fit a label, describe it and we'll build the days around you." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {meetups.map((m, i) => (
              <Reveal key={m.slug} delay={i * 0.05} as="article" className="card group flex h-full flex-col">
                <Link href={`/meetups/${m.slug}`} className="relative block aspect-[4/3] overflow-hidden">
                  <Image src={m.cover} alt={m.coverAlt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-display text-2xl"><Link href={`/meetups/${m.slug}`} className="transition hover:text-brick">{m.title}</Link></h2>
                  <p className="mt-2 text-sm leading-relaxed text-bark/75">{m.tagline}</p>
                  <ul className="mt-4 space-y-1.5 text-xs text-bark/80">
                    <li className="flex items-center gap-2"><Users size={13} className="text-brick" />{m.group}</li>
                    <li className="flex items-center gap-2"><Clock size={13} className="text-brick" />{m.duration}</li>
                  </ul>
                  <Link href={`/meetups/${m.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brick transition group-hover:gap-3">How it works <ArrowRight size={14} /></Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-parchment">
        <div className="wrap section grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="How it works" title="Three things to know." />
            <ol className="mt-8 space-y-5 text-bark/85">
              {[
                ["Take the whole house.", "Most formats need all four rooms — 8 adults, up to 12 with children, and exclusive use of the pool, lawn and kitchen. Naturalists, writers and astronomers can come room-wise."],
                ["You run the programme.", "Your coach, teacher, ride captain or host sets the schedule. We give you the space, the timings, the food and local knowledge — and stay out of the way."],
                ["Ask us for a per-head quote.", "The whole-house rate plus meals per person; we'll turn that into a simple per-person figure once you know the headcount."],
              ].map(([h, t], i) => (
                <Reveal key={h} delay={i * 0.06} as="li" className="flex gap-4"><span className="font-display text-3xl text-brick">{i + 1}</span><div><div className="font-display text-xl">{h}</div><p className="mt-1 text-sm leading-relaxed">{t}</p></div></Reveal>
              ))}
            </ol>
          </div>
          <Reveal delay={0.15} className="lg:col-span-5">
            <div className="rounded-2xl bg-ink p-8 text-cream">
              <span className="eyebrow !text-brass before:!bg-brass">Host a meetup</span>
              <h3 className="mt-3 font-display text-2xl">Tell us your group, your dates and your format.</h3>
              <p className="mt-3 text-sm text-cream/70">We reply on WhatsApp with availability and a per-head quote.</p>
              <div className="mt-6 flex flex-col gap-3">
                <Link href="/account/book?kind=house" className="btn bg-brass text-ink hover:bg-brass-light">Check whole-house availability</Link>
                <a href={site.whatsappHref("Hi Bevu Social Farmstay, I'd like to host a meetup. Group: ___ · Dates: ___ · Format: ___")} target="_blank" rel="noopener noreferrer" className="btn-light">WhatsApp us</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand title="Got a group that doesn't fit a label?" text="Board-gamers, book clubs, alumni, a founding team — describe it and we'll build the weekend around you." />
    </>
  );
}
