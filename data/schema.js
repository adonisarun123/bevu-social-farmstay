import { site } from "./site";
import { faqs } from "./faqs";
import { rooms } from "./rooms";

export const lodgingBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LodgingBusiness", "Resort"],
  "@id": `${site.url}/#business`,
  name: site.name,
  description: site.description,
  url: site.url,
  email: site.email,
  telephone: `+${site.phoneDigits}`,
  image: `${site.url}/images/hero.jpg`,
  priceRange: "₹₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.location.label,
    addressLocality: "Berigai, Shoolagiri",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: site.location.lat, longitude: site.location.lng },
  hasMap: site.location.mapsUrl,
  numberOfRooms: rooms.length,
  checkinTime: "13:00",
  checkoutTime: "11:00",
  petsAllowed: true,
  amenityFeature: [
    "Private swimming pool",
    "Lawn and garden",
    "Air conditioning",
    "Free Wi-Fi",
    "Free parking",
    "Breakfast included",
    "Bonfire",
    "Outdoor dining",
    "Pet friendly",
  ].map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
  containsPlace: rooms.map((r) => ({
    "@type": "HotelRoom",
    name: `${r.name} Room`,
    bed: { "@type": "BedDetails", typeOfBed: "King", numberOfBeds: 1 },
    occupancy: { "@type": "QuantitativeValue", maxValue: 3 },
  })),
  areaServed: [
    { "@type": "City", name: "Bangalore" },
    { "@type": "City", name: "Hosur" },
    { "@type": "State", name: "Tamil Nadu" },
  ],
  keywords:
    "farmstay near Bangalore, pet friendly farmstay near Bangalore, farmstay with private pool near Bangalore, farmhouse near Hosur, sustainable farmstay Tamil Nadu, weekend getaway near Bangalore, corporate offsite near Bangalore",
  sameAs: Object.values(site.social).filter(Boolean),
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  name: site.name,
  url: site.url,
  publisher: { "@id": `${site.url}/#business` },
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}
