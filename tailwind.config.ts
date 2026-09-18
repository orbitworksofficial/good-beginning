import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Muted, professional palette derived from the original brand colors.
        // Warm-toned neutrals so headings sit comfortably on peach.
        navy: {
          DEFAULT: "#3D2B24",
          dark: "#2A1D18",
          light: "#6B564C",
        },
        // Warm peach + coral, echoing the orange/red blocks in the logo.
        coral: {
          DEFAULT: "#E2673C",
          dark: "#C4512B",
          mid: "#EE8256",
          light: "#FDE8DC",
          tint: "#FFF4EE",
        },
        cocoa: {
          DEFAULT: "#3D2B24",
          light: "#6B564C",
        },
        slate: {
          50: "#FAF7F5",
          100: "#F5F0EC",
          200: "#EBE3DD",
          300: "#D9CDC4",
          500: "#8A776D",
          600: "#6B564C",
          700: "#4A382F",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "h1": ["2.5rem", { lineHeight: "1.18", letterSpacing: "-0.02em" }],
        "h1-lg": ["3.25rem", { lineHeight: "1.12", letterSpacing: "-0.022em" }],
        "h2": ["1.875rem", { lineHeight: "1.25", letterSpacing: "-0.015em" }],
        "h2-lg": ["2.25rem", { lineHeight: "1.22", letterSpacing: "-0.018em" }],
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,0.04), 0 4px 12px rgba(16,24,40,0.06)",
        "card-hover": "0 2px 4px rgba(16,24,40,0.05), 0 12px 28px rgba(16,24,40,0.10)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
} satisfies Config;
