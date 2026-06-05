import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import Ornament from "@/components/Ornament";
import Timeline from "@/components/Timeline";
import RSVPForm from "@/components/RSVPForm";
import MusicPlayer from "@/components/MusicPlayer";
import GoldenParticles from "@/components/GoldenParticles";
import BackToTop from "@/components/BackToTop";
import {
  Leaf,
  Sparkles,
  Waves,
  Sprout,
  Home,
  Smile,
  MapPin,
} from "lucide-react";

const MAPS_LINK = "https://maps.app.goo.gl/k3zPnMTPRaQUdeFZ9";

const chips = [
  { icon: Waves, label: "Swimming" },
  { icon: Sprout, label: "Explore the Site" },
  { icon: Home, label: "Farmhouse Preview" },
  { icon: Smile, label: "Good Company" },
];

export default function InvitePage() {
  return (
    <>
      <MusicPlayer />
      <BackToTop />

      {/* ===== HERO ===== */}
      <header className="relative flex min-h-[100svh] flex-col items-center justify-end overflow-hidden px-[22px] pb-16 text-center">
        <div className="hero-img absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt="Bevu Social Farmstay — handcrafted brick home glowing at dusk among rocks and trees"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_38%]"
          />
        </div>
        <div className="hero-veil absolute inset-0" aria-hidden="true" />
        <GoldenParticles />

        <div className="relative z-[2] max-w-[640px]">
          <div className="hl d1 mx-auto mb-[22px] w-[78px] drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)] sm:w-24">
            <Image
              src="/images/emblem.svg"
              alt="Bevu Social Farmstay neem tree emblem"
              width={96}
              height={96}
              priority
              className="block h-auto w-full"
            />
          </div>
          <div className="hl d2 font-smallcaps text-[0.72rem] uppercase tracking-[0.42em] text-goldsoft">
            A Sustainable Stay
          </div>
          <h1 className="hl d3 mt-4 font-serif text-[clamp(2.7rem,9vw,4.8rem)] font-normal leading-[0.98] tracking-[-0.01em] text-cream [text-shadow:0_4px_40px_rgba(0,0,0,0.5)]">
            Bevu <em className="italic text-goldsoft">Social</em>
            <br />
            Farmstay
          </h1>
          <p className="hl d4 mt-3.5 font-serif text-[clamp(1.05rem,3.4vw,1.45rem)] font-light italic text-creamdim">
            We&rsquo;re warming our new home &mdash; and we&rsquo;d love you there.
          </p>
          <p className="hl d5 mt-1.5 text-[0.86rem] uppercase tracking-[0.18em] text-gold">
            Griha Pravesh &bull; 20<sup>th</sup> June
          </p>
        </div>
        <div className="scroll-cue absolute bottom-6 left-1/2 z-[3] h-[46px] w-px -translate-x-1/2 bg-gradient-to-b from-gold to-transparent" />
      </header>

      {/* ===== INVITATION ===== */}
      <section className="py-[62px]">
        <div className="wrap">
        <FadeIn>
          <Ornament>
            <Leaf className="h-full w-full" strokeWidth={1.1} aria-hidden="true" />
          </Ornament>
        </FadeIn>

        <FadeIn>
          <p className="label mt-6">With Gratitude, We Invite You</p>
        </FadeIn>
        <FadeIn>
          <p className="mx-auto mt-4 max-w-[600px] text-center font-serif text-[clamp(1.15rem,3vw,1.4rem)] font-light leading-[1.8] text-cream">
            With the blessings of God and the love of our family and friends, we
            are delighted to invite you and your family to our{" "}
            <strong className="font-medium text-goldsoft">Griha Pravesh</strong> at{" "}
            <strong className="font-medium text-goldsoft">SF&nbsp;3</strong>.
          </p>
        </FadeIn>

        <FadeIn>
          <div className="mt-7 text-center font-serif text-[clamp(1.9rem,6vw,2.7rem)] italic leading-[1.1] text-terra">
            House Warming Ceremony
          </div>
        </FadeIn>
        <FadeIn>
          <div className="mt-1.5 text-center text-[0.78rem] uppercase tracking-[0.22em] text-creamdim">
            Bevu Social Farmstay
          </div>
        </FadeIn>

        <FadeIn>
          <div className="mx-auto mt-[38px] max-w-[300px] rounded border border-[var(--line)] bg-gradient-to-b from-gold/[0.06] to-transparent px-[30px] py-[26px] text-center">
            <div className="font-smallcaps text-[0.8rem] uppercase tracking-[0.34em] text-gold">June</div>
            <div className="my-1 font-serif text-[3.6rem] leading-none text-cream sm:text-[4.4rem]">20</div>
            <div className="text-[0.74rem] uppercase tracking-[0.3em] text-creamdim">Saturday &bull; 2026</div>
          </div>
        </FadeIn>
        </div>
      </section>

      {/* ===== SCHEDULE ===== */}
      <section className="bg-dusk2 py-[62px]">
        <div className="wrap">
          <FadeIn>
            <p className="label">The Day&rsquo;s Rhythm</p>
          </FadeIn>
          <Timeline />
        </div>
      </section>

      {/* ===== EXPERIENCE ===== */}
      <section className="py-[62px]">
        <div className="wrap">
        <FadeIn>
          <Ornament>
            <Sparkles className="h-full w-full" strokeWidth={1.1} aria-hidden="true" />
          </Ornament>
        </FadeIn>
        <FadeIn>
          <p className="mx-auto mt-6 max-w-[600px] text-center font-serif text-[clamp(1.15rem,3vw,1.4rem)] font-light leading-[1.8] text-cream">
            We would love to host you, share our happiness, and show you our small
            dream property &mdash;{" "}
            <strong className="font-medium text-goldsoft">
              built with lots of love and gratitude.
            </strong>
          </p>
        </FadeIn>
        <div className="mt-[30px] flex flex-wrap justify-center gap-3.5">
          {chips.map((chip, i) => (
            <FadeIn key={chip.label} delay={i * 0.08}>
              <div className="flex items-center gap-[9px] rounded-[40px] border border-[var(--line)] bg-gold/[0.04] px-5 py-2.5 text-[0.92rem] text-cream">
                <chip.icon className="h-[17px] w-[17px] text-gold" strokeWidth={1.4} aria-hidden="true" />
                {chip.label}
              </div>
            </FadeIn>
          ))}
        </div>
        </div>
      </section>

      {/* ===== QUOTE & SIGNOFF ===== */}
      <section className="py-[70px] text-center">
        <div className="wrap">
        <FadeIn>
          <p className="mx-auto max-w-[580px] font-serif text-[clamp(1.3rem,4.4vw,1.85rem)] font-light italic leading-[1.5] text-goldsoft">
            &ldquo;A house becomes a home when it is filled with the blessings,
            laughter, and love of family and friends.&rdquo;
            <span className="mt-5 block text-[1.4rem] not-italic text-terra">&#10084;</span>
          </p>
        </FadeIn>
        <FadeIn>
          <div className="mt-[42px]">
            <div className="text-[0.74rem] uppercase tracking-[0.3em] text-creamdim">With Love</div>
            <div className="mt-1.5 font-serif text-[2.3rem] text-cream">Ankit &amp; Family</div>
          </div>
        </FadeIn>
        </div>
      </section>

      {/* ===== GIFT NOTE ===== */}
      <section className="border-y border-[var(--line)] bg-dusk2 py-[62px]">
        <FadeIn className="wrap">
          <div className="mx-auto max-w-[600px] text-center">
            <h3 className="mb-3.5 font-serif text-[1.6rem] font-normal text-terra">
              A Gentle Note &#128157;
            </h3>
            <p className="mb-3.5 text-creamdim">
              Your presence and blessings are the{" "}
              <strong className="text-cream">greatest gift</strong> for us.
              We&rsquo;re truly excited to celebrate this special occasion with our
              loved ones.
            </p>
            <p className="mb-3.5 text-creamdim">
              If you&rsquo;re still planning to bring something, please feel free to
              ask us for a small list of items we may need &mdash; it helps us choose
              something useful within your budget and avoid duplicate gifts.
            </p>
            <p className="text-creamdim">
              Most importantly, we look forward to celebrating this day with you and
              your family. &#10084;
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ===== RSVP ===== */}
      <section className="border-b border-[var(--line)] bg-dusk2 py-[62px]">
        <FadeIn className="wrap">
          <p className="label">Kindly Respond</p>
          <h3 className="mt-1.5 text-center font-serif text-[clamp(1.7rem,5vw,2.2rem)] font-normal text-terra">
            Will You Join Us?
          </h3>
          <p className="mb-[30px] mt-2 text-center font-serif text-[clamp(1.1rem,3.2vw,1.4rem)] font-light italic text-cream">
            A quick word helps us plan the pooja seating &amp; lunch. It takes ten
            seconds.
          </p>
          <RSVPForm />
        </FadeIn>
      </section>

      {/* ===== MAP CTA ===== */}
      <section className="pb-[30px] pt-[72px] text-center">
        <div className="wrap">
        <FadeIn>
          <p className="label">Find Your Way</p>
        </FadeIn>
        <FadeIn>
          <p className="mb-5 mt-3 font-serif text-[1.05rem] italic text-creamdim">
            Bevu Social Farmstay &bull; SF 3
          </p>
        </FadeIn>
        <FadeIn>
          <a className="btn-gold" href={MAPS_LINK} target="_blank" rel="noopener noreferrer">
            <MapPin className="h-[19px] w-[19px]" strokeWidth={1.6} aria-hidden="true" />
            Open in Google Maps
          </a>
        </FadeIn>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="pb-[50px] pt-[34px] text-center text-[0.8rem] tracking-[0.14em] text-creamdim">
        <FadeIn>
          <div className="mx-auto mb-5 flex w-fit items-center gap-5 sm:gap-6">
            <Image
              src="/images/emblem.svg"
              alt=""
              width={96}
              height={96}
              className="h-20 w-20 flex-none sm:h-24 sm:w-24"
            />
            <div className="text-left">
              <div className="font-smallcaps text-[0.6rem] uppercase tracking-[0.34em] text-goldsoft sm:text-[0.66rem]">
                A Sustainable Stay
              </div>
              <div className="font-serif text-[2.6rem] leading-[1.05] text-cream sm:text-[3rem]">
                Bevu
              </div>
              <div className="mt-1 flex items-center gap-2.5">
                <span className="h-px w-6 bg-gold/70 sm:w-9" aria-hidden="true" />
                <span className="h-1.5 w-1.5 rotate-45 bg-gold" aria-hidden="true" />
                <span className="h-px w-6 bg-gold/70 sm:w-9" aria-hidden="true" />
              </div>
              <div className="mt-1 font-smallcaps text-[0.7rem] uppercase tracking-[0.3em] text-gold sm:text-[0.78rem]">
                Social Farmstay
              </div>
            </div>
          </div>
        </FadeIn>
        <div>
          Griha Pravesh &bull; 20<sup>th</sup> June 2026 &bull; SF 3
        </div>
      </footer>
    </>
  );
}
