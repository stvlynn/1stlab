/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'firstlab-orange': '#FF6934',
      },
      borderRadius: {
        '32': '32px',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}