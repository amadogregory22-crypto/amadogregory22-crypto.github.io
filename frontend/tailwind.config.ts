import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ragt: {
          forest: 'rgb(var(--color-ragt-forest) / <alpha-value>)',
          primary: 'rgb(var(--color-ragt-primary) / <alpha-value>)',
          'primary-light': 'rgb(var(--color-ragt-primary-light) / <alpha-value>)',
          champagne: 'rgb(var(--color-ragt-champagne) / <alpha-value>)',
          'champagne-hover': 'rgb(var(--color-ragt-champagne-hover) / <alpha-value>)',
          'champagne-light': 'rgb(var(--color-ragt-champagne-light) / <alpha-value>)',
          ivory: 'rgb(var(--color-ragt-ivory) / <alpha-value>)',
          surface: 'rgb(var(--color-ragt-surface) / <alpha-value>)',
          'surface-hover': 'rgb(var(--color-ragt-surface-hover) / <alpha-value>)',
          anthracite: 'rgb(var(--color-ragt-anthracite) / <alpha-value>)',
          'text-secondary': 'rgb(var(--color-ragt-text-secondary) / <alpha-value>)',
          'text-muted': 'rgb(var(--color-ragt-text-muted) / <alpha-value>)',
          border: 'rgb(var(--color-ragt-border) / <alpha-value>)',
          'border-focus': 'rgb(var(--color-ragt-border-focus) / <alpha-value>)'
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        'lg': '8px',
        'full': '20px',
      },
      boxShadow: {
        'sm': '0 1px 3px rgba(15, 47, 38, 0.08)',
        'md': '0 4px 12px rgba(15, 47, 38, 0.12)',
      }
    },
  },
  plugins: [],
} satisfies Config;
