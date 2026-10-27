import type { NextRequest } from "next/server";
import { getDb, type EventDoc } from "@/app/lib/server/db";
import { classifySource, isBot, parseUserAgent } from "@/app/lib/server/visitor";

const EVENTS = new Set([
  "form_submit",
  "call_click",
  "email_click",
  "tour_click",
  "social_click",
]);

const str = (v: unknown, max: number) =>
  typeof v === "string" ? v.slice(0, max) : "";

function header(req: NextRequest, name: string) {
  const v = req.headers.get(name);
  if (!v) return "";
  try {
    return decodeURIComponent(v); // Vercel URL-encodes city names
  } catch {
    return v;
  }
}

/**
 * Receives page views and events from app/lib/track.ts. Never stores IP
 * addresses: location comes from Vercel's geo headers (country, region, city),
 * which are absent locally, so local visits show as "Unknown".
 */
export async function POST(req: NextRequest) {
  const ua = req.headers.get("user-agent") ?? "";
  // Ignore bots, and posts from other sites.
  const origin = req.headers.get("origin");
  if (isBot(ua) || (origin && new URL(origin).host !== req.nextUrl.host)) {
    return new Response(null, { status: 204 });
  }

  let body: Record<string, unknown>;
  try {
    const text = await req.text();
    if (text.length > 4000) return new Response(null, { status: 413 });
    body = JSON.parse(text);
  } catch {
    return new Response(null, { status: 400 });
  }

  const type = body.type === "event" ? "event" : body.type === "pageview" ? "pageview" : null;
  const vid = str(body.vid, 64);
  const sid = str(body.sid, 64);
  const path = str(body.path, 200);
  if (!type || !vid || !sid || !path.startsWith("/") || path.startsWith("/admin")) {
    return new Response(null, { status: 400 });
  }

  const doc: EventDoc = {
    type,
    path,
    ts: new Date(),
    vid,
    sid,
    country: req.headers.get("x-vercel-ip-country") || "Unknown",
    region: header(req, "x-vercel-ip-country-region") || "Unknown",
    city: header(req, "x-vercel-ip-city") || "Unknown",
    ...parseUserAgent(ua),
  };

  if (type === "pageview") {
    doc.isNew = body.isNew === true;
    doc.landing = body.landing === true;
    if (doc.landing) {
      Object.assign(
        doc,
        classifySource(str(body.referrer, 500), str(body.utm, 60), req.nextUrl.host),
      );
    }
  } else {
    const name = str(body.name, 40);
    if (!EVENTS.has(name)) return new Response(null, { status: 400 });
    doc.name = name;
    doc.label = str(body.label, 80);
  }

  try {
    await (await getDb()).collection<EventDoc>("events").insertOne(doc);
  } catch (err) {
    console.error("track: could not save event", err);
  }
  return new Response(null, { status: 204 });
}
