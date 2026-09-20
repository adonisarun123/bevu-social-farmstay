import { Check } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import RoomCard from "@/components/RoomCard";
import PricingCards from "@/components/PricingCards";
import CTABand from "@/components/CTABand";
import JsonLd from "@/components/JsonLd";
import { rooms, inclusions, houseRules } from "@/data/rooms";
import { breadcrumbSchema, webPageSchema, roomsListSchema } from "@/data/schema";
import { site } from "@/data/site";

export const metadata = {
  title: "Rooms & Rates — 4 Ensuite Rooms",
  description: "Four air-conditioned ensuite king rooms near Bangalore. Book a room, or take the whole house with exclusive pool and lawn. Breakfast included, pets welcome.",
  alternates: { canonical: "/stay" },
};

export default function StayPage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Stay", path: "/stay" }];
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={webPageSchema({ path: crumbs[crumbs.length - 1].path, title: metadata.title, description: metadata.description, type: "CollectionPage", image: "/images/hero.jpg" })} />
      <JsonLd data={roomsListSchema} />
      <PageHero crumbs={crumbs} eyebrow="Stay" title="Four rooms. One house. Yours by the room, or all at once." lead="Every room is an ensuite king with air-conditioning and hot water. What changes is the view — and how much of the house you'd like to yourself." />

      <section className="section">
        <div className="wrap">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {rooms.map((r, i) => <RoomCard key={r.slug} room={r} index={i} />)}
          </div>
          <Reveal className="mt-12 grid gap-8 rounded-2xl bg-parchment p-8 ring-1 ring-ink/5 md:grid-cols-3">
            <div>
              <h3 className="font-display text-xl">In every room</h3>
            </div>
            <ul className="grid gap-2 text-sm text-bark/80 sm:grid-cols-2 md:col-span-2">
              {[rooms[0].bed, rooms[0].bath, rooms[0].ac, `Sleeps ${rooms[0].occupancy}`, ...rooms[0].extras].map((x) => (
                <li key={x} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-brick" />{x}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section id="rates" className="scroll-mt-20 border-y border-ink/10 bg-sand/50">
        <div className="wrap section">
          <SectionHeading eyebrow="Rates" title="Two ways to book." lead={`Check-in ${site.checkIn}, check-out ${site.checkOut}. Rates are shared on WhatsApp once we confirm dates; weekends and long weekends are priced higher.`} />
          <div className="mt-12"><PricingCards /></div>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Included" title="What comes with the stay." />
            <ul className="mt-8 space-y-3">
              {inclusions.map((x, i) => (
                <Reveal key={x} delay={i * 0.04} className="flex gap-3 border-b border-ink/10 pb-3 text-bark/85"><Check size={18} className="mt-0.5 shrink-0 text-moss" />{x}</Reveal>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="House notes" title="A few things we ask." />
            <dl className="mt-8 space-y-6">
              {houseRules.map((r, i) => (
                <Reveal key={r.title} delay={i * 0.04}>
                  <dt className="font-display text-lg">{r.title}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-bark/75">{r.text}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <CTABand title="Tell us your dates." text="We'll confirm which rooms are free, share rates, and hold the booking on a part advance." />
    </>
  );
}
