'use client'

import { useChains } from 'wagmi'
import { useAccount } from '@azuro-org/sdk-social-aa-connector'
import { ConnectorName } from 'wallet'


export const useWallet = () => {
  const { address, connector, isConnected, isConnecting, isReconnecting, chain, chainId, isAAWallet } = useAccount()
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
    isAAWallet,
  }
}
