"use client";

import { useId, useState } from "react";

/** Switches between pre-rendered panels (e.g. Countries / States / Cities). */
export default function Tabs({ tabs }: { tabs: { label: string; content: React.ReactNode }[] }) {
  const [i, setI] = useState(0);
  const id = useId();
  return (
    <div>
      <div role="tablist" className="mb-4 inline-flex gap-1 rounded-lg bg-slate-100 p-1">
        {tabs.map((t, k) => (
          <button
            key={t.label}
            id={`${id}-tab-${k}`}
            role="tab"
            type="button"
            aria-selected={i === k}
            aria-controls={`${id}-panel`}
            onClick={() => setI(k)}
            className={`rounded-md px-3 py-1 text-xs font-medium transition ${
              i === k ? "bg-white text-navy shadow-sm" : "text-slate-600 hover:text-navy"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${i}`}>
        {tabs[i].content}
      </div>
    </div>
  );
}
