import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import GalleryGrid from "@/components/GalleryGrid";
import FinalCTA from "@/components/FinalCTA";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/data/schema";

export const metadata = {
  title: "Gallery | Farm Life, Stay Spaces & Evening Moments",
  description:
    "A visual glimpse of Bevu Social Farmstay — farm life, stay spaces, farm-to-table food, gatherings, nature, and evening moments at our sustainable farmstay near Bangalore.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Gallery", path: "/gallery" },
      ])} />

      <PageHero
        title="Gallery"
        subtitle="Moments from the farm — more photographs coming soon as the farmstay comes alive."
        image="/images/bevu-hero.jpeg"
        alt="Bevu Social Farmstay building glowing warmly at dusk"
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Glimpses"
            title="Life at Bevu"
            subtitle="Placeholder visuals shown for now — real photographs of the farmstay will replace these soon."
          />
          <Reveal className="mt-12">
            <GalleryGrid />
          </Reveal>
        </div>
      </section>

      <FinalCTA
        title="Better in Person"
        subtitle="Photographs only say so much. Come breathe the place in."
      />
    </>
  );
}
