import * as Icons from "lucide-react";
import Reveal from "./Reveal";

export default function FeatureCard({ icon, title, description, delay = 0 }) {
  const Icon = Icons[icon] || Icons.Leaf;
  return (
    <Reveal delay={delay}>
      <div className="group h-full rounded-2xl border border-sand bg-offwhite p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-beige text-clay transition-colors group-hover:bg-clay group-hover:text-offwhite">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
        <h3 className="mt-5 font-heading text-xl font-semibold text-forest">{title}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-charcoal/75">{description}</p>
      </div>
    </Reveal>
  );
}
