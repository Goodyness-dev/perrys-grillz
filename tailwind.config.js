/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2c',
        },
        ocean: {
          dark: '#0a2e2a',
          slate: '#0f2922',
        },
        sand: '#fafaf9',
      },
      fontFamily: {
        serif: ['"Bodoni Moda"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cinzel Decorative"', '"Bodoni Moda"', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'thick': '0 20px 45px -12px rgba(13, 148, 136, 0.14), 0 8px 18px -4px rgba(13, 148, 136, 0.08)',
        'thick-hover': '0 30px 65px -14px rgba(13, 148, 136, 0.24), 0 14px 28px -6px rgba(13, 148, 136, 0.14)',
        'pedestal': '18px 26px 50px -10px rgba(13, 148, 136, 0.16), 6px 10px 20px -4px rgba(13, 148, 136, 0.08)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      }
    },
  },
  plugins: [],
}
