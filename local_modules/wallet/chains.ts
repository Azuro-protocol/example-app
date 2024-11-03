import { polygonAmoy, spicy, polygon, gnosis, chiliz } from 'viem/chains'


const isDevEnabled = Boolean(JSON.parse(process.env.AZURO_UNSTABLE_DEV_ENABLED || 'false'))

export const appChains = isDevEnabled ? [ polygonAmoy, spicy ] as const : [ polygon, polygonAmoy, gnosis, chiliz, spicy ] as const
