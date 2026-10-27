import Script from "next/script";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Reveal from "@/app/components/Reveal";
import Tracker from "@/app/components/Tracker";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
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
      <Tracker />

      {/* Google Analytics: only used for the age/gender estimates on the
          admin dashboard. Skipped entirely until NEXT_PUBLIC_GA_ID is set. */}
      {GA_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      ) : null}
    </>
  );
}
