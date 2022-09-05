const colors = require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html', './src/**/*.tsx'],
  theme: {
    colors: {
      black: colors.slate[800],
      pending: colors.indigo[800],
      working: colors.blue[500],
      completed: colors.green[500],
      ...colors
    },
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms")
  ],
}
