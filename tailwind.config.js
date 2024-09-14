/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  purge: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        'loop-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        }
      } 
    },
    colors: {
      'blue-500': '#3B82F6',
      'pink-500': '#EC4899',
      'gray-800': '#1F2937',
    },
  },
  plugins: [],
}

