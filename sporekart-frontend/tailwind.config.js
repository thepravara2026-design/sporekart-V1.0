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
        brand: {
          primary: '#234D3C',
          'primary-hover': '#1B3D30',
          'primary-active': '#153127',
          secondary: '#7A8F5A',
          earth: '#8A6246',
          gold: '#C89B3C',
          cream: '#F6F1E7',
        },
        page: '#FAFAF7',
        surface: {
          DEFAULT: '#FFFFFF',
          soft: '#F4F4EF',
          muted: '#ECEDE7',
        },
        dark: {
          bg: '#111713',
          surface: '#182019',
          elevated: '#202A21',
          text: '#F5F7F2',
          muted: '#C2CCC4',
          border: '#344137',
        },
        semantic: {
          success: '#2E7D50',
          'success-soft': '#E8F4EC',
          warning: '#B7791F',
          'warning-soft': '#FFF4DD',
          danger: '#C44747',
          'danger-soft': '#FCEBEC',
          info: '#3C6E91',
          'info-soft': '#EAF3F8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['DM Serif Display', 'serif'],
      },
      borderRadius: {
        'xs': '6px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '28px',
      },
      boxShadow: {
        'xs': '0 1px 2px rgba(23, 35, 29, 0.05)',
        'sm': '0 2px 8px rgba(23, 35, 29, 0.07)',
        'md': '0 8px 24px rgba(23, 35, 29, 0.10)',
        'lg': '0 16px 40px rgba(23, 35, 29, 0.14)',
      }
    },
  },
  plugins: [],
}
