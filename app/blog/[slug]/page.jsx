import Image from "@/components/Image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import PostCard from "@/components/PostCard";
import CTABand from "@/components/CTABand";
import JsonLd from "@/components/JsonLd";
import { posts, getPost, formatDate } from "@/data/posts";
import { breadcrumbSchema, webPageSchema, blogPostingSchema, faqSchemaFor, ogImage } from "@/data/schema";
import RichText from "@/components/RichText";
import FAQ from "@/components/FAQ";
import { landings } from "@/data/landings";
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
    openGraph: { type: "article", title: post.title, description: post.excerpt, images: [{ url: ogImage(post.cover) }], publishedTime: post.date, modifiedTime: post.updated || post.date, section: post.category },
  };
}

function Block({ b }) {
  if (b.h) return <h2 className="mt-10 font-display text-2xl md:text-3xl">{b.h}</h2>;
  if (b.p) return <p className="mt-5 leading-relaxed text-bark/85 md:text-lg"><RichText text={b.p} /></p>;
  if (b.ul) return <ul className="mt-5 space-y-2 pl-1 text-bark/85 md:text-lg">{b.ul.map((li) => <li key={li} className="flex gap-3"><span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-brick" /><span><RichText text={li} /></span></li>)}</ul>;
  if (b.quote) return <blockquote className="mt-8 border-l-2 border-brass pl-6 font-display text-2xl italic leading-snug text-ink md:text-3xl">{b.quote}</blockquote>;
  return null;
}

export default function PostPage({ params }) {
  const post = getPost(params.slug);
  if (!post) notFound();
  // Related: same category first, then the rest, so "keep reading" stays on topic.
  const related = [...posts.filter((p) => p.slug !== post.slug && p.category === post.category), ...posts.filter((p) => p.slug !== post.slug && p.category !== post.category)].slice(0, 3);
  const guides = landings.filter((l) => l.posts.includes(post.slug)).slice(0, 4);
  const crumbs = [{ name: "Home", path: "/" }, { name: "Journal", path: "/blog" }, { name: post.metaTitle || post.title, path: `/blog/${post.slug}` }];
  const articleSchema = blogPostingSchema(post);

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={webPageSchema({ path: `/blog/${post.slug}`, title: post.title, description: post.excerpt, type: "ItemPage", image: post.cover, speakable: ["article h1", "article .lead"] })} />
      <JsonLd data={articleSchema} />
      {post.faq?.length > 0 && <JsonLd data={faqSchemaFor(post.faq)} />}
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
            {post.faq?.length > 0 && (
              <div id="faq" className="mt-14">
                <h2 className="font-display text-2xl md:text-3xl">Quick answers</h2>
                <div className="mt-6"><FAQ items={post.faq.map((f) => ({ question: f.q, answer: f.a }))} openFirst={false} /></div>
              </div>
            )}
            {guides.length > 0 && (
              <div className="mt-12 rounded-2xl bg-parchment p-6 ring-1 ring-ink/5">
                <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-brick">Planning a stay</div>
                <ul className="mt-3 space-y-2">
                  {guides.map((l) => <li key={l.slug}><Link href={`/${l.slug}`} className="font-display text-lg transition hover:text-brick">{l.eyebrow} →</Link></li>)}
                </ul>
              </div>
            )}
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
