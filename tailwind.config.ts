import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Brand palette recovered from the original Elementor kit,
        // saturated up so it reads like the painted blocks in the logo.
        ink: "#2A2140",
        navy: "#303650",
        berry: "#7B2FF2",
        tomato: "#EE3524",
        sunshine: "#F9D616",
        bubblegum: "#F08FC8",
        jade: "#4FB59B",
        periwinkle: {
          DEFAULT: "#9AACE3",
          light: "#BFCBEE",
          dark: "#7186CE",
        },
        coral: {
          DEFAULT: "#EC965D",
          light: "#F5BC93",
          dark: "#D97A3C",
        },
        cream: "#FBF3EC",
        sand: "#F4E4D6",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Tighter leading on display sizes so big headings stack like blocks.
        "display-sm": ["2.25rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-md": ["3.25rem", { lineHeight: "1.02", letterSpacing: "-0.025em" }],
        "display-lg": ["4.5rem", { lineHeight: "0.98", letterSpacing: "-0.03em" }],
      },
      borderRadius: {
        block: "1.25rem",
        "block-lg": "2rem",
      },
      boxShadow: {
        // Hard, offset shadows — the signature of the block system.
        block: "0 6px 0 0 rgba(42,33,64,0.18)",
        "block-lg": "0 10px 0 0 rgba(42,33,64,0.16)",
        "block-press": "0 2px 0 0 rgba(42,33,64,0.2)",
        pop: "8px 8px 0 0 #2A2140",
        "pop-sm": "5px 5px 0 0 #2A2140",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "fade-up": "fade-up 0.7s ease-out both",
        wiggle: "wiggle 3.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
