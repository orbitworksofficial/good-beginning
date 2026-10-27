import "server-only";

/** Small, dependency-free user-agent and referrer classification. */

const BOT =
  /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|preview|facebookexternalhit|embedly|curl|wget|python|axios|node-fetch|go-http|java\//i;

export function isBot(ua: string) {
  return !ua || BOT.test(ua);
}

export function parseUserAgent(ua: string) {
  const device = /iPad|Tablet|PlayBook|Silk|(Android(?!.*Mobile))/i.test(ua)
    ? "Tablet"
    : /Mobi|iPhone|iPod|Android/i.test(ua)
      ? "Mobile"
      : "Desktop";

  const browser = /Edg\//.test(ua)
    ? "Edge"
    : /OPR\/|Opera/.test(ua)
      ? "Opera"
      : /SamsungBrowser/.test(ua)
        ? "Samsung Internet"
        : /FBAN|FBAV|Instagram/.test(ua)
          ? "Facebook / Instagram app"
          : /CriOS|Chrome\//.test(ua)
            ? "Chrome"
            : /FxiOS|Firefox\//.test(ua)
              ? "Firefox"
              : /Safari\//.test(ua)
                ? "Safari"
                : "Other";

  const os = /Windows/.test(ua)
    ? "Windows"
    : /iPhone|iPad|iPod/.test(ua)
      ? "iOS"
      : /Android/.test(ua)
        ? "Android"
        : /CrOS/.test(ua)
          ? "ChromeOS"
          : /Mac OS X/.test(ua)
            ? "macOS"
            : /Linux/.test(ua)
              ? "Linux"
              : "Other";

  return { device, browser, os };
}

const SOURCES: [RegExp, string][] = [
  [/(^|\.)google\./, "Google"],
  [/(^|\.)bing\.com$/, "Bing"],
  [/(^|\.)yahoo\./, "Yahoo"],
  [/(^|\.)duckduckgo\.com$/, "DuckDuckGo"],
  [/(^|\.)(facebook\.com|fb\.com|fb\.me)$/, "Facebook"],
  [/(^|\.)instagram\.com$/, "Instagram"],
  [/(^|\.)(t\.co|twitter\.com|x\.com)$/, "X / Twitter"],
  [/(^|\.)linkedin\.com$|^lnkd\.in$/, "LinkedIn"],
  [/(^|\.)yelp\.com$/, "Yelp"],
  [/(^|\.)nextdoor\.com$/, "Nextdoor"],
  [/(^|\.)(mail\.google\.com|outlook\.|mail\.yahoo\.)/, "Email"],
];

/** Where a visit came from: a known site, another site's domain, or Direct. */
export function classifySource(referrer: string, utm: string, ownHost: string) {
  if (utm) return { source: utm.slice(0, 40), refDomain: "" };
  let host = "";
  try {
    host = new URL(referrer).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return { source: "Direct", refDomain: "" };
  }
  if (!host || host === ownHost.replace(/^www\./, "")) {
    return { source: "Direct", refDomain: "" };
  }
  for (const [re, name] of SOURCES) if (re.test(host)) return { source: name, refDomain: host };
  return { source: host, refDomain: host };
}
