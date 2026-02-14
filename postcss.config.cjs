// postcss.config.cjs
module.exports = {
  plugins: [
    require('tailwindcss'),  // Usa `tailwindcss` como un plugin
    require('autoprefixer'),  // Para la compatibilidad con los navegadores
  ],
}
