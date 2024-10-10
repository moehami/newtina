/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", 
    "./app/*",
    "./components/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        helvetica: ['Helvetica', 'Arial', 'sans-serif'],
      },
      screens: {
        '3xl': '1920px',
      },
      colors: {
        ssw: {
          red: '#CC4141',
          charcoal: '#333333'
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    function ({ addComponents }) {
      addComponents({
        // Variant styles
        '.solidRed': {
          backgroundColor: '#CC4141', 
          color: '#FFFFFF', 
        },
        '.solidWhite': {
          backgroundColor: '#FFFFFF', 
          color: '#000000',
          border: '1px solid #000000', 
        },
        '.outlinedWhite': {
          color: '#FFFFFF', 
          border: '1px solid #FFFFFF', 
        },
        // Size styles
        '.small': {
          padding: '0.25rem 0.5rem', 
          fontSize: '0.875rem', 
        },
        '.medium': {
          padding: '0.5rem 1rem', 
          fontSize: '1rem', 
        },
        '.large': {
          padding: '0.75rem 1.5rem',
          fontSize: '1.125rem',
        },
      });
    },
  ],
};
