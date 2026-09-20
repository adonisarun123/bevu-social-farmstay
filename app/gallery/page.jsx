import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";
import CTABand from "@/components/CTABand";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema, gallerySchema } from "@/data/schema";

export const metadata = {
  title: "Gallery — House, Pool, Lawn & Rooms",
  description: "Photos of Bevu Social Farmstay near Bangalore: the handcrafted brick house among granite boulders, the private pool, the lawn, the rooms and the food.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Gallery", path: "/gallery" }];
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={webPageSchema({ path: crumbs[crumbs.length - 1].path, title: metadata.title, description: metadata.description, type: "CollectionPage", image: "/images/hero.jpg" })} />
      <JsonLd data={gallerySchema} />
      <PageHero crumbs={crumbs} eyebrow="Gallery" title="Brick at dusk, water at noon." lead="The house photographs best in the last hour of light. The pool, at any hour." />
      <section className="section">
        <div className="wrap"><GalleryGrid /></div>
      </section>
      <CTABand />
    </>
  );
}
