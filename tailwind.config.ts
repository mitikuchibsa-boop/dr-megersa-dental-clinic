import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        mist: {
          50: "#FAFCFC",
          100: "#F4F7F6",
          200: "#E9F0EE",
          300: "#DCE5E3",
          400: "#C4D4D1",
        },
        slate: {
          900: "#1A2F3B", // Primary text: Deep Slate Blue
          800: "#223E4D",
          700: "#2F5062",
          600: "#44677A",
          500: "#608295",
          400: "#86A3B4",
          300: "#B4C8D4",
          200: "#DCE7ED",
          100: "#EDF4F7",
        },
        mint: {
          50: "#F2FAF7",
          100: "#E5F7F0",
          200: "#C9EFE0",
          300: "#A8E6CF", // Primary Mint Accent
          400: "#7FD9B8",
          500: "#4EC49D",
          600: "#2DA880",
          700: "#1D8765",
        },
        cyan: {
          50: "#F4FCFD",
          100: "#E0F7FA", // Ethereal Ice Cyan
          200: "#B2EBF2",
          300: "#80DEEA",
          400: "#26C6DA",
          500: "#00BCD4", // Vibrant Cyan
          600: "#00ACC1",
          700: "#0097A7",
          800: "#00838F",
          900: "#006064",
        },
        teal: {
          500: "#0D9488",
          600: "#0F766E",
        },
      },
      fontFamily: {
        serif: ["'Plus Jakarta Sans'", "Georgia", "Cambria", "serif"],
        sans: [
          "'Plus Jakarta Sans'",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(26, 47, 59, 0.06)",
        "glass-hover": "0 14px 40px -4px rgba(26, 47, 59, 0.12), 0 0 20px 2px rgba(168, 230, 207, 0.25)",
        floating: "0 20px 50px -10px rgba(26, 47, 59, 0.1), 0 10px 20px -5px rgba(0, 188, 212, 0.08)",
        subtle: "0 2px 12px -2px rgba(26, 47, 59, 0.04), 0 1px 4px -1px rgba(26, 47, 59, 0.02)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 7s ease-in-out 2s infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        "shimmer": "shimmer 2.5s infinite linear",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
