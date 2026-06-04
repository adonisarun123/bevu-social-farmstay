/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Palette drawn from the reference invite artwork
        parchment: "#F6F1E4",
        cream: "#FBF8EF",
        forest: "#2E5234",
        deepgreen: "#1F3D2B",
        sage: "#8FA876",
        leaf: "#A8BC8F",
        gold: "#B98A3E",
        softgold: "#D8B570",
        terracotta: "#A5673F",
        rust: "#8C4A2F",
        ink: "#3D3327",
      },
      fontFamily: {
        script: ["'Great Vibes'", "cursive"],
        display: ["'Cormorant Garamond'", "Georgia", "serif"],
        body: ["'EB Garamond'", "Georgia", "serif"],
      },
      backgroundImage: {
        "paper-texture":
          "radial-gradient(ellipse at top left, rgba(168,188,143,0.12), transparent 50%), radial-gradient(ellipse at bottom right, rgba(185,138,62,0.10), transparent 50%)",
      },
    },
  },
  plugins: [],
};
