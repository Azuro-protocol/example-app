import type { Config } from 'tailwindcss'


const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0A0618',
        void: '#050311',
        mist: '#E9E4FF',
        fog: '#B9B2D9',
        whisper: 'rgba(233, 228, 255, 0.72)',
        'aurora-violet': '#7B5CFF',
        'aurora-pink': '#FF7BC8',
        'aurora-cyan': '#6FE6FF',
        'aurora-gold': '#F2D16B',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'aurora-grad': 'linear-gradient(120deg, #7B5CFF 0%, #FF7BC8 45%, #6FE6FF 100%)',
        'aurora-soft': 'linear-gradient(120deg, rgba(123,92,255,0.35) 0%, rgba(255,123,200,0.25) 50%, rgba(111,230,255,0.35) 100%)',
        'ethereal-mesh': 'radial-gradient(at 20% 15%, rgba(123,92,255,0.32) 0px, transparent 45%), radial-gradient(at 80% 10%, rgba(255,123,200,0.22) 0px, transparent 50%), radial-gradient(at 75% 80%, rgba(111,230,255,0.22) 0px, transparent 55%), radial-gradient(at 10% 90%, rgba(242,209,107,0.14) 0px, transparent 45%)',
      },
      boxShadow: {
        glow: '0 0 30px rgba(123, 92, 255, 0.35)',
        'glow-pink': '0 0 40px rgba(255, 123, 200, 0.3)',
        'glow-cyan': '0 0 40px rgba(111, 230, 255, 0.3)',
        frost: '0 10px 40px -10px rgba(10, 6, 24, 0.6), inset 0 0 0 1px rgba(233, 228, 255, 0.08)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(0, -18px, 0) scale(1.03)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(24px, -30px, 0)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.55', filter: 'blur(60px)' },
          '50%': { opacity: '0.9', filter: 'blur(80px)' },
        },
        'aurora-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translate3d(0, 24px, 0)', filter: 'blur(8px)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)', filter: 'blur(0)' },
        },
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        float: 'float 9s ease-in-out infinite',
        'float-slow': 'float-slow 14s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 7s ease-in-out infinite',
        'aurora-shift': 'aurora-shift 18s ease-in-out infinite',
        shimmer: 'shimmer 3.5s linear infinite',
        'fade-up': 'fade-up 900ms ease-out both',
        'spin-slow': 'spin 22s linear infinite',
        'spin-reverse-slow': 'spin-reverse 30s linear infinite',
        twinkle: 'twinkle 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
