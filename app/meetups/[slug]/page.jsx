import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Users, Clock, Check, Backpack, MessageCircle } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import FAQ from "@/components/FAQ";
import CTABand from "@/components/CTABand";
import JsonLd from "@/components/JsonLd";
import { meetups, getMeetup } from "@/data/meetups";
import { breadcrumbSchema, webPageSchema, meetupSchema } from "@/data/schema";
import { site } from "@/data/site";

export function generateStaticParams() {
  return meetups.map((m) => ({ slug: m.slug }));
}

export function generateMetadata({ params }) {
  const m = getMeetup(params.slug);
  if (!m) return {};
  return {
    title: m.title,
    description: `${m.tagline} ${m.audience}. ${m.group}. Hosted at Bevu Social Farmstay, a pet-friendly farmstay with pool near Hosur.`.slice(0, 160),
    alternates: { canonical: `/meetups/${m.slug}` },
    openGraph: { title: `${m.title} · ${site.name}`, description: m.tagline, images: [{ url: m.cover }] },
  };
}

export default function MeetupPage({ params }) {
  const m = getMeetup(params.slug);
  if (!m) notFound();
  const crumbs = [{ name: "Home", path: "/" }, { name: "Meetups", path: "/meetups" }, { name: m.title, path: `/meetups/${m.slug}` }];
  const others = meetups.filter((x) => x.slug !== m.slug).slice(0, 3);
  const wa = site.whatsappHref(`Hi Bevu Social Farmstay, I'd like to host a ${m.title}. Group size: ___ · Dates: ___`);
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: m.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={webPageSchema({ path: `/meetups/${m.slug}`, title: `${m.title} near Bangalore`, description: m.tagline, type: "ItemPage", image: m.cover, speakable: ["#meetup-intro"], extra: { mainEntity: { "@id": `${site.url}/meetups/${m.slug}#offer` } } })} />
      <JsonLd data={meetupSchema(m)} />
      <JsonLd data={faqSchema} />

      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-ink pt-[76px] text-cream">
        <Image src={m.cover} alt={m.coverAlt} fill priority sizes="100vw" className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/20" />
        <div className="wrap relative pb-14 pt-24 md:pb-20">
          <Breadcrumbs items={crumbs} tone="light" />
          <div className="mt-8"><span className="eyebrow !text-brass-light before:!bg-brass-light">Meetup · {m.group}</span></div>
          <h1 className="h-display mt-4 max-w-3xl">{m.title}</h1>
          <p className="lead mt-5 max-w-2xl !text-cream/80">{m.tagline}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={`/account/book?kind=${m.bookKind}`} className="btn-primary">Check availability & book</Link>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-light"><MessageCircle size={18} /> Ask for a per-head quote</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <dl className="divide-y divide-ink/10 rounded-2xl bg-parchment px-6 ring-1 ring-ink/5">
              {[[Users, "Who it's for", m.audience], [Users, "Group size", m.group], [Clock, "Duration", m.duration]].map(([Icon, k, v]) => (
                <div key={k} className="flex items-start gap-4 py-4"><Icon size={18} className="mt-0.5 shrink-0 text-brick" strokeWidth={1.6} /><div><dt className="text-[11px] uppercase tracking-[0.2em] text-stone">{k}</dt><dd className="mt-0.5 text-sm">{v}</dd></div></div>
              ))}
            </dl>
            <div className="mt-6 rounded-2xl bg-ink p-6 text-cream">
              <div className="text-[11px] uppercase tracking-[0.2em] text-brass">Pricing</div>
              <p className="mt-2 text-sm text-cream/80">{m.price}</p>
              <Link href={`/account/book?kind=${m.bookKind}`} className="btn mt-5 w-full bg-brass text-ink hover:bg-brass-light">Check dates</Link>
              <Link href="/stay#rates" className="mt-3 block text-center text-xs text-cream/60 hover:text-cream">See standard rates →</Link>
            </div>
          </Reveal>
          <div className="lg:col-span-8">
            <Reveal><span className="eyebrow">The weekend</span><h2 className="h-section mt-4">Why here.</h2></Reveal>
            <Reveal delay={0.1}><p id="meetup-intro" className="lead mt-6">{m.intro}</p></Reveal>
            <Reveal delay={0.15} className="mt-8">
              <h3 className="font-display text-2xl">What makes it work</h3>
              <ul className="mt-4 space-y-2.5 text-bark/85">{m.highlights.map((h) => <li key={h} className="flex gap-3"><Check size={18} className="mt-0.5 shrink-0 text-moss" />{h}</li>)}</ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-parchment">
        <div className="wrap section grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="A sample schedule" title="Roughly how it goes." lead="Yours to change. This is the shape that has worked for groups before." />
          </div>
          <Reveal delay={0.1} className="lg:col-span-7">
            <ol className="divide-y divide-ink/10 rounded-2xl bg-cream ring-1 ring-ink/5">
              {m.schedule.map((s) => <li key={s.t + s.d} className="grid gap-1 px-6 py-4 sm:grid-cols-[130px_1fr]"><span className="text-sm font-medium text-brick">{s.t}</span><span className="text-sm text-bark/85">{s.d}</span></li>)}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-12 md:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-2xl">Included</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-bark/85">{m.included.map((x) => <li key={x} className="flex gap-3"><Check size={16} className="mt-0.5 shrink-0 text-moss" />{x}</li>)}</ul>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-2xl">Bring</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-bark/85">{m.bring.map((x) => <li key={x} className="flex gap-3"><Backpack size={16} className="mt-0.5 shrink-0 text-brick" />{x}</li>)}</ul>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-parchment">
        <div className="wrap section grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4"><SectionHeading eyebrow="FAQ" title="Usual questions." /></div>
          <Reveal delay={0.1} className="lg:col-span-8"><FAQ items={m.faq.map((f) => ({ question: f.q, answer: f.a }))} /></Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHeading eyebrow="Other formats" title="Or one of these." />
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/meetups/${o.slug}`} className="group card flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden"><Image src={o.cover} alt={o.coverAlt} fill sizes="33vw" className="object-cover transition duration-700 group-hover:scale-105" /></div>
                <div className="p-5"><div className="font-display text-xl group-hover:text-brick">{o.title}</div><div className="mt-1 text-xs text-stone">{o.group}</div></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand title={`Host a ${m.title.toLowerCase()} at Bevu.`} text="Send us your group size, dates and any must-haves. We'll confirm availability and a per-head quote on WhatsApp." />
    </>
  );
}
