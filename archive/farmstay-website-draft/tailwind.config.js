/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: "#1F3D2B",
        olive: "#6F7D4E",
        beige: "#F4EBDD",
        clay: "#A46A3F",
        terracotta: "#B5552D",
        laterite: "#8C4A2F",
        sand: "#E8D8BF",
        charcoal: "#222222",
        offwhite: "#FAF7F1",
        amber: "#E8A84C",
      },
      fontFamily: {
        heading: ["'Playfair Display'", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
};
