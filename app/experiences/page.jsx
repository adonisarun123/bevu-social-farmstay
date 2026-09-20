import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ExperienceCard from "@/components/ExperienceCard";
import CTABand from "@/components/CTABand";
import JsonLd from "@/components/JsonLd";
import { experiences } from "@/data/experiences";
import { breadcrumbSchema, webPageSchema, experiencesListSchema } from "@/data/schema";

export const metadata = {
  title: "Experiences — Pool, Bonfire, Farm Walks",
  description: "A weekend at Bevu: pool days, bonfire evenings, farm and boulder walks, farm-to-table meals, stargazing, lawn games, sunrise yoga and small team offsites.",
  alternates: { canonical: "/experiences" },
};

export default function ExperiencesPage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Experiences", path: "/experiences" }];
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={webPageSchema({ path: crumbs[crumbs.length - 1].path, title: metadata.title, description: metadata.description, type: "CollectionPage", image: "/images/hero.jpg" })} />
      <JsonLd data={experiencesListSchema} />
      <PageHero crumbs={crumbs} eyebrow="Experiences" title="Nothing is scheduled. Everything is available." lead="We don't run activities on a timetable. We keep the pool clean, the lawn mown, the firewood dry and the kitchen warm — the rest tends to happen on its own." />
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
