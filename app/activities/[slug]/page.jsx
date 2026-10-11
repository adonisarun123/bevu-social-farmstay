import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Users, Clock, Sun, Sparkles, Check, Backpack, MessageCircle, Info } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import FAQ from "@/components/FAQ";
import CTABand from "@/components/CTABand";
import JsonLd from "@/components/JsonLd";
import { activities, getActivity } from "@/data/activities";
import { breadcrumbSchema, webPageSchema, activitySchema } from "@/data/schema";
import { site } from "@/data/site";

export function generateStaticParams() {
  return activities.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }) {
  const a = getActivity(params.slug);
  if (!a) return {};
  return {
    title: a.title,
    description: `${a.tagline} ${a.duration}. At Bevu Social Farmstay near Hosur, Tamil Nadu.`.slice(0, 160),
    alternates: { canonical: `/activities/${a.slug}` },
    openGraph: { title: `${a.title} · ${site.name}`, description: a.tagline, images: [{ url: a.cover }] },
  };
}

export default function ActivityPage({ params }) {
  const a = getActivity(params.slug);
  if (!a) notFound();
  const crumbs = [{ name: "Home", path: "/" }, { name: "Activities & Workshops", path: "/activities" }, { name: a.title, path: `/activities/${a.slug}` }];
  const sameCat = activities.filter((x) => x.slug !== a.slug && x.category === a.category);
  const others = [...sameCat, ...activities.filter((x) => x.slug !== a.slug && x.category !== a.category)].slice(0, 3);
  const wa = site.whatsappHref(`Hi Bevu Social Farmstay, I'd like to book the ${a.title}. Group size: ___ · Dates: ___`);
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: a.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  const facts = [
    [Clock, "Duration", a.duration],
    [Users, "Group size", a.group],
    [Sparkles, "Who it's for", a.who],
    [Sun, "Best time", a.when],
  ];
  if (a.facilitator) facts.push([Users, "Led by", a.facilitator]);
  if (a.venue) facts.push([Info, "Venue", a.venue]);

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={webPageSchema({ path: `/activities/${a.slug}`, title: a.title, description: a.tagline, type: "ItemPage", image: a.cover, speakable: ["#activity-intro"], extra: { mainEntity: { "@id": `${site.url}/activities/${a.slug}#offer` } } })} />
      <JsonLd data={activitySchema(a)} />
      <JsonLd data={faqSchema} />

      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-ink pt-[76px] text-cream">
        <Image src={a.cover} alt={a.coverAlt} fill priority sizes="100vw" className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/20" />
        <div className="wrap relative pb-14 pt-24 md:pb-20">
          <Breadcrumbs items={crumbs} tone="light" />
          <div className="mt-8"><span className="eyebrow !text-brass-light before:!bg-brass-light">{a.category} · {a.duration}</span></div>
          <h1 className="h-display mt-4 max-w-3xl">{a.title}</h1>
          <p className="lead mt-5 max-w-2xl !text-cream/80">{a.tagline}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-primary"><MessageCircle size={18} /> Book this session</a>
            <Link href="/account/book" className="btn-light">Book a stay</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <dl className="divide-y divide-ink/10 rounded-2xl bg-parchment px-6 ring-1 ring-ink/5">
              {facts.map(([Icon, k, v]) => (
                <div key={k} className="flex items-start gap-4 py-4"><Icon size={18} className="mt-0.5 shrink-0 text-brick" strokeWidth={1.6} /><div><dt className="text-[11px] uppercase tracking-[0.2em] text-stone">{k}</dt><dd className="mt-0.5 text-sm">{v}</dd></div></div>
              ))}
            </dl>
            <div className="mt-6 rounded-2xl bg-ink p-6 text-cream">
              <div className="text-[11px] uppercase tracking-[0.2em] text-brass">Pricing</div>
              <p className="mt-2 text-sm text-cream/80">{a.price || "Priced per person. Message us for current rates and available dates; private sessions for groups on request."}</p>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn mt-5 w-full bg-brass text-ink hover:bg-brass-light">Ask on WhatsApp</a>
              <Link href="/activities" className="mt-3 block text-center text-xs text-cream/60 hover:text-cream">All activities & workshops →</Link>
            </div>
          </Reveal>
          <div className="lg:col-span-8">
            <Reveal><span className="eyebrow">The session</span><h2 className="h-section mt-4">What it&rsquo;s about.</h2></Reveal>
            <Reveal delay={0.1}><p id="activity-intro" className="lead mt-6">{a.intro}</p></Reveal>
            <Reveal delay={0.15} className="mt-10">
              <h3 className="font-display text-2xl">What you&rsquo;ll do</h3>
              <ol className="mt-5 space-y-4">
                {a.steps.map((s, i) => (
                  <li key={s} className="flex gap-4 text-bark/85"><span className="font-display text-2xl leading-none text-brick">{i + 1}</span><span className="pt-0.5">{s}</span></li>
                ))}
              </ol>
            </Reveal>
            {a.takeaway && (
              <Reveal delay={0.2} className="mt-8 rounded-2xl bg-parchment p-6 ring-1 ring-ink/5">
                <div className="text-[11px] uppercase tracking-[0.2em] text-stone">You leave with</div>
                <p className="mt-2 text-bark/85">{a.takeaway}</p>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-parchment">
        <div className="wrap section grid gap-12 md:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-2xl">Included</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-bark/85">{a.included.map((x) => <li key={x} className="flex gap-3"><Check size={16} className="mt-0.5 shrink-0 text-moss" />{x}</li>)}</ul>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-2xl">Bring</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-bark/85">{a.bring.map((x) => <li key={x} className="flex gap-3"><Backpack size={16} className="mt-0.5 shrink-0 text-brick" />{x}</li>)}</ul>
          </Reveal>
          {a.note && (
            <Reveal delay={0.12} className="md:col-span-2">
              <p className="flex gap-3 rounded-2xl bg-cream p-5 text-sm text-bark/80 ring-1 ring-ink/10"><Info size={18} className="mt-0.5 shrink-0 text-brick" />{a.note}</p>
            </Reveal>
          )}
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4"><SectionHeading eyebrow="FAQ" title="Usual questions." /></div>
          <Reveal delay={0.1} className="lg:col-span-8"><FAQ items={a.faq.map((f) => ({ question: f.q, answer: f.a }))} /></Reveal>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-parchment">
        <div className="wrap section">
          <SectionHeading eyebrow="Pair it with" title="Make a day of it." />
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/activities/${o.slug}`} className="group card flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden"><Image src={o.cover} alt={o.coverAlt} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" /></div>
                <div className="p-5"><div className="font-display text-xl group-hover:text-brick">{o.title}</div><div className="mt-1 text-xs text-stone">{o.category} · {o.duration}</div></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand title={`Add the ${a.title.toLowerCase()} to your stay.`} text="Send us your dates and group size. We'll confirm the session time and price on WhatsApp." />
    </>
  );
}
