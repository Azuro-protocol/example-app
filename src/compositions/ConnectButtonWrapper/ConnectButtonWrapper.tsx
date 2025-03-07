'use client'

import React from 'react'
import { openModal } from '@locmod/modal'
import { useChain } from '@azuro-org/sdk'
import { useWallet } from 'wallet'
import { usePrivy } from '@privy-io/react-auth'

import { Button, buttonMessages, type ButtonProps } from 'components/inputs'


type ConnectButtonWrapperProps = {
  children: React.ReactElement<ButtonProps>
}

const ConnectButtonWrapper: React.FC<ConnectButtonWrapperProps> = ({ children }) => {
  const { appChain } = useChain()
  const { account, chainId, isAAWallet } = useWallet()
  const { ready, login } = usePrivy()
  const { onClick, title, disabled, ...props } = children.props

  if (!account) {
    return (
      <Button
        {...props}
        title={buttonMessages.connectWallet}
        size={props?.size || 40}
        loading={!ready}
        className={props?.className || 'w-full'}
        onClick={login}
      />
    )
  }

  const isRightNetwork = appChain.id === chainId

  if (!isRightNetwork && !isAAWallet) {
    const handleClick = () => {
      openModal('SwitchNetworkModal', {
        chainId: appChain.id,
      })
    }

    return (
      <Button
        {...props}
        title={buttonMessages.changeNetwork}
        size={props?.size || 40}
        className={props?.className || 'w-full'}
        onClick={handleClick}
      />
    )
  }

  return (
    children
  )
}

export default ConnectButtonWrapper
