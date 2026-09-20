import Image from "next/image";
import { Sprout, Droplets, Recycle, Trees, Handshake, Footprints } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import CTABand from "@/components/CTABand";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/data/schema";
import { site } from "@/data/site";

export const metadata = {
  title: "About — A Brick House Among Boulders",
  description: "Why Bevu was built by hand from brick and stone around its boulders, what 'social farmstay' means to us, and how we tread lightly on the land.",
  alternates: { canonical: "/about" },
};

const pillars = [
  { Icon: Trees, title: "Built around the boulders, not over them", text: "The granite outcrops on the plot were the first thing we fell for. The house was drawn around them; the lawn flows between them. Nothing was blasted." },
  { Icon: Sprout, title: "Brick, stone and timber", text: "Handcrafted brick walls that breathe, stone plinths, timber-framed windows and a glass-block tower that lights the stairwell without a single bulb by day." },
  { Icon: Droplets, title: "Water, respected", text: "Rainwater harvesting feeds the garden, the lawn is planted for this climate, and the pool is filtered and reused rather than drained." },
  { Icon: Recycle, title: "Low waste, by design", text: "Kitchen and garden waste is composted, drinking water is filtered on site, and we skip single-use plastic wherever a guest wouldn't notice the difference." },
  { Icon: Handshake, title: "Local hands", text: "The house was built by masons from the villages around it; the team that runs it, and most of what's on the table, comes from within a few kilometres." },
  { Icon: Footprints, title: "Small groups, light footprints", text: "Four rooms, one group at a time when the house is taken whole. Quiet after ten. Dogs welcome, on a leash near the pool. The countryside stays as calm for the next guest as it was for you." },
];

export default function AboutPage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "About", path: "/about" }];
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={webPageSchema({ path: crumbs[crumbs.length - 1].path, title: metadata.title, description: metadata.description, type: "AboutPage", image: "/images/house-build.jpg" })} />
      <PageHero crumbs={crumbs} eyebrow="About" title="A house we built to fill with people." image="/images/house-build.jpg" alt="The brick house under construction, boulders in the foreground" position="center 45%" />

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="The name" title="Bevu — ಬೇವು — neem." />
          </div>
          <Reveal delay={0.1} className="space-y-5 leading-relaxed text-bark/85 lg:col-span-7">
            <p className="lead">The neem is the tree that shades the front of the house. It is bitter, patient, medicinal, and nearly impossible to kill — which felt like the right thing to name a farmstay after.</p>
            <p>The plot sits in the boulder country near Berigai and Shoolagiri, past Hosur, on red laterite soil, an hour and a bit from south Bangalore. When we found it, it was rock, scrub and a few old tamarind trees. We kept all of it and built between.</p>
            <p>The house went up slowly, in handcrafted brick, with masons from the villages around. The curved tower with its slit of glass blocks lights the stairs by day. The roof is clay tile. The lawn grew in around the boulders, and the pool went where the ground fell away toward the evening light.</p>
            <p>We warmed the house in June 2026 with a griha pravesh, and opened it to guests the way we'd always meant to — {site.hosts} hosting, four rooms, one long table.</p>
          </Reveal>
        </div>
      </section>

      <section className="grain bg-ink text-cream">
        <div className="wrap section grid gap-12 lg:grid-cols-12 lg:items-center">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-2xl lg:col-span-5">
            <Image src="/images/hero.jpg" alt="Bevu Social Farmstay lit at dusk" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </Reveal>
          <div className="lg:col-span-7">
            <SectionHeading tone="light" eyebrow="Why 'social'" title="A farmstay is better when it's full." />
            <Reveal delay={0.1} className="mt-6 space-y-5 leading-relaxed text-cream/75">
              <p>Most farmstays sell solitude. We wanted to build the opposite: a place where a whole group — a family across three generations, six friends who never get the same weekend off, a small team that has only ever met on video — could be in one house without being on top of each other.</p>
              <p>So there is one big living room instead of four small ones. One long dining table, and a longer one outside. A pool you can see from the lawn, and a lawn you can see from the kitchen. Rooms that are private and comfortable, and everything else deliberately shared.</p>
              <p>That's the "social" part. The "farm" part is the soil, the trees, the birds, and the food.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHeading align="center" eyebrow="Sustainability" title="How we try to tread lightly." lead="Not a certificate on the wall — a set of habits the house was designed around." />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map(({ Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.05} className="rounded-2xl bg-parchment p-7 ring-1 ring-ink/5">
                <Icon size={26} strokeWidth={1.5} className="text-brick" />
                <h3 className="mt-5 font-display text-xl">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-bark/75">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand title="Come see it in the evening light." />
    </>
  );
}
