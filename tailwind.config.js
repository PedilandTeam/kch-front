import animate from "tailwindcss-animate"
import daisyui from "daisyui"

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
        anjoman: ["var(--font-anjoman)", "Anjoman", "sans-serif"],
      },
      screens: {
        xs: "475px",
      },
    },
  },
  daisyui: {
    themes: ["cupcake"],
    rtl: true,
    logs: false,
  },
  plugins: [animate, daisyui],
}
