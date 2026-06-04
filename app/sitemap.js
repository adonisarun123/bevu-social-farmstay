import { site } from "@/data/site";

export default function sitemap() {
  const routes = [
    { path: "", priority: 1.0 },
    { path: "/about", priority: 0.8 },
    { path: "/stay", priority: 0.9 },
    { path: "/experiences", priority: 0.9 },
    { path: "/sustainability", priority: 0.7 },
    { path: "/gallery", priority: 0.6 },
    { path: "/location", priority: 0.8 },
    { path: "/contact", priority: 0.9 },
  ];

  return routes.map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route.priority,
  }));
}
