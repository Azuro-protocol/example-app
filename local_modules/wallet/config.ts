import { http, createConfig, cookieStorage, createStorage } from 'wagmi'
import { injected, walletConnect } from 'wagmi/connectors'
import { particleWagmiWallet } from '@azuro-org/sdk-social-aa-connector'
import { polygon, polygonAmoy, gnosis, chiliz, spicy } from 'viem/chains'
import { constants } from 'helpers'
import iconAzuroImage from 'src/app/icon.png'


const injectedConnector = injected({ shimDisconnect: true, unstable_shimAsyncInject: true })
const particleConnector = particleWagmiWallet({
  options: {
    projectId: constants.particleProjectId,
    clientKey: constants.particleClientKey,
    appId: constants.particleAppId,
  },
})

export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_ID as string

const isDevEnabled = Boolean(JSON.parse(process.env.AZURO_UNSTABLE_DEV_ENABLED || 'false'))

const walletConnectConnector = walletConnect({
  projectId,
  metadata: {
    name: 'Azuro Betting Example',
    description: '',
    icons: [ `${constants.baseUrl}/${iconAzuroImage.src}` ],
    url: '',
  },
  showQrModal: true,
})

const wagmiConfig = createConfig({
  chains: isDevEnabled ? [ polygonAmoy, gnosis, spicy ] : [ polygon, polygonAmoy, gnosis, chiliz, spicy ],
  transports: {
    [polygon.id]: http(constants.rpcByChains[polygon.id]),
    [polygonAmoy.id]: http(constants.rpcByChains[polygonAmoy.id]),
    [gnosis.id]: http(constants.rpcByChains[gnosis.id]),
    [chiliz.id]: http(constants.rpcByChains[chiliz.id]),
    [spicy.id]: http(constants.rpcByChains[spicy.id]),
  },
  connectors: [
    particleConnector,
    injectedConnector,
    walletConnectConnector,
  ],
  ssr: true,
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
