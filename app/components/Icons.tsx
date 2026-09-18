type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function BookIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
      <path d="M9 7h7M9 11h5" />
    </svg>
  );
}

export function BasketIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m5 11 2-7M19 11l-2-7" />
      <path d="M3 11h18l-1.5 8.5A2 2 0 0 1 17.5 21h-11A2 2 0 0 1 4.5 19.5Z" />
      <path d="M10 15v2M14 15v2" />
    </svg>
  );
}

export function ShieldIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 2 4 5.5v6c0 5 3.4 9.3 8 10.5 4.6-1.2 8-5.5 8-10.5v-6Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function SunIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

export function CheckIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...base} strokeWidth={2.4} className={className}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

export function HeartIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 20.5s-7.5-4.6-7.5-9.7A4.3 4.3 0 0 1 12 8a4.3 4.3 0 0 1 7.5 2.8c0 5.1-7.5 9.7-7.5 9.7Z" />
    </svg>
  );
}

export function StarIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.5l6.1-.9Z" />
    </svg>
  );
}

export function ArrowIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...base} strokeWidth={2.2} className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export const iconMap = {
  book: BookIcon,
  basket: BasketIcon,
  shield: ShieldIcon,
  sun: SunIcon,
} as const;
