import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import EnquiryForm from "@/components/EnquiryForm";
import FAQ from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/data/schema";
import { site } from "@/data/site";
import { faqs } from "@/data/faqs";

export const metadata = {
  title: "Contact & Booking Enquiry",
  description: "Check availability at Bevu Social Farmstay near Bangalore — send your dates and group size on WhatsApp or through the enquiry form. By prior booking only.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }];
  const channels = [
    { Icon: MessageCircle, t: "WhatsApp", d: "Fastest — usually within the hour", href: site.whatsappHref(), v: site.phoneDisplay, ext: true },
    { Icon: Phone, t: "Call", d: "9 AM – 8 PM", href: site.phoneHref, v: site.phoneDisplay },
    { Icon: Mail, t: "Email", d: "For groups and offsites", href: `mailto:${site.email}`, v: site.email },
    { Icon: MapPin, t: "Find us", d: site.location.area, href: site.location.mapsUrl, v: site.location.label, ext: true },
  ];
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={webPageSchema({ path: crumbs[crumbs.length - 1].path, title: metadata.title, description: metadata.description, type: "ContactPage", image: "/images/hero.jpg" })} />
      <JsonLd data={faqSchema} />
      <PageHero crumbs={crumbs} eyebrow="Contact" title="Send us your dates." lead="We confirm availability, share rates and the pin, and hold the booking on a part advance. By prior booking only." />

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Reach us" title="WhatsApp is quickest." />
            <ul className="mt-8 space-y-3">
              {channels.map(({ Icon, t, d, href, v, ext }, i) => (
                <Reveal key={t} delay={i * 0.05} as="li">
                  <a href={href} target={ext ? "_blank" : undefined} rel={ext ? "noopener noreferrer" : undefined} className="group flex items-center gap-4 rounded-2xl bg-parchment p-5 ring-1 ring-ink/5 transition hover:ring-brick/40">
                    <span className="rounded-full bg-brick/10 p-3 text-brick"><Icon size={20} /></span>
                    <span className="min-w-0">
                      <span className="block font-medium">{t} <span className="font-normal text-stone">· {d}</span></span>
                      <span className="block truncate text-sm text-bark/75 group-hover:text-brick">{v}</span>
                    </span>
                  </a>
                </Reveal>
              ))}
            </ul>
            <p className="mt-6 text-xs text-stone">Check-in {site.checkIn} · Check-out {site.checkOut} · Hosted by {site.hosts}</p>
          </div>
          <Reveal delay={0.1} className="lg:col-span-7"><EnquiryForm /></Reveal>
        </div>
      </section>

      <section id="faq" className="scroll-mt-20 border-t border-ink/10 bg-parchment">
        <div className="wrap section grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4"><SectionHeading eyebrow="FAQ" title="Before you ask." /></div>
          <Reveal delay={0.1} className="lg:col-span-8"><FAQ items={faqs} /></Reveal>
        </div>
      </section>
    </>
  );
}
