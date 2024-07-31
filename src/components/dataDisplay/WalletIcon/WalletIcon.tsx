'use client'
import React, { useEffect, useState } from 'react'
import { ConnectorName, getIconByName } from 'wallet'

import { Icon } from 'components/ui'


type WalletIconProps = {
  className?: string
  providedImageSrc?: string
  name: string | undefined
}

const WalletIcon: React.FC<WalletIconProps> = (props) => {
  const { className, providedImageSrc, name } = props
  const [ fetchedIcon, setIcon ] = useState<string | null>(null)

  let icon: React.ReactElement | undefined

  if (name === ConnectorName.Injected || name === 'MetaMask') {
    icon = <Icon className={className} name="wallets/metamask" />
  }
  else if (name === ConnectorName.WalletConnect) {
    icon = <Icon className={className} name="wallets/walletconnect" />
  }
  else if (providedImageSrc) {
    icon = <img className={className} src={providedImageSrc} alt="" />
  }

  const getIcon = icon ? null : getIconByName[name as keyof typeof getIconByName]

  useEffect(() => {
    if (typeof getIcon === 'function') {
      (async () => {
        const icon = await getIcon()
        setIcon(icon)
      })()
    }
  }, [ getIcon ])

  if (typeof getIcon === 'function' || fetchedIcon) {
    return (
      <div className={className} dangerouslySetInnerHTML={{ __html: fetchedIcon || '' }} />
    )
  }

  return icon
}

export default WalletIcon
