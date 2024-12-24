'use client'

import { usePrivy } from '@privy-io/react-auth'
import { useChains } from 'wagmi'
import { useAAWalletClient, useAccount } from '@azuro-org/sdk-social-aa-connector'
import { ConnectorName } from 'wallet'


export const useWallet = () => {
  const { authenticated } = usePrivy()
  const { address, connector, isConnected, isConnecting, isReconnecting, chain, chainId, isAAWallet, isReady } = useAccount()
  const chains = useChains()
  const aaWalletClient = useAAWalletClient()

  const isWalletConnect = connector?.name === ConnectorName.WalletConnect

  return {
    account: address,
    connector,
    aaWalletClient,
    chain,
    chains,
    chainId,
    isConnected,
    isConnecting,
    isReconnecting: isReconnecting || !isReady || (authenticated && !address),
    isWalletConnect,
    isAAWallet,
    isReady,
  }
}
