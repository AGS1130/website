module.exports = {
  purge: ["../build/**/*.html", "../components/**/*.svelte"],
  darkMode: false,
  theme: {
    colors: {
      /* Thank you http://colormind.io/bootstrap/ */
      darkShade: {
        light: '#31313A',
        DEFAULT: '#26262D',
        dark: '#0F0F11'
      },
      darkAccent: {
        light: '#E2290B',
        DEFAULT: '#E50914',
        dark: '#72192E'
      },
      main: {
        light: '#FF864D',
        DEFAULT: '#FF5200',
        dark: '#C73E1E'
      },
      lightAccent: {
        light: '#E3A656',
        DEFAULT: '#FF9900',
        dark: '#BB719B'
      },
      lightShade: {
        light: '#FFFFFF',
        DEFAULT: '#F3F4F6',
        dark: '#E3E4E6'
      }
    },
    container: {
      center: true,
    },
    extend: {
      rotate: {
        "-135": "-135deg",
        135: "135deg",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
