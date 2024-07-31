import { chiliz, gnosis, polygon, polygonAmoy, spicy } from 'viem/chains'
import { type ChainId } from '@azuro-org/toolkit'
import { type IconName } from 'components/ui'


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string

const rpcByChains: Record<ChainId, string> = {
  [gnosis.id]: 'https://gnosis-rpc.publicnode.com',
  [polygon.id]: 'https://polygon-bor-rpc.publicnode.com',
  [polygonAmoy.id]: 'https://polygon-amoy-bor-rpc.publicnode.com',
  [chiliz.id]: 'https://chiliz-rpc.publicnode.com',
  [spicy.id]: 'https://chiliz-spicy-rpc.publicnode.com',
} as const

const chainIcons: Record<ChainId, IconName> = {
  [gnosis.id]: 'networks/gnosis',
  [polygon.id]: 'networks/polygon',
  [polygonAmoy.id]: 'networks/polygon',
  [chiliz.id]: 'networks/chiliz',
  [spicy.id]: 'networks/chiliz',
}

const currencyIcons: Record<ChainId, IconName> = {
  [gnosis.id]: 'currency/wxdai',
  [polygon.id]: 'currency/usdt',
  [polygonAmoy.id]: 'currency/azusd',
  [chiliz.id]: 'currency/wchz',
  [spicy.id]: 'currency/wchz',
}

export default {
  baseUrl,
  rpcByChains,
  topPageGamePerSportLimit: 10,
  chainIcons,
  currencyIcons,
}
