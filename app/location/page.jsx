import { Car, Clock, MapPin, Navigation } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import CTABand from "@/components/CTABand";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema, placeSchema } from "@/data/schema";
import { site } from "@/data/site";

export const metadata = {
  title: "Location — Near Hosur, 1 h from Bangalore",
  description: "Bevu Social Farmstay is near Berigai, past Hosur in Krishnagiri district — about 50 km from Electronic City via NH44. Drive times, directions and travel tips.",
  alternates: { canonical: "/location" },
};

const tips = [
  { Icon: Navigation, t: "Use the pin, not the name", d: "Village roads confuse map search. Open the Google Maps pin we share on booking and follow it to the gate." },
  { Icon: Clock, t: "Leave before 4 PM on Fridays", d: "The Electronic City–Hosur stretch of NH44 slows badly on Friday evenings. Saturday morning is a breeze." },
  { Icon: Car, t: "Any car works", d: "The last 2–3 km are village road — fine for a hatchback, just take it slow after rain." },
  { Icon: MapPin, t: "Stock up in Hosur", d: "The last proper shops, ATMs and fuel are in Hosur. We keep essentials, but bring anything specific." },
];

export default function LocationPage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Location", path: "/location" }];
  const { lat, lng } = site.location;
  const embed = `https://www.google.com/maps?q=${lat},${lng}&z=13&output=embed`;
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={webPageSchema({ path: crumbs[crumbs.length - 1].path, title: metadata.title, description: metadata.description, type: "WebPage", image: "/images/hero.jpg" })} />
      <JsonLd data={placeSchema} />
      <PageHero crumbs={crumbs} eyebrow="Location" title="Over the state line, under an hour and a half." lead={`${site.location.area}. Bangalore's south side to our gate, without ever leaving a proper road until the last few kilometres.`} />

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Drive times" title="From where you are." lead="Approximate, in normal traffic. Fridays after 4 PM, add 30–45 minutes." />
            <dl className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
              {site.location.distances.map((d, i) => (
                <Reveal key={d.from} delay={i * 0.05} className="flex items-baseline justify-between py-4">
                  <dt className="text-bark/85">{d.from}</dt>
                  <dd className="text-right"><span className="font-display text-xl">{d.time}</span><span className="ml-2 text-xs text-stone">{d.km}</span></dd>
                </Reveal>
              ))}
            </dl>
            <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-3">
              <a href={site.location.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-primary"><Navigation size={16} /> Open in Google Maps</a>
              <a href={site.whatsappHref("Hi Bevu Social Farmstay, could you share the location pin and directions?")} target="_blank" rel="noopener noreferrer" className="btn-ghost">Ask for the pin</a>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sand shadow-card lg:aspect-auto lg:h-full lg:min-h-[420px]">
              <iframe title="Map to Bevu Social Farmstay" src={embed} className="absolute inset-0 h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            </div>
            <p className="mt-3 text-xs text-stone">{site.location.label} · {site.location.area}</p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-parchment">
        <div className="wrap section">
          <SectionHeading eyebrow="The route" title="Bangalore → NH44 → Hosur → us." lead="Head south on Hosur Road / NH44 past Electronic City and Attibele into Tamil Nadu. At Hosur, leave the highway and head east on the district road — the countryside turns to boulders and tamarind within a few kilometres. The pin takes you to the gate." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tips.map(({ Icon, t, d }, i) => (
              <Reveal key={t} delay={i * 0.05} className="rounded-2xl bg-cream p-6 ring-1 ring-ink/5">
                <Icon size={24} strokeWidth={1.5} className="text-brick" />
                <h3 className="mt-4 font-display text-lg">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-bark/75">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand title="Need the pin?" text="Message us and we'll send the exact Google Maps location and a voice note with the last turn." />
    </>
  );
}
