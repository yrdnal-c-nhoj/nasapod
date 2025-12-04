/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Alberta', 'sans-serif'],
        head: ['Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
