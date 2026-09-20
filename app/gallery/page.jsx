import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";
import CTABand from "@/components/CTABand";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/data/schema";

export const metadata = {
  title: "Gallery — The House, Pool, Lawn & Rooms",
  description: "Photos of Bevu Social Farmstay near Bangalore: the handcrafted brick house among granite boulders, the private pool, the lawn, the rooms and the food.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Gallery", path: "/gallery" }])} />
      <PageHero eyebrow="Gallery" title="Brick at dusk, water at noon." lead="The house photographs best in the last hour of light. The pool, at any hour." />
      <section className="section">
        <div className="wrap"><GalleryGrid /></div>
      </section>
      <CTABand />
    </>
  );
}
