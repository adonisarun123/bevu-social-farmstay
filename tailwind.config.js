/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Warm mud / earth palette inspired by the handcrafted brick house
        parchment: "#F3ECDF",
        cream: "#FAF5EA",
        forest: "#6B4226", // deep mud brown (primary)
        deepgreen: "#54331D", // darker mud for hovers
        sage: "#A98B6B",
        leaf: "#C9B28F", // warm sand accent
        gold: "#B98A3E",
        softgold: "#D8B570",
        terracotta: "#9C5B33", // brick terracotta
        rust: "#7E452A",
        ink: "#3E2F22",
      },
      fontFamily: {
        script: ["'Great Vibes'", "cursive"],
        display: ["'Cormorant Garamond'", "Georgia", "serif"],
        body: ["'EB Garamond'", "Georgia", "serif"],
      },
      backgroundImage: {
        "paper-texture":
          "radial-gradient(ellipse at top left, rgba(156,91,51,0.10), transparent 50%), radial-gradient(ellipse at bottom right, rgba(185,138,62,0.12), transparent 50%)",
      },
    },
  },
  plugins: [],
};
