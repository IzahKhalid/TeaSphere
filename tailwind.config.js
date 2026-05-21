/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: '#1f3b2d',
        cream: '#f5efe6',
        sand: '#d8c3a5',
        sage: '#8ba888',
        charcoal: '#111111',
        gold: '#c49b66',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px rgba(31, 59, 45, 0.08)',
        lift: '0 24px 48px -12px rgba(17, 17, 17, 0.15)',
        glow: '0 0 60px rgba(196, 155, 102, 0.25)',
      },
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(135deg, rgba(31,59,45,0.92) 0%, rgba(31,59,45,0.55) 45%, rgba(245,239,230,0.15) 100%)',
        'soft-radial':
          'radial-gradient(ellipse at 30% 20%, rgba(139,168,136,0.35) 0%, transparent 55%)',
      },
      animation: {
        shimmer: 'shimmer 2s linear infinite',
        float: 'float 8s ease-in-out infinite',
        'float-slow': 'float 12s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(-24px) translateX(12px)' },
        },
      },
    },
  },
  plugins: [],
}
