/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./index.html",
  "./src/**/*.{js,jsx}",
],
  theme: {
    extend: {
      colors: {
        midnight: { /* Color Palette: https://coolors.co/121420-af72ff-2c2b3c-191c2e-ececec */
          bg: '#121420',        /* Main Background */
          primary: '#AF72FF',   /* Highlighted/Important Things (e.g. Buttons) */
          secondary: '#2C2B3C', /* Accents */
          container: '#191C2E', /* Note Cards, Forums, etc. */
          text: '#ECECEC'       /* Text */
        }
      }
    }
  },
  plugins: [],
}

