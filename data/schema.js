// Structured data (JSON-LD). Site-wide graph lives in app/layout.jsx; page-level
// schemas are added by each page. All @ids are stable so pages can reference each other.
import { site, pricing } from "./site";
import { faqs } from "./faqs";
import { rooms } from "./rooms";
import { experiences } from "./experiences";
import { amenities } from "./amenities";
import { gallery } from "./gallery";
import { meetups } from "./meetups";
import { activities } from "./activities";
import { ratingSummary } from "./reviews";

const abs = (p) => (p.startsWith("http") ? p : `${site.url}${p}`);
// Social/preview crop. ImageKit-hosted originals are multi-MB PNGs, so ask the CDN for a 1200×630 JPEG.
export const ogImage = (src) => (src.startsWith("https://ik.imagekit.io/") ? `${src}?tr=w-1200,h-630,f-jpg` : abs(src));
// Real photographs of the property (from data/gallery.js), used as the business's schema images.
const pick = (category, n) => gallery.filter((g) => g.category === category).slice(0, n).map((g) => ({ "@type": "ImageObject", url: ogImage(g.src), contentUrl: g.src, caption: g.alt }));
const propertyPhotos = [...pick("The House", 2), ...pick("Pool & Lawn", 2), ...pick("Rooms", 2), ...pick("Interiors", 1)];
export const ids = {
  org: `${site.url}/#organization`,
  business: `${site.url}/#business`,
  website: `${site.url}/#website`,
  logo: `${site.url}/#logo`,
};

// ── Site-wide ────────────────────────────────────────────────────────────────
export const organizationSchema = {
  "@type": "Organization",
  "@id": ids.org,
  name: site.name,
  url: site.url,
  logo: { "@type": "ImageObject", "@id": ids.logo, url: `${site.url}/images/logo.png`, contentUrl: `${site.url}/images/logo.png`, width: 578, height: 200, caption: site.name },
  image: { "@id": ids.logo },
  email: site.email,
  telephone: `+${site.phoneDigits}`,
  sameAs: Object.values(site.social).filter(Boolean),
  contactPoint: [
    { "@type": "ContactPoint", contactType: "reservations", telephone: `+${site.phoneDigits}`, email: site.email, availableLanguage: ["English", "Hindi", "Kannada", "Tamil"], areaServed: "IN" },
  ],
};

const offers = [];
if (pricing.perRoom.weekday) offers.push({ "@type": "Offer", name: "Room per night (weekday)", price: pricing.perRoom.weekday, priceCurrency: "INR", category: "Room", availability: "https://schema.org/InStock", url: `${site.url}/stay#rates` });
if (pricing.perRoom.weekend) offers.push({ "@type": "Offer", name: "Room per night (weekend)", price: pricing.perRoom.weekend, priceCurrency: "INR", category: "Room", availability: "https://schema.org/InStock", url: `${site.url}/stay#rates` });
if (pricing.wholeHouse.weekday) offers.push({ "@type": "Offer", name: "Whole house per night (weekday)", price: pricing.wholeHouse.weekday, priceCurrency: "INR", category: "Whole house", availability: "https://schema.org/InStock", url: `${site.url}/stay#rates` });
if (pricing.wholeHouse.weekend) offers.push({ "@type": "Offer", name: "Whole house per night (weekend)", price: pricing.wholeHouse.weekend, priceCurrency: "INR", category: "Whole house", availability: "https://schema.org/InStock", url: `${site.url}/stay#rates` });

export const lodgingBusinessSchema = {
  "@type": ["LodgingBusiness", "BedAndBreakfast"],
  "@id": ids.business,
  name: site.name,
  alternateName: ["Bevu Farmstay", "Bevu Social Farmstay Hosur"],
  slogan: site.tagline,
  description: site.description,
  url: site.url,
  email: site.email,
  telephone: `+${site.phoneDigits}`,
  logo: { "@id": ids.logo },
  image: [`${site.url}/images/hero.jpg`, ...propertyPhotos.map((p) => p.url)],
  photo: { "@type": "ImageObject", url: `${site.url}/images/hero.jpg`, caption: "Bevu Social Farmstay at dusk" },
  priceRange: "₹₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "UPI, bank transfer, cash",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.location.street,
    addressLocality: site.location.city,
    addressRegion: "Tamil Nadu",
    postalCode: site.location.postalCode,
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: site.location.lat, longitude: site.location.lng },
  hasMap: site.location.mapsUrl,
  areaServed: [
    { "@type": "City", name: "Bengaluru" },
    { "@type": "City", name: "Hosur" },
    { "@type": "AdministrativeArea", name: "Krishnagiri district" },
  ],
  numberOfRooms: rooms.length,
  checkinTime: "13:00",
  checkoutTime: "11:00",
  petsAllowed: true,
  smokingAllowed: false,
  audience: { "@type": "PeopleAudience", audienceType: "Families, groups of friends, couples, small corporate teams, pet owners" },
  amenityFeature: [
    "Private swimming pool",
    "Lawn and garden",
    "Bonfire pit",
    "Outdoor dining",
    "Free Wi-Fi",
    "Free parking",
    "Breakfast included",
    "Home-cooked meals on request",
    "Pet friendly",
    "Yoga space",
    "Board games and library",
  ].map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true }))
    // Stated plainly so answer engines do not guess: the rooms are fan-cooled.
    .concat([{ "@type": "LocationFeatureSpecification", name: "Air conditioning", value: false }, { "@type": "LocationFeatureSpecification", name: "Ceiling fans in every room", value: true }]),
  containsPlace: rooms.map((r) => ({ "@type": "HotelRoom", "@id": `${site.url}/stay/${r.slug}#room`, name: `${r.name} Room`, url: `${site.url}/stay/${r.slug}` })),
  makesOffer: offers,
  potentialAction: {
    "@type": "ReserveAction",
    name: "Check availability and book",
    target: { "@type": "EntryPoint", urlTemplate: `${site.url}/account/book`, inLanguage: "en-IN", actionPlatform: ["https://schema.org/DesktopWebPlatform", "https://schema.org/MobileWebPlatform"] },
    result: { "@type": "LodgingReservation", name: "Stay at Bevu Social Farmstay" },
  },
  knowsLanguage: ["en", "hi", "kn", "ta"],
  keywords:
    "farmstay near Bangalore, farmstay near Hosur, homestay near Bangalore, pet friendly farmstay near Bangalore, farmstay with private pool near Bangalore, farmhouse near Hosur, sustainable farmstay Tamil Nadu, weekend getaway near Bangalore, corporate offsite near Bangalore, Berigai farmstay, Shoolagiri farmstay",
  sameAs: Object.values(site.social).filter(Boolean),
  parentOrganization: { "@id": ids.org },
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": ids.website,
  name: site.name,
  url: site.url,
  inLanguage: "en-IN",
  publisher: { "@id": ids.org },
};

// One graph for the whole site, injected once in the root layout.
export const siteGraph = { "@context": "https://schema.org", "@graph": [organizationSchema, lodgingBusinessSchema, websiteSchema] };

// ── Page helpers ─────────────────────────────────────────────────────────────
export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: `${site.url}${item.path}` })),
  };
}

// type: WebPage | AboutPage | ContactPage | CollectionPage | ItemPage
export function webPageSchema({ path, title, description, type = "WebPage", image = "/images/hero.jpg", speakable, extra = {} }) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${site.url}${path}#webpage`,
    url: `${site.url}${path}`,
    name: title,
    description,
    inLanguage: "en-IN",
    isPartOf: { "@id": ids.website },
    about: { "@id": ids.business },
    primaryImageOfPage: { "@type": "ImageObject", url: abs(image) },
    ...(speakable ? { speakable: { "@type": "SpeakableSpecification", cssSelector: speakable } } : {}),
    ...extra,
  };
}

// FAQPage for exactly the questions a page shows. Accepts {question, answer} or {q, a}; strips [label](/link) markup.
const plain = (t = "") => String(t).replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, "$1");
export function faqSchemaFor(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.question || f.q, acceptedAnswer: { "@type": "Answer", text: plain(f.answer || f.a) } })),
  };
}
export const faqSchema = faqSchemaFor(faqs);

// ── Reviews ──────────────────────────────────────────────────────────────────
// Emitted by <Reviews /> only, i.e. only on pages where the same reviews are visible, and only when
// data/reviews.js has real entries. The rating is computed from those entries, never typed in.
export function reviewsSchema(list) {
  const summary = ratingSummary();
  if (!summary) return null;
  return {
    "@context": "https://schema.org",
    "@type": ["LodgingBusiness", "BedAndBreakfast"],
    "@id": ids.business,
    name: site.name,
    aggregateRating: { "@type": "AggregateRating", ratingValue: summary.value, reviewCount: summary.count, bestRating: 5, worstRating: 1 },
    review: list.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      datePublished: r.date,
      reviewBody: r.text,
      reviewRating: { "@type": "Rating", ratingValue: Number(r.rating), bestRating: 5, worstRating: 1 },
      ...(r.source ? { publisher: { "@type": "Organization", name: r.source } } : {}),
      ...(r.url ? { url: r.url } : {}),
    })),
  };
}

// ── Intent landing pages (data/landings.js) ──────────────────────────────────
export function landingSchemas(l) {
  const path = `/${l.slug}`;
  return [
    webPageSchema({
      path,
      title: l.h1,
      description: l.description,
      type: "WebPage",
      image: ogImage(l.image),
      speakable: ["#landing-summary", "#faq h3"],
      extra: { mainEntity: { "@id": ids.business }, keywords: l.keywords.join(", "), significantLink: [`${site.url}/stay`, `${site.url}/account/book`, `${site.url}/location`] },
    }),
    faqSchemaFor(l.faq),
  ];
}

// ── Journal posts ────────────────────────────────────────────────────────────
export function blogPostingSchema(post) {
  const words = post.body.reduce((n, b) => n + plain(b.p || b.h || b.quote || (b.ul || []).join(" ")).split(/\s+/).filter(Boolean).length, 0);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${site.url}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.excerpt,
    image: ogImage(post.cover),
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: { "@id": ids.org },
    publisher: { "@id": ids.org },
    inLanguage: "en-IN",
    articleSection: post.category,
    wordCount: words,
    keywords: [post.category, site.name, "farmstay near Bangalore", "farmstay near Hosur"],
    about: { "@id": ids.business },
    isPartOf: { "@id": `${site.url}/blog#blog` },
    mainEntityOfPage: { "@id": `${site.url}/blog/${post.slug}#webpage` },
  };
}

export const roomsListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Rooms at Bevu Social Farmstay",
  numberOfItems: rooms.length,
  itemListElement: rooms.map((r, i) => ({ "@type": "ListItem", position: i + 1, url: `${site.url}/stay/${r.slug}`, name: `${r.name} Room`, item: { "@id": `${site.url}/stay/${r.slug}#room` } })),
};

export function roomSchema(room) {
  return {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    "@id": `${site.url}/stay/${room.slug}#room`,
    name: `${room.name} Room`,
    alternateName: `${room.kannada} room`,
    description: `${room.blurb} ${room.story[0]}`,
    image: room.gallery.map((g) => abs(g.src)),
    url: `${site.url}/stay/${room.slug}`,
    bed: { "@type": "BedDetails", typeOfBed: "King", numberOfBeds: 1 },
    occupancy: { "@type": "QuantitativeValue", minValue: 1, maxValue: 3, unitText: "guests" },
    floorLevel: room.floor,
    petsAllowed: true,
    amenityFeature: ["Private bathroom with hot water", "Wi-Fi", "Breakfast included", ...room.extras].map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
    containedInPlace: { "@id": ids.business },
    ...(offers.length ? { offers: offers.filter((o) => o.category === "Room") } : {}),
  };
}

export const experiencesListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Experiences, workshops and activities at Bevu Social Farmstay",
  numberOfItems: activities.length + experiences.filter((e) => !e.href).length,
  itemListElement: [
    ...activities.map((a) => ({ "@type": "ListItem", name: a.title, url: `${site.url}/experiences/${a.slug}`, item: { "@id": `${site.url}/experiences/${a.slug}#offer` } })),
    ...experiences.filter((e) => !e.href).map((e) => ({ "@type": "ListItem", name: e.title, description: e.description, image: e.image })),
  ].map((x, i) => ({ ...x, position: i + 1 })),
};

export const amenitiesListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Facilities at Bevu Social Farmstay",
  numberOfItems: amenities.length,
  itemListElement: amenities.map((a, i) => ({ "@type": "ListItem", position: i + 1, name: a.title, description: a.description, url: `${site.url}/amenities#${a.slug}`, image: a.image })),
};

export const gallerySchema = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: "Bevu Social Farmstay photo gallery",
  url: `${site.url}/gallery`,
  about: { "@id": ids.business },
  associatedMedia: gallery.map((g) => ({ "@type": "ImageObject", contentUrl: abs(g.src), caption: g.alt })),
};

export const placeSchema = {
  "@context": "https://schema.org",
  "@type": "Place",
  "@id": `${site.url}/location#place`,
  name: site.name,
  address: lodgingBusinessSchema.address,
  geo: lodgingBusinessSchema.geo,
  hasMap: site.location.mapsUrl,
};

// Meetup formats: each is a Service/Offer the farmstay provides (not a dated Event).
export function meetupSchema(m) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}/meetups/${m.slug}#offer`,
    name: `${m.title} at ${site.name}`,
    serviceType: "Group stay / meetup hosting",
    description: `${m.tagline} ${m.intro}`,
    image: abs(m.cover),
    url: `${site.url}/meetups/${m.slug}`,
    provider: { "@id": ids.business },
    areaServed: { "@type": "City", name: "Bengaluru" },
    audience: { "@type": "PeopleAudience", audienceType: m.audience },
    offers: { "@type": "Offer", url: `${site.url}/meetups/${m.slug}`, availability: "https://schema.org/InStock", priceCurrency: "INR", description: m.price },
  };
}

export const meetupsListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Meetups and group weekends at Bevu Social Farmstay",
  numberOfItems: meetups.length,
  itemListElement: meetups.map((m, i) => ({ "@type": "ListItem", position: i + 1, name: m.title, url: `${site.url}/meetups/${m.slug}`, item: { "@id": `${site.url}/meetups/${m.slug}#offer` } })),
};

// ── Activities & workshops ───────────────────────────────────────────────────
export function activitySchema(a) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}/experiences/${a.slug}#offer`,
    name: `${a.title} at ${site.name}`,
    serviceType: a.category === "Outdoors" || a.category === "Night Sky" ? "Guided activity" : "Hands-on workshop",
    description: `${a.tagline} ${a.intro}`,
    image: abs(a.cover),
    url: `${site.url}/experiences/${a.slug}`,
    provider: { "@id": ids.business },
    areaServed: { "@type": "City", name: "Bengaluru" },
    audience: { "@type": "PeopleAudience", audienceType: a.who },
    offers: { "@type": "Offer", url: `${site.url}/experiences/${a.slug}`, availability: "https://schema.org/InStock", priceCurrency: "INR", description: a.price || "Priced per person; on request" },
  };
}

