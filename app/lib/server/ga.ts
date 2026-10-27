import "server-only";
import type { Row } from "./analytics";

/**
 * Age and gender estimates from Google Analytics 4. A website can't see a
 * visitor's age itself; Google estimates it for visitors signed in to Google,
 * and hides it until a site has enough traffic (its privacy threshold).
 *
 * Needs GA_PROPERTY_ID, GA_CLIENT_EMAIL and GA_PRIVATE_KEY (a service
 * account with Viewer access to the property). Without them the dashboard
 * shows setup steps instead.
 */

export type Demographics =
  | { status: "not-configured" }
  | { status: "error"; message: string }
  | { status: "ok"; age: Row[]; gender: Row[] };

export function gaConfigured() {
  return Boolean(
    process.env.GA_PROPERTY_ID && process.env.GA_CLIENT_EMAIL && process.env.GA_PRIVATE_KEY,
  );
}

export async function getDemographics(from: string, to: string): Promise<Demographics> {
  if (!gaConfigured()) return { status: "not-configured" };
  try {
    // Loaded only when configured: it is a large package.
    const { BetaAnalyticsDataClient } = await import("@google-analytics/data");
    const client = new BetaAnalyticsDataClient({
      credentials: {
        client_email: process.env.GA_CLIENT_EMAIL,
        // Env vars store the key's line breaks as "\n".
        private_key: process.env.GA_PRIVATE_KEY!.replace(/\n/g, "\n"),
      },
    });

    const report = async (dimension: string) => {
      const [res] = await client.runReport({
        property: `properties/${process.env.GA_PROPERTY_ID}`,
        dateRanges: [{ startDate: from, endDate: to }],
        dimensions: [{ name: dimension }],
        metrics: [{ name: "activeUsers" }],
      });
      return (res.rows ?? [])
        .map((r) => ({
          label: tidy(r.dimensionValues?.[0]?.value ?? ""),
          value: Number(r.metricValues?.[0]?.value ?? 0),
        }))
        .filter((r) => r.label !== "Unknown")
        .sort((a, b) =>
          dimension === "userAgeBracket" ? a.label.localeCompare(b.label) : b.value - a.value,
        );
    };

    const [age, gender] = await Promise.all([report("userAgeBracket"), report("userGender")]);
    return { status: "ok", age, gender };
  } catch (err) {
    console.error("GA demographics failed", err);
    return {
      status: "error",
      message: err instanceof Error ? err.message.slice(0, 200) : "Unknown error",
    };
  }
}

function tidy(v: string) {
  if (!v || v === "unknown" || v === "(not set)") return "Unknown";
  return v.charAt(0).toUpperCase() + v.slice(1);
}
