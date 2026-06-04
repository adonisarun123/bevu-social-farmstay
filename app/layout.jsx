import "./globals.css";

export const metadata = {
  title: "Griha Pravesh | House Warming Ceremony — Ankit & Family",
  description:
    "With the blessings of God and the love of our family and friends, we invite you to our Griha Pravesh house warming ceremony at SF 3, Bevu Social Farmstay, on 20th June. Pooja 8 AM, Sunderkand Path 10 AM, Lunch 12:30 PM.",
  openGraph: {
    title: "Griha Pravesh — House Warming Ceremony",
    description:
      "Join Ankit & Family for the Griha Pravesh at SF 3, Bevu Social Farmstay, on 20th June. Your presence and blessings will make the occasion special.",
    images: ["/images/house.jpeg"],
  },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
