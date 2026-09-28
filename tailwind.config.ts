import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "var(--color-cream)",
        sand: "var(--color-sand)",
        white: "var(--color-white)",
        ink: "var(--color-ink)",
        maroon: {
          DEFAULT: "var(--color-maroon)",
          dark: "var(--color-maroon-dark)",
        },
        "maroon-dark": "var(--color-maroon-dark)",
        gold: {
          DEFAULT: "var(--color-gold)",
          text: "var(--color-gold-text)",
        },
        "gold-text": "var(--color-gold-text)",
        body: "var(--color-body)",
        muted: "var(--color-muted)",
        line: "var(--color-line)",
        divider: "var(--color-divider)",
        night: "var(--color-night)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "DM Serif Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Outfit", "system-ui", "sans-serif"],
      },
      boxShadow: {
        floating: "0 16px 40px rgba(43, 27, 27, 0.10)",
        "floating-lg": "0 20px 50px rgba(43, 27, 27, 0.12)",
        "sticky-bar": "0 12px 36px rgba(43, 27, 27, 0.22)",
        "mobile-stat": "0 10px 30px rgba(43, 27, 27, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
