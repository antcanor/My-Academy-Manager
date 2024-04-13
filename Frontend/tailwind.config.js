/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./*.html",
    "./assets/**/*.js"
  ],
  theme: {
    screens: {
      sm: "540px",
      md: "720px",
      lg: "960px",
      xl: "1140px",
      "2xl": "1320px"
    },
    container: {
      center: true,
      padding: "16px"
    },
    extend: {
      colors: {
        'custom-gray': '#F1EFE7',
        'custom-green': '#A6BDA9',
        'custom-darkgreen': '#4d6e51',
        black: "#212b36",
        dark: "#090E34",
        "dark-700": "#090e34b3",
        primary: "#4d6e51",
        secondary: "#13C296",
        "body-color": "#637381",
        warning: "#FBBF24",
      },
      boxShadow: {
        input: "0px 7px 20px rgba(0, 0, 0, 0.03)",
        pricing: "0px 39px 23px -27px rgba(0, 0, 0, 0.04)",
        "switch-1": "0px 0px 5px rgba(0, 0, 0, 0.15)",
        testimonial: "0px 60px 120px -20px #EBEFFD",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

