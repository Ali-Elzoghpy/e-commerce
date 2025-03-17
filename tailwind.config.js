/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  theme: {
    extend: {
      backgroundColor:{
        mainColor:"#0aad0a"
      },
      colors:{
        mainColor:"#0aad0a",
      },
      screens:{
        xs:"300px"
      },
      backgroundImage: {
        bgMain : "./src/assets/pattern.svg"
      }

    },
  },
  plugins: [],
}

