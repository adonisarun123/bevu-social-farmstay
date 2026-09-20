import { site, navLinks } from "@/data/site";
import { posts } from "@/data/posts";
import { rooms } from "@/data/rooms";
import { meetups } from "@/data/meetups";
import { policies } from "@/data/policies";

export default function sitemap() {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...navLinks.map((l) => ({ url: `${site.url}${l.href}`, lastModified: now, changeFrequency: "monthly", priority: l.href === "/stay" ? 0.9 : 0.7 })),
    ...rooms.map((r) => ({ url: `${site.url}/stay/${r.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.8 })),
    ...meetups.map((m) => ({ url: `${site.url}/meetups/${m.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.7 })),
    ...policies.map((p) => ({ url: `${site.url}/policies/${p.slug}`, lastModified: new Date(p.updated), changeFrequency: "yearly", priority: 0.3 })),
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: new Date(p.date), changeFrequency: "yearly", priority: 0.5 })),
  ];
}
