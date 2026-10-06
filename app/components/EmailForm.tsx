"use client";

import { site } from "../lib/site";

/**
 * A form that turns its fields into a ready-to-send email instead of posting
 * anywhere. On phones it opens the mail app (mailto:); on laptops and
 * desktops it opens a Gmail compose tab in the browser, since most people
 * there have no desktop mail app set up.
 *
 * Each field is written into the email as "Label: value", using the text of
 * its <label for="…">.
 */
export default function EmailForm({
  subject,
  nameField,
  className,
  children,
}: {
  /** Subject line; the value of `nameField` is appended after a dash. */
  subject: string;
  nameField: string;
  className?: string;
  children: React.ReactNode;
}) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const lines: string[] = [];
    data.forEach((value, key) => {
      const text = String(value).trim();
      if (!text) return;
      const label =
        form
          .querySelector(`label[for="${key}"]`)
          ?.textContent?.replace("*", "")
          .trim() ?? key;
      lines.push(`${label}: ${text}`);
    });

    const who = String(data.get(nameField) ?? "").trim();
    const su = who ? `${subject} - ${who}` : subject;
    const body = lines.join("\n");

    if (isMobile()) {
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(su)}&body=${encodeURIComponent(body)}`;
      return;
    }

    const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.email)}&su=${encodeURIComponent(su)}&body=${encodeURIComponent(body)}`;
    // Opened from the submit click, so popup blockers allow it; fall back to
    // the same tab if one blocks it anyway.
    // (No "noopener" feature: with it window.open always returns null, so we
    // could not tell a blocked popup apart; we cut the opener link instead.)
    const tab = window.open(gmail, "_blank");
    if (tab) tab.opener = null;
    else window.location.href = gmail;
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      {children}
    </form>
  );
}

function isMobile() {
  const ua = navigator.userAgent;
  return (
    /Android|iPhone|iPad|iPod|Mobile/i.test(ua) ||
    // iPadOS reports itself as a Mac; tell them apart by touch support.
    (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)
  );
}
