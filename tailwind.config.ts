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
      // '-xs': { max: '568.9px' },
      // use it only in extra cases inside mobile view
      // (0-569px - full wide screen, 569-767.9px - centered container but with mobile view)
      'xs': { min: '569px' },
      // use to define "only mobile view"
      '-sm': { max: '767.9px' },
      // primary delimiter between "mobile" and "desktop" views
      'sm': { min: '768px' },
      '-lg': { max: '1095.9px' },
      'lg': { min: '1096px' },
      '-xl': { max: '1365.9px' },
      'xl': { min: '1366px' },
      'xxl': { min: '1440px' },
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

        'bg-l0': '#171717',
        'bg-l1': '#171717',
        'bg-l2': '#242424',
        'bg-l3': '#2E2E2E',

        'accent-pink': '#F768A0',
        'accent-pink-5': '#442E37',

        'accent-green': '#3EFF8B',
        'accent-green-10': '#134C2A',

        'accent-yellow': '#EFB72A',

        'accent-red': '#F42E52',
        'accent-red-10': '#632C2A',
        'accent-red-5': '#3D1F24',
      },
    },
  },
  plugins: [
    plugin(({ addBase, theme }) => {
      // addBase({
      //   'body': { backgroundColor: theme('colors.test') },
      // })
    }),
  ],
}
export default config
