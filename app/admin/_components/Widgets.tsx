import type { Row } from "@/app/lib/server/analytics";

/** A white dashboard panel with a title and optional note. */
export function Panel({
  title,
  note,
  children,
  className = "",
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`card p-5 sm:p-6 ${className}`}>
      <h2 className="text-sm font-semibold text-navy">{title}</h2>
      {note ? <p className="mt-0.5 text-xs text-slate-500">{note}</p> : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}

/** Headline number with its change against the previous period. */
export function StatTile({
  label,
  value,
  previous,
  hint,
}: {
  label: string;
  value: number;
  previous?: number;
  hint?: string;
}) {
  let change: React.ReactNode = null;
  if (previous !== undefined) {
    if (previous === 0) {
      change = <span className="text-slate-500">{value > 0 ? "New this period" : "No change"}</span>;
    } else {
      const pct = Math.round(((value - previous) / previous) * 100);
      const up = pct > 0;
      change =
        pct === 0 ? (
          <span className="text-slate-500">Same as before</span>
        ) : (
          <span className={up ? "text-emerald-700" : "text-red-700"}>
            <span aria-hidden="true">{up ? "▲" : "▼"}</span> {Math.abs(pct)}%{" "}
            <span className="text-slate-500">vs previous period</span>
          </span>
        );
    }
  }
  return (
    <div className="card p-5">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold tabular-nums text-navy">{value.toLocaleString()}</p>
      <p className="mt-1.5 text-xs">{change ?? <span className="text-slate-500">{hint}</span>}</p>
    </div>
  );
}

/**
 * Ranked horizontal bars: label and value on one line, a thin bar beneath
 * scaled to the top row. One hue (it's magnitude, not identity), value at
 * the bar's end in text ink.
 */
export function BarList({
  rows,
  unit,
  empty = "No data for this range yet.",
}: {
  rows: Row[];
  unit: string;
  empty?: string;
}) {
  if (rows.length === 0 || rows.every((r) => r.value === 0)) {
    return <p className="py-6 text-center text-sm text-slate-500">{empty}</p>;
  }
  const max = Math.max(...rows.map((r) => r.value));
  const total = rows.reduce((s, r) => s + r.value, 0);
  return (
    <ul className="space-y-3">
      {rows.map((r) => (
        <li
          key={r.label}
          className="group rounded-md"
          title={`${r.label}: ${r.value.toLocaleString()} ${unit}${r.sub ? ` · ${r.sub}` : ""}`}
        >
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <span className="truncate text-slate-700 group-hover:text-navy">
              {r.label}
              {r.sub ? <span className="ml-2 text-xs text-slate-500">{r.sub}</span> : null}
            </span>
            <span className="shrink-0 tabular-nums font-semibold text-navy">
              {r.value.toLocaleString()}
              <span className="ml-1.5 w-9 text-xs font-normal text-slate-500">
                {Math.round((r.value / total) * 100)}%
              </span>
            </span>
          </div>
          <div className="mt-1.5 h-2 rounded-r bg-slate-100">
            <div
              className="h-2 rounded-r bg-coral transition-[filter] group-hover:brightness-110"
              style={{ width: `${Math.max(2, (r.value / max) * 100)}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
