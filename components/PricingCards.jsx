import { Check } from "lucide-react";
import { formatRate, pricing, site } from "@/data/site";
import Reveal from "./Reveal";

function Card({ title, sub, rate, note, points, cta, highlight, delay }) {
  return (
    <Reveal delay={delay} className={`card flex flex-col p-7 md:p-9 ${highlight ? "!bg-ink text-cream ring-0" : ""}`}>
      <span className={`eyebrow ${highlight ? "!text-brass before:!bg-brass" : ""}`}>{sub}</span>
      <h3 className="mt-3 font-display text-3xl">{title}</h3>
      <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2">
        <div>
          <div className={`text-[11px] uppercase tracking-[0.2em] ${highlight ? "text-cream/50" : "text-stone"}`}>Weekday</div>
          <div className="font-display text-3xl">{formatRate(rate.weekday)}</div>
        </div>
        <div>
          <div className={`text-[11px] uppercase tracking-[0.2em] ${highlight ? "text-cream/50" : "text-stone"}`}>Weekend</div>
          <div className="font-display text-3xl">{formatRate(rate.weekend)}</div>
        </div>
      </div>
      <p className={`mt-2 text-xs ${highlight ? "text-cream/55" : "text-stone"}`}>{note}</p>
      <ul className="mt-7 space-y-2.5 text-sm">
        {points.map((p) => (
          <li key={p} className="flex gap-3"><Check size={16} className="mt-0.5 shrink-0 text-brass" />{p}</li>
        ))}
      </ul>
      <a href={site.whatsappHref(cta.msg)} target="_blank" rel="noopener noreferrer" className={`${highlight ? "btn bg-brass text-ink hover:bg-brass-light" : "btn-primary"} mt-8`}>
        {cta.label}
      </a>
    </Reveal>
  );
}

export default function PricingCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card
        sub="Room-wise"
        title="A room for two"
        rate={pricing.perRoom}
        note={pricing.perRoom.note}
        points={["Any of the four ensuite king rooms", "Breakfast for two", "Shared use of pool, lawn and living room", "Extra mattress for a child on request"]}
        cta={{ label: "Enquire for a room", msg: "Hi Bevu Social Farmstay, I'd like to book a room. Dates: ___ · Guests: ___" }}
        delay={0}
      />
      <Card
        highlight
        sub="Whole house"
        title="The entire farmstay"
        rate={pricing.wholeHouse}
        note={pricing.wholeHouse.note}
        points={["All 4 rooms — 8 adults, up to 12 with children", "Exclusive pool, lawn, bonfire and dining", "Breakfast for everyone", "Kitchen team on site for lunch and dinner", "Ideal for friends, celebrations and offsites"]}
        cta={{ label: "Enquire for the whole house", msg: "Hi Bevu Social Farmstay, I'd like to book the whole house. Dates: ___ · Group size: ___" }}
        delay={0.1}
      />
    </div>
  );
}
