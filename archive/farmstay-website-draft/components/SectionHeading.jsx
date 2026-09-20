import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, subtitle, light = false, center = true }) {
  return (
    <Reveal className={center ? "text-center" : ""}>
      {eyebrow && (
        <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${light ? "text-amber" : "text-clay"}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`mt-2 font-heading text-3xl font-semibold leading-tight sm:text-4xl ${light ? "text-offwhite" : "text-forest"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mx-auto mt-4 max-w-2xl text-base leading-relaxed ${light ? "text-beige/85" : "text-charcoal/75"}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
