export { default as WagmiProvider } from './WagmiProvider'
export * from './utils'


export { default as config, projectId } from './config'

// export const isEIP6963Connector = (connector: Connector) => {
//   return Boolean(
//     connector.icon?.startsWith('data:image') &&
//     connector.uid &&
//     connector.name
//   )
// }

export { useWallet } from './utils/useWallet'

export enum ConnectorName {
  Injected = 'Injected',
  WalletConnect = 'WalletConnect'
}
