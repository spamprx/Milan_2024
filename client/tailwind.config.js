/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dropdown-bg": "#000000", // Black background
        "dropdown-text": "#ffffff", // White text
        "dropdown-hover": "#333333", // Slightly lighter black for hover
      },
      fontFamily: {
        "vietnam-thin": [
          "Be_Vietnam_Pro-Thin",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        "vietnam-regular": [
          "Be_Vietnam_Pro-Regular",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
};
