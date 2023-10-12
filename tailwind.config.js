/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/views/**/*.pug"], // lo generamos por medio del comando 
  theme: {
    extend: {colors:{
      Morado:'#3D1773',
      Rojo:'#F21651',
      Textos:'#150E40',
      Otros:'#F2059F'
    }

    },
  },
  plugins: [],
}
