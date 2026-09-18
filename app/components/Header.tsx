"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "../lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-white">
      {/* Utility bar */}
      <div className="hidden border-b border-slate-200 bg-slate-50 lg:block">
        <div className="container-x flex items-center justify-between py-2 text-xs text-slate-600">
          <p>
            {site.hours.days} · {site.hours.weekdays}
          </p>
          <div className="flex items-center gap-6">
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-coral"
            >
              {site.address.full}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="transition hover:text-coral"
            >
              {site.email}
            </a>
          </div>
        </div>
      </div>

      <div className="border-b border-slate-200">
        <div className="container-x flex items-center justify-between gap-4 py-3">
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/images/logo.png"
              alt={`${site.name} — ${site.tagline}`}
              width={168}
              height={124}
              priority
              className="h-12 w-auto sm:h-14"
            />
            <span className="sr-only">{site.name}</span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
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
                  className={`relative px-4 py-2 text-sm font-medium transition ${
                    active
                      ? "text-coral"
                      : "text-slate-600 hover:text-navy"
                  }`}
                >
                  {item.label}
                  {active ? (
                    <span className="absolute inset-x-4 -bottom-[13px] h-0.5 rounded-full bg-coral" />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <a
              href={site.phoneHref}
              className="flex items-center gap-2 text-sm font-semibold text-navy transition hover:text-coral"
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
            className="grid h-10 w-10 place-items-center rounded-lg border border-slate-300 text-navy transition hover:bg-slate-50 lg:hidden"
          >
            <span className="relative block h-3.5 w-5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`absolute left-0 block h-0.5 w-full rounded-full bg-current transition-all duration-300 ${
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
        className={`overflow-hidden border-b border-slate-200 bg-white transition-[max-height] duration-300 lg:hidden ${
          open ? "max-h-[30rem]" : "max-h-0 border-b-0"
        }`}
      >
        <nav aria-label="Mobile" className="container-x flex flex-col py-3">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="border-b border-slate-100 py-3 text-base font-medium text-slate-700 transition hover:text-coral"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-5 flex flex-col gap-3 pb-3">
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
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}
