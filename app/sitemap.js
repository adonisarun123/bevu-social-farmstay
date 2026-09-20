import { site, navLinks } from "@/data/site";
import { posts } from "@/data/posts";

export default function sitemap() {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...navLinks.map((l) => ({ url: `${site.url}${l.href}`, lastModified: now, changeFrequency: "monthly", priority: l.href === "/stay" ? 0.9 : 0.7 })),
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: new Date(p.date), changeFrequency: "yearly", priority: 0.5 })),
  ];
}
