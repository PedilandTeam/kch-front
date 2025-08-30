import daisyui from "daisyui";
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
      },
    },
  },
  daisyui: {
    themes: [],
    rtl: true,
  },
  important: true,
  plugins: [daisyui, animate],
};
