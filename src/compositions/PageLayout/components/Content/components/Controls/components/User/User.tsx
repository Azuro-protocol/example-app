'use client'

import React, { useState } from 'react'
import { useChain } from '@azuro-org/sdk'
import { useAccount, useDisconnect } from 'wagmi'
import copy from 'copy-to-clipboard'
import { useIsMounted } from 'hooks'
import { Message } from '@locmod/intl'
import cx from 'classnames'
import { shortenAddress } from 'helpers'

import { Icon } from 'components/ui'
import { Href } from 'components/navigation'
import { Dropdown } from 'components/inputs'

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

  const buttonClassName = 'px-2 py-1 border border-grey-15 text-grey-60 hover:text-grey-90 transition cursor-pointer rounded-full'

  return (
    <div className="border border-grey-20 p-2 ds:w-[18.75rem] bg-bg-l2 rounded-md overflow-hidden">
      <div className="p-1 bg-bg-l1 mt-2 rounded-md">
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

const User: React.FC = () => {
  return (
    <Dropdown
      className={cx('group')}
      contentClassName="mb:p-0"
      buttonClassName="wd:h-10 -wd:h-8"
      content={<Content />}
      placement="bottomRight"
    >
      <div className="flex items-center text-grey-60 ui-open:text-grey-90 hover:text-grey-90">
        <div className="bg-bg-l2 p-1 rounded-full size-10">
          <Icon className="w-full stroke-grey-70 fill-transparent" name="interface/user_avatar" />
        </div>
        <Icon className="size-5 ui-open:rotate-180 ml-1" name="interface/caret_down" />
      </div>
    </Dropdown>
  )
}

export default User
