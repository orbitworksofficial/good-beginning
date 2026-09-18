import Image from "next/image";
import Link from "next/link";
import { nav, programs, site } from "../lib/site";
import { RainbowArc } from "./Decor";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t-[3px] border-ink bg-ink text-white">
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-[0.12]" />
      <RainbowArc className="pointer-events-none absolute -left-12 -top-6 h-40 w-72 opacity-20" />

      <div className="container-x relative grid gap-12 py-16 sm:py-20 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="inline-flex rotate-[-2deg] rounded-block border-[3px] border-ink bg-white p-3 shadow-pop-sm">
            <Image
              src="/images/logo.png"
              alt={site.name}
              width={150}
              height={110}
              className="h-16 w-auto"
            />
          </div>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/70">
            A safe, caring, and engaging place to learn, grow, and explore —
            trusted by Laurel families since {site.established}.
          </p>
        </div>

        <div>
          <h2 className="font-display text-lg font-bold">
            <span className="border-b-[3px] border-sunshine pb-1">Explore</span>
          </h2>
          <ul className="mt-6 space-y-3 text-sm text-white/70">
            {nav.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="transition hover:text-sunshine">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-lg font-bold">
            <span className="border-b-[3px] border-tomato pb-1">Programs</span>
          </h2>
          <ul className="mt-6 space-y-3 text-sm text-white/70">
            {programs.map((p) => (
              <li key={p.name}>
                <Link href="/#programs" className="transition hover:text-sunshine">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-lg font-bold">
            <span className="border-b-[3px] border-jade pb-1">Visit us</span>
          </h2>
          <address className="mt-6 space-y-4 text-sm not-italic text-white/70">
            <p>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-sunshine"
              >
                {site.address.street}
                <br />
                {site.address.city}, {site.address.state} {site.address.zip}
              </a>
            </p>
            <p>
              <a
                href={site.phoneHref}
                className="font-bold text-white transition hover:text-sunshine"
              >
                {site.phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${site.email}`}
                className="transition hover:text-sunshine"
              >
                {site.email}
              </a>
            </p>
            <p className="pt-1">
              {site.hours.days}
              <br />
              {site.hours.weekdays}
            </p>
          </address>
        </div>
      </div>

      <div className="container-x relative border-t-[3px] border-white/15 py-6">
        <p className="text-center text-xs text-white/50">
          © {new Date().getFullYear()} {site.name}. {site.tagline} in{" "}
          {site.address.city}, {site.address.state}.
        </p>
      </div>
    </footer>
  );
}
