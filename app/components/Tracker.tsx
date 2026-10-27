"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackEvent, trackPageview } from "../lib/track";

/**
 * Records a page view on every route change, and clicks on the links the
 * dashboard reports on (call, email, tour/enroll, Facebook/Instagram).
 */
export default function Tracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackPageview(pathname);
  }, [pathname]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const link = (e.target as Element | null)?.closest?.("a");
      const href = link?.getAttribute("href");
      if (!href) return;
      if (href.startsWith("tel:")) trackEvent("call_click");
      else if (href.startsWith("mailto:")) trackEvent("email_click");
      else if (/facebook\.com|instagram\.com/.test(href))
        trackEvent("social_click", href.includes("instagram") ? "Instagram" : "Facebook");
      else if (href === "/enroll") trackEvent("tour_click", link?.textContent?.trim());
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
