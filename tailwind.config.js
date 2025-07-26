/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: '#ff007f',
          cyan: '#00f0ff',
          blue: '#2563eb', // Tailwind blue-600
          dark: '#0f0f0f',
          darker: '#1a1a1a',
          darkest: '#242424',
          purple: '#a78bfa', // Tailwind purple-400
          white: '#ffffff',
        },
      },
      dropShadow: {
        glow: '0 0 30px rgba(255, 255, 255, 0.2)',
      },
      gradientColorStops: theme => ({
        ...theme('colors'),
        'brand-gradient-from': '#ff007f',
        'brand-gradient-to': '#00f0ff',
      }),
    },
    plugins: [
      require('tailwindcss'),
      require('autoprefixer'),
    ],
  },
}
