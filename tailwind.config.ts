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
        cream: {
          50: "#FCFAF6",
          100: "#F7F4EE",
          200: "#EFEAE1",
          300: "#E4DCD0",
        },
        charcoal: {
          900: "#1A1918",
          800: "#2B2927",
          700: "#44413E",
          600: "#5D5954",
          500: "#7A7570",
        },
        burgundy: {
          900: "#420F1C",
          800: "#571625",
          700: "#6F1C30", // Primary Accent
          600: "#8B233C",
          500: "#A82F4B",
          100: "#F5E6E9",
          50: "#FBF2F4",
        },
        sand: {
          100: "#F4F1EA",
          200: "#EAE5DB",
          300: "#DCD5C7",
          400: "#C9C0AF",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "'Times New Roman'", "serif"],
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        subtle: "0 2px 10px -2px rgba(26, 25, 24, 0.05), 0 1px 3px -1px rgba(26, 25, 24, 0.03)",
        card: "0 10px 25px -5px rgba(26, 25, 24, 0.06), 0 4px 10px -4px rgba(26, 25, 24, 0.04)",
        dropdown: "0 12px 30px -6px rgba(26, 25, 24, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
