'use client'

import { useChain } from '@azuro-org/sdk'
import React, { useState } from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import copy from 'copy-to-clipboard'
import { useIsMounted } from 'hooks'
import { Message } from '@locmod/intl'
import cx from 'classnames'
import { constants, shortenAddress } from 'helpers'

import { Icon } from 'components/ui'
import { Dropdown } from 'components/inputs'
import { Href } from 'components/navigation'

import messages from './messages'


const Content: React.FC = () => {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const { appChain } = useChain()
  const [ isCopied, setCopied ] = useState(false)
  const isMounted = useIsMounted()

  const handleCopyClick = () => {
    copy(address!)
    setCopied(true)

    setTimeout(() => {
      if (isMounted()) {
        setCopied(false)
      }
    }, 1000)
  }

  const buttonClassName = 'px-2 py-1 border border-grey-15 text-grey-60 hover:text-grey-90 transition cursor-pointer'

  return (
    <div className="border border-grey-20 p-2 ds:w-[18.75rem] bg-bg-l2">
      <div className="p-1 bg-bg-l1">
        <div className="flex items-center justify-between px-2 py-1">
          <div className="flex items-center">
            <div className="p-1 rounded-full bg-grey-10 border border-grey-15 mr-2">
              <Icon className="size-5 stroke-grey-70 fill-transparent" name="interface/user_avatar" />
            </div>
            <div className="text-caption-13">{shortenAddress(address!)}</div>
          </div>
          <div className="flex items-center">
            <div className={cx(buttonClassName, { '!text-accent-green': isCopied })} onClick={handleCopyClick}>
              <Icon className="size-4" name={isCopied ? 'interface/check' : 'interface/copy'} />
            </div>
            <a
              href={`${appChain.blockExplorers!.default.url}/address/${address}`}
              target="_blank"
              rel="noreferrer"
              className={cx(buttonClassName, 'ml-1')}
              onClick={handleCopyClick}
            >
              <Icon className="size-4" name="interface/external_link" />
            </a>
          </div>
        </div>
      </div>
      <Href to="/profile" className="mt-2 p-2 flex items-center text-grey-60 hover:text-grey-90 transition-all">
        <Icon className="size-4 mr-2" name="interface/mybets" />
        <Message className="text-caption-13" value={messages.myBets} />
      </Href>
      <div
        className="p-2 mt-2 flex items-center text-grey-60 hover:text-accent-red transition-all cursor-pointer"
        onClick={() => disconnect()}
      >
        <Icon className="size-4 mr-2" name="interface/logout" />
        <Message className="text-caption-13" value={messages.disconnect} />
      </div>
    </div>
  )
}

type ControlsProps = {
  className?: string
}

const Controls: React.FC<ControlsProps> = ({ className }) => {
  const { address } = useAccount()
  const { appChain } = useChain()

  const rootClassName = cx('wd:h-10 -wd:h-8 bg-transparent flex items-center justify-between border border-grey-15 px-3 w-fit text-grey-60 ui-open:text-grey-90 hover:text-grey-90 ui-open:bg-grey-10 hover:bg-grey-10 ui-open:border-grey-20 hover:border-grey-20 transition-all mb:w-full')

  return (
    <Dropdown
      className={className}
      contentClassName="mb:p-0"
      content={<Content />}
      placement="bottomRight"
    >
      <div className={rootClassName}>
        <div className="flex items-center">
          <div className="border-2 border-bg-l0 rounded-full z-10">
            <Icon
              className="size-5"
              name={constants.chainIcons[appChain.id]}
            />
          </div>
          <Icon
            className="size-5 mr-2 -ml-1 grayscale"
            name={constants.currencyIcons[appChain.id]}
          />
          <div className="text-caption-13">{shortenAddress(address!)}</div>
          <Icon className="size-4 ui-open:rotate-180" name="interface/caret_down" />
        </div>
      </div>
    </Dropdown>
  )
}

export default Controls
