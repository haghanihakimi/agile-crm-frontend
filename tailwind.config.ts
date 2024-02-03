import defaultTheme from 'tailwindcss/defaultTheme'
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'white': '#ffffff',
        'black': '#000000',
        'mystic-midnight': '#05161A',
        'deep-ocean-blue': '#072e33',
        'light-ocean-blue': 'rgb(17 40 45)',
        'emerald-splash': '#0C7075',
        'deep-teal': '#063537',
        'tranquility': '#0F9690',
        'serene-skyline': '#6DA5C0',
        'slate-harbor': '#294D61',
        'light-red': '#B51A2B',
        'light-yellow': '#F39F5A'
      },
      fontFamily: {
        'sans': ['Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        md: ['1.075rem', '26px']
      },
      keyframes: {
        profileMenuFade: {
          '0%': { opacity: '0', top: '32px' },
          '100%': { opacity: '1.0', top: '40px' },
        },
        popupFade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1.0' },
        },
        fadeIn: {
          '0%': { transform: 'scale(0.96, 0.96)', opacity: '0' },
          '50%': { transform: 'scale(1.08, 1.08)', opacity: '0.75' },
          '100%': { transform: 'scale(1.00, 1.00)', opacity: '1' },
        },
      },
      animation: {
        'profileMenuFade': 'profileMenuFade 120ms linear 0ms 1 alternate',
        'popupFade': 'popupFade 120ms linear 0ms 1 alternate',
        'fadeIn': 'fadeIn 150ms linear 0ms 1 alternate',
      },
      backgroundImage: {
        'hero': "url('assets/images/it-team.jpg')"
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
  content: [
    './components/**/*.vue',
    './layouts/**/*.vue',
    './partials/**/*.vue',
    './pages/**/*.vue',
  ]
}

