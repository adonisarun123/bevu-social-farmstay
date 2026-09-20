import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/data/posts";
import Reveal from "./Reveal";

export default function PostCard({ post, index = 0, featured = false }) {
  return (
    <Reveal delay={index * 0.06} as="article" className={`group ${featured ? "grid gap-6 md:grid-cols-2 md:items-center" : ""}`}>
      <Link href={`/blog/${post.slug}`} className={`relative block overflow-hidden rounded-2xl bg-sand ${featured ? "aspect-[4/3]" : "aspect-[16/10]"}`}>
        <Image src={post.cover} alt={post.coverAlt} fill sizes={featured ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"} className="object-cover transition duration-700 group-hover:scale-105" />
      </Link>
      <div className={featured ? "" : "mt-5"}>
        <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-brick">
          <span>{post.category}</span><span className="text-stone">·</span><span className="text-stone">{post.readMins} min read</span>
        </div>
        <h3 className={`mt-3 font-display leading-tight ${featured ? "text-3xl md:text-4xl" : "text-2xl"}`}>
          <Link href={`/blog/${post.slug}`} className="transition hover:text-brick">{post.title}</Link>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-bark/75 md:text-base">{post.excerpt}</p>
        <div className="mt-4 text-xs text-stone">{formatDate(post.date)}</div>
      </div>
    </Reveal>
  );
}
