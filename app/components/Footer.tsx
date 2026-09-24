import Image from "next/image";
import Link from "next/link";
import { nav, programs, site } from "../lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="container-x grid gap-10 py-14 sm:py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/images/logo.png"
            alt={site.name}
            width={150}
            height={110}
            className="h-14 w-auto"
          />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-600">
            A safe, caring, and engaging place to learn, grow, and explore —
            trusted by Laurel families since {site.established}.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-navy">Explore</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
            {nav.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="transition hover:text-coral">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-navy">Programs</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
            {programs.map((p) => (
              <li key={p.name}>
                <Link href="/our-program#ages" className="transition hover:text-coral">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-navy">Visit us</h2>
          <address className="mt-4 space-y-3 text-sm not-italic text-slate-600">
            <p>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-coral"
              >
                {site.address.street}
                <br />
                {site.address.city}, {site.address.state} {site.address.zip}
              </a>
            </p>
            <p>
              <a
                href={site.phoneHref}
                className="font-semibold text-navy transition hover:text-coral"
              >
                {site.phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${site.email}`}
                className="transition hover:text-coral"
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

      <div className="border-t border-slate-200">
        <div className="container-x py-5">
          <p className="text-center text-xs text-slate-500">
            © {new Date().getFullYear()} {site.name}. {site.tagline} in{" "}
            {site.address.city}, {site.address.state}.
          </p>
        </div>
      </div>
    </footer>
  );
}
