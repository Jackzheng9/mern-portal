/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: { 
        "poppins": ['Poppins', 'sans-serif'],
        "raleway": ['Raleway', 'sans-serif'],
      },

      colors: {
        'primary-blue':'#0049FF',
        'primary-black':'#1C1C1C',
        'gray-300':'#B0B0B0',
      }
    },


  },
  plugins: [],
}

