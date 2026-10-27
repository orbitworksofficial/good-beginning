"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Point = { label: string; visitors: number; pageviews: number };

// Validated pair (dataviz validator: CVD ΔE 23.7, normal-vision ΔE 32.1,
// both >= 3:1 on the white card). Visitors wear the brand coral.
const SERIES = [
  { key: "visitors", name: "Visitors", color: "#E2673C" },
  { key: "pageviews", name: "Page views", color: "#2a78d6" },
] as const;

const H = 280;
const M = { top: 16, right: 64, bottom: 30, left: 44 };
const compact = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 });

function niceStep(max: number) {
  const raw = max / 4;
  const pow = 10 ** Math.floor(Math.log10(raw));
  const n = raw / pow;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * pow;
}

/**
 * Visitors and page views over time on one shared count axis. Hovering (or
 * arrowing, once focused) snaps a crosshair to the nearest date and lists
 * both values; the table view carries the same numbers without hovering.
 */
export default function TrafficChart({ data }: { data: Point[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(720);
  const [active, setActive] = useState<number | null>(null);
  const [table, setTable] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(Math.max(280, e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [table]); // the chart element is re-created when leaving the table view

  const n = data.length;
  const innerW = width - M.left - M.right;
  const innerH = H - M.top - M.bottom;
  const peak = Math.max(0, ...data.flatMap((d) => [d.visitors, d.pageviews]));
  const step = peak <= 4 ? 1 : niceStep(peak);
  const maxY = Math.max(4 * step, step * Math.ceil(peak / step));
  const ticks = Array.from({ length: Math.round(maxY / step) + 1 }, (_, i) => i * step);

  const x = (i: number) => M.left + (n <= 1 ? innerW / 2 : (i * innerW) / (n - 1));
  const y = (v: number) => M.top + innerH - (v / maxY) * innerH;

  const paths = useMemo(() => {
    const line = (k: "visitors" | "pageviews") =>
      data.map((d, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(d[k]).toFixed(1)}`).join("");
    const v = line("visitors");
    const area = n > 1 ? `${v}L${x(n - 1)},${y(0)}L${x(0)},${y(0)}Z` : "";
    return { visitors: v, pageviews: line("pageviews"), area };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, width, maxY]);

  // Up to ~7 evenly spaced date labels, always including the last.
  const every = Math.max(1, Math.ceil(n / Math.max(2, Math.floor(innerW / 90))));
  const xLabels = data
    .map((d, i) => ({ i, label: d.label }))
    .filter(({ i }) => i % every === 0 || i === n - 1)
    .filter(({ i }, k, arr) => i === n - 1 || k === arr.length - 1 || arr[k + 1].i - i >= every * 0.6);

  // Direct labels at the line ends, nudged apart if they would collide.
  const last = data[n - 1];
  const ends = last
    ? SERIES.map((s) => ({ ...s, value: last[s.key], y: y(last[s.key]) })).sort((a, b) => a.y - b.y)
    : [];
  for (let k = 1; k < ends.length; k++) {
    if (ends[k].y - ends[k - 1].y < 15) ends[k].y = ends[k - 1].y + 15;
  }

  const pick = (clientX: number) => {
    const rect = wrap.current?.getBoundingClientRect();
    if (!rect || n === 0) return;
    const px = clientX - rect.left - M.left;
    setActive(n <= 1 ? 0 : Math.max(0, Math.min(n - 1, Math.round((px / innerW) * (n - 1)))));
  };

  const empty = peak === 0;
  const tip = active !== null ? data[active] : null;
  const tipLeft = active !== null ? x(active) : 0;
  const flip = tipLeft > width - 200;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <ul className="flex items-center gap-5 text-xs font-medium text-slate-600">
          {SERIES.map((s) => (
            <li key={s.key} className="flex items-center gap-2">
              <span aria-hidden="true" className="h-0.5 w-4 rounded-full" style={{ background: s.color }} />
              {s.name}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setTable((t) => !t)}
          className="text-xs font-medium text-slate-500 underline-offset-2 transition hover:text-coral hover:underline"
        >
          {table ? "Show chart" : "Show table"}
        </button>
      </div>

      {table ? (
        <div className="mt-4 max-h-[280px] overflow-auto rounded-lg border border-slate-200">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-slate-50 text-left text-xs text-slate-500">
              <tr>
                <th className="px-3 py-2 font-medium">Date</th>
                <th className="px-3 py-2 text-right font-medium">Visitors</th>
                <th className="px-3 py-2 text-right font-medium">Page views</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d) => (
                <tr key={d.label} className="border-t border-slate-100">
                  <td className="px-3 py-1.5 text-slate-600">{d.label}</td>
                  <td className="px-3 py-1.5 text-right tabular-nums text-navy">{d.visitors.toLocaleString()}</td>
                  <td className="px-3 py-1.5 text-right tabular-nums text-navy">{d.pageviews.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div
          ref={wrap}
          className="relative mt-4 touch-pan-y select-none outline-none focus-visible:rounded-lg focus-visible:ring-2 focus-visible:ring-coral"
          tabIndex={0}
          role="img"
          aria-label={`Visitors and page views by ${n} periods. Use arrow keys to read values, or open the table.`}
          onPointerMove={(e) => pick(e.clientX)}
          onPointerDown={(e) => pick(e.clientX)}
          onPointerLeave={() => setActive(null)}
          onBlur={() => setActive(null)}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") setActive((a) => Math.min(n - 1, (a ?? -1) + 1));
            if (e.key === "ArrowLeft") setActive((a) => Math.max(0, (a ?? n) - 1));
            if (e.key === "Escape") setActive(null);
          }}
        >
          <svg width={width} height={H} className="block overflow-visible">
            {/* Grid + y ticks */}
            {ticks.map((t) => (
              <g key={t}>
                <line x1={M.left} x2={width - M.right} y1={y(t)} y2={y(t)} stroke="#EBE3DD" strokeWidth={1} />
                <text x={M.left - 8} y={y(t)} dy="0.32em" textAnchor="end" className="fill-slate-500 text-[11px] tabular-nums">
                  {compact.format(t)}
                </text>
              </g>
            ))}
            {/* X labels */}
            {xLabels.map(({ i, label }) => (
              <text
                key={i}
                x={x(i)}
                y={H - 8}
                textAnchor={n > 1 && i === 0 ? "start" : i === n - 1 && n > 1 ? "end" : "middle"}
                className="fill-slate-500 text-[11px]"
              >
                {label.replace("Week of ", "")}
              </text>
            ))}

            {!empty ? (
              <>
                <path d={paths.area} fill="#E2673C" fillOpacity={0.1} />
                <path d={paths.pageviews} fill="none" stroke={SERIES[1].color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
                <path d={paths.visitors} fill="none" stroke={SERIES[0].color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
                {/* Single period (e.g. "Today"): a line needs two points, so show dots. */}
                {n === 1
                  ? SERIES.map((s) => (
                      <circle key={s.key} cx={x(0)} cy={y(data[0][s.key])} r={5} fill={s.color} stroke="#fff" strokeWidth={2} />
                    ))
                  : null}
                {ends.map((e) => (
                  <text key={e.key} x={x(n - 1) + 10} y={e.y} dy="0.32em" className="fill-navy text-[11px] font-semibold tabular-nums">
                    {e.value.toLocaleString()}
                  </text>
                ))}
              </>
            ) : null}

            {/* Crosshair */}
            {tip && active !== null ? (
              <g pointerEvents="none">
                <line x1={x(active)} x2={x(active)} y1={M.top} y2={M.top + innerH} stroke="#8A776D" strokeWidth={1} />
                {SERIES.map((s) => (
                  <circle key={s.key} cx={x(active)} cy={y(tip[s.key])} r={4.5} fill={s.color} stroke="#fff" strokeWidth={2} />
                ))}
              </g>
            ) : null}
          </svg>

          {empty ? (
            <p className="pointer-events-none absolute inset-0 grid place-items-center pb-6 text-sm text-slate-500">
              No visits recorded in this range yet.
            </p>
          ) : null}

          {tip && active !== null && !empty ? (
            <div
              role="status"
              className="pointer-events-none absolute top-2 z-10 min-w-[10rem] rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-card-hover"
              style={flip ? { right: width - tipLeft + 12 } : { left: tipLeft + 12 }}
            >
              <p className="text-xs text-slate-500">{tip.label}</p>
              {SERIES.map((s) => (
                <p key={s.key} className="mt-1 flex items-center gap-2 text-sm">
                  <span aria-hidden="true" className="h-0.5 w-3 rounded-full" style={{ background: s.color }} />
                  <span className="font-semibold tabular-nums text-navy">{tip[s.key].toLocaleString()}</span>
                  <span className="text-xs text-slate-500">{s.name.toLowerCase()}</span>
                </p>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
