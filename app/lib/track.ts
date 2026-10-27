/**
 * Browser-side visitor tracking for the admin dashboard.
 *
 * Each browser gets an anonymous random id (localStorage) and each visit a
 * session id (sessionStorage). No names, emails or IP addresses are stored;
 * the server adds country/region/city from Vercel's geo headers.
 *
 * Tracking only runs on the production site, so local development doesn't
 * fill the database. Set NEXT_PUBLIC_ANALYTICS_DEBUG=1 to track locally.
 */

export type TrackEvent =
  | "form_submit"
  | "call_click"
  | "email_click"
  | "tour_click"
  | "social_click";

const ENABLED =
  process.env.NODE_ENV === "production" ||
  process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "1";

function storage(kind: "local" | "session") {
  try {
    return kind === "local" ? window.localStorage : window.sessionStorage;
  } catch {
    return null; // private mode or blocked storage: track without ids
  }
}

function newId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2) + Date.now().toString(36);
}

/** Returns [id, createdNow]. */
function getId(kind: "local" | "session", key: string): [string, boolean] {
  const store = storage(kind);
  const existing = store?.getItem(key);
  if (existing) return [existing, false];
  const id = newId();
  store?.setItem(key, id);
  return [id, true];
}

function send(payload: Record<string, unknown>) {
  if (!ENABLED) return;
  try {
    void fetch("/api/track", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true, // survives the page unloading (e.g. a tel: click)
    }).catch(() => {});
  } catch {
    // Tracking must never break the site.
  }
}

// The same page reported twice within a second is one view (React's dev
// mode runs effects twice; fast double navigations do the same).
let lastView = { path: "", at: 0 };

export function trackPageview(path: string) {
  const now = Date.now();
  if (lastView.path === path && now - lastView.at < 1000) return;
  lastView = { path, at: now };

  const [vid, isNew] = getId("local", "gb_vid");
  const [sid, landing] = getId("session", "gb_sid");
  const params = new URLSearchParams(window.location.search);
  send({
    type: "pageview",
    path,
    vid,
    sid,
    isNew,
    landing,
    // Where the visit came from only matters on its first page.
    referrer: landing ? document.referrer : "",
    utm: landing ? params.get("utm_source") ?? "" : "",
  });
}

export function trackEvent(name: TrackEvent, label?: string) {
  const [vid] = getId("local", "gb_vid");
  const [sid] = getId("session", "gb_sid");
  send({
    type: "event",
    name,
    label: label ?? "",
    path: window.location.pathname,
    vid,
    sid,
  });
}
