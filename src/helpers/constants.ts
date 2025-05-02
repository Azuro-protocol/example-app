import { chiliz, gnosis, polygon, polygonAmoy, spicy, base, baseSepolia } from 'viem/chains'
import { type ChainId } from '@azuro-org/toolkit'
import { type IconName } from 'components/ui'


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string
const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME as string
const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID as string
const isDevEnabled = Boolean(JSON.parse(process.env.AZURO_UNSTABLE_DEV_ENABLED || 'false'))

const rpcByChains: Record<ChainId, string> = {
  [gnosis.id]: 'https://gnosis-rpc.publicnode.com',
  [polygon.id]: 'https://polygon-bor-rpc.publicnode.com',
  [polygonAmoy.id]: 'https://polygon-amoy-bor-rpc.publicnode.com',
  [chiliz.id]: 'https://chiliz-rpc.publicnode.com',
  [spicy.id]: 'https://chiliz-spicy-rpc.publicnode.com',
  [base.id]: 'https://base-rpc.publicnode.com',
  [baseSepolia.id]: 'https://base-sepolia-rpc.publicnode.com',
} as const

const chainIcons: Record<ChainId, IconName> = {
  [gnosis.id]: 'networks/gnosis',
  [polygon.id]: 'networks/polygon',
  [polygonAmoy.id]: 'networks/polygon',
  [chiliz.id]: 'networks/chiliz',
  [spicy.id]: 'networks/chiliz',
  [base.id]: 'networks/base',
  [baseSepolia.id]: 'networks/base',
}

const currencyIcons: Record<ChainId, IconName> = {
  [gnosis.id]: 'currency/wxdai',
  [polygon.id]: 'currency/usdt',
  [polygonAmoy.id]: 'currency/azusd',
  [chiliz.id]: 'currency/wchz',
  [spicy.id]: 'currency/wchz',
  [base.id]: 'currency/weth',
  [baseSepolia.id]: 'currency/weth',
}

const sportsOrder = [ 'politics', 'football', 'basketball', 'tennis', 'cricket', 'mma', 'boxing', 'ice-hockey', 'american-football', 'baseball', 'rugby-union', 'rugby-league' ]

const links = {
  docs: '',
  terms: '',
  policy: '',
  faq: '',
  waves: 'https://azuro.org/app/waves',
}

const defaultSlippageValues = [ '5', '10', '15' ]
const defaultQuickBetsValues = [ '50', '100' ]

const localStorageKeys = {
  slippage: 'slippage',
  quickBet: 'quickBet',
  gameMarketsView: 'gameMarketsView',
  collapsedMarkets: 'collapsedMarkets',
  oddsView: 'oddsView',
}

export default {
  baseUrl,
  defaultChain: isDevEnabled ? polygonAmoy : polygon,
  companyName,
  rpcByChains,
  topPageGamePerSportLimit: 10,
  chainIcons,
  currencyIcons,
  sportsOrder,
  links,
  defaultSlippageValues,
  defaultSlippage: '10',
  defaultQuickBetsValues,
  localStorageKeys,
  privyAppId,
}
