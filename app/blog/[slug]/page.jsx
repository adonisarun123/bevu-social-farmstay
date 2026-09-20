import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import PostCard from "@/components/PostCard";
import CTABand from "@/components/CTABand";
import JsonLd from "@/components/JsonLd";
import { posts, getPost, formatDate } from "@/data/posts";
import { breadcrumbSchema, webPageSchema } from "@/data/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import { site } from "@/data/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.metaTitle || post.title,
    description: post.excerpt.slice(0, 160),
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.excerpt, images: [{ url: post.cover }], publishedTime: post.date },
  };
}

function Block({ b }) {
  if (b.h) return <h2 className="mt-10 font-display text-2xl md:text-3xl">{b.h}</h2>;
  if (b.p) return <p className="mt-5 leading-relaxed text-bark/85 md:text-lg">{b.p}</p>;
  if (b.ul) return <ul className="mt-5 space-y-2 pl-1 text-bark/85 md:text-lg">{b.ul.map((li) => <li key={li} className="flex gap-3"><span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-brick" />{li}</li>)}</ul>;
  if (b.quote) return <blockquote className="mt-8 border-l-2 border-brass pl-6 font-display text-2xl italic leading-snug text-ink md:text-3xl">{b.quote}</blockquote>;
  return null;
}

export default function PostPage({ params }) {
  const post = getPost(params.slug);
  if (!post) notFound();
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const crumbs = [{ name: "Home", path: "/" }, { name: "Journal", path: "/blog" }, { name: post.metaTitle || post.title, path: `/blog/${post.slug}` }];
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.cover.startsWith("http") ? post.cover : `${site.url}${post.cover}`,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@id": `${site.url}/#organization` },
    publisher: { "@id": `${site.url}/#organization` },
    inLanguage: "en-IN",
    wordCount: post.body.reduce((n, b) => n + ((b.p || b.h || b.quote || (b.ul || []).join(" ")).split(/\s+/).length), 0),
    keywords: [post.category, "Bevu Social Farmstay", "farmstay near Bangalore"],
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={webPageSchema({ path: `/blog/${post.slug}`, title: post.title, description: post.excerpt, type: "ItemPage", image: post.cover, speakable: ["article h1", "article .lead"] })} />
      <JsonLd data={articleSchema} />
      <article className="pt-[76px]">
        <div className="wrap pt-14 md:pt-20">
          <Breadcrumbs items={crumbs} />
          <Reveal className="mt-8 max-w-3xl">
            <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-brick">
              <span>{post.category}</span><span className="text-stone">·</span><span className="text-stone">{formatDate(post.date)}</span><span className="text-stone">·</span><span className="text-stone">{post.readMins} min read</span>
            </div>
            <h1 className="h-display mt-5">{post.title}</h1>
            <p className="lead mt-6">{post.excerpt}</p>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="wrap mt-12">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-sand md:aspect-[21/9]">
            <Image src={post.cover} alt={post.coverAlt} fill priority sizes="100vw" className="object-cover" />
          </div>
        </Reveal>
        <div className="wrap">
          <div className="mx-auto max-w-3xl py-14 md:py-20">
            {post.body.map((b, i) => <Block key={i} b={b} />)}
            <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-ink/10 pt-8">
              <a href={site.whatsappHref(`Hi Bevu Social Farmstay, I read "${post.title}" and I'd like to plan a stay.`)} target="_blank" rel="noopener noreferrer" className="btn-primary">Plan a stay</a>
              <Link href="/blog" className="text-sm font-medium text-brick">More from the journal →</Link>
            </div>
          </div>
        </div>
      </article>

      <section className="border-t border-ink/10 bg-parchment">
        <div className="wrap section">
          <span className="eyebrow">Keep reading</span>
          <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => <PostCard key={p.slug} post={p} index={i} />)}
          </div>
        </div>
      </section>
      <CTABand />
    </>
  );
}
