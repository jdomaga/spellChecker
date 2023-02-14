/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-red-500',
    'border-red-200',
    'border-green-200',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}