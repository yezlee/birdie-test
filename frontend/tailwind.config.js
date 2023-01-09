/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        birdie_dark_blue: "#00264d",
        birdie_light_dark_blue: "#05315d",
        birdie_light_blue: "#54c5c1",
      },
    },
  },
  plugins: [],
};
