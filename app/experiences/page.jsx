import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ExperienceCard from "@/components/ExperienceCard";
import FinalCTA from "@/components/FinalCTA";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/data/schema";
import { experiences } from "@/data/experiences";

export const metadata = {
  title: "Experiences | Farm Walks, Bonfires, Stargazing & More",
  description:
    "Explore farm walks, farm-to-table meals, bonfire evenings, bird watching, stargazing, yoga spaces, children's farm learning, and corporate bonding at Bevu Social Farmstay near Bangalore.",
  alternates: { canonical: "/experiences" },
};

export default function ExperiencesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Experiences", path: "/experiences" },
      ])} />

      <PageHero
        title="Experiences at Bevu"
        subtitle="Days that move at the pace of the land — slow mornings, golden evenings, time well spent."
        image="https://images.unsplash.com/photo-1475619690908-0d0bd1aafa3a?w=1600&q=75"
        alt="Bonfire glowing under an open evening sky at the farmstay"
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Things to Do"
            title="Thirteen Ways to Slow Down"
            subtitle="Nothing here is scheduled to the minute. Pick what calls to you, skip what doesn't, and let the weekend find its own rhythm."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {experiences.map((exp, i) => (
              <ExperienceCard key={exp.slug} {...exp} delay={(i % 3) * 0.08} />
            ))}
          </div>
        </div>
      </section>

      <FinalCTA
        title="Which Experience Calls to You?"
        subtitle="Tell us what your group enjoys, and we'll shape the weekend around it."
      />
    </>
  );
}
