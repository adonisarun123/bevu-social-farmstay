import Image from "next/image";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import FeatureCard from "@/components/FeatureCard";
import ExperienceCard from "@/components/ExperienceCard";
import CTAButton from "@/components/CTAButton";
import FinalCTA from "@/components/FinalCTA";
import FAQ from "@/components/FAQ";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { whyBevu, stayHighlights, idealFor } from "@/data/features";
import { experiences, homeExperienceSlugs } from "@/data/experiences";
import { faqs } from "@/data/faqs";
import { faqSchema } from "@/data/schema";
import { Check, Quote } from "lucide-react";

export const metadata = {
  alternates: { canonical: "/" },
};

const homeExperiences = homeExperienceSlugs.map((slug) =>
  experiences.find((e) => e.slug === slug)
);

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <Hero />

      {/* Introduction */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="relative h-[420px] overflow-hidden rounded-3xl sm:h-[500px]">
                <Image
                  src="/images/bevu-hero.jpeg"
                  alt="The handcrafted brick architecture of Bevu Social Farmstay, set among natural rock and native trees"
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <div>
              <SectionHeading
                eyebrow="Welcome to Bevu"
                title="Where Farm Life Meets Premium Comfort"
                center={false}
              />
              <Reveal delay={0.15}>
                <p className="mt-6 leading-relaxed text-charcoal/80">
                  Bevu Social Farmstay is designed for those who want more than
                  a stay. It is a calm, thoughtfully curated farm experience
                  where sustainability, comfort, food, nature, and community
                  come together.
                </p>
                <p className="mt-4 leading-relaxed text-charcoal/80">
                  Located in Tamil Nadu and easily accessible from Bangalore,
                  Bevu offers a refreshing escape from city life — built by
                  hand from earth, brick, and stone, and rooted in the land it
                  stands on.
                </p>
                <div className="mt-8">
                  <CTAButton href="/about" variant="outlineDark" icon="arrow">
                    Our Story
                  </CTAButton>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Why Bevu */}
      <section className="bg-beige py-20 sm:py-24">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why Bevu"
            title="A Different Kind of Getaway"
            subtitle="Not a resort. Not a hotel. A soulful farm experience built around four simple ideas."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyBevu.map((f, i) => (
              <FeatureCard key={f.title} {...f} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Stay Experience */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="The Stay"
            title="Stay Close to Nature, Without Giving Up Comfort"
            subtitle="Thoughtfully designed spaces that feel rooted in the land — calm, clean, and quietly premium."
          />
          <div className="mt-12 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {stayHighlights.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.07}>
                <div className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-olive/15">
                    <Check className="h-3.5 w-3.5 text-olive" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-forest">{item.title}</h3>
                    <p className="mt-1 text-sm text-charcoal/70">{item.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 text-center">
            <CTAButton href="/stay" variant="outlineDark" icon="arrow">
              Explore the Stay Experience
            </CTAButton>
          </Reveal>
        </div>
      </section>

      {/* Farm & Nature Experiences */}
      <section className="bg-beige py-20 sm:py-24">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Experiences"
            title="Farm & Nature Experiences"
            subtitle="Days here move at the pace of the land — slow mornings, golden evenings, and time well spent."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {homeExperiences.map((exp, i) => (
              <ExperienceCard key={exp.slug} {...exp} delay={i * 0.08} />
            ))}
          </div>
          <Reveal className="mt-12 text-center">
            <CTAButton href="/experiences" icon="arrow">
              See All Experiences
            </CTAButton>
          </Reveal>
        </div>
      </section>

      {/* Food & Sustainability */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <SectionHeading
                eyebrow="Food & Sustainability"
                title="Eat Cleaner. Live Lighter."
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
                  Meals are simple, soulful, and farm-inspired — much of it
                  grown a few steps from your plate, cooked the way the
                  countryside has always cooked.
                </p>
                <div className="mt-8">
                  <CTAButton href="/sustainability" variant="outlineDark" icon="arrow">
                    Our Sustainability Approach
                  </CTAButton>
                </div>
              </Reveal>
            </div>
            <Reveal className="order-1 lg:order-2">
              <div className="relative h-[420px] overflow-hidden rounded-3xl">
                <Image
                  src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=1000&q=70"
                  alt="Fresh farm produce and ingredients for farm-to-table meals"
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Ideal For */}
      <section className="bg-beige py-20 sm:py-24">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Ideal For"
            title="Made for Meaningful Time Together"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {idealFor.map((aud, i) => (
              <Reveal key={aud.title} delay={i * 0.07}>
                <div className="group relative h-60 overflow-hidden rounded-2xl">
                  <Image
                    src={aud.image}
                    alt={aud.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/20 to-transparent" aria-hidden="true" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-heading text-xl font-semibold text-offwhite">{aud.title}</h3>
                    <p className="mt-1 text-sm text-beige/85">{aud.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Location Advantage */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Location"
            title="A Nature Escape Near Bangalore, Rooted in Tamil Nadu"
            subtitle="Bevu Social Farmstay gives guests the joy of leaving the city behind without travelling too far. It is ideal for weekend getaways, small retreats, family breaks, and meaningful group stays."
          />
          <Reveal className="mt-10 text-center">
            <CTAButton href="/location" variant="outlineDark" icon="arrow">
              How to Reach Us
            </CTAButton>
          </Reveal>
        </div>
      </section>

      {/* Testimonials placeholder */}
      <section className="bg-beige py-20 sm:py-24">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Guest Words" title="What Guests Will Say" subtitle="Guest stories coming soon — from our first slow weekends." />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              "A weekend that felt like a deep breath. — Guest story placeholder",
              "Our team came back closer than any offsite has managed. — Guest story placeholder",
              "The kids didn't ask for screens even once. — Guest story placeholder",
            ].map((quote, i) => (
              <Reveal key={quote} delay={i * 0.1}>
                <figure className="h-full rounded-2xl border border-sand bg-offwhite p-7">
                  <Quote className="h-6 w-6 text-clay/50" aria-hidden="true" />
                  <blockquote className="mt-4 text-sm italic leading-relaxed text-charcoal/75">
                    {quote}
                  </blockquote>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ preview */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Questions" title="Frequently Asked Questions" />
          <Reveal className="mt-10">
            <FAQ items={faqs.slice(0, 4)} />
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
