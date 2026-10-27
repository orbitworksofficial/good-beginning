import type { NextRequest } from "next/server";
import { getStats, resolveRange } from "@/app/lib/server/analytics";
import { getAdmin } from "@/app/lib/server/session";

/** CSV of the dashboard's current range: one row per day/week/month. */
export async function GET(req: NextRequest) {
  if (!(await getAdmin())) return new Response("Unauthorized", { status: 401 });

  const range = resolveRange(Object.fromEntries(req.nextUrl.searchParams));
  const stats = await getStats(range);
  const cell = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
  const row = (...cells: (string | number)[]) => cells.map(cell).join(",");

  const lines = [
    row("Period", "Visitors", "Page views"),
    ...stats.series.map((s) => row(s.label, s.visitors, s.pageviews)),
    "",
    row("Total visitors", stats.totals.visitors),
    row("Total page views", stats.totals.pageviews),
    row("New visitors", stats.totals.newVisitors),
    row("Enquiries (form submissions)", stats.totals.enquiries),
  ];

  return new Response(lines.join("\r\n"), {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="traffic_${range.from}_to_${range.to}.csv"`,
      "cache-control": "no-store",
    },
  });
}
