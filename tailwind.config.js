import animate from "tailwindcss-animate";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/providers/**/*.{js,ts,jsx,tsx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        roboto: ["var(--font-roboto)", "Roboto", "sans-serif"],
        vazirmatn: ["var(--font-vazirmatn)", "Vazirmatn", "sans-serif"],
      },
      screens: {
        xs: "475px",
      },
    },
  },

  plugins: [animate],
};
