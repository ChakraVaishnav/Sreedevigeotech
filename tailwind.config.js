/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        condensed: ['Barlow Condensed', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      colors: {
        gold: '#1F6F78',
        'gold-light': '#4C9AA3',
        navy: '#1B2333',
        'navy-light': '#2A3546',
      },
      boxShadow: {
        glow: '0 0 25px rgba(31, 111, 120, 0.25)',
      },
    },
  },
  plugins: [],
};
