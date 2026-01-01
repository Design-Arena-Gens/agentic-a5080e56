import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'retro-orange': '#FF6B35',
        'retro-yellow': '#F7931E',
        'retro-brown': '#8B4513',
        'retro-cream': '#FFF8DC',
        'retro-teal': '#20B2AA',
      },
      fontFamily: {
        'retro': ['Courier New', 'monospace'],
        'display': ['Impact', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
