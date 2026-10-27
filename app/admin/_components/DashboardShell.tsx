"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type Props = {
  presets: readonly { key: string; label: string }[];
  preset: string;
  from: string;
  to: string;
  granularity: string;
  today: string;
  exportHref: string;
  children: React.ReactNode;
};

const GRANULARITIES = [
  { key: "day", label: "Daily" },
  { key: "week", label: "Weekly" },
  { key: "month", label: "Monthly" },
];

/**
 * The filter row (date range + daily/weekly/monthly) that scopes every
 * number below it. Filters live in the URL, so a view can be bookmarked.
 * While the server renders the new range, the current charts stay put at
 * reduced opacity instead of flashing.
 */
export default function DashboardShell(props: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [showCustom, setShowCustom] = useState(props.preset === "custom");
  const [from, setFrom] = useState(props.from);
  const [to, setTo] = useState(props.to);

  const go = (params: Record<string, string>) => {
    const q = new URLSearchParams(params);
    startTransition(() => router.push(`/admin?${q.toString()}`, { scroll: false }));
  };

  // A preset picks its own granularity unless one was chosen explicitly.
  const pick = (key: string) => {
    setShowCustom(false);
    go({ range: key });
  };

  const base: Record<string, string> =
    props.preset === "custom"
      ? { range: "custom", from: props.from, to: props.to }
      : { range: props.preset };

  return (
    <>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="-mx-4 overflow-x-auto px-4 pb-1 lg:mx-0 lg:px-0 lg:pb-0">
          <div
            role="group"
            aria-label="Date range"
            className="inline-flex gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-card"
          >
            {props.presets.map((p) => (
              <Chip key={p.key} active={props.preset === p.key && !showCustom} onClick={() => pick(p.key)}>
                {p.label}
              </Chip>
            ))}
            <Chip active={showCustom} onClick={() => setShowCustom(true)}>
              Custom
            </Chip>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div
            role="group"
            aria-label="Group by"
            className="inline-flex gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-card"
          >
            {GRANULARITIES.map((g) => (
              <Chip
                key={g.key}
                active={props.granularity === g.key}
                onClick={() => go({ ...base, by: g.key })}
              >
                {g.label}
              </Chip>
            ))}
          </div>
          <a
            href={props.exportHref}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-navy shadow-card transition hover:border-coral hover:text-coral"
          >
            Export CSV
          </a>
        </div>
      </div>

      {showCustom ? (
        <form
          className="mt-3 flex flex-wrap items-end gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-card"
          onSubmit={(e) => {
            e.preventDefault();
            go({ range: "custom", from, to });
          }}
        >
          <label className="text-xs font-medium text-slate-600">
            From
            <input
              type="date"
              value={from}
              max={to || props.today}
              onChange={(e) => setFrom(e.target.value)}
              required
              className="field mt-1 !py-2"
            />
          </label>
          <label className="text-xs font-medium text-slate-600">
            To
            <input
              type="date"
              value={to}
              min={from}
              max={props.today}
              onChange={(e) => setTo(e.target.value)}
              required
              className="field mt-1 !py-2"
            />
          </label>
          <button type="submit" className="btn-primary !py-2.5">
            Apply
          </button>
        </form>
      ) : null}

      <div
        aria-busy={pending}
        className={`mt-6 transition-opacity duration-200 ${pending ? "pointer-events-none opacity-50" : ""}`}
      >
        {props.children}
      </div>
    </>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-coral ${
        active ? "bg-navy text-white" : "text-slate-600 hover:bg-slate-100 hover:text-navy"
      }`}
    >
      {children}
    </button>
  );
}
