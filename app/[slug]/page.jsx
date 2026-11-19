import Image from "@/components/Image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, MessageCircle, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import FAQ from "@/components/FAQ";
import CTABand from "@/components/CTABand";
import JsonLd from "@/components/JsonLd";
import RichText from "@/components/RichText";
import PostCard from "@/components/PostCard";
import PricingCards from "@/components/PricingCards";
import Reviews from "@/components/Reviews";
import { landings, getLanding } from "@/data/landings";
import { posts } from "@/data/posts";
import { breadcrumbSchema, landingSchemas, ogImage } from "@/data/schema";
import { site } from "@/data/site";

// Root-level intent pages (/farmstay-near-bangalore …). Only slugs in data/landings.js exist;
// anything else 404s, and every other route in /app takes priority over this one.
export const dynamicParams = false;
export const revalidate = 300;

export function generateStaticParams() {
  return landings.map((l) => ({ slug: l.slug }));
}

export function generateMetadata({ params }) {
  const l = getLanding(params.slug);
  if (!l) return {};
  return {
    title: l.metaTitle,
    description: l.description,
    keywords: l.keywords,
    alternates: { canonical: `/${l.slug}` },
    openGraph: { type: "website", title: `${l.metaTitle} · ${site.name}`, description: l.description, url: `/${l.slug}`, images: [{ url: ogImage(l.image), width: 1200, height: 630, alt: l.imageAlt }] },
    twitter: { card: "summary_large_image", title: l.metaTitle, description: l.description, images: [ogImage(l.image)] },
  };
}

export default function LandingPage({ params }) {
  const l = getLanding(params.slug);
  if (!l) notFound();
  const crumbs = [{ name: "Home", path: "/" }, { name: l.eyebrow, path: `/${l.slug}` }];
  const related = l.related.map(getLanding).filter(Boolean);
  const reading = l.posts.map((s) => posts.find((p) => p.slug === s)).filter(Boolean);
  const wa = site.whatsappHref(`Hi Bevu Social Farmstay, I found you while looking for a ${l.keywords[0]}. Dates: ___ · Guests: ___`);

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      {landingSchemas(l).map((s, i) => <JsonLd key={i} data={s} />)}

      <section className="relative flex min-h-[72vh] items-end overflow-hidden bg-ink pt-[76px] text-cream">
        <Image src={l.image} alt={l.imageAlt} fill priority sizes="100vw" className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/25" />
        <div className="wrap relative pb-14 pt-24 md:pb-20">
          <Breadcrumbs items={crumbs} tone="light" />
          <div className="mt-8"><span className="eyebrow !text-brass-light before:!bg-brass-light">{l.eyebrow}</span></div>
          <h1 className="h-display mt-4 max-w-4xl">{l.h1}</h1>
          <p id="landing-summary" className="lead mt-5 max-w-2xl !text-cream/80">{l.lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/account/book" className="btn-primary">Check availability & book</Link>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-light"><MessageCircle size={18} /> Ask on WhatsApp</a>
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-parchment">
        <dl className="wrap grid grid-cols-2 gap-px py-0 md:grid-cols-4">
          {l.facts.map((f) => (
            <div key={f.label} className="px-2 py-7 text-center md:py-9">
              <dd className="font-display text-2xl md:text-3xl">{f.value}</dd>
              <dt className="mt-1 text-[11px] uppercase tracking-[0.2em] text-stone">{f.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="mx-auto max-w-3xl">
            {l.intro.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}><p className={i === 0 ? "lead" : "mt-6 leading-relaxed text-bark/85 md:text-lg"}><RichText text={p} /></p></Reveal>
            ))}
            {l.sections.map((s) => (
              <Reveal key={s.h} className="mt-14">
                <h2 className="font-display text-2xl md:text-3xl">{s.h}</h2>
                {(s.p || []).map((p, i) => <p key={i} className="mt-5 leading-relaxed text-bark/85 md:text-lg"><RichText text={p} /></p>)}
                {s.ul && (
                  <ul className="mt-5 space-y-2.5 text-bark/85 md:text-lg">
                    {s.ul.map((li) => <li key={li} className="flex gap-3"><Check size={18} className="mt-1.5 shrink-0 text-moss" /><span><RichText text={li} /></span></li>)}
                  </ul>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Reviews className="border-t border-ink/10" limit={3} />

      <section className="border-y border-ink/10 bg-parchment">
        <div className="wrap section">
          <SectionHeading eyebrow="Rates" title="Room-wise, or the whole house." lead="Breakfast is always included. Lunch and dinner are cooked on site on request." />
          <div className="mt-12"><PricingCards /></div>
        </div>
      </section>

      <section id="faq" className="section">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4"><SectionHeading eyebrow="FAQ" title="Asked before booking." />
            <p className="mt-4 text-sm text-stone"><Link href="/contact#faq" className="text-brick">All questions →</Link></p></div>
          <Reveal delay={0.1} className="lg:col-span-8"><FAQ items={l.faq.map((f) => ({ question: f.q, answer: f.a }))} /></Reveal>
        </div>
      </section>

      {reading.length > 0 && (
        <section className="border-t border-ink/10 bg-parchment">
          <div className="wrap section">
            <SectionHeading eyebrow="From the journal" title="Read before you decide." />
            <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {reading.map((p, i) => <PostCard key={p.slug} post={p} index={i} />)}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap">
          <SectionHeading eyebrow="Also useful" title="Looking for something slightly different?" />
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {related.map((o) => (
              <Link key={o.slug} href={`/${o.slug}`} className="group card flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden"><Image src={o.image} alt={o.imageAlt} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" /></div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="font-display text-xl group-hover:text-brick">{o.eyebrow}</div>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-bark/75">{o.lead}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brick">Read more <ArrowRight size={14} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
