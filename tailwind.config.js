/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./data/**/*.js"],
  theme: {
    extend: {
      colors: {
        brick: { DEFAULT: "#7A6140", dark: "#5A4630", light: "#9C825E" }, // logo brown
        terracotta: "#A9553A",
        clay: "#C8804F",
        cream: "#F7F1E6",
        sand: "#EADCC6",
        parchment: "#FBF8F2",
        ink: "#1E1A16",
        bark: "#3A2F27",
        forest: "#2E4A3A",
        moss: "#4F6A3D", // logo leaf green
        brass: { DEFAULT: "#C99A4B", light: "#E3C283" },
        stone: "#8A847B",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        body: ["Outfit", "system-ui", "sans-serif"],
      },
      maxWidth: { wrap: "80rem" },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(30,26,22,0.18)",
        card: "0 1px 2px rgba(30,26,22,0.06), 0 12px 32px -14px rgba(30,26,22,0.22)",
      },
      keyframes: {
        kenburns: { "0%": { transform: "scale(1.05)" }, "100%": { transform: "scale(1.15)" } },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
      },
      animation: {
        kenburns: "kenburns 18s ease-out forwards",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};
