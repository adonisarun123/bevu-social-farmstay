import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { site } from "@/data/site";
import Reveal from "./Reveal";

export default function CTABand({ title = "Ready for a slow weekend?", text = "Send us your dates and group size — we'll reply on WhatsApp with availability, rates and the pin." }) {
  return (
    <section className="grain relative overflow-hidden bg-brick text-cream">
      <div className="wrap section relative">
        <Reveal className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <span className="eyebrow !text-brass-light before:!bg-brass-light">Book your stay</span>
            <h2 className="h-section mt-4">{title}</h2>
            <p className="lead mt-5 max-w-xl !text-cream/80">{text}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:col-span-4 md:justify-end">
            <a href={site.whatsappHref()} target="_blank" rel="noopener noreferrer" className="btn bg-cream text-brick hover:bg-white hover:shadow-soft">
              <MessageCircle size={18} /> WhatsApp
            </a>
            <Link href="/contact" className="btn-light">
              <Phone size={18} /> Enquire
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
