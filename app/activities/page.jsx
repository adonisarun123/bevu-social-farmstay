import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Users } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import CTABand from "@/components/CTABand";
import JsonLd from "@/components/JsonLd";
import { activities, activityCategories } from "@/data/activities";
import { breadcrumbSchema, webPageSchema, activitiesListSchema } from "@/data/schema";
import { site } from "@/data/site";

export const metadata = {
  title: "Activities & Workshops — Pottery, Farming, Miyawaki, Stargazing",
  description: "Hands-on workshops and guided activities at Bevu Social Farmstay near Hosur: tamarind and Kerala cooking, farming, pottery, Miyawaki forest, mud building, bamboo craft, yoga, horse riding, cycling, treks and stargazing.",
  alternates: { canonical: "/activities" },
};

export default function ActivitiesPage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Activities & Workshops", path: "/activities" }];
  const groups = activityCategories.map((c) => [c, activities.filter((a) => a.category === c)]).filter(([, list]) => list.length);
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={webPageSchema({ path: "/activities", title: metadata.title, description: metadata.description, type: "CollectionPage", image: activities[0].cover })} />
      <JsonLd data={activitiesListSchema} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Activities & Workshops"
        title="Learn something with your hands."
        lead="Cook with tamarind from the trees around us, throw a pot, plant a forest, build with mud, ride out through the villages, and end the day under a dark sky. Thirteen hosted sessions, led by people who do this for real."
      />

      <section className="section">
        <div className="wrap">
          <nav aria-label="Activity categories" className="flex flex-wrap gap-2">
            {groups.map(([c, list]) => (
              <a key={c} href={`#${c.toLowerCase().replace(/[^a-z]+/g, "-")}`} className="rounded-full bg-parchment px-4 py-2 text-sm text-bark/80 ring-1 ring-ink/10 transition hover:text-brick">
                {c} <span className="text-stone">· {list.length}</span>
              </a>
            ))}
          </nav>

          {groups.map(([c, list]) => (
            <div key={c} id={c.toLowerCase().replace(/[^a-z]+/g, "-")} className="scroll-mt-28 pt-14">
              <Reveal><h2 className="font-display text-3xl">{c}</h2></Reveal>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((a, i) => (
                  <Reveal key={a.slug} delay={i * 0.05} as="article" className="card group flex h-full flex-col">
                    <Link href={`/activities/${a.slug}`} className="relative block aspect-[4/3] overflow-hidden">
                      <Image src={a.cover} alt={a.coverAlt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                    </Link>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-display text-2xl"><Link href={`/activities/${a.slug}`} className="transition hover:text-brick">{a.title}</Link></h3>
                      <p className="mt-2 text-sm leading-relaxed text-bark/75">{a.tagline}</p>
                      <ul className="mt-4 space-y-1.5 text-xs text-bark/80">
                        <li className="flex items-center gap-2"><Clock size={13} className="text-brick" />{a.duration}</li>
                        <li className="flex items-center gap-2"><Users size={13} className="text-brick" />{a.group}</li>
                      </ul>
                      <Link href={`/activities/${a.slug}`} className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-medium text-brick transition group-hover:gap-3">See the session <ArrowRight size={14} /></Link>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-ink/10 bg-parchment">
        <div className="wrap section grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="How it works" title="Three things to know." />
            <ol className="mt-8 space-y-5 text-bark/85">
              {[
                ["Book ahead.", "Workshops are run by facilitators who come in for your session, so tell us which ones you'd like when you book your stay — or at least a few days before."],
                ["Mix and match.", "Most guests pick two or three across a weekend: a morning on the farm, an afternoon at the wheel, stars after dinner. We'll fit them around your meals and pool time."],
                ["Priced per person.", "Ask us on WhatsApp for current prices and dates. Groups and whole-house bookings can have a private session."],
              ].map(([h, t], i) => (
                <Reveal key={h} delay={i * 0.06} as="li" className="flex gap-4"><span className="font-display text-3xl text-brick">{i + 1}</span><div><div className="font-display text-xl">{h}</div><p className="mt-1 text-sm leading-relaxed">{t}</p></div></Reveal>
              ))}
            </ol>
          </div>
          <Reveal delay={0.15} className="lg:col-span-5">
            <div className="rounded-2xl bg-ink p-8 text-cream">
              <span className="eyebrow !text-brass before:!bg-brass">Plan your sessions</span>
              <h3 className="mt-3 font-display text-2xl">Tell us your dates, your group and what you'd like to try.</h3>
              <p className="mt-3 text-sm text-cream/70">We'll reply on WhatsApp with availability, timings and prices.</p>
              <div className="mt-6 flex flex-col gap-3">
                <a href={site.whatsappHref("Hi Bevu Social Farmstay, I'd like to book activities/workshops. Which: ___ · Group size: ___ · Dates: ___")} target="_blank" rel="noopener noreferrer" className="btn bg-brass text-ink hover:bg-brass-light">WhatsApp us</a>
                <Link href="/account/book" className="btn-light">Book a stay</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand title="Stay the weekend, do a little of everything." text="Book a room or the whole house, then add the workshops you want. We'll plan the days around you." />
    </>
  );
}
