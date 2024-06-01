/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderWidth: {
        '0.2':'0.2px',
        1: "1px",
        1.5: "1.5px",
        2: "2px",
      }
    },
  },

  plugins: [],
};
