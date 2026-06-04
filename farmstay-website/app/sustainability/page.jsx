import Image from "next/image";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import FeatureCard from "@/components/FeatureCard";
import FinalCTA from "@/components/FinalCTA";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/data/schema";
import { sustainabilityPillars } from "@/data/features";

export const metadata = {
  title: "Sustainability | Conscious Living at the Farmstay",
  description:
    "How Bevu Social Farmstay lives sustainably — local farm produce, water consciousness, waste reduction, native trees, biodiversity, and community-first responsible tourism in Tamil Nadu.",
  alternates: { canonical: "/sustainability" },
};

const guidelines = [
  "We host small groups — never crowds.",
  "Carry back what you bring in; we keep single-use plastic out of the farm.",
  "Walk gently — stay on trails and let wildlife stay wild.",
  "Keep evenings quiet; the countryside sleeps early and so do its birds.",
  "Use water like the precious resource it is here.",
  "Ask before you pick — the farm is happy to share, with a little guidance.",
];

export default function SustainabilityPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Sustainability", path: "/sustainability" },
      ])} />

      <PageHero
        title="Our Sustainable Living Approach"
        subtitle="Sustainability rooted in everyday choices — not slogans."
        image="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&q=75"
        alt="Open green farmland under a wide sky"
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <SectionHeading
            eyebrow="Our Approach"
            title="Respect the Land. Delight the Guest."
            subtitle="Our approach to sustainability is rooted in everyday choices. From local food and mindful water use to natural landscapes and community-first hospitality, Bevu Social Farmstay is designed to respect the land while creating a beautiful experience for guests."
          />
        </div>
      </section>

      <section className="bg-beige py-20 sm:py-24">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Six Pillars" title="How We Live It" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sustainabilityPillars.map((p, i) => (
              <FeatureCard key={p.title} {...p} delay={(i % 3) * 0.08} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="relative h-[440px] overflow-hidden rounded-3xl">
                <Image
                  src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1000&q=70"
                  alt="Sunlight filtering through native trees on the farmstay land"
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <div>
              <SectionHeading
                eyebrow="Responsible Tourism"
                title="A Few Gentle Guidelines"
                center={false}
              />
              <Reveal delay={0.1}>
                <ul className="mt-8 space-y-4">
                  {guidelines.map((g) => (
                    <li key={g} className="border-l-2 border-clay pl-5 leading-relaxed text-charcoal/80">
                      {g}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA
        title="Experience Conscious Living, Comfortably"
        subtitle="Come see how good sustainable living can feel — no compromises, no preaching."
      />
    </>
  );
}
