import { chiliz, gnosis, polygon, polygonAmoy, spicy } from 'viem/chains'
import { type ChainId } from '@azuro-org/toolkit'


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string

const rpcByChains: Record<ChainId, string> = {
  [gnosis.id]: 'https://gnosis-rpc.publicnode.com',
  [polygon.id]: 'https://polygon-bor-rpc.publicnode.com',
  [polygonAmoy.id]: 'https://polygon-amoy-bor-rpc.publicnode.com',
  [chiliz.id]: 'https://chiliz-rpc.publicnode.com',
  [spicy.id]: 'https://chiliz-spicy-rpc.publicnode.com',
} as const

export default {
  baseUrl,
  rpcByChains,
  topPageGamePerSportLimit: 10,
}
