import type { Metadata } from "next";
import { getStats, PRESETS, resolveRange, todayLocal } from "@/app/lib/server/analytics";
import { getDemographics } from "@/app/lib/server/ga";
import { requireAdmin } from "@/app/lib/server/session";
import DashboardShell from "../_components/DashboardShell";
import Tabs from "../_components/Tabs";
import TrafficChart from "../_components/TrafficChart";
import { BarList, Panel, StatTile } from "../_components/Widgets";

export const metadata: Metadata = { title: "Dashboard" };

const PERIOD = { day: "Daily", week: "Weekly", month: "Monthly" } as const;

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireAdmin();
  const range = resolveRange(await searchParams);
  const [stats, demo] = await Promise.all([
    getStats(range),
    getDemographics(range.from, range.to),
  ]);
  const { totals, previous } = stats;

  const q = new URLSearchParams({
    range: range.preset,
    from: range.from,
    to: range.to,
    by: range.granularity,
  });
  const returning = Math.max(0, totals.visitors - totals.newVisitors);

  return (
    <>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-navy">Website traffic</h1>
          <p className="mt-1 text-sm text-slate-600">{range.label}</p>
        </div>
        <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 shadow-card">
          <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
            {stats.live > 0 ? (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
            ) : null}
            <span
              className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
                stats.live > 0 ? "bg-emerald-500" : "bg-slate-300"
              }`}
            />
          </span>
          <span className="font-semibold tabular-nums text-navy">{stats.live}</span> on the
          site now
        </p>
      </div>

      <DashboardShell
        presets={PRESETS}
        preset={range.preset}
        from={range.from}
        to={range.to}
        granularity={range.granularity}
        today={todayLocal()}
        exportHref={`/api/admin/export?${q.toString()}`}
      >
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatTile label="Visitors" value={totals.visitors} previous={previous.visitors} />
          <StatTile label="Page views" value={totals.pageviews} previous={previous.pageviews} />
          <StatTile label="Enquiries" value={totals.enquiries} previous={previous.enquiries} />
          <StatTile
            label="New visitors"
            value={totals.newVisitors}
            hint={`${returning.toLocaleString()} returning visitor${returning === 1 ? "" : "s"}`}
          />
        </div>

        <Panel
          title="Visitors over time"
          note={`${PERIOD[range.granularity]} totals · Maryland time`}
          className="mt-4"
        >
          <TrafficChart data={stats.series} />
        </Panel>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <Panel title="Most viewed pages" note="Page views">
            <BarList rows={stats.pages} unit="views" />
          </Panel>
          <Panel title="Where visitors come from" note="Visits by source">
            <BarList rows={stats.sources} unit="visits" />
          </Panel>

          <Panel title="Location" note="Visitors">
            <Tabs
              tabs={[
                { label: "States / regions", content: <BarList rows={stats.regions} unit="visitors" /> },
                { label: "Cities", content: <BarList rows={stats.cities} unit="visitors" /> },
                { label: "Countries", content: <BarList rows={stats.countries} unit="visitors" /> },
              ]}
            />
          </Panel>
          <Panel title="Technology" note="Visitors">
            <Tabs
              tabs={[
                { label: "Device", content: <BarList rows={stats.devices} unit="visitors" /> },
                { label: "Browser", content: <BarList rows={stats.browsers} unit="visitors" /> },
                { label: "Operating system", content: <BarList rows={stats.os} unit="visitors" /> },
              ]}
            />
          </Panel>

          <Panel title="Visitor actions" note="Clicks and form submissions">
            <ul className="divide-y divide-slate-100">
              {stats.actions.map((a) => (
                <li key={a.label} className="flex items-center justify-between py-2.5 text-sm">
                  <span className="text-slate-700">{a.label}</span>
                  <span className="font-semibold tabular-nums text-navy">
                    {a.value.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
            {stats.forms.length > 0 ? (
              <div className="mt-4 rounded-lg bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-500">Form submissions by form</p>
                <div className="mt-3">
                  <BarList rows={stats.forms} unit="submissions" />
                </div>
              </div>
            ) : null}
            <p className="mt-4 text-xs leading-relaxed text-slate-500">
              Forms open the visitor&apos;s email app, so a submission means they reached a
              ready-to-send email. Check the inbox for the ones actually sent.
            </p>
          </Panel>

          <Panel title="Age & gender" note="Estimates from Google Analytics">
            <Demographics demo={demo} />
          </Panel>
        </div>
      </DashboardShell>
    </>
  );
}

function Demographics({ demo }: { demo: Awaited<ReturnType<typeof getDemographics>> }) {
  if (demo.status === "not-configured") {
    return (
      <div className="text-sm leading-relaxed text-slate-600">
        <p>
          Websites can&apos;t see a visitor&apos;s age directly. Google Analytics estimates age and
          gender for visitors signed in to Google; this panel shows those estimates once it&apos;s
          connected.
        </p>
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-xs text-slate-500">
          <li>
            Create a GA4 property and set <code>NEXT_PUBLIC_GA_ID</code>.
          </li>
          <li>Turn on Google Signals in GA (Admin → Data collection).</li>
          <li>
            Give a service account Viewer access, then set <code>GA_PROPERTY_ID</code>,{" "}
            <code>GA_CLIENT_EMAIL</code> and <code>GA_PRIVATE_KEY</code>.
          </li>
        </ol>
      </div>
    );
  }
  if (demo.status === "error") {
    return (
      <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
        Couldn&apos;t load Google Analytics data: {demo.message}
      </p>
    );
  }
  const none =
    "Google hides age and gender until enough signed-in visitors are counted for this range.";
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div>
        <p className="mb-3 text-xs font-medium text-slate-500">Age</p>
        <BarList rows={demo.age} unit="users" empty={none} />
      </div>
      <div>
        <p className="mb-3 text-xs font-medium text-slate-500">Gender</p>
        <BarList rows={demo.gender} unit="users" empty={none} />
      </div>
    </div>
  );
}
