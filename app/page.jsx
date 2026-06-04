import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import RSVPForm from "@/components/RSVPForm";
import {
  Calendar,
  Flame,
  BookOpen,
  UtensilsCrossed,
  MapPin,
  Armchair,
  Waves,
  Compass,
  Heart,
  Leaf,
} from "lucide-react";

const MAPS_LINK = "https://maps.app.goo.gl/k3zPnMTPRaQUdeFZ9";

const schedule = [
  { icon: Calendar, label: "Date", value: "20th June", tone: "bg-forest" },
  { icon: Flame, label: "Pooja", value: "8:00 AM onwards", tone: "bg-terracotta" },
  { icon: BookOpen, label: "Sunderkand Path", value: "10:00 AM onwards", tone: "bg-forest" },
  { icon: UtensilsCrossed, label: "Lunch", value: "12:30 PM onwards", tone: "bg-terracotta" },
];

const afterLunch = [
  { icon: Armchair, label: "Relax" },
  { icon: Waves, label: "Enjoy Swimming" },
  { icon: Compass, label: "Explore the Site" },
];

function Om({ className = "" }) {
  return (
    <span className={`select-none font-display ${className}`} aria-hidden="true">
      ॐ
    </span>
  );
}

export default function InvitePage() {
  return (
    <div className="bg-paper-texture">
      {/* ===== Invitation card ===== */}
      <main className="mx-auto max-w-3xl px-3 py-6 sm:px-6 sm:py-12">
        <div className="invite-frame rounded-3xl bg-cream/80 px-4 py-10 sm:rounded-[2.5rem] sm:px-10 sm:py-16">

          {/* Hanging tag */}
          <FadeIn>
            <div className="mx-auto mb-8 w-fit -rotate-3 rounded-xl border border-gold/40 bg-parchment px-6 py-4 text-center shadow-sm">
              <p className="font-display text-base font-semibold leading-snug text-forest">
                A New Home<br />A New Beginning<br />A Lifetime of
              </p>
              <p className="font-script text-2xl text-gold">Blessings</p>
              <Heart className="mx-auto mt-1 h-4 w-4 fill-softgold text-softgold" aria-hidden="true" />
            </div>
          </FadeIn>

          {/* Opening */}
          <FadeIn delay={0.1}>
            <div className="text-center">
              <Om className="text-4xl text-gold" />
              <p className="mx-auto mt-5 max-w-xl font-body text-lg leading-relaxed text-ink/80">
                With the blessings of God and the love of our family and
                friends, we are delighted to invite you and your family to our
              </p>
            </div>
          </FadeIn>

          {/* Title */}
          <FadeIn delay={0.2}>
            <div className="mt-6 text-center">
              <h1 className="font-display text-4xl font-bold tracking-wide text-forest sm:text-5xl md:text-6xl">
                Griha Pravesh
              </h1>
              <p className="mt-2 font-script text-3xl text-gold sm:text-4xl md:text-5xl">
                House Warming Ceremony
              </p>
              <div className="ornament-line mt-6">
                <Leaf className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="mx-auto mt-6 w-fit rounded-xl border-2 border-gold/50 bg-forest px-6 py-2 shadow sm:px-8 sm:py-2.5">
                <p className="font-display text-xl font-semibold tracking-[0.15em] text-cream sm:text-2xl">
                  AT SF 3
                </p>
              </div>
              <p className="mt-4 font-script text-3xl text-terracotta sm:text-4xl">
                Bevu Social Farmstay
              </p>
            </div>
          </FadeIn>

          {/* House photo */}
          <FadeIn delay={0.15}>
            <div className="relative mx-auto mt-10 h-60 overflow-hidden rounded-3xl shadow-lg sm:h-80 sm:rounded-[2rem] md:h-96">
              <Image
                src="/images/house.jpeg"
                alt="Our new home — handcrafted brick house among rocks and trees, glowing at dusk"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
              <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-gold/30" aria-hidden="true" />
            </div>
          </FadeIn>

          {/* Schedule */}
          <section aria-label="Ceremony schedule" className="mt-12">
            <div className="mx-auto grid max-w-md gap-4">
              {schedule.map((item, i) => (
                <FadeIn key={item.label} delay={i * 0.08}>
                  <div className="flex items-center gap-3 rounded-3xl border border-gold/35 bg-parchment py-2.5 pl-2.5 pr-4 shadow-sm sm:gap-4 sm:rounded-full sm:pr-7">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full sm:h-12 sm:w-12 ${item.tone} text-cream`}>
                      <item.icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                    </span>
                    <p className="min-w-0 font-body text-base sm:text-lg">
                      <span className="font-display font-semibold text-rust">{item.label}: </span>
                      <span className="text-ink/85">{item.value}</span>
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </section>

          {/* Message */}
          <FadeIn delay={0.1}>
            <p className="mx-auto mt-12 max-w-xl text-center font-body text-lg leading-relaxed text-ink/80">
              Your presence and blessings will make this occasion even more
              special for us. We would love to host you, share our happiness,
              and show you our small dream property that has been built with
              lots of love and gratitude.
            </p>
          </FadeIn>

          {/* After lunch */}
          <FadeIn delay={0.1}>
            <div className="mx-auto mt-12 max-w-xl rounded-3xl bg-leaf/20 px-4 py-8 text-center sm:rounded-[2rem] sm:px-6 sm:py-9">
              <p className="font-script text-2xl text-forest sm:text-3xl">
                After lunch, everyone is welcome to
              </p>
              <div className="mt-7 flex items-start justify-center divide-x divide-forest/20">
                {afterLunch.map((item) => (
                  <div key={item.label} className="flex w-24 flex-col items-center gap-2 px-2 sm:w-32 sm:px-3">
                    <item.icon className="h-7 w-7 text-forest sm:h-8 sm:w-8" aria-hidden="true" />
                    <p className="text-center font-body text-xs leading-snug text-forest sm:text-sm">{item.label}</p>
                  </div>
                ))}
              </div>
              <p className="mt-7 font-body italic text-ink/70">
                and get a glimpse of our upcoming farmhouse project.
              </p>
            </div>
          </FadeIn>

          {/* Quote */}
          <FadeIn delay={0.1}>
            <blockquote className="mx-auto mt-12 max-w-md rounded-3xl border border-gold/40 bg-forest/95 px-6 py-8 text-center shadow-md sm:rounded-[2rem] sm:px-8 sm:py-9">
              <span className="font-display text-4xl leading-none text-softgold" aria-hidden="true">“</span>
              <p className="mt-1 font-body text-lg italic leading-relaxed text-cream">
                A house becomes a home when it is filled with the blessings,
                laughter, and love of family and friends.
              </p>
              <Heart className="mx-auto mt-4 h-4 w-4 fill-softgold text-softgold" aria-hidden="true" />
            </blockquote>
          </FadeIn>

          {/* Map */}
          <FadeIn delay={0.1}>
            <div className="mt-12 text-center">
              <div className="ornament-line">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="mt-4 font-display text-3xl font-semibold text-forest">Find Your Way to Us</h2>
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2.5 rounded-full border-2 border-forest bg-cream px-8 py-3.5 font-display text-lg font-semibold text-forest shadow-sm transition-all hover:-translate-y-0.5 hover:bg-forest hover:text-cream hover:shadow-md"
              >
                <MapPin className="h-5 w-5" aria-hidden="true" />
                Open in Google Maps
              </a>
            </div>
          </FadeIn>

          {/* RSVP */}
          <section aria-label="RSVP" className="mt-14">
            <FadeIn>
              <div className="text-center">
                <div className="ornament-line">
                  <Heart className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="mt-4 font-script text-4xl text-forest sm:text-5xl">Kindly RSVP</h2>
                <p className="mx-auto mt-3 max-w-md font-body text-base text-ink/70">
                  We look forward to celebrating this beautiful milestone with
                  our dear family and friends.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.15} className="mt-9">
              <RSVPForm />
            </FadeIn>
          </section>

          {/* Sign-off */}
          <FadeIn delay={0.1}>
            <div className="mt-14 text-center">
              <div className="ornament-line">
                <Leaf className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="mt-5 font-script text-3xl text-gold sm:text-4xl">With Love,</p>
              <p className="mt-2 font-display text-2xl font-bold tracking-wide text-forest sm:text-3xl">
                Ankit &amp; Family
              </p>
              <Om className="mt-4 block text-2xl text-gold/70" />
            </div>
          </FadeIn>
        </div>
      </main>
    </div>
  );
}
