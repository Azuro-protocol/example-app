import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'


const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/compositions/**/*.{ts,tsx}',
    './src/views/**/*.{ts,tsx}',
  ],
  theme: {
    screens: {
      // see context/device/index
      mb: { max: '801.9px' }, // isMobileView
      ds: '802px', // isDesktopView
      nr: { min: '802px', max: '1279.9px' }, // isNarrowVie
      '-wd': { max: '1280px' },
      'wd': { min: '1280px' },
      '2wd': '1366px', // for more control (view where both sidebars are fixed in viewport)
    },
    extend: {
      colors: {
        // 科技感主色：青色/蓝霓虹
        'tech-cyan': '#00F5FF',
        'tech-cyan-dim': '#00C4CC',
        'tech-cyan-10': 'rgba(0, 245, 255, 0.1)',
        'tech-cyan-5': 'rgba(0, 245, 255, 0.05)',
        'tech-blue': '#4D7CFF',
        'tech-blue-dim': '#3A5FCC',
        'tech-blue-10': 'rgba(77, 124, 255, 0.1)',
        'tech-purple': '#8B5CF6',
        'tech-purple-10': 'rgba(139, 92, 246, 0.1)',

        'brand-70': '#B84200',
        'brand-60': '#E66001',
        'brand-50': '#FF6B00',
        'brand-15': '#3A2B20',
        'brand-10': '#642900',
        'brand-5': '#331500',

        'grey-90': '#EBEBEB',
        'grey-70': '#ADADAD',
        'grey-60': '#999999',
        'grey-40': '#7E7E7E',
        'grey-20': '#3B3B3B',
        'grey-15': '#2E2E2E',
        'grey-10': '#1F1F1F',

        // 炫酷深色背景：深蓝紫渐变基调
        'bg-l0': '#050810',
        'bg-l1': '#0a0f1c',
        'bg-l2': '#0f1628',
        'bg-l3': '#151d35',

        'accent-pink': '#F768A0',
        'accent-pink-5': '#442E37',

        'accent-green': '#3EFF8B',
        'accent-green-5': '#122018',
        'accent-green-10': '#134C2A',

        'accent-yellow': '#EFB72A',
        'accent-yellow-10': '#E5B02B1A',

        'accent-red': '#F42E52',
        'accent-red-5': '#3D1F24',
        'accent-red-10': '#632C2A',

        'accent-blue': '#7B58ED',

        'accent-purple': '#CA5AFF',
      },
      borderRadius: {
        'ssm': '0.375rem', // 6
        'min': '0.5rem', // 8
        'sm': '0.75rem', // 12
        'md': '1rem', // 16
        'lg': '1.25rem', // 20
      },
      backgroundImage: ({ theme }) => ({
        'card-border-top': 'linear-gradient(180deg, rgba(0, 245, 255, 0.12) 0%, rgba(0, 245, 255, 0) 100%)',
        'card-border-bottom': 'linear-gradient(180deg, rgba(0, 245, 255, 0) 0%, rgba(0, 245, 255, 0.08) 100%)',
        'tech-grid': 'linear-gradient(rgba(0, 245, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 245, 255, 0.03) 1px, transparent 1px)',
        'tech-grid-dense': 'linear-gradient(rgba(0, 245, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 245, 255, 0.04) 1px, transparent 1px)',
        'live-switcher-bg': 'linear-gradient(90deg, rgba(61, 32, 31, 0.5) 0%, rgba(61, 32, 31, 0) 100%)',
        'betslip-item-bg': `linear-gradient(90.08deg, ${theme('colors.bg-l2')} 0.06%, ${theme('colors.brand-10')} 300%)`,
        'betslip-item-bg-inc': `linear-gradient(90.08deg, ${theme('colors.bg-l2')} 0.06%, ${theme('colors.accent-green')} 300%)`,
        'betslip-item-bg-dec': `linear-gradient(90.08deg, ${theme('colors.bg-l2')} 0.06%, ${theme('colors.accent-red')} 300%)`,
        'live-game-shadow': `linear-gradient(90deg, ${theme('colors.accent-red')} -1000%, ${theme('colors.bg-l2')} 100%)`,
        'live-bet-shadow': `linear-gradient(90deg, ${theme('colors.bg-l3')} 0%, ${theme('colors.accent-red')} 800%)`,
        'result-button-won': `linear-gradient(180deg, ${theme('colors.grey-15')} 0%, ${theme('colors.accent-green')} 1500%)`,
        'result-button-lost': `linear-gradient(90deg, ${theme('colors.grey-15')} 0%, ${theme('colors.accent-red')} 1500%)`,
        'bet-game-won': `linear-gradient(180deg, ${theme('colors.bg-l3')} 0%, ${theme('colors.accent-green')} 1000%)`,
        'bet-game-lost': `linear-gradient(180deg, ${theme('colors.bg-l3')} 0%, ${theme('colors.accent-red')} 1000%)`,
        'live-event-gradient': `linear-gradient(90deg, transparent 0%, ${theme('colors.accent-red')} 50%, transparent 100%)`,
      }),
      backgroundSize: {
        'tech-grid': '24px 24px',
        'tech-grid-dense': '16px 16px',
      },
      boxShadow: ({ theme }) => ({
        'betslip': `0px -10px 30px ${theme('colors.bg-l1')}`,
        'glow-cyan': `0 0 20px ${theme('colors.tech-cyan-10')}, 0 0 40px ${theme('colors.tech-cyan-5')}`,
        'glow-cyan-sm': `0 0 12px ${theme('colors.tech-cyan-10')}`,
        'glow-blue': `0 0 20px ${theme('colors.tech-blue-10')}`,
        'border-glow-cyan': `inset 0 0 20px ${theme('colors.tech-cyan-5')}`,
      }),
      fill: {
        'gradient-azuro-waves-grey': '#c4cfe4',
        'gradient-azuro-waves-mist': '#a5d0e6',
        // ATTN: check /local_modules/svg-provider/SvgSprite.tsx
        'gradient-azuro-waves-sky': 'url(#gradient-azuro-waves-sky)',
        'gradient-azuro-waves-blue': 'url(#gradient-azuro-waves-blue)',
        'gradient-azuro-waves-ultramarine': 'url(#gradient-azuro-waves-ultramarine)',
        'gradient-azuro-waves-bright': 'url(#gradient-azuro-waves-bright)',
        'gradient-azuro-waves-brilliant': 'url(#gradient-azuro-waves-brilliant)',
        'gradient-azuro-waves-royal': 'url(#gradient-azuro-waves-royal)',
      },
    },
  },
  plugins: [
    require('@headlessui/tailwindcss'),
    plugin(({ addComponents, matchUtilities, theme }) => {
      // addBase({
      //   'body': { backgroundColor: theme('colors.test') },
      // })
      addComponents({
        '.text-heading-h1': {
          fontSize: '1.75rem', // 28
          lineHeight: '2.25rem', // 36
        },
        '.text-heading-h2': {
          fontSize: '1.5rem', // 24
          lineHeight: '2rem', // 32
        },
        '.text-heading-h3': {
          fontSize: '1.25rem', // 20
          lineHeight: '1.625rem', // 26
        },
        '.text-heading-h4': {
          fontSize: '1.125rem', // 18
          lineHeight: '1.5rem', // 24
        },
        '.text-heading-h5': {
          fontSize: '1rem', // 16
          lineHeight: '1.25rem', // 20
        },
        '.text-caption-14': {
          fontSize: '0.875rem', // 14
          lineHeight: '1.125rem', // 18
        },
        '.text-caption-13': {
          fontSize: '0.813rem', // 13
          lineHeight: '1rem', // 16
        },
        '.text-caption-12': {
          fontSize: '0.75rem', // 12
          lineHeight: '0.875rem', // 14
        },
        '.text-label-12': {
          fontSize: '0.688rem', // 11
          lineHeight: '0.813rem', // 13
        },
      })
    }),
  ],
}

export default config
