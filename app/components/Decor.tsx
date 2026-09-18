/**
 * Decorative motifs lifted straight from the logo: the rainbow arc and the
 * stacked toy blocks. All are `aria-hidden` — they carry no meaning.
 */

const ARC_COLORS = ["#7B2FF2", "#EE3524", "#4FB59B"];

/** Concentric rainbow arc, as in the logo's left side. */
export function RainbowArc({
  className = "",
  strokeWidth = 14,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 200 110"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {ARC_COLORS.map((c, i) => (
        <path
          key={c}
          d={`M ${18 + i * 22} 108 A ${82 - i * 22} ${82 - i * 22} 0 0 1 ${182 - i * 22} 108`}
          stroke={c}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

/** A small stack of blocks, echoing the logo's tower. */
export function BlockStack({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <g stroke="#2A2140" strokeWidth="4" strokeLinejoin="round">
        <rect x="14" y="74" width="92" height="32" rx="6" fill="#EE3524" />
        <rect x="26" y="44" width="34" height="30" rx="6" fill="#7B2FF2" />
        <rect x="60" y="44" width="34" height="30" rx="6" fill="#4FB59B" />
        <rect x="30" y="14" width="60" height="30" rx="6" fill="#F08FC8" />
        <rect x="48" y="82" width="24" height="24" rx="5" fill="#F08FC8" />
      </g>
    </svg>
  );
}

/** Three chunky dots, used as a section divider. */
export function BlockDots({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center gap-2.5 ${className}`}
    >
      {["bg-tomato", "bg-sunshine", "bg-jade"].map((c) => (
        <span
          key={c}
          className={`h-3.5 w-3.5 rounded-[4px] border-[3px] border-ink ${c}`}
        />
      ))}
    </div>
  );
}

/** A wavy hand-drawn underline for emphasised words. */
export function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 14"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2 9c18-8 34 4 52-1s34-7 52-1 34 8 52 2 38-4 40-3"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Zig-zag strip used to separate coloured sections. */
export function ZigZag({
  className = "",
  color = "#FBF3EC",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 12"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
    >
      <path d="M0 12 L15 2 L30 12 L45 2 L60 12 L75 2 L90 12 L105 2 L120 12 V14 H0 Z" fill={color} />
    </svg>
  );
}
