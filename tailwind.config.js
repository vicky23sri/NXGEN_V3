/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  purge: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      colors: {
        primary: '#FC7632',
        secondary: '#3f444b',
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

