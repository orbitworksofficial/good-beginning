import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Reveal from "./components/Reveal";
import { site } from "./lib/site";

// Fraunces carries the personality: a soft, slightly wonky serif.
// `SOFT` and `WONK` axes are what keep it from reading as a stiff book face.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-display",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gbeginnings.com"),
  title: {
    default: `${site.name} — ${site.tagline} in Laurel, MD`,
    template: `%s | ${site.name}`,
  },
  description:
    "Good Beginnings is a child care center and preschool in Laurel, Maryland, serving families since 1999. Small classes, phenomenal teachers, and a milestone-based curriculum for ages 6 weeks to 5 years.",
  keywords: [
    "preschool Laurel MD",
    "child care Howard County",
    "daycare Laurel Maryland",
    "Good Beginnings preschool",
  ],
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description:
      "A safe, caring, and engaging place to learn, grow, and explore. Serving Laurel, MD families since 1999.",
    type: "website",
    locale: "en_US",
  },
  icons: { icon: "/images/logo.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${outfit.variable}`}>
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Reveal />
      </body>
    </html>
  );
}
