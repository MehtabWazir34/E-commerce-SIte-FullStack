/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {

      fontFamily: {
        display: ["Archivo Black", "Anton", "Oswald", "sans-serif"],
        body: ["Inter", "Public Sans", "system-ui", "sans-serif"],
      },
      animation: {
        scroll: "scroll 30s linear infinite",
        "scroll-reverse": "scroll-reverse 30s linear infinite",
        wave: "wave 1.5s linear infinite",
        spinWave: "spinWave 1s linear infinite",
        spinWaveReverse: "spinWaveReverse 1.4s linear infinite",
        slideInLeft: "slideInLeft 150ms ease-out forwards",
        underlineRight: "underlineRight 200ms ease-out forwards",
        checkTick: "checkTick 300ms ease-out forwards",
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
        slideInLeft: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        underlineRight: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        checkTick: {
          "0%": { transform: "scale(0) rotate(-45deg)", opacity: "0" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
        },
      },
      clipPath: {
        "diagonal-12": "polygon(0 0, 100% 0, 100% calc(100% - 2%), 0 100%)",
        "diagonal-12-inv": "polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 2%))",
      },
      borderRadius: {
        card: "20px",
      },
      boxShadow: {
        card: "0 2px 12px rgba(0,0,0,0.08)",
        "card-hover": "0 8px 24px rgba(0,0,0,0.12)",
      },
      fontSize: {
        'btn-sm': ['13px', '1.2'],
      },
      spacing: {
        'btn-x': '20px',
        'btn-y': '10px',
      },
    },
  },
  plugins: [],
};
