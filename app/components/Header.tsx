"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "../lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      {/* Contact strip */}
      <div className="hidden bg-ink text-white lg:block">
        <div className="container-x flex items-center justify-between py-2 text-xs font-semibold">
          <p className="tracking-wide">
            {site.hours.days} · {site.hours.weekdays}
          </p>
          <div className="flex items-center gap-6">
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-sunshine"
            >
              {site.address.full}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="transition hover:text-sunshine"
            >
              {site.email}
            </a>
          </div>
        </div>
      </div>

      <div
        className={`border-b-[3px] border-ink bg-cream transition-shadow duration-300 ${
          scrolled ? "shadow-[0_6px_0_0_rgba(42,33,64,0.12)]" : ""
        }`}
      >
        <div className="container-x flex items-center justify-between gap-4 py-3">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <Image
              src="/images/logo.png"
              alt={`${site.name} — ${site.tagline}`}
              width={168}
              height={124}
              priority
              className="h-14 w-auto sm:h-16"
            />
            <span className="sr-only">{site.name}</span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 xl:flex">
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href.split("#")[0]) &&
                    item.href !== "/#programs";
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`rounded-lg border-[3px] px-4 py-2 text-sm font-bold transition-all duration-150 ${
                    active
                      ? "border-ink bg-sunshine text-ink shadow-pop-sm"
                      : "border-transparent text-ink/75 hover:border-ink hover:bg-white hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={site.phoneHref}
              className="hidden items-center gap-2 rounded-lg border-[3px] border-ink bg-white px-4 py-2 text-sm font-bold text-ink transition-all duration-150 hover:-translate-y-0.5 hover:shadow-pop-sm xl:inline-flex"
            >
              <PhoneIcon />
              {site.phone}
            </a>
            <Link href="/enroll" className="btn-primary !px-5 !py-2.5">
              Schedule a Tour
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-12 w-12 place-items-center rounded-lg border-[3px] border-ink bg-white text-ink shadow-pop-sm transition active:translate-x-1 active:translate-y-1 active:shadow-none xl:hidden"
          >
            <span className="relative block h-4 w-5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`absolute left-0 block h-[3px] w-full rounded-full bg-current transition-all duration-300 ${
                    i === 0
                      ? open
                        ? "top-1/2 -translate-y-1/2 rotate-45"
                        : "top-0"
                      : i === 1
                        ? `top-1/2 -translate-y-1/2 ${open ? "opacity-0" : "opacity-100"}`
                        : open
                          ? "top-1/2 -translate-y-1/2 -rotate-45"
                          : "bottom-0"
                  }`}
                />
              ))}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-b-[3px] border-ink bg-cream transition-[max-height] duration-300 xl:hidden ${
          open ? "max-h-[34rem]" : "max-h-0 border-b-0"
        }`}
      >
        <nav aria-label="Mobile" className="container-x flex flex-col gap-2 py-5">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-lg border-[3px] border-ink bg-white px-4 py-3 text-base font-bold text-ink shadow-pop-sm transition active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-3 flex flex-col gap-3">
            <a href={site.phoneHref} className="btn-secondary w-full">
              <PhoneIcon />
              {site.phone}
            </a>
            <Link href="/enroll" className="btn-primary w-full">
              Schedule a Tour
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}
