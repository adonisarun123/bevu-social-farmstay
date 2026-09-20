import { site } from "@/data/site";

export default function robots() {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended", "anthropic-ai"], allow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
