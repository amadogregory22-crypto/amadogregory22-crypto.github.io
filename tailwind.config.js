/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./app.js",
    "./new_home.html"
  ],
  theme: { extend: { colors: { "ragt-navy": "#273540", "ragt-blue": "#90b9d4", "ragt-gold": "#ecc764", "ragt-gold-dark": "#deaa3f", "ragt-green": "#6ba56f", "ragt-green-light": "#98af5f" } },
    extend: {
      colors: {
        line: "var(--line)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        bg: "var(--bg)",
        panel: "var(--panel)",
        navy: "var(--navy)",
        navy2: "var(--navy2)",
        gold: "var(--gold)",
        gold2: "var(--gold2)",
        white: "var(--panel)",
        slate: {
          50: "var(--bg)",
          100: "var(--bg)",
          200: "var(--line)",
          300: "var(--line)",
          400: "var(--muted)",
          500: "var(--muted)",
          600: "var(--muted)",
          700: "var(--ink)",
          800: "var(--ink)",
          900: "var(--ink)",
        }
      }
    },
  },
  plugins: [],
}
