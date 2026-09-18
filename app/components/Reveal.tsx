"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Adds `.is-visible` to every `.reveal` element as it scrolls into view.
 *
 * Progressive enhancement: the CSS only hides un-revealed elements once this
 * component has added `.reveal-ready` to <html>. If JS never runs, or
 * IntersectionObserver is missing, or motion is reduced, everything simply
 * stays visible instead of disappearing.
 */
export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced || typeof IntersectionObserver === "undefined") {
      nodes.forEach((n) => n.classList.add("is-visible"));
      return;
    }

    root.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    nodes.forEach((n) => observer.observe(n));

    // Safety net: if anything is still hidden after a few seconds (observer
    // never fired, layout shifted, tab was backgrounded), show it anyway.
    const failsafe = window.setTimeout(() => {
      nodes.forEach((n) => n.classList.add("is-visible"));
    }, 4000);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
      root.classList.remove("reveal-ready");
    };
  }, [pathname]);

  return null;
}
