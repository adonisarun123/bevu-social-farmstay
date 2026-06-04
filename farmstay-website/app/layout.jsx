import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import JsonLd from "@/components/JsonLd";
import { lodgingBusinessSchema, websiteSchema } from "@/data/schema";
import { site } from "@/data/site";
import "./globals.css";

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Bevu Social Farmstay | Premium Sustainable Farmstay Near Bangalore",
    template: "%s | Bevu Social Farmstay",
  },
  description:
    "Experience Bevu Social Farmstay, a premium sustainable farmstay in Tamil Nadu near Bangalore. Enjoy farm life, nature, farm-to-table food, family stays, group retreats, and slow weekends.",
  keywords: [
    "farmstay near Bangalore",
    "sustainable farmstay near Bangalore",
    "premium farmstay near Bangalore",
    "farm stay in Tamil Nadu",
    "weekend farmstay near Bangalore",
    "family farmstay near Bangalore",
    "corporate offsite farmstay near Bangalore",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: "Bevu Social Farmstay | Premium Sustainable Farmstay Near Bangalore",
    description:
      "A premium sustainable farmstay in Tamil Nadu near Bangalore — farm life, nature, farm-to-table food, and slow weekends.",
    images: [
      {
        url: "/images/bevu-hero.jpeg",
        width: 1200,
        height: 1600,
        alt: "Bevu Social Farmstay — handcrafted brick and earth architecture at dusk",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bevu Social Farmstay | Premium Sustainable Farmstay Near Bangalore",
    description:
      "A premium sustainable farmstay in Tamil Nadu near Bangalore — farm life, nature, farm-to-table food, and slow weekends.",
    images: ["/images/bevu-hero.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <JsonLd data={lodgingBusinessSchema} />
        <JsonLd data={websiteSchema} />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
