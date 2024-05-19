/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        one: "#8ecae6",
        two: "#219ebc",
        three: "#023047",
        four: "#ffb703",
        five: "#fb8500",
      },
    },
  },
  plugins: [],
};
