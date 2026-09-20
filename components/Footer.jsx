import Link from "next/link";
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { navLinks, site } from "@/data/site";
import Logo from "./Logo";

export default function Footer() {
  const socials = [
    { href: site.social.instagram, Icon: Instagram, label: "Instagram" },
    { href: site.social.facebook, Icon: Facebook, label: "Facebook" },
    { href: site.social.youtube, Icon: Youtube, label: "YouTube" },
  ].filter((s) => s.href);

  return (
    <footer className="grain bg-ink text-cream/80">
      <div className="brick-rule" />
      <div className="wrap grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Logo tone="light" height={72} />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/60">
            A handcrafted brick home among granite boulders and neem trees — four rooms, a private pool, an open lawn, and food from the farm. Pet-friendly. Near Berigai, Hosur — an hour and a bit from Bangalore.
          </p>
          {socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {socials.map(({ href, Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="rounded-full border border-cream/15 p-2.5 transition hover:border-brass hover:text-brass">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="md:col-span-3">
          <h3 className="text-[11px] font-medium uppercase tracking-[0.28em] text-brass">Explore</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}><Link href={l.href} className="transition hover:text-brass">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h3 className="text-[11px] font-medium uppercase tracking-[0.28em] text-brass">Reach us</h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3"><MapPin size={18} className="mt-0.5 shrink-0 text-brass" /><span>{site.location.label}<br />{site.location.area}</span></li>
            <li className="flex gap-3"><Phone size={18} className="mt-0.5 shrink-0 text-brass" /><a href={site.phoneHref} className="hover:text-brass">{site.phoneDisplay}</a></li>
            <li className="flex gap-3"><Mail size={18} className="mt-0.5 shrink-0 text-brass" /><a href={`mailto:${site.email}`} className="hover:text-brass">{site.email}</a></li>
          </ul>
          <p className="mt-6 text-xs text-cream/45">Check-in {site.checkIn} · Check-out {site.checkOut} · By prior booking only</p>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="wrap flex flex-col gap-2 py-6 text-xs text-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <span>Bevu · ಬೇವು · neem — the tree we are named for.</span>
        </div>
      </div>
    </footer>
  );
}
