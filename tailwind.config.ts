import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        red: colors.rose,
        pink: colors.fuchsia,
        testpink: '#ff69b4',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        inter: ['var(--font-inter)'],
        hankens: ['var(--font-hankens)'],
        poppins: ['var(--font-poppins)'],
      },
    },
  },
  plugins: [],
}

export default config
