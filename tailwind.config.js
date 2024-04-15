/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ["Poppins", "sans-serif"],
      },

      colors: {
        transparent: "transparent",
        blueish: "#3ab7bf",
        pinkish: "#E18BF1",
      },
    },
  },
  plugins: [],
};
