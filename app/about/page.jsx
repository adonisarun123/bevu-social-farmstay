import Image from "next/image";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import FinalCTA from "@/components/FinalCTA";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/data/schema";
import { Leaf, Users, Home as HomeIcon } from "lucide-react";

export const metadata = {
  title: "About Us | Our Story & Philosophy",
  description:
    "The story behind Bevu Social Farmstay — a premium sustainable farmstay in Tamil Nadu near Bangalore, built around farm life, community, and conscious living.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ])} />

      <PageHero
        title="Our Story"
        subtitle="A farmstay built by hand, rooted in the land, and made for people."
        image="/images/bevu-hero.jpeg"
        alt="Bevu Social Farmstay's handcrafted brick building at dusk among rocks and trees"
      />

      {/* Our Story */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="The Beginning" title="Why We Built Bevu" center={false} />
          <Reveal delay={0.1}>
            <div className="mt-6 space-y-4 leading-relaxed text-charcoal/80">
              <p>
                At Bevu Social Farmstay, we believe a good stay should do more
                than offer a room. It should help people slow down, breathe
                better, eat cleaner, connect deeper, and return with a sense of
                calm.
              </p>
              <p>
                Our farmstay brings together the simplicity of farm life and
                the comfort of thoughtful hospitality. The buildings themselves
                tell the story — handmade brick, earthen plaster, and local
                stone, shaped around the boulders and trees that were here long
                before us.
              </p>
              <p>
                <em>Bevu</em> is the Kannada word for the neem tree — a tree of
                shade, resilience, and quiet healing. It felt like the right
                name for a place built to restore people.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why "Social Farmstay" */}
      <section className="bg-beige py-20 sm:py-24">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="The Name"
            title={`Why "Social Farmstay"`}
            subtitle="Because the best memories are shared ones."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Users,
                title: "Designed for Togetherness",
                text: "Shared tables, open courtyards, and fireside corners — spaces that gently pull people out of their rooms and into conversation.",
              },
              {
                icon: Leaf,
                title: "Connected to the Land",
                text: "Every experience here begins with the farm — the food, the walks, the learning, the quiet. Nature isn't the backdrop; it's the host.",
              },
              {
                icon: HomeIcon,
                title: "Rooted in Community",
                text: "We work with the village around us — local hands built this place, local farms feed it, and local culture shapes the experience.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <div className="h-full rounded-2xl bg-offwhite p-8 shadow-sm">
                  <item.icon className="h-8 w-8 text-clay" aria-hidden="true" />
                  <h3 className="mt-4 font-heading text-xl font-semibold text-forest">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/75">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Philosophy */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="relative h-[420px] overflow-hidden rounded-3xl">
                <Image
                  src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1000&q=70"
                  alt="Open green farmland representing sustainable farm living"
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <div>
              <SectionHeading
                eyebrow="Our Philosophy"
                title="Sustainability as a Way of Living"
                center={false}
              />
              <Reveal delay={0.15}>
                <p className="mt-6 leading-relaxed text-charcoal/80">
                  Our approach to sustainability is rooted in everyday choices.
                  From local food and mindful water use to natural landscapes
                  and community-first hospitality, Bevu Social Farmstay is
                  designed to respect the land while creating a beautiful
                  experience for guests.
                </p>
                <p className="mt-4 leading-relaxed text-charcoal/80">
                  We don't preach sustainability. We simply live it — and let
                  guests experience how good conscious living can feel.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* What makes Bevu different */}
      <section className="bg-forest py-20 sm:py-24">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What Makes Bevu Different"
            title="Community, Nature, and Comfort — Together"
            light
          />
          <div className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {[
              "Hosted personally, not managed corporately — you'll know your hosts by name.",
              "Small guest numbers, so the farm never feels crowded and the experience stays personal.",
              "Architecture built from earth and brick, designed around the rocks and trees of the site.",
              "Food that follows the farm and the season — not a printed menu.",
              "Experiences led by nature: walks, fires, stars, and slow conversations.",
              "A stay that supports the local village economy with every booking.",
            ].map((point, i) => (
              <Reveal key={point} delay={i * 0.07}>
                <p className="border-l-2 border-amber pl-5 leading-relaxed text-beige/90">{point}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA
        title="Come See Bevu for Yourself"
        subtitle="The story is better experienced than read. Plan a slow weekend with us."
      />
    </>
  );
}
