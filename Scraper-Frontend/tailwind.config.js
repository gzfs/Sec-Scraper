/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Unbounded: "Unbounded",
        Outfit: "Outfit",
        Oswald: "Oswald"
      }
    },
  },
  plugins: [],
}