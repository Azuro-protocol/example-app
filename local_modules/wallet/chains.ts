import { polygonAmoy, spicy, polygon, gnosis, chiliz, base, baseSepolia, bscTestnet } from 'viem/chains'


const isDevEnabled = Boolean(JSON.parse(process.env.AZURO_UNSTABLE_DEV_ENABLED || 'false'))

export const appChains = isDevEnabled ? [ polygonAmoy, spicy, baseSepolia, bscTestnet ] as const : [ polygon, gnosis, chiliz, base ] as const
