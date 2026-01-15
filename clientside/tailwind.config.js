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
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "scroll-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
