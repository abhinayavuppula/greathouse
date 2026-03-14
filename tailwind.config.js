/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory:        'var(--color-ivory)',
        cream:        'var(--color-cream)',
        charcoal:     'var(--color-charcoal)',
        'warm-gray':  'var(--color-warm-gray)',
        gold:         'var(--color-gold)',
        'gold-light': 'var(--color-gold-light)',
        'gold-pale':  'var(--color-gold-pale)',
        teak:         'var(--color-teak)',
        rattan:       'var(--color-rattan)',
        white:        'var(--color-white)',
        black:        'var(--color-black)',
        error:        'var(--color-error)',
        success:      'var(--color-success)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        accent: ['var(--font-accent)'],
        body: ['var(--font-body)'],
      },
      transitionTimingFunction: {
        luxury: 'var(--ease-luxury)',
        snap: 'var(--ease-snap)',
      },
      transitionDuration: {
        't-fast': 'var(--t-fast)',
        't-base': 'var(--t-base)',
        't-slow': 'var(--t-slow)',
        't-crawl': 'var(--t-crawl)',
      }
    },
  },
  plugins: [],
}
