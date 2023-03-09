/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    screens: {
      ph: { max: "768px" },
      // 'sm': '640px',
      // // => @media (min-width: 640px) { ... }

      // 'md': '768px',
      // // => @media (min-width: 768px) { ... }

      // 'lg': '1024px',
      // // => @media (min-width: 1024px) { ... }

      // 'xl': '1280px',
      // // => @media (min-width: 1280px) { ... }

      // '2xl': '1536px',
      // // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        primary: "rgba(17, 164, 175, 1)",
        secondary: "rgba(217, 79, 20, 1)",
      },
      backgroundImage: {
        searchBarBackground: "url('/src/assets/searchBg.png')",
      },
      fontFamily: {
        trsFontFace: ["trsFontFace"],
      },
      keyframes: {
        "slide-down": {
          from: {
            transform: "translateY(-2rem)",
          },
          to: {
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "slide-down": "slide-down 300ms ease-in-out both",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
