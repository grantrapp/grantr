const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DINOT", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#EAA11B",
      },
    },
  },
  plugins: [],
};
