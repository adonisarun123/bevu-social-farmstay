import Image from "next/image";
import { Check } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CTABand from "@/components/CTABand";
import JsonLd from "@/components/JsonLd";
import { amenities } from "@/data/amenities";
import { breadcrumbSchema, webPageSchema, amenitiesListSchema } from "@/data/schema";

export const metadata = {
  title: "Private Pool, Lawn & Living Spaces",
  description: "Private swimming pool, open lawn with bonfire pit, a double-height brick living room and a farm kitchen — everything on the property at Bevu, near Hosur.",
  alternates: { canonical: "/amenities" },
};

export default function AmenitiesPage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Pool & Lawn", path: "/amenities" }];
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={webPageSchema({ path: crumbs[crumbs.length - 1].path, title: metadata.title, description: metadata.description, type: "WebPage", image: "/images/hero.jpg" })} />
      <JsonLd data={amenitiesListSchema} />
      <PageHero crumbs={crumbs} eyebrow="On the property" title="A pool, a lawn, a fire, a long table." lead="Everything here is built for a group to spend a whole day outside and not run out of things to do — or places to do nothing." />

      {amenities.map((a, i) => {
        const flip = i % 2 === 1;
        return (
          <section key={a.slug} id={a.slug} className={`${i % 2 === 1 ? "bg-parchment" : ""} border-b border-ink/10`}>
            <div className="wrap section grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <Reveal className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card">
                  <Image src={a.image} alt={a.alt} fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
                </div>
              </Reveal>
              <Reveal delay={0.1} className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
                <span className="eyebrow">{a.kicker}</span>
                <h2 className="h-section mt-4">{a.title}</h2>
                <p className="lead mt-5">{a.description}</p>
                <ul className="mt-7 space-y-2.5 text-sm text-bark/85">
                  {a.points.map((p) => <li key={p} className="flex gap-3"><Check size={16} className="mt-0.5 shrink-0 text-brick" />{p}</li>)}
                </ul>
              </Reveal>
            </div>
          </section>
        );
      })}

      <CTABand title="Take the whole house." text="Whole-house bookings get the pool, lawn and dining exclusively — the way this place works best." />
    </>
  );
}
