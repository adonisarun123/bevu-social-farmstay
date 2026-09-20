import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { policies, getPolicy } from "@/data/policies";
import { breadcrumbSchema, webPageSchema } from "@/data/schema";
import { fmtDate } from "@/lib/db";

export function generateStaticParams() { return policies.map((p) => ({ slug: p.slug })); }
export function generateMetadata({ params }) {
  const p = getPolicy(params.slug); if (!p) return {};
  return { title: p.title, description: p.summary, alternates: { canonical: `/policies/${p.slug}` } };
}

export default function PolicyPage({ params }) {
  const p = getPolicy(params.slug); if (!p) notFound();
  const crumbs = [{ name: "Home", path: "/" }, { name: p.title, path: `/policies/${p.slug}` }];
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={webPageSchema({ path: `/policies/${p.slug}`, title: p.title, description: p.summary, type: "WebPage" })} />
      <div className="wrap pt-[76px]">
        <div className="mx-auto max-w-3xl py-14 md:py-20">
          <Breadcrumbs items={crumbs} />
          <span className="eyebrow mt-8">Policies</span>
          <h1 className="h-section mt-3">{p.title}</h1>
          <p className="lead mt-4 !text-base">{p.summary}</p>
          <p className="mt-2 text-xs text-stone">Last updated {fmtDate(p.updated)}</p>
          <div className="mt-10 space-y-8">
            {p.sections.map((s) => (
              <section key={s.h}>
                <h2 className="font-display text-2xl">{s.h}</h2>
                {s.p?.map((t) => <p key={t.slice(0, 40)} className="mt-3 leading-relaxed text-bark/85">{t}</p>)}
                {s.ul && <ul className="mt-3 space-y-2 text-bark/85">{s.ul.map((li) => <li key={li} className="flex gap-3"><span className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-brick" />{li}</li>)}</ul>}
              </section>
            ))}
          </div>
          <nav className="mt-12 flex flex-wrap gap-4 border-t border-ink/10 pt-6 text-sm" aria-label="Other policies">
            {policies.filter((x) => x.slug !== p.slug).map((x) => <Link key={x.slug} href={`/policies/${x.slug}`} className="text-brick hover:underline">{x.title}</Link>)}
          </nav>
        </div>
      </div>
    </>
  );
}
