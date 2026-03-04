/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-purple': '#913FE2',
        'readtoon-bg': '#0F0F0F',
      },
    },
  },
  plugins: [],
}