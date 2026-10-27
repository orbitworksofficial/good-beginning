import "server-only";
import { getDb, type EventDoc } from "./db";

/**
 * Traffic stats for the admin dashboard, computed from the `events`
 * collection that /api/track fills.
 *
 * All dates are calendar days in the school's time zone, so "today" and
 * month boundaries match what the school sees, wherever the server runs.
 */

export const TZ = "America/New_York";

export type Granularity = "day" | "week" | "month";

export const PRESETS = [
  { key: "today", label: "Today" },
  { key: "7d", label: "Last 7 days" },
  { key: "30d", label: "Last 30 days" },
  { key: "90d", label: "Last 90 days" },
  { key: "month", label: "This month" },
  { key: "lastmonth", label: "Last month" },
  { key: "12m", label: "Last 12 months" },
] as const;

export type Range = {
  preset: string; // a PRESETS key, or "custom"
  from: string; // YYYY-MM-DD, inclusive
  to: string; // YYYY-MM-DD, inclusive
  granularity: Granularity;
  label: string;
};

/* ---------- Calendar-date helpers (YYYY-MM-DD strings) ---------- */

const ISO = /^\d{4}-\d{2}-\d{2}$/;

function parts(d: string) {
  const [y, m, day] = d.split("-").map(Number);
  return { y, m, day };
}

function fromUtc(ms: number) {
  return new Date(ms).toISOString().slice(0, 10);
}

export function addDays(d: string, n: number) {
  const { y, m, day } = parts(d);
  return fromUtc(Date.UTC(y, m - 1, day + n));
}

function addMonths(d: string, n: number) {
  const { y, m } = parts(d);
  return fromUtc(Date.UTC(y, m - 1 + n, 1));
}

function daysBetween(a: string, b: string) {
  const pa = parts(a);
  const pb = parts(b);
  return Math.round(
    (Date.UTC(pb.y, pb.m - 1, pb.day) - Date.UTC(pa.y, pa.m - 1, pa.day)) / 864e5,
  );
}

export function todayLocal() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(new Date());
}

/** The UTC instant at which local midnight of `d` starts. */
function localMidnight(d: string) {
  const { y, m, day } = parts(d);
  const wall = Date.UTC(y, m - 1, day);
  const offset = (instant: number) => {
    const f = new Intl.DateTimeFormat("en-US", {
      timeZone: TZ,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).formatToParts(new Date(instant));
    const get = (t: string) => Number(f.find((p) => p.type === t)?.value);
    return (
      Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"), get("second")) -
      instant
    );
  };
  // Two passes settle the offset across a DST change.
  let guess = wall - offset(wall);
  guess = wall - offset(guess);
  return new Date(guess);
}

/* ---------- Range from the URL ---------- */

export function resolveRange(params: Record<string, string | string[] | undefined>): Range {
  const get = (k: string) => (typeof params[k] === "string" ? (params[k] as string) : "");
  const today = todayLocal();
  const preset = get("range") || "30d";

  let from: string;
  let to = today;
  switch (preset) {
    case "today":
      from = today;
      break;
    case "7d":
      from = addDays(today, -6);
      break;
    case "90d":
      from = addDays(today, -89);
      break;
    case "month":
      from = today.slice(0, 8) + "01";
      break;
    case "lastmonth":
      from = addMonths(today, -1);
      to = addDays(today.slice(0, 8) + "01", -1);
      break;
    case "12m":
      from = addMonths(today, -11);
      break;
    case "custom": {
      const f = get("from");
      const t = get("to");
      from = ISO.test(f) ? f : addDays(today, -29);
      to = ISO.test(t) ? t : today;
      if (to > today) to = today;
      if (from > to) [from, to] = [to, from];
      if (daysBetween(from, to) > 366 * 3) from = addDays(to, -366 * 3);
      break;
    }
    default:
      from = addDays(today, -29);
  }

  const span = daysBetween(from, to) + 1;
  const g = get("by");
  const granularity: Granularity =
    g === "day" || g === "week" || g === "month"
      ? g
      : span <= 31
        ? "day"
        : span <= 120
          ? "week"
          : "month";

  const known = PRESETS.find((p) => p.key === preset);
  const label = known && preset !== "custom" ? known.label : `${fmtDay(from)} – ${fmtDay(to)}`;
  return { preset: known ? preset : "custom", from, to, granularity, label };
}

export function fmtDay(d: string, withYear = true) {
  const { y, m, day } = parts(d);
  return new Date(Date.UTC(y, m - 1, day)).toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "short",
    day: "numeric",
    ...(withYear ? { year: "numeric" } : {}),
  });
}

/** Every bucket key in the range, so days with no visits still show as 0. */
function bucketKeys(from: string, to: string, g: Granularity) {
  const keys: string[] = [];
  if (g === "day") {
    for (let d = from; d <= to; d = addDays(d, 1)) keys.push(d);
  } else if (g === "week") {
    const { y, m, day } = parts(from);
    const dow = new Date(Date.UTC(y, m - 1, day)).getUTCDay(); // 0 = Sunday
    for (let d = addDays(from, -((dow + 6) % 7)); d <= to; d = addDays(d, 7)) keys.push(d);
  } else {
    for (let d = from.slice(0, 8) + "01"; d <= to; d = addMonths(d, 1)) keys.push(d);
  }
  return keys;
}

function bucketLabel(key: string, g: Granularity) {
  if (g === "month") {
    const { y, m } = parts(key);
    return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-US", {
      timeZone: "UTC",
      month: "short",
      year: "numeric",
    });
  }
  return g === "week" ? `Week of ${fmtDay(key, false)}` : fmtDay(key, false);
}

/* ---------- Stats ---------- */

export type Row = { label: string; value: number; sub?: string };

export type Stats = {
  totals: {
    visitors: number;
    pageviews: number;
    sessions: number;
    newVisitors: number;
    enquiries: number;
  };
  previous: Stats["totals"];
  series: { key: string; label: string; visitors: number; pageviews: number }[];
  actions: Row[];
  forms: Row[];
  pages: Row[];
  sources: Row[];
  countries: Row[];
  regions: Row[];
  cities: Row[];
  devices: Row[];
  browsers: Row[];
  os: Row[];
  live: number;
};

const PAGE_NAMES: Record<string, string> = {
  "/": "Home",
  "/about-us": "About Us",
  "/our-program": "Our Program",
  "/enroll": "Enroll",
  "/contact-us": "Contact Us",
};

const ACTION_NAMES: Record<string, string> = {
  form_submit: "Form submissions",
  call_click: "Phone number taps",
  email_click: "Email link clicks",
  tour_click: "Enroll / tour button clicks",
  social_click: "Facebook / Instagram clicks",
};

let regionNames: Intl.DisplayNames | null = null;
function countryName(code: string) {
  if (!code || code === "Unknown") return "Unknown";
  try {
    regionNames ??= new Intl.DisplayNames(["en"], { type: "region" });
    return regionNames.of(code) ?? code;
  } catch {
    return code;
  }
}

/** Distinct visitors per value of `field`, top 10. */
function byVisitors(field: string) {
  return [
    { $match: { type: "pageview" } },
    { $group: { _id: { v: `$${field}`, vid: "$vid" } } },
    { $group: { _id: "$_id.v", n: { $sum: 1 } } },
    { $sort: { n: -1, _id: 1 } },
    { $limit: 10 },
  ];
}

const totalsFacet = [
  {
    $group: {
      _id: null,
      pageviews: { $sum: { $cond: [{ $eq: ["$type", "pageview"] }, 1, 0] } },
      enquiries: { $sum: { $cond: [{ $eq: ["$name", "form_submit"] }, 1, 0] } },
      visitors: { $addToSet: "$vid" },
      sessions: { $addToSet: "$sid" },
      newVisitors: { $addToSet: { $cond: ["$isNew", "$vid", "$$REMOVE"] } },
    },
  },
  {
    $project: {
      _id: 0,
      pageviews: 1,
      enquiries: 1,
      visitors: { $size: "$visitors" },
      sessions: { $size: "$sessions" },
      newVisitors: { $size: "$newVisitors" },
    },
  },
];

const emptyTotals = { visitors: 0, pageviews: 0, sessions: 0, newVisitors: 0, enquiries: 0 };

export async function getStats(range: Range): Promise<Stats> {
  const db = await getDb();
  const events = db.collection<EventDoc>("events");
  const start = localMidnight(range.from);
  const end = localMidnight(addDays(range.to, 1));

  const unit = range.granularity;
  const bucket = {
    $dateToString: {
      format: "%Y-%m-%d",
      timezone: TZ,
      date: { $dateTrunc: { date: "$ts", unit, timezone: TZ, startOfWeek: "monday" } },
    },
  };

  // The previous period of the same length, for the "vs before" figures.
  const span = daysBetween(range.from, range.to) + 1;
  const prevStart = localMidnight(addDays(range.from, -span));

  const [[agg], [prev], liveIds] = await Promise.all([
    events
      .aggregate([
        { $match: { ts: { $gte: start, $lt: end } } },
        {
          $facet: {
            totals: totalsFacet,
            series: [
              {
                $group: {
                  _id: { k: bucket, vid: "$vid" },
                  pv: { $sum: { $cond: [{ $eq: ["$type", "pageview"] }, 1, 0] } },
                },
              },
              { $group: { _id: "$_id.k", visitors: { $sum: 1 }, pageviews: { $sum: "$pv" } } },
            ],
            actions: [
              { $match: { type: "event" } },
              { $group: { _id: "$name", n: { $sum: 1 } } },
            ],
            forms: [
              { $match: { name: "form_submit" } },
              { $group: { _id: "$label", n: { $sum: 1 } } },
              { $sort: { n: -1 } },
            ],
            pages: [
              { $match: { type: "pageview" } },
              { $group: { _id: "$path", n: { $sum: 1 }, v: { $addToSet: "$vid" } } },
              { $project: { n: 1, v: { $size: "$v" } } },
              { $sort: { n: -1, _id: 1 } },
              { $limit: 10 },
            ],
            sources: [
              { $match: { type: "pageview", landing: true } },
              { $group: { _id: { $ifNull: ["$source", "Direct"] }, n: { $sum: 1 } } },
              { $sort: { n: -1, _id: 1 } },
              { $limit: 10 },
            ],
            countries: byVisitors("country"),
            regions: [
              { $match: { type: "pageview" } },
              { $group: { _id: { c: "$country", r: "$region", vid: "$vid" } } },
              { $group: { _id: { c: "$_id.c", r: "$_id.r" }, n: { $sum: 1 } } },
              { $sort: { n: -1 } },
              { $limit: 10 },
            ],
            cities: [
              { $match: { type: "pageview" } },
              { $group: { _id: { c: "$country", r: "$region", city: "$city", vid: "$vid" } } },
              { $group: { _id: { c: "$_id.c", r: "$_id.r", city: "$_id.city" }, n: { $sum: 1 } } },
              { $sort: { n: -1 } },
              { $limit: 10 },
            ],
            devices: byVisitors("device"),
            browsers: byVisitors("browser"),
            os: byVisitors("os"),
          },
        },
      ])
      .toArray(),
    events
      .aggregate([{ $match: { ts: { $gte: prevStart, $lt: start } } }, ...totalsFacet])
      .toArray(),
    events.distinct("vid", { ts: { $gte: new Date(Date.now() - 5 * 60 * 1000) } }),
  ]);

  type G<T = string> = { _id: T; n: number };
  const f = agg as Record<string, unknown[]>;
  const rows = <T,>(key: string, label: (id: T) => string, sub?: (g: G<T>) => string): Row[] =>
    (f[key] as G<T>[]).map((g) => ({ label: label(g._id), value: g.n, sub: sub?.(g) }));

  const seriesMap = new Map(
    (f.series as { _id: string; visitors: number; pageviews: number }[]).map((s) => [s._id, s]),
  );
  const place = (r: string, c: string) =>
    r === "Unknown" ? countryName(c) : `${r}, ${c === "US" ? "USA" : countryName(c)}`;

  return {
    totals: { ...emptyTotals, ...((f.totals as Stats["totals"][])[0] ?? {}) },
    previous: { ...emptyTotals, ...((prev as Stats["totals"]) ?? {}) },
    series: bucketKeys(range.from, range.to, unit).map((key) => ({
      key,
      label: bucketLabel(key, unit),
      visitors: seriesMap.get(key)?.visitors ?? 0,
      pageviews: seriesMap.get(key)?.pageviews ?? 0,
    })),
    actions: Object.keys(ACTION_NAMES).map((name) => ({
      label: ACTION_NAMES[name],
      value: (f.actions as G[]).find((a) => a._id === name)?.n ?? 0,
    })),
    forms: rows<string>("forms", (id) => id || "Form"),
    pages: (f.pages as { _id: string; n: number; v: number }[]).map((p) => ({
      label: PAGE_NAMES[p._id] ?? p._id,
      value: p.n,
      sub: `${p.v.toLocaleString()} visitor${p.v === 1 ? "" : "s"}`,
    })),
    sources: rows<string>("sources", (id) => id),
    countries: rows<string>("countries", countryName),
    regions: rows<{ c: string; r: string }>("regions", (id) => place(id.r, id.c)),
    cities: rows<{ c: string; r: string; city: string }>("cities", (id) =>
      id.city === "Unknown" ? "Unknown" : `${id.city}, ${id.r !== "Unknown" ? id.r : countryName(id.c)}`,
    ),
    devices: rows<string>("devices", (id) => id),
    browsers: rows<string>("browsers", (id) => id),
    os: rows<string>("os", (id) => id),
    live: liveIds.length,
  };
}
