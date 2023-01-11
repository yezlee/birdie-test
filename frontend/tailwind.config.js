/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        birdie_dark_blue: "#00264d",
        birdie_light_dark_blue: "#05315d",
        birdie_light_dark_blue_shadow: "#98b0c7",
        birdie_light_blue: "#54c5c1",
        birdie_skyblue: "#66d3fb",
        birdie_melon: "#54c3bf",
        birdie_melon_shadow: "#b4dedd",
        birdie_melon_light: "#c1eceb",
        birdie_red_orange: "#ff4f4e",
        birdie_purple: "#8c51e3",
        birdie_yellow: "#f1a92b",
        birdie_super_light_blue: "#aee2ee",
      },
    },
  },
  plugins: [],
  mode: "jit",
};
