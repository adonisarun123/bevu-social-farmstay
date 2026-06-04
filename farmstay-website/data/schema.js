import { site } from "./site";
import { faqs } from "./faqs";

// Organization + LodgingBusiness schema — site-wide (AEO foundation).
export const lodgingBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LodgingBusiness", "Resort"],
  "@id": `${site.url}/#business`,
  name: site.name,
  description: site.description,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  image: `${site.url}/images/bevu-hero.jpeg`,
  priceRange: "₹₹₹",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  areaServed: [
    { "@type": "City", name: "Bangalore" },
    { "@type": "State", name: "Tamil Nadu" },
    { "@type": "State", name: "Karnataka" },
  ],
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Farm-to-table dining", value: true },
    { "@type": "LocationFeatureSpecification", name: "Nature trails", value: true },
    { "@type": "LocationFeatureSpecification", name: "Bonfire evenings", value: true },
    { "@type": "LocationFeatureSpecification", name: "Yoga and meditation spaces", value: true },
    { "@type": "LocationFeatureSpecification", name: "Corporate offsite spaces", value: true },
    { "@type": "LocationFeatureSpecification", name: "Children's farm learning", value: true },
  ],
  keywords:
    "farmstay near Bangalore, sustainable farmstay near Bangalore, premium farmstay near Bangalore, farm stay in Tamil Nadu, weekend farmstay near Bangalore, family farmstay near Bangalore, corporate offsite farmstay near Bangalore",
  checkinTime: "13:00",
  checkoutTime: "11:00",
  petsAllowed: false,
  sameAs: [],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  name: site.name,
  url: site.url,
  publisher: { "@id": `${site.url}/#business` },
};

// FAQPage schema — strong AEO signal for answer engines.
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
