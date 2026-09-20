import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import FinalCTA from "@/components/FinalCTA";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/data/schema";
import { MapPin, Car, Compass, Lightbulb } from "lucide-react";

export const metadata = {
  title: "Location | How to Reach Us from Bangalore",
  description:
    "Bevu Social Farmstay is located in Tamil Nadu, within comfortable weekend-drive distance from Bangalore. Learn about the drive, nearby landmarks, and travel tips.",
  alternates: { canonical: "/location" },
};

const travelTips = [
  "Start early from Bangalore to beat city traffic and arrive for lunch.",
  "The last stretch is rural road — drive slow and enjoy the scenery.",
  "Stock up on fuel before leaving the highway.",
  "Network coverage can be patchy near the farm — download offline maps.",
  "Exact directions and a location pin are shared after booking confirmation.",
];

export default function LocationPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Location", path: "/location" },
      ])} />

      <PageHero
        title="Where We Are"
        subtitle="In Tamil Nadu — close enough to Bangalore for a weekend, far enough to feel away."
        image="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&q=75"
        alt="Misty rural countryside landscape at dawn"
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                icon: MapPin,
                title: "Where We Are",
                text: "Bevu Social Farmstay sits in the open countryside of Tamil Nadu, just across the Karnataka border. The exact address is shared after inquiry or booking confirmation — part of how we keep the farm peaceful.",
              },
              {
                icon: Car,
                title: "Distance from Bangalore",
                text: "We're within comfortable weekend-drive distance from Bangalore — close enough that you spend your weekend at the farm, not on the road. Precise drive times from your part of the city are shared on inquiry.",
              },
              {
                icon: Compass,
                title: "The Drive Experience",
                text: "The drive itself is part of the escape: city roads give way to highways, then to countryside lanes lined with fields, rocky hillocks, and village life. Watch the landscape slow down with you.",
              },
              {
                icon: Lightbulb,
                title: "Nearby Landmarks",
                text: "Nearby landmark details will be added soon. Guests receive a simple, reliable route guide with recognisable waypoints along with their booking confirmation.",
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-sand bg-offwhite p-8 shadow-sm">
                  <card.icon className="h-8 w-8 text-clay" aria-hidden="true" />
                  <h2 className="mt-4 font-heading text-2xl font-semibold text-forest">{card.title}</h2>
                  <p className="mt-3 leading-relaxed text-charcoal/75">{card.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="bg-beige py-20 sm:py-24">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Map" title="Find Us on the Map" subtitle="Map embed coming soon — the location pin is shared privately after booking." />
          <Reveal className="mt-10">
            <div className="flex h-80 items-center justify-center rounded-3xl border-2 border-dashed border-clay/40 bg-sand/40">
              <div className="text-center">
                <MapPin className="mx-auto h-10 w-10 text-clay/60" aria-hidden="true" />
                <p className="mt-3 text-sm font-medium text-charcoal/60">
                  Map embed placeholder — Tamil Nadu, near Bangalore
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Travel tips */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHeading eyebrow="Before You Drive" title="Travel Tips" />
          <Reveal className="mt-10">
            <ol className="space-y-4">
              {travelTips.map((tip, i) => (
                <li key={tip} className="flex items-start gap-4 rounded-2xl border border-sand bg-offwhite p-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-clay font-heading text-sm font-semibold text-offwhite">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-charcoal/80">{tip}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <FinalCTA
        title="Plan the Drive. We'll Plan the Rest."
        subtitle="Reach out and we'll share everything you need for an easy, scenic journey to the farm."
      />
    </>
  );
}
