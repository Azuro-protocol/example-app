import { polygonAmoy, spicy, polygon, gnosis, chiliz, base, baseSepolia } from 'viem/chains'


const isDevEnabled = Boolean(JSON.parse(process.env.AZURO_UNSTABLE_DEV_ENABLED || 'false'))

export const appChains = isDevEnabled ? [ polygonAmoy, gnosis, spicy, baseSepolia ] as const : [ polygon, polygonAmoy, gnosis, chiliz, spicy, base ] as const
