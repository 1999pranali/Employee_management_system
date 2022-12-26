/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors:{
      veloceblue:'#0ea5e9',
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
