'use client'
import React, { memo, useMemo } from 'react'
import { type Connector, useConnect } from 'wagmi'
import cx from 'classnames'
import { Message } from '@locmod/intl'
import { constants } from 'helpers'

import { Icon } from 'components/ui'
import { WalletIcon } from 'components/dataDisplay'
import { ButtonBase } from 'components/inputs'

import messages from './messages'


type DownloadConnector = {
  downloadLink?: string
}

type ButtonProps = {
  name: string
  providedImageSrc?: string
  disabled: boolean
  onClick: () => void
} & DownloadConnector

let Button: React.FC<ButtonProps> = (props) => {
  const { name, disabled, providedImageSrc, onClick, downloadLink } = props

  const btnClassName = cx(
    'w-full h-10 p-2 text-white hover:text-grey-60 group text-heading-h5',
    {
      'cursor-not-allowed grayscale': disabled,
    }
  )

  const titleClassName = cx('flex-1 text-left', downloadLink ? 'text-grey-80' : 'text-grey-90')

  return (
    <ButtonBase
      className={btnClassName}
      toTab={downloadLink}
      disabled={disabled}
      onClick={downloadLink ? undefined : onClick}
    >
      <div className="relative flex items-center font-semibold">
        <WalletIcon className={cx('size-7 mr-3', downloadLink && 'grayscale')} name={name} providedImageSrc={providedImageSrc} />
        <Message className={titleClassName} value={name} />
        {
          downloadLink && (
            <div className="flex items-center">
              <Icon className="size-5 mr-2 text-grey-70 group-hover:text-grey-90" name="interface/download" />
              <Message className="text-grey-80 group-hover:text-grey-90" value={messages.install} />
            </div>
          )
        }
      </div>
    </ButtonBase>
  )
}

Button = memo(Button)

type ButtonsProps = {
  onClick: (connector: Connector) => void
}

const Buttons: React.FC<ButtonsProps> = ({ onClick }) => {
  const { connectors, isPending } = useConnect()

  const finalConnectors = useMemo<(Connector & DownloadConnector)[]>(() => {
    const isSeveralInjectedDetected = connectors.filter(({ type }) => type === 'injected').length > 1

    return connectors
      // type and id are different, id "injected" is generic injected connector,
      // in case of found 2 or more injected they all will be "{ type: "injected", name: "Wallet Name" }"
      // but it's possible to have 1 injected wallet but 2 connectors:
      //  - valid wallet connector with correct name
      //  - generic "injected" which will connect the same wallet
      .filter(({ id, name }) => isSeveralInjectedDetected ? id !== 'injected' && name !== 'Injected' : true)
      .map((connector) => {
        const { id, name, type } = connector
        const isDisabledMetamask = !window.ethereum && type === 'injected' && id === 'injected' && name === 'Injected'

        if (!isDisabledMetamask) {
          return connector
        }

        return {
          ...connector,
          name: 'MetaMask',
          downloadLink: `https://metamask.app.link/dapp/${constants.baseUrl.replace('https://', '')}/app`,
        } as (Connector & DownloadConnector)
      })
      .sort(({ type }) => type === 'injected' ? -1 : 1)
  }, [ connectors ])

  return (
    <div className="">
      {
        finalConnectors.map((connector) => {
          const { id, name, icon, downloadLink } = connector

          return (
            <Button
              key={`${id}-${name}`}
              name={name}
              providedImageSrc={icon}
              downloadLink={downloadLink}
              disabled={isPending}
              onClick={() => onClick(connector)}
            />
          )
        })
      }
    </div>
  )
}

export default Buttons
