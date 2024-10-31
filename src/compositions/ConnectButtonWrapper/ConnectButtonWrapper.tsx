'use client'

import React from 'react'
import { openModal } from '@locmod/modal'
import { useChain } from '@azuro-org/sdk'
import { useWallet } from 'wallet'

import { Button, buttonMessages, type ButtonProps } from 'components/inputs'


type ConnectButtonWrapperProps = {
  children: React.ReactElement<ButtonProps>
}

const ConnectButtonWrapper: React.FC<ConnectButtonWrapperProps> = ({ children }) => {
  const { appChain } = useChain()
  const { account, chainId } = useWallet()
  const { onClick, title, disabled, ...props } = children.props

  if (!account) {
    const handleClick = () => {
      openModal('ConnectModal')
    }

    return (
      <Button
        {...props}
        title={buttonMessages.connectWallet}
        size={props?.size || 40}
        className={props?.className || 'w-full'}
        onClick={handleClick}
      />
    )
  }

  const isRightNetwork = appChain.id === chainId

  if (!isRightNetwork) {
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
