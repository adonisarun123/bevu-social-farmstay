import { Star } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import JsonLd from "./JsonLd";
import { reviews, ratingSummary } from "@/data/reviews";
import { reviewsSchema } from "@/data/schema";
import { site } from "@/data/site";
import { formatDate } from "@/data/posts";

function Stars({ n }) {
  return (
    <span className="flex gap-0.5" role="img" aria-label={`${n} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={15} className={i <= n ? "fill-brass text-brass" : "text-ink/15"} />)}
    </span>
  );
}

// Renders nothing until data/reviews.js has real entries. The JSON-LD is emitted here, next to the
// visible reviews, because Google requires marked-up reviews to be readable on the same page.
export default function Reviews({ limit = 6, className = "" }) {
  const summary = ratingSummary();
  if (!summary) return null;
  const shown = reviews.slice(0, limit);
  return (
    <section id="reviews" className={`section ${className}`}>
      <JsonLd data={reviewsSchema(shown)} />
      <div className="wrap">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Guest reviews" title="What guests said afterwards." lead={`${summary.value} out of 5 across ${summary.count} guest review${summary.count === 1 ? "" : "s"}, quoted as written.`} />
          {site.googleReviewUrl && (
            <Reveal delay={0.1}><a href={site.googleReviewUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost shrink-0">Read or write a review on Google</a></Reveal>
          )}
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((r, i) => (
            <Reveal key={r.name + r.date} delay={i * 0.05} as="figure" className="flex flex-col rounded-2xl bg-parchment p-7 ring-1 ring-ink/5">
              <Stars n={Number(r.rating)} />
              <blockquote className="mt-4 flex-1 leading-relaxed text-bark/85">“{r.text}”</blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="font-medium text-ink">{r.name}</span>
                <span className="text-stone"> · {formatDate(r.date)}{r.source ? ` · ${r.source}` : ""}</span>
                {r.url && <a href={r.url} target="_blank" rel="noopener noreferrer" className="ml-2 text-brick hover:underline">Original</a>}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
