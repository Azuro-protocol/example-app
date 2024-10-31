'use client'

import { useEffect, useState } from 'react'
import type { ModalComponent } from '@locmod/modal'
import { type ChainId, chainsData } from '@azuro-org/toolkit'
import { Message } from '@locmod/intl'
import { useConnect, useSwitchChain, useWalletClient, useDisconnect } from 'wagmi'
import { useWallet } from 'wallet'
import { UserRejectedRequestError } from 'viem'

import { PlainModal } from 'components/feedback'

import messages from './messages'


export type SwitchNetworkModalProps = {
  chainId: ChainId
  onFinish?: () => any
}

const SwitchNetworkModal: ModalComponent<SwitchNetworkModalProps> = (props) => {
  const { closeModal, chainId, onFinish } = props

  const { connect } = useConnect()
  const { disconnectAsync } = useDisconnect()
  const { connector, chainId: userChainId } = useWallet()
  const walletClient = useWalletClient()
  const { error, isError, switchChain, chains } = useSwitchChain()

  const [ addChainError, setAddChainError ] = useState<Error | null>(null)

  useEffect(() => {
    if (switchChain && userChainId !== chainId) {
      switchChain({ chainId })
    }
  }, [ chainId, userChainId, switchChain ])

  useEffect(() => {
    if (error && /Missing or invalid/i.test(error.message)) {
      (async () => {
        try {
          const chain = chains.find(({ id }) => id === chainId)

          if (!walletClient?.data || !chain) {
            throw new Error('Wallet client or chain not found')
          }

          await walletClient.data.addChain({ chain })
        }
        catch (error: any) {
          console.error(error)
          setAddChainError(error)
        }
      })()
    }

    if (error && error instanceof UserRejectedRequestError) {
      closeModal()
    }
  }, [ walletClient, error, isError ])

  useEffect(() => {
    if (userChainId === chainId) {
      if (typeof onFinish === 'function') {
        onFinish()
      }

      closeModal()
    }
  }, [ userChainId, chainId, closeModal, onFinish ])

  const chainName = chainsData[chainId].chain.name
  const title = { ...messages.title, values: { chain: chainName } }
  const text = { ...messages.text, values: { chain: chainName } }
  const hasFinalError = Boolean(addChainError?.message)
  const handleReconnectClick = () => {
    if (connector) {
      disconnectAsync().then(() => connect({ connector }))
    }
  }

  return (
    <PlainModal closeModal={closeModal}>
      <div className="flex flex-col items-center text-center">
        <img className="size-16" src="/images/illustrations/change.png" alt="" />
        <Message value={title} className="text-caption-14 mt-6 font-semibold" />
        <Message value={text} className="text-caption-13 font-medium mt-4 text-grey-60" />
      </div>
    </PlainModal>
  )
}

declare global {
  interface ModalsRegistry extends ExtendModalsRegistry<{ SwitchNetworkModal: typeof SwitchNetworkModal }> {}
}

export default SwitchNetworkModal
