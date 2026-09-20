import PageHero from "@/components/PageHero";
import PostCard from "@/components/PostCard";
import CTABand from "@/components/CTABand";
import JsonLd from "@/components/JsonLd";
import { posts } from "@/data/posts";
import { breadcrumbSchema, webPageSchema } from "@/data/schema";
import { site } from "@/data/site";

export const metadata = {
  title: "Journal — Notes from the Farm",
  description: "Notes from Bevu Social Farmstay near Bangalore: getting here, the hand-built brick house, bringing your dog, a loose weekend itinerary, and around Berigai.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Journal", path: "/blog" }];
  const [first, ...rest] = posts;
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${site.url}/blog#blog`,
    name: `${site.name} Journal`,
    url: `${site.url}/blog`,
    publisher: { "@id": `${site.url}/#organization` },
    inLanguage: "en-IN",
    blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${site.url}/blog/${p.slug}`, datePublished: p.date })),
  };
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={webPageSchema({ path: crumbs[crumbs.length - 1].path, title: metadata.title, description: metadata.description, type: "CollectionPage", image: "/images/hero.jpg" })} />
      <JsonLd data={blogSchema} />
      <PageHero crumbs={crumbs} eyebrow="Journal" title="Notes from the farm." lead="How to get here, why the house is built the way it is, what to pack for the dog, and what a weekend actually looks like." />
      <section className="section">
        <div className="wrap">
          <PostCard post={first} featured />
          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => <PostCard key={p.slug} post={p} index={i} />)}
          </div>
        </div>
      </section>
      <CTABand />
    </>
  );
}
