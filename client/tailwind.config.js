/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dropdown-bg": "#000000", // Black background
        "dropdown-text": "#ffffff", // White text
        "dropdown-hover": "#333333", // Slightly lighter black for hover
        "scrollbar-thumb": "",
        "scrollbar-track": "#270B5D",
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
        "vietnam-pro": ["Vietnam Pro", "sans-serif"],
        funkrocker: ["Funkrocker", "sans-serif"],
        darkgraffiti : ["Dark Graffiti", "sans-serif"],
      },
      width: {
        '88': '22rem',
      },
      animation: {
        'wee1': 'wee1 2s linear infinite',
        'wee2': 'wee2 2s linear infinite 0.75s',
      },
      keyframes: {
        wee1: {
          '0%': { transform: 'translateX(-10em) rotate(0deg)' },
          '100%': { transform: 'translateX(7em) rotate(180deg)' },
        },
        wee2: {
          '0%': { transform: 'translateX(-8em) rotate(0deg)' },
          '100%': { transform: 'translateX(8em) rotate(180deg)' },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-thin": {
          "scrollbar-width": "thin",
        },
        ".scrollbar-thumb": {
          "scrollbar-color": "#ffbe5e #D1CCB6",
        },
        ".scrollbar-thumb:hover": {
          "scrollbar-color": "#270B5D #D1CCB6",
        },
        ".scrollbar-track": {
          "--tw-scrollbar-track": "#D1CCB6",
        },
        ".scrollbar-thumb-custom": {
          "--tw-scrollbar-thumb": "#ffbe5e",
          "border-radius": "10px",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
