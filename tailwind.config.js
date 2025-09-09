/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'mb': '300px'
      },
      transitionDuration: {
        '2000': '2000ms',
      },
      fontFamily: {
        "source-sans": ["Source Sans 3", "sans-serif"],
        "monsterrat": ["Monsterrat", "sans-serif"],
      },
      colors: {
        'neutralSilver': "#F5F7FA",
        'neutralDGrey': "#4D4D4D",
        'brandPrimary': "#DC143C",
        'neutralGrey': "#717171",
        'gray900': "#717171",
      }
    },
  },
  plugins: [],
}
