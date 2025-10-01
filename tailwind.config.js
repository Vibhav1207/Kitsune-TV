/** @type {import('tailwindcss').Config} */

const colors = {
  primary: "#8b5cf6",
  background: "#242428",
  lightbg: "#2f2f33",
  card: "#2f2f33",
  btnbg: "#3a3a3e",
  yellow: "#F9ED69",
  purple: "#8b5cf6",
  pink: "#F2BED1",
  lighttext: "#ccc",
};
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: colors,
    },
  },
  plugins: [],
};
