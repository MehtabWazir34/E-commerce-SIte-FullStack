/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'btnClr': '#FFE2AF',
        'surface-primary-hover': '#F2D39A',
      },
    },
  },
  plugins: [],
}
