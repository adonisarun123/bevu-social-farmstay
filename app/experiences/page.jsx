import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ExperienceCard from "@/components/ExperienceCard";
import CTABand from "@/components/CTABand";
import JsonLd from "@/components/JsonLd";
import { experiences } from "@/data/experiences";
import { breadcrumbSchema } from "@/data/schema";

export const metadata = {
  title: "Experiences — Pool Days, Bonfires, Farm Walks & Slow Weekends",
  description: "What a weekend at Bevu Social Farmstay looks like: pool days, bonfire evenings, farm and boulder walks, farm-to-table meals, stargazing, lawn games and small team offsites.",
  alternates: { canonical: "/experiences" },
};

export default function ExperiencesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Experiences", path: "/experiences" }])} />
      <PageHero eyebrow="Experiences" title="Nothing is scheduled. Everything is available." lead="We don't run activities on a timetable. We keep the pool clean, the lawn mown, the firewood dry and the kitchen warm — the rest tends to happen on its own." />
      <section className="section">
        <div className="wrap">
          <SectionHeading eyebrow="A weekend here" title="Pick any of these. Or none." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {experiences.map((e, i) => <ExperienceCard key={e.slug} item={e} index={i} />)}
          </div>
        </div>
      </section>
      <CTABand />
    </>
  );
}
