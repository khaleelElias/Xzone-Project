/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ["Poppins", "sans-serif"],
        Book: "Book",
        Modern: "Modern",
        Seg: "Seg",
        ProLight: "ProLight",
        ProLightOblique: "ProLightOblique",
        ProOblique: "ProOblique",
        ProMedOblique: "ProMedOblique",
        ProBlackOblique: "ProBlackOblique",
        HeavyOblique: "HeavyOblique",
        Heavy: "Heavy",
      },

      colors: {
        transparent: "transparent",
        blueish: "#3ab7bf",
        pinkish: "#E18BF1",
        btncol: "#FF96FF",
        btncol2: "#95B2FF",
      },
    },
  },
  plugins: [],
};
