/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./contact.html",
    "./privacy-policy.html",
    "./about-website.html",
    "./directory/**/*.html",
    "./info/**/*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff9eb',
          100: '#ffefc6',
          200: '#ffd98a',
          300: '#ffbc4e',
          400: '#ffa122',
          500: '#f97e07',
          600: '#dd5d02',
          700: '#b74306',
          800: '#94340b',
          900: '#7a2c0d',
          950: '#461402',
        },
        secondary: {
          50: '#f2fcf3',
          100: '#e1f9e5',
          200: '#c5f2ce',
          300: '#96e4a8',
          400: '#5ecd7a',
          500: '#3aaa55',
          600: '#2b8a41',
          700: '#266d37',
          800: '#235730',
          900: '#1f482a',
          950: '#0d2814',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
