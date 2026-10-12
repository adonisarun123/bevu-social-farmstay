import Link from "next/link";
import Image from "@/components/Image";
import { ArrowUpRight, Check, MessageCircle, MapPin, Info, Heart, Waves, Users, Dog, Coffee, Home } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import FAQ from "@/components/FAQ";
import PhotoGrid from "@/components/PhotoGrid";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/data/schema";
import { bhudeep, bhudeepGallery } from "@/data/bhudeep";
import { site } from "@/data/site";

export const metadata = {
  title: "BhuDeep — An Earthen Villa for Two",
  description: "BhuDeep by Sanctity Ferme Stays: a one-bedroom earthen villa near Shoolagiri, a short drive from Bevu — sunken living pit, peacock bedroom, breakfast included, pets welcome. The stay we suggest when Bevu is full or you're two.",
  alternates: { canonical: "/bhudeep" },
};

const WA_TEXT = "Hi Bevu Social Farmstay, I'm interested in BhuDeep (the one-bedroom villa). Could you share availability and rates?";

const compare = [
  { Icon: Users, label: "Sleeps", bevu: "8 adults, up to 12 with children", bhu: "2 adults (+ a cot)" },
  { Icon: Home, label: "Rooms", bevu: "4 ensuite rooms across two buildings", bhu: "1 bedroom, 1 bathroom — the whole villa" },
  { Icon: Waves, label: "Pool & lawn", bevu: "Private pool, open lawn, bonfire pit", bhu: "Garden and verandah; no pool" },
  { Icon: Coffee, label: "Food", bevu: "Breakfast included; lunch & dinner cooked on request", bhu: "Breakfast included; full kitchen for the rest" },
  { Icon: Dog, label: "Pets", bevu: "Dogs welcome", bhu: "Pets welcome, no charge" },
  { Icon: Heart, label: "Best for", bevu: "Families, friends, small teams, meetups", bhu: "Couples, solo stays, a quiet long weekend" },
];

const lodgingSchema = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "@id": `${site.url}/bhudeep#lodging`,
  name: bhudeep.fullName,
  alternateName: ["BhuDeep", "Bhudeep by Sanctity Ferme Stays"],
  description: bhudeep.description,
  url: `${site.url}/bhudeep`,
  sameAs: [bhudeep.bookingUrl],
  image: `${site.url}${bhudeep.hero.src}`,
  address: { "@type": "PostalAddress", streetAddress: bhudeep.address.label, addressLocality: "Shoolagiri", addressRegion: "Tamil Nadu", postalCode: "635117", addressCountry: "IN" },
  numberOfRooms: 1,
  checkinTime: "13:00",
  checkoutTime: "11:00",
  petsAllowed: true,
  smokingAllowed: false,
  availableLanguage: bhudeep.languages,
  amenityFeature: ["Breakfast included", "Free Wi-Fi", "Free parking", "Kitchen", "Balcony with garden view", "Private bathroom", "Pet friendly"].map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
  audience: { "@type": "PeopleAudience", audienceType: "Couples, nature lovers" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: bhudeep.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
};

function Figure({ img, className = "", sizes = "(min-width: 1024px) 50vw, 100vw", aspect = "aspect-[4/3]" }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-sand shadow-card ${aspect} ${className}`}>
      <Image src={img.src} alt={img.alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}

export default function BhuDeepPage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Stay", path: "/stay" }, { name: "BhuDeep", path: "/bhudeep" }];
  const s = bhudeep.sections;
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={webPageSchema({ path: "/bhudeep", title: metadata.title, description: metadata.description, type: "WebPage", image: bhudeep.hero.src, extra: { mainEntity: { "@id": `${site.url}/bhudeep#lodging` } } })} />
      <JsonLd data={lodgingSchema} />
      <JsonLd data={faqSchema} />

      <PageHero crumbs={crumbs} eyebrow={bhudeep.kicker} title="BhuDeep — an earthen villa for two." lead={bhudeep.tagline} image={bhudeep.hero.src} alt={bhudeep.hero.alt} position={bhudeep.hero.position} />

      {/* Honest framing: a different property, recommended as the alternate */}
      <section className="border-b border-ink/10 bg-sand/60">
        <div className="wrap flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
          <p className="flex items-start gap-3 text-sm leading-relaxed text-bark/85 md:max-w-3xl">
            <Info size={18} className="mt-0.5 shrink-0 text-brick" />
            <span><strong className="font-medium text-ink">BhuDeep is not Bevu.</strong> It's a separate one-bedroom villa by Sanctity Ferme Stays, a little down the road from us. We point guests here when Bevu is taken — or when you're two and four rooms is more house than you need.</span>
          </p>
          <div className="flex shrink-0 gap-3">
            <a href={site.whatsappHref(WA_TEXT)} target="_blank" rel="noopener noreferrer" className="btn-primary !py-2.5"><MessageCircle size={16} /> Ask us</a>
            <a href={bhudeep.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost !py-2.5">Booking.com <ArrowUpRight size={16} /></a>
          </div>
        </div>
      </section>

      {/* At a glance */}
      <section className="border-b border-ink/10">
        <div className="wrap grid grid-cols-2 gap-x-6 divide-ink/10 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-0 lg:divide-x">
          {bhudeep.facts.map((f, i) => (
            <Reveal key={f.k} delay={i * 0.04} className="py-7 lg:px-6 first:lg:pl-0">
              <dt className="text-[11px] font-medium uppercase tracking-[0.22em] text-stone">{f.k}</dt>
              <dd className="mt-1.5 font-display text-lg leading-snug text-ink">{f.v}</dd>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="The villa" title="A round house, built of earth." />
            <Reveal delay={0.1} className="mt-6 space-y-5 leading-relaxed text-bark/85">
              <p className="lead">BhuDeep — <em>bhu</em>, earth; <em>deep</em>, lamp — is a single circular villa finished in earthen plaster, with a clay-tiled roof that rises to a small tower, and nothing around it but scrub, boulders and birds.</p>
              <p>Inside, the plan is one big curve. A sunken conversation pit sits at the centre, ringed with cushions and a folk-art frieze, and a black spiral stair climbs from it to the roof deck. The bedroom opens off the curve — a crisp white bed under a peacock painted across the wall. The kitchen has a cane swing by the window.</p>
              <p>It was built in traditional technique for exactly one couple at a time — close to the land, quiet, and small enough that the whole place is yours from the gate in.</p>
            </Reveal>
          </div>
          <div className="grid gap-4 lg:col-span-7 lg:grid-cols-5">
            <Reveal className="lg:col-span-3"><Figure img={s.arrival} aspect="aspect-[4/5]" sizes="(min-width: 1024px) 35vw, 100vw" /></Reveal>
            <Reveal delay={0.1} className="grid gap-4 lg:col-span-2">
              <Figure img={s.sign} aspect="aspect-[4/3]" sizes="(min-width: 1024px) 23vw, 100vw" />
              <Figure img={s.roof} aspect="aspect-[4/3]" sizes="(min-width: 1024px) 23vw, 100vw" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Walk-through */}
      <section className="grain bg-ink text-cream">
        <div className="wrap section space-y-20 md:space-y-28">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7"><Figure img={s.pit} className="!shadow-none ring-1 ring-cream/10" sizes="(min-width: 1024px) 58vw, 100vw" /></Reveal>
            <div className="lg:col-span-5">
              <SectionHeading tone="light" eyebrow="The living pit" title="Sit down into the floor." lead="A circle sunk into the centre of the house, cushions all the way round, a low table in the middle — the kind of place where an evening disappears. The spiral stair goes up from here." />
              <Reveal delay={0.15} className="mt-8"><Figure img={s.pitTop} className="!shadow-none ring-1 ring-cream/10 max-w-xs" aspect="aspect-square" sizes="320px" /></Reveal>
            </div>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5 lg:order-1">
              <SectionHeading tone="light" eyebrow="The bedroom" title="A peacock over the bed." lead="One double bed, white linen, deep-set windows that frame the trees, and a peacock fanned across the earthen wall. The bathroom is ensuite." />
              <Reveal delay={0.15} className="mt-8"><Figure img={s.bedWindow} className="!shadow-none ring-1 ring-cream/10 max-w-xs" aspect="aspect-square" sizes="320px" /></Reveal>
            </div>
            <Reveal className="lg:col-span-7 lg:order-2"><Figure img={s.bedroom} className="!shadow-none ring-1 ring-cream/10" sizes="(min-width: 1024px) 58vw, 100vw" /></Reveal>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7"><Figure img={s.kitchen} className="!shadow-none ring-1 ring-cream/10" sizes="(min-width: 1024px) 58vw, 100vw" /></Reveal>
            <div className="lg:col-span-5">
              <SectionHeading tone="light" eyebrow="Kitchen & verandah" title="A swing by the window." lead="A fully equipped kitchen in wood and stone, with a cane swing chair where the morning light lands. Outside, a verandah on a stone floor, a timber pillar set on a boulder, and the scrub stretching away." />
              <Reveal delay={0.15} className="mt-8"><Figure img={s.verandah} className="!shadow-none ring-1 ring-cream/10 max-w-xs" aspect="aspect-square" sizes="320px" /></Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Bevu or BhuDeep */}
      <section className="section border-b border-ink/10">
        <div className="wrap">
          <SectionHeading align="center" eyebrow="Which one?" title="Bevu or BhuDeep." lead="Same countryside, same drive from Bangalore, two very different houses. A quick way to decide." />
          <Reveal delay={0.1} className="mt-12 overflow-hidden rounded-2xl ring-1 ring-ink/10">
            <div className="hidden grid-cols-12 bg-parchment text-[11px] font-medium uppercase tracking-[0.22em] text-stone md:grid">
              <div className="col-span-3 px-6 py-4" />
              <div className="col-span-4 px-6 py-4 text-brick">Bevu Social Farmstay</div>
              <div className="col-span-5 px-6 py-4 text-ink">BhuDeep</div>
            </div>
            <dl className="divide-y divide-ink/10">
              {compare.map(({ Icon, label, bevu, bhu }) => (
                <div key={label} className="grid gap-2 px-6 py-5 md:grid-cols-12 md:gap-0 md:px-0 md:py-0">
                  <dt className="flex items-center gap-2.5 font-display text-lg md:col-span-3 md:px-6 md:py-5"><Icon size={18} strokeWidth={1.5} className="text-brick" />{label}</dt>
                  <dd className="text-sm text-bark/85 md:col-span-4 md:px-6 md:py-5"><span className="mr-2 text-[10px] uppercase tracking-widest text-brick md:hidden">Bevu</span>{bevu}</dd>
                  <dd className="text-sm text-bark/85 md:col-span-5 md:px-6 md:py-5"><span className="mr-2 text-[10px] uppercase tracking-widest text-stone md:hidden">BhuDeep</span>{bhu}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.15} className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/stay" className="btn-ghost">See Bevu's rooms</Link>
            <a href={site.whatsappHref("Hi Bevu Social Farmstay, I'm trying to decide between Bevu and BhuDeep — could you help with availability?")} target="_blank" rel="noopener noreferrer" className="btn-primary"><MessageCircle size={16} /> Help me choose</a>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section className="section bg-parchment">
        <div className="wrap">
          <SectionHeading eyebrow="What's there" title="Small house, everything in it." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bhudeep.features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.04} className="rounded-2xl bg-cream p-6 ring-1 ring-ink/5">
                <Check size={20} className="text-moss" />
                <h3 className="mt-4 font-display text-lg">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-bark/75">{f.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section">
        <div className="wrap">
          <SectionHeading eyebrow="Photos" title="Around the villa." lead="Photographs from the property's listing — click any to open." />
          <div className="mt-10"><PhotoGrid items={bhudeepGallery} /></div>
        </div>
      </section>

      {/* Rules + nearby */}
      <section className="border-t border-ink/10 bg-parchment">
        <div className="wrap section grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="House rules" title="A few things the hosts ask." />
            <dl className="mt-8 grid gap-6 sm:grid-cols-2">
              {bhudeep.houseRules.map((r, i) => (
                <Reveal key={r.title} delay={i * 0.04}>
                  <dt className="font-display text-lg">{r.title}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-bark/75">{r.text}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Where" title="Shoolagiri, past Hosur." lead={`${bhudeep.address.label}, ${bhudeep.address.area}. Same NH44 drive as Bevu — leave the highway at Shoolagiri.`} />
            <dl className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
              {bhudeep.nearby.map((n, i) => (
                <Reveal key={n.name} delay={i * 0.04} className="flex items-baseline justify-between gap-4 py-3.5">
                  <dt className="flex items-center gap-2 text-sm text-bark/85"><MapPin size={14} className="shrink-0 text-brick" />{n.name}</dt>
                  <dd className="shrink-0 font-display text-base">{n.dist}</dd>
                </Reveal>
              ))}
            </dl>
            <p className="mt-4 text-xs text-stone">Distances as listed on Booking.com. The exact pin is shared by the hosts on confirmation.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4"><SectionHeading eyebrow="Questions" title="Before you book." /></div>
          <div className="lg:col-span-8"><FAQ items={bhudeep.faqs} /></div>
        </div>
      </section>

      {/* CTA */}
      <section className="grain relative overflow-hidden bg-brick text-cream">
        <div className="wrap section relative">
          <Reveal className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <span className="eyebrow !text-brass-light before:!bg-brass-light">Book BhuDeep</span>
              <h2 className="h-section mt-4">Two of you, one round house.</h2>
              <p className="lead mt-5 max-w-xl !text-cream/80">Book directly on Booking.com, or message us — we'll check dates with the hosts and tell you straight whether Bevu or BhuDeep is the better fit for your weekend.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:col-span-5 md:justify-end">
              <a href={bhudeep.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn bg-cream text-brick hover:bg-white hover:shadow-soft">Book on Booking.com <ArrowUpRight size={18} /></a>
              <a href={site.whatsappHref(WA_TEXT)} target="_blank" rel="noopener noreferrer" className="btn-light"><MessageCircle size={18} /> WhatsApp us</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
