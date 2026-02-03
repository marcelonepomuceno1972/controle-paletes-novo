/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        oba: {
          green: "#2E7D32",
          orange: "#F57C00",
        },
      },
    },
  },
  plugins: [],
};
