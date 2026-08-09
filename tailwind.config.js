/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        condensed: ['Oswald', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        gold: '#1D4E89',
        'gold-light': '#4C7FC2',
        navy: '#0B2242',
        'navy-light': '#173A63',
        silver: '#9CA3AF',
        'silver-light': '#D3D7DC',
      },
      boxShadow: {
        glow: '0 0 25px rgba(29, 78, 137, 0.25)',
      },
    },
  },
  plugins: [],
};
