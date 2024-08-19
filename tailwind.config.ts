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
        'brand-70': '#B84200',
        'brand-60': '#E66001',
        'brand-50': '#ED742E',
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

        'bg-l0': '#111111',
        'bg-l1': '#171717',
        'bg-l2': '#242424',
        'bg-l3': '#2E2E2E',

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
      },
      borderRadius: {
        'ssm': '0.375rem',
        'min': '0.5rem',
        'sm': '0.75rem',
        'md': '1rem',
        'lg': '1.25rem',
      },
      backgroundImage: ({ theme }) => ({
        'card-border-top': 'linear-gradient(180deg, rgba(239, 239, 243, 0.15) 0%, rgba(239, 239, 243, 0) 100%)',
        'card-border-bottom': 'linear-gradient(180deg, rgba(239, 239, 243, 0) 0%, rgba(239, 239, 243, 0.15) 100%)',
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
      }),
      boxShadow: ({ theme }) => ({
        'betslip': `0px -10px 30px ${theme('colors.bg-l1')}`,
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
