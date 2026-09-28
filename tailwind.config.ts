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
        wine: "var(--color-wine)",
        "plum-deep": "var(--color-plum-deep)",
        "plum-night": "var(--color-plum-night)",
        gold: {
          DEFAULT: "var(--color-gold)",
          text: "var(--color-gold-text)",
        },
        "gold-text": "var(--color-gold-text)",
        badge: "var(--color-badge)",
        body: "var(--color-body)",
        muted: "var(--color-muted)",
        line: "var(--color-line)",
        divider: "var(--color-divider)",
        night: "var(--color-night)",
      },
      fontFamily: {
        serif: [
          "var(--font-serif)",
          "var(--font-playfair)",
          "DM Serif Display",
          "Playfair Display",
          "Georgia",
          "serif",
        ],
        playfair: [
          "var(--font-playfair)",
          "Playfair Display",
          "Georgia",
          "serif",
        ],
        cormorant: [
          "var(--font-cormorant)",
          "Cormorant Garamond",
          "Georgia",
          "serif",
        ],
        sans: [
          "var(--font-sans)",
          "var(--font-inter)",
          "Outfit",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
        inter: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        floating: "0 16px 40px rgba(43, 27, 27, 0.10)",
        "floating-lg": "0 20px 50px rgba(43, 27, 27, 0.12)",
        "sticky-bar": "0 12px 36px rgba(43, 27, 27, 0.22)",
        "mobile-stat": "0 10px 30px rgba(43, 27, 27, 0.08)",
        "price-dark": "0 20px 40px rgba(30, 10, 13, 0.22)",
        "price-dark-hover": "0 28px 52px rgba(30, 10, 13, 0.32)",
        "price-featured": "0 30px 60px rgba(142, 27, 37, 0.30)",
        "price-featured-hover": "0 38px 72px rgba(142, 27, 37, 0.42)",
        glass: "0 8px 30px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
