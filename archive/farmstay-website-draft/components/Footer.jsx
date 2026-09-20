import Link from "next/link";
import { Leaf, Phone, Mail, MapPin, Instagram, Facebook, Youtube } from "lucide-react";
import { site, navLinks } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-forest text-beige">
      <div className="mx-auto max-w-content px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-olive" aria-hidden="true" />
              <span className="font-heading text-xl font-semibold">{site.name}</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-beige/80">
              {site.description}
            </p>
            <div className="mt-5 flex gap-4">
              <a href={site.social.instagram} aria-label="Instagram" className="text-beige/70 transition-colors hover:text-amber">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={site.social.facebook} aria-label="Facebook" className="text-beige/70 transition-colors hover:text-amber">
                <Facebook className="h-5 w-5" />
              </a>
              <a href={site.social.youtube} aria-label="YouTube" className="text-beige/70 transition-colors hover:text-amber">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="font-heading text-lg font-semibold">Quick Links</h2>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-beige/80 transition-colors hover:text-amber">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-heading text-lg font-semibold">Contact</h2>
            <ul className="mt-4 space-y-3 text-sm text-beige/80">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-olive" aria-hidden="true" />
                <a href={site.phoneHref} className="hover:text-amber">{site.phone}</a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-olive" aria-hidden="true" />
                <a href={`mailto:${site.email}`} className="hover:text-amber">{site.email}</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-olive" aria-hidden="true" />
                <span>{site.location}</span>
              </li>
            </ul>
            <p className="mt-4 text-xs text-beige/60">Visits by prior booking only.</p>
          </div>
        </div>

        <div className="mt-12 border-t border-beige/15 pt-6 text-center text-xs text-beige/60">
          © {new Date().getFullYear()} {site.name}. All rights reserved. Rooted in Tamil Nadu, near Bangalore.
        </div>
      </div>
    </footer>
  );
}
