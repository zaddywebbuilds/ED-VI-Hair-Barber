/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'carbon': '#090909',
        'charcoal': '#161514',
        'walnut': '#2B211B',
        'burgundy': '#681F2B',
        'cream': '#F1E8D8',
        'paper': '#D9CBB8',
        'brass': '#B58A4A',
        'copper': '#9A5B38',
        'steel': '#858585',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        condensed: ['Barlow Condensed', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
