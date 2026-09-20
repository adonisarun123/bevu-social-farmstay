import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, lead, align = "left", tone = "dark", className = "" }) {
  const center = align === "center";
  const light = tone === "light";
  return (
    <Reveal className={`${center ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      {eyebrow && <span className={`eyebrow ${light ? "!text-brass before:!bg-brass" : ""} ${center ? "justify-center" : ""}`}>{eyebrow}</span>}
      <h2 className={`h-section mt-4 ${light ? "text-cream" : "text-ink"}`}>{title}</h2>
      {lead && <p className={`lead mt-5 ${light ? "!text-cream/70" : ""}`}>{lead}</p>}
    </Reveal>
  );
}
