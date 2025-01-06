'use client'

import { usePrivy } from '@privy-io/react-auth'
import { useChains } from 'wagmi'
import { useAccount } from '@azuro-org/sdk-social-aa-connector'
import { ConnectorName } from 'wallet'


export const useWallet = () => {
  const { authenticated, user } = usePrivy()
  const { address, connector, isConnected, isConnecting, isReconnecting, chain, chainId, isAAWallet, isReady } = useAccount()
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
    isReconnecting: isReconnecting || !isReady || (authenticated && !address),
    isWalletConnect,
    isAAWallet,
    isReady,
  }
}
