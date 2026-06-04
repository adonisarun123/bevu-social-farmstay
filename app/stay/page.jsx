import Image from "next/image";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import FeatureCard from "@/components/FeatureCard";
import FinalCTA from "@/components/FinalCTA";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/data/schema";
import { stayHighlights } from "@/data/features";
import { Check } from "lucide-react";

export const metadata = {
  title: "Stay Experience | Rooms, Cottages & Amenities",
  description:
    "Stay close to nature without giving up comfort. Explore the rooms, cottages, amenities, and inclusions at Bevu Social Farmstay — a premium farmstay near Bangalore in Tamil Nadu.",
  alternates: { canonical: "/stay" },
};

const units = [
  {
    title: "Farm Cottages",
    description:
      "Private earthen cottages with open-air sit-outs and views of the rocks and trees. Details and photos coming soon.",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=900&q=70",
    alt: "Cozy earthy cottage interior with warm natural light",
  },
  {
    title: "Farmhouse Rooms",
    description:
      "Comfortable rooms in the main farmhouse — handmade brick walls, natural light, and quiet courtyards. Details coming soon.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=70",
    alt: "Comfortable bedroom with soft natural linen and textures",
  },
  {
    title: "Group & Retreat Spaces",
    description:
      "Shared spaces designed for small teams, wellness groups, and gatherings — open, calm, and flexible. Details coming soon.",
    image: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?w=900&q=70",
    alt: "Open shared space suitable for group retreats",
  },
];

const included = [
  "Comfortable, clean private accommodation",
  "Farm-fresh meals (plan discussed during booking)",
  "Farm walks and nature trails",
  "Access to common and social spaces",
  "Bonfire evenings (weather permitting)",
  "Personal, warm hosting throughout your stay",
];

const expectations = [
  {
    title: "Expect calm, not entertainment",
    text: "There are no televisions blaring or crowded pools. The entertainment here is the land, the food, the fire, and the people you came with.",
  },
  {
    title: "Expect comfort, not excess",
    text: "Everything you need, nothing you don't. Clean rooms, good beds, hot water, soulful food — premium in feel, simple in spirit.",
  },
  {
    title: "Expect nature, up close",
    text: "Birdsong at dawn, insects at dusk, stars at night. This is a working farm in open countryside — that's the whole point.",
  },
  {
    title: "Expect to slow down",
    text: "Patchy network in places, unhurried meals, long evenings. Most guests stop checking the time by the second day.",
  },
];

export default function StayPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Stay Experience", path: "/stay" },
      ])} />

      <PageHero
        title="The Stay Experience"
        subtitle="Stay close to nature, without giving up comfort."
        image="https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1600&q=75"
        alt="Warm, earthy farmstay accommodation interior"
      />

      {/* Overview */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <SectionHeading
            eyebrow="Overview"
            title="Rooted Comfort"
            subtitle="Our spaces are built from earth, brick, and stone — designed around the natural rocks and trees of the land. Every room is thoughtfully furnished, naturally lit, and quietly premium. You'll feel the farm around you, and comfort within."
          />
        </div>
      </section>

      {/* Units */}
      <section className="bg-beige py-20 sm:py-24">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Spaces" title="Rooms, Cottages & Farm Units" subtitle="Final room categories and photographs will be added soon." />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {units.map((unit, i) => (
              <Reveal key={unit.title} delay={i * 0.1}>
                <article className="group h-full overflow-hidden rounded-2xl bg-offwhite shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={unit.image}
                      alt={unit.alt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-xl font-semibold text-forest">{unit.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal/75">{unit.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Amenities" title="Thoughtful Essentials" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stayHighlights.map((f, i) => (
              <FeatureCard key={f.title} {...f} delay={i * 0.07} />
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="bg-beige py-20 sm:py-24">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="Inclusions" title="What's Included" center={false} />
              <Reveal delay={0.1}>
                <ul className="mt-8 space-y-4">
                  {included.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-olive/15">
                        <Check className="h-3.5 w-3.5 text-olive" aria-hidden="true" />
                      </span>
                      <span className="text-charcoal/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <Reveal>
              <div className="relative h-[420px] overflow-hidden rounded-3xl">
                <Image
                  src="https://images.unsplash.com/photo-1530062845289-9109b2c9c868?w=1000&q=70"
                  alt="Outdoor dining table set among trees at the farmstay"
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Setting Expectations" title="What to Expect" subtitle="Bevu is a farm first. Here's what that honestly means for your stay." />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {expectations.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="rounded-2xl border border-sand bg-offwhite p-7">
                  <h3 className="font-heading text-xl font-semibold text-forest">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/75">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Suitable for */}
      <section className="bg-forest py-16">
        <div className="mx-auto max-w-content px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-heading text-2xl font-semibold text-offwhite sm:text-3xl">
              Suitable for families, friend groups, small corporate teams, wellness groups, and quiet solo workers.
            </h2>
          </Reveal>
        </div>
      </section>

      <FinalCTA
        title="Ready to Book Your Stay?"
        subtitle="Stays are by prior booking only, so every guest gets a peaceful, well-hosted experience."
      />
    </>
  );
}
