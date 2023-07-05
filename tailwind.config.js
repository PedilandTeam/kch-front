module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        PinarLT: 'Pinar-LT',
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "rgb(157 23 77)",

          "secondary": "#f000b8",

          "accent": "#1dcdbc",

          "neutral": "#2b3440",

          "base-100": "#ffffff",

          "info": "#3abff8",

          "success": "#36d399",

          "warning": "#fbbd23",

          "error": "#f87272",
        },
      },
    ],
  },
  important: true,
  plugins: [require("daisyui")],
}