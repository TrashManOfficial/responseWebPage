/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      keyframes: {
        'slide-down': {
          'from': {
            transform: 'translateY(-2rem)',
          },
          'to': {
            transform: 'translateY(0)',
          },
        }
      },
      animation: {
        'slide-down': 'slide-down 300ms ease-in-out both'
      }
    },
  },
  plugins: [
    require('tw-elements/dist/plugin'),
  ],
}
