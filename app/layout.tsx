import type { Metadata } from "next";
import { Caveat, Inter } from "next/font/google";
import "./globals.css";
import { site } from "./lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-hand",
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
    <html lang="en" className={`${inter.variable} ${caveat.variable}`} data-scroll-behavior="smooth">
      <body className="font-sans">{children}</body>
    </html>
  );
}
