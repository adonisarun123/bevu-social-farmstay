import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import InquiryForm from "@/components/InquiryForm";
import CTAButton from "@/components/CTAButton";
import FAQ from "@/components/FAQ";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/data/schema";
import { faqs } from "@/data/faqs";
import { site } from "@/data/site";
import { Phone, Mail, MapPin, CalendarCheck } from "lucide-react";

export const metadata = {
  title: "Contact & Booking | Plan Your Stay",
  description:
    "Book your stay at Bevu Social Farmstay — enquire on WhatsApp, call, or send an inquiry. A premium sustainable farmstay in Tamil Nadu near Bangalore. Visits by prior booking only.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Contact & Booking", path: "/contact" },
      ])} />
      <JsonLd data={faqSchema} />

      <PageHero
        title="Plan Your Stay"
        subtitle="Tell us about the weekend you have in mind — we'll take it from there."
        image="/images/bevu-hero.jpeg"
        alt="Bevu Social Farmstay glowing warmly in the evening light"
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3">
              <SectionHeading eyebrow="Inquiry" title="Send Us an Inquiry" center={false} />
              <Reveal delay={0.1} className="mt-8">
                <InquiryForm />
              </Reveal>
            </div>

            {/* Direct contact */}
            <div className="lg:col-span-2">
              <SectionHeading eyebrow="Faster" title="Or Reach Us Directly" center={false} />
              <Reveal delay={0.15}>
                <div className="mt-8 space-y-4">
                  <CTAButton href={site.whatsappHref} external variant="whatsapp" icon="whatsapp">
                    Enquire on WhatsApp
                  </CTAButton>
                  <div className="rounded-2xl border border-sand bg-beige p-7">
                    <ul className="space-y-5 text-sm">
                      <li className="flex items-start gap-3">
                        <Phone className="mt-0.5 h-5 w-5 shrink-0 text-clay" aria-hidden="true" />
                        <div>
                          <p className="font-semibold text-forest">Call Us</p>
                          <a href={site.phoneHref} className="text-charcoal/75 hover:text-clay">{site.phone}</a>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Mail className="mt-0.5 h-5 w-5 shrink-0 text-clay" aria-hidden="true" />
                        <div>
                          <p className="font-semibold text-forest">Email</p>
                          <a href={`mailto:${site.email}`} className="text-charcoal/75 hover:text-clay">{site.email}</a>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-clay" aria-hidden="true" />
                        <div>
                          <p className="font-semibold text-forest">Location</p>
                          <p className="text-charcoal/75">{site.location}</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <CalendarCheck className="mt-0.5 h-5 w-5 shrink-0 text-clay" aria-hidden="true" />
                        <div>
                          <p className="font-semibold text-forest">Please Note</p>
                          <p className="text-charcoal/75">Visits and stays are by prior booking only.</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-beige py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHeading eyebrow="Good to Know" title="Frequently Asked Questions" />
          <Reveal className="mt-10">
            <FAQ items={faqs} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
