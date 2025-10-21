/** @type {import('tailwindcss').Config} */
import scrollbarHide from "tailwind-scrollbar-hide";
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [scrollbarHide],
};
