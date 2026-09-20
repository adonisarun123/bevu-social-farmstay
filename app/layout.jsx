import Script from "next/script";
import "./globals.css";
import { site } from "@/data/site";
import { siteGraph } from "@/data/schema";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import JsonLd from "@/components/JsonLd";

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Pet-Friendly Farmstay near Bangalore`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: ["farmstay near Bangalore", "farmstay with pool near Bangalore", "farmhouse near Hosur", "sustainable farmstay Tamil Nadu", "weekend getaway near Bangalore"],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Pet-Friendly Farmstay with Pool near Bangalore`,
    description: site.description,
    url: site.url,
    images: [{ url: "/images/hero.jpg", width: 1000, height: 1250, alt: "Bevu Social Farmstay at dusk" }],
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description, images: ["/images/hero.jpg"] },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  ...(site.verification.google ? { verification: { google: site.verification.google } } : {}),
  formatDetection: { telephone: true, email: true, address: true },
  category: "travel",
};

export const viewport = { themeColor: "#7A6140", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400&family=Outfit:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <JsonLd data={siteGraph} />
      </head>
      <body>
        {site.gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`} strategy="afterInteractive" />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${site.gaId}');`}
            </Script>
          </>
        )}
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
