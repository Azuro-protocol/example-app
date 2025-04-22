import { polygonAmoy, spicy, polygon, gnosis, chiliz, base, baseSepolia } from 'viem/chains'


const isDevEnabled = Boolean(JSON.parse(process.env.AZURO_UNSTABLE_DEV_ENABLED || 'false'))

export const appChains = isDevEnabled ? [ polygonAmoy, spicy, baseSepolia ] as const : [ polygon, gnosis, chiliz, base ] as const
