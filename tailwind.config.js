/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        dusk: "#161e2e",
        dusk2: "#1f2a3e",
        night: "#0e141f",
        terra: "#c0673c",
        terradeep: "#9a4e2c",
        gold: "#e7b35e",
        goldsoft: "#f1cf93",
        cream: "#f6ecdc",
        creamdim: "#d8cbb6",
        sage: "#8a9466",
      },
      fontFamily: {
        serif: ["'Fraunces'", "Georgia", "serif"],
        smallcaps: ["'Marcellus'", "Georgia", "serif"],
        sans: ["'Outfit'", "system-ui", "sans-serif"],
      },
      borderColor: {
        line: "rgba(231,179,94,.32)",
      },
    },
  },
  plugins: [],
};
