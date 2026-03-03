/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bone: '#F9F7F2',
        'deep-forest': '#1B2621',
        oak: '#A68966',
        'soft-grey': '#E5E5E5',
        'warm-white': '#FFFFFF',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      aspectRatio: {
        '4/5': '4 / 5',
        '16/9': '16 / 9',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
    },
  },
  plugins: [],
};
