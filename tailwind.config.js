/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary:     '#B58A2E',
          hover:       '#C4973A',
          light:       'rgba(181,138,46,0.1)',
        },
        bg: {
          base:        '#F8F5F0',
          surface:     '#F2EFE9',
          alt:         '#EBE7DF',
        },
        border: {
          DEFAULT:     '#D6CEBD',
          strong:      '#B0A48E',
        },
        text: {
          primary:     '#211E1A',
          secondary:   '#5C4E3D',
          disabled:    '#A8967E',
          inverse:     '#F8F5F0',
        },
        leather:       '#4A3828',
        suede:         '#8B6248',
        canvas:        '#EBE7DF',
      },
      fontFamily: {
        display:  ['var(--font-playfair)', 'serif'],
        body:     ['var(--font-dm-sans)', 'sans-serif'],
        mono:     ['var(--font-dm-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}
