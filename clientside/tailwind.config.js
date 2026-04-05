/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        btnClr: "#FFE2AF",
        surfaceHover: "#F2D39A",
        darkSurface: "#2c3639",
      },
      animation: {
  scroll: "scroll 30s linear infinite",
  "scroll-reverse": "scroll-reverse 30s linear infinite",
  wave: "wave 1.5s linear infinite",
  spinWave: "spinWave 1s linear infinite",
  spinWaveReverse: "spinWaveReverse 1.4s linear infinite",
},
keyframes: {
  spinWave: {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
  spinWaveReverse: {
    "0%": { transform: "rotate(360deg)" },
    "100%": { transform: "rotate(0deg)" },
  },
  scroll: {
    "0%": { transform: "translateX(0)" },
    "100%": { transform: "translateX(-50%)" },
  },
  "scroll-reverse": {
    "0%": { transform: "translateX(-50%)" },
    "100%": { transform: "translateX(0)" },
  },
  wave: {
    "0%": { transform: "translateX(-100%)" },
    "100%": { transform: "translateX(100%)" },
  },
},
    },
  },
  plugins: [],
};
