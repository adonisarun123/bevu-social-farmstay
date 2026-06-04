import "./globals.css";

export const metadata = {
  title: "Bevu Social Farmstay — Griha Pravesh Invitation",
  description:
    "We're warming our new home — and we'd love you there. Griha Pravesh at SF 3, Bevu Social Farmstay, 20th June. Pooja 8 AM, Sunderkand Path 10 AM, Lunch 12:30 PM.",
  themeColor: "#161e2e",
  openGraph: {
    title: "Bevu Social Farmstay — Griha Pravesh Invitation",
    description:
      "Join Ankit & Family for the Griha Pravesh house warming at SF 3, Bevu Social Farmstay, on 20th June.",
    images: ["/images/hero.jpg"],
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
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400;1,9..144,500&family=Marcellus&family=Outfit:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
