export default {
  content: ['./index.html', './src/**/*.{jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Helvetica', 'Roboto', 'Arial', 'sans-serif'],
        cursive: ['RubikVinyl', 'sans-serif'],
        serif: ['Mukta'],
        mono: ['"Fira Code"', 'ui-monospace'],
        display: ['Oswald'],
      },
      colors: {
        white: { soft: '#ebebeb', 'ultra-light': '#fbfbfe', DEFAULT: '#ffffff' },
        dark: {
          charcoal: '#1f2126',
          slate: '#2d3036',
          grey: '#46484d',
        },
        red: {
          bright: '#ff5959',
          bright2: '#9B2727',
          soft: '#ff7373',
        },
        blue: {
          sky: '#5eb2ff',
          cerulean: '#49a7fc',
          vivid: '#2f81ff',
          vivid2: '#2f81ff',
          deep: '#185fcc',
          navy: '#134187',
        },
      },

      animation: {
        fadeIn: 'fadeIn .3s ease-in-out',
      },
      keyframes: () => ({
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      }),
    },
  },
  plugins: [],
};
