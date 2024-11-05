/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  purge: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      colors: {
        primary: '#8ac649',
        secondary: '#3f444b',
        'green': 
        {
            400: '#4ade80',
            500: '#22c55e',
            700: '#15803d'
        }
      },
      screens: {
        'custom': '1440px',
      },
      fontFamily: {
          'glimser': ['Glimser', 'sans-serif'],
      },
      height: {
        '60': '240px',
      },
      width: {
          '125': '500px',
      },
    },
  },
  plugins: [],
}

