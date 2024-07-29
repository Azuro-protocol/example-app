'use client'

import { useAccount, useChains } from 'wagmi'
import { ConnectorName } from 'wallet'


export const useWallet = () => {
  const { address, connector, isConnected, isConnecting, isReconnecting, chain, chainId } = useAccount()
  const chains = useChains()

  const isWalletConnect = connector?.name === ConnectorName.WalletConnect

  return {
    account: address,
    connector,
    chain,
    chains,
    chainId,
    isConnected,
    isConnecting,
    isReconnecting,
    isWalletConnect,
  }
}
