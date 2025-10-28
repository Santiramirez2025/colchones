/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f7fa',
          100: '#eaeef4',
          200: '#d0dbe7',
          300: '#a8bdd3',
          400: '#7a9aba',
          500: '#597ba3',
          600: '#456289',
          700: '#384f70',
          800: '#30435e',
          900: '#2b3a4f',
        },
        warm: {
          50: '#faf9f7',
          100: '#f5f3ef',
          200: '#e8e4dc',
          300: '#d6cfc3',
          400: '#c0b5a4',
          500: '#a89a84',
          600: '#8f7e6a',
          700: '#766858',
          800: '#61574b',
          900: '#524a40',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
