/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        sm: '480px',
      },
    },
    fontFamily: {
      sans: ['Poppins'],
    },
    /* colors: {
      main: {
        1: '#5eead4',
        2: '#2dd4bf',
        3: '#14b8a6',
        4: '#0d9488',
        5: '#0f766e',
        6: '#115e59',
      },
      second: {
        1: ' #fda4af',
        2: '#fb7185',
        3: '#f43f5e',
      },
      third: '#a78bfa',
      white: {
        0: '#f3f4f6',
        1: '#f1f5f9',
        2: '#e2e8f0',
        3: '#cbd5e1',
      },
      grey: {
        1: '#94a3b8',
        2: '#64748b',
        3: '#475569',
        4: '#334155',
      },
      dark: {
        0: '#1f2937',
        1: '#18212f',
        2: '#0f172a',
        3: '#020617',
      },
    },*/
  },
  plugins: [],
};
