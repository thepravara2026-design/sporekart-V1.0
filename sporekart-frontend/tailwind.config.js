/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        forest: '#173B2A',
        green: {
          800: '#1F4D35',
          700: '#2F6B45',
          600: '#3F7D4D',
          500: '#5A9360',
        },
        moss: '#607D52',
        leaf: '#7FA66A',
        sage: '#B8C9A8',
        cream: '#F6F2E8',
        soil: '#5C4635',
        gold: {
          DEFAULT: '#C79A4A',
          soft: '#E6C98D',
        },
        surface: {
          DEFAULT: '#FCFCF8',
          soft: '#F3F4ED',
        },
        border: '#E1E5DA',
        text: {
          primary: '#172019',
          secondary: '#59645B',
          muted: '#7C857D',
        },
        brand: {
          primary: '#173B2A',
          'primary-hover': '#1F4D35',
          secondary: '#607D52',
          earth: '#5C4635',
          gold: '#C79A4A',
          cream: '#F6F2E8',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['DM Serif Display', 'serif'],
      },
      borderRadius: {
        'xs': '6px',
        'sm': '10px',
        'md': '14px',
        'lg': '20px',
        'xl': '28px',
        'pill': '999px',
      },
      boxShadow: {
        'xs': '0 1px 3px rgba(23, 32, 25, 0.06)',
        'sm': '0 4px 12px rgba(23, 32, 25, 0.08)',
        'md': '0 10px 30px rgba(23, 32, 25, 0.10)',
        'lg': '0 20px 50px rgba(23, 32, 25, 0.14)',
      },
      maxWidth: {
        'container': '1280px',
      }
    },
  },
  plugins: [],
}
