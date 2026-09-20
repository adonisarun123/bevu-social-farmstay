// /llms.txt — a plain-text brief for AI assistants and answer engines (AEO).
// Generated from the same data files as the site, so it never drifts from the pages.
import { site, pricing, formatRate } from "@/data/site";
import { rooms, inclusions, houseRules } from "@/data/rooms";
import { amenities } from "@/data/amenities";
import { experiences } from "@/data/experiences";
import { faqs } from "@/data/faqs";
import { posts } from "@/data/posts";

export const dynamic = "force-static";

export function GET() {
  const L = [];
  L.push(`# ${site.name}`, "", `> ${site.description}`, "");
  L.push("## Key facts");
  L.push(`- Type: eco-conscious, pet-friendly luxury farmstay / bed & breakfast`);
  L.push(`- Location: ${site.location.label}, ${site.location.area} (${site.location.lat}, ${site.location.lng})`);
  L.push(`- Map: ${site.location.mapsUrl}`);
  L.push(`- Distance: ${site.location.distances.map((d) => `${d.from} ${d.km} / ${d.time}`).join("; ")}`);
  L.push(`- Rooms: ${rooms.length} ensuite king rooms, air-conditioned, hot water; each sleeps ${rooms[0].occupancy}`);
  L.push(`- Capacity: ${site.capacity.adults} adults, ${site.capacity.withKids}`);
  L.push(`- Booking: per room, or the whole house (exclusive pool and lawn)`);
  L.push(`- Rates: room ${formatRate(pricing.perRoom.weekday)} weekday / ${formatRate(pricing.perRoom.weekend)} weekend; whole house ${formatRate(pricing.wholeHouse.weekday)} / ${formatRate(pricing.wholeHouse.weekend)} (${pricing.wholeHouse.note})`);
  L.push(`- Check-in ${site.checkIn}, check-out ${site.checkOut}. By prior booking only.`);
  L.push(`- Pets: dogs welcome (pet-friendly)`);
  L.push(`- Food: breakfast included; lunch and dinner cooked on site on request`);
  L.push(`- Contact: WhatsApp/phone ${site.phoneDisplay}, ${site.email}`);
  L.push(`- Instagram: ${site.social.instagram}`, "");
  L.push("## Rooms");
  rooms.forEach((r) => L.push(`- [${r.name} Room](${site.url}/stay/${r.slug}) — ${r.tag}; ${r.floor}; view: ${r.view}. ${r.blurb}`));
  L.push("", "## Facilities");
  amenities.forEach((a) => L.push(`- ${a.title}: ${a.description}`));
  L.push("", "## Experiences");
  experiences.forEach((e) => L.push(`- ${e.title}: ${e.description}`));
  L.push("", "## Included with every stay");
  inclusions.forEach((x) => L.push(`- ${x}`));
  L.push("", "## House rules");
  houseRules.forEach((r) => L.push(`- ${r.title}: ${r.text}`));
  L.push("", "## FAQ");
  faqs.forEach((f) => L.push(`Q: ${f.question}`, `A: ${f.answer}`, ""));
  L.push("## Pages");
  ["/", "/stay", "/amenities", "/experiences", "/about", "/gallery", "/location", "/blog", "/contact"].forEach((p) => L.push(`- ${site.url}${p}`));
  L.push("", "## Journal");
  posts.forEach((p) => L.push(`- [${p.title}](${site.url}/blog/${p.slug}) — ${p.excerpt}`));
  L.push("", `Sitemap: ${site.url}/sitemap.xml`);
  return new Response(L.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=86400" } });
}
