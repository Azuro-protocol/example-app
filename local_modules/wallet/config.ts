'use client'

import { cookieStorage, createStorage, http } from 'wagmi'
import { type PrivyConfig } from '@azuro-org/sdk-social-aa-connector'
import { createConfig } from '@privy-io/wagmi'
import { polygon, polygonAmoy, gnosis, chiliz, spicy, base, baseSepolia } from 'viem/chains'
import { constants } from 'helpers'

import { appChains } from './chains'


export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_ID as string

// Replace this with your Privy config
export const privyConfig: PrivyConfig = {
  embeddedWallets: {
    createOnLogin: 'users-without-wallets',
    requireUserPasswordOnCreate: false,
    // waitForTransactionConfirmation: false,
    showWalletUIs: false,
  },
  loginMethods: [ 'email', 'google', 'twitter', 'wallet', 'farcaster', 'discord', 'instagram' ],
  // loginMethodsAndOrder: {
  //   primary: [ 'detected_ethereum_wallets', 'metamask', 'wallet_connect' ],
  //   overflow: [ 'email', 'google', 'twitter', 'farcaster', 'discord', 'instagram' ],
  // },
  appearance: {
    theme: 'dark',
    showWalletLoginFirst: true,
  },
  walletConnectCloudProjectId: projectId,
}

const wagmiConfig = createConfig({
  chains: appChains,
  transports: {
    [polygon.id]: http(constants.rpcByChains[polygon.id]),
    [polygonAmoy.id]: http(constants.rpcByChains[polygonAmoy.id]),
    [gnosis.id]: http(constants.rpcByChains[gnosis.id]),
    [chiliz.id]: http(constants.rpcByChains[chiliz.id]),
    [spicy.id]: http(constants.rpcByChains[spicy.id]),
    [base.id]: http(constants.rpcByChains[base.id]),
    [baseSepolia.id]: http(constants.rpcByChains[baseSepolia.id]),
  },
  ssr: false,
  syncConnectedChain: true,
  multiInjectedProviderDiscovery: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
})

declare module 'wagmi' {
  interface Register {
    config: typeof wagmiConfig
  }
}

export default wagmiConfig
