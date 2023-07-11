/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,svelte}",
  ],
  theme: {
    extend: {
      fontFamily: { LineSeed : ['LineSeed', 'sans-serif'] }, },
  },
  darkMode: [
    'class',
    '[data-mode="dark"]'
  ],
  plugins: [],
}

