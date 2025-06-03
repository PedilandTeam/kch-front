export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./store/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./config/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{css}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          100: "#d2d8f2",
          300: "#a4b0e4",
          500: "#7788d6",
          700: "#4a61c9",
          900: "#1c39bb",
        },
        yellow: {
          100: "#f6eed9",
          300: "#efdcb1",
          500: "#e8cd8a",
          700: "#e0bb63",
          900: "#d8aa3b",
        },
      },
    },
  },
  plugins: [],
  important: true,
};
