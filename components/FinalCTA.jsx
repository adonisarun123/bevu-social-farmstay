import CTAButton from "./CTAButton";
import Reveal from "./Reveal";
import { site } from "@/data/site";

export default function FinalCTA({
  title = "Plan Your Slow Weekend at Bevu Social Farmstay",
  subtitle = "Tell us what kind of stay you're dreaming of — a family weekend, a friends' getaway, a team offsite, or a quiet retreat. We'll help you plan it.",
}) {
  return (
    <section className="bg-forest py-20">
      <div className="mx-auto max-w-content px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-heading text-3xl font-semibold leading-tight text-offwhite sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-beige/85">
            {subtitle}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CTAButton href={site.whatsappHref} external variant="whatsapp" icon="whatsapp">
              Enquire on WhatsApp
            </CTAButton>
            <CTAButton href={site.phoneHref} external variant="outline" icon="phone">
              Call Now
            </CTAButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
