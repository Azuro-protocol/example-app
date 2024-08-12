'use client'

import React, { useState } from 'react'
import { Message } from '@locmod/intl'
import { useAccount } from 'wagmi'
import { useIsMounted } from 'hooks'
import copy from 'copy-to-clipboard'
import cx from 'classnames'
import { useChain } from '@azuro-org/sdk'
import { shortenAddress } from 'helpers'

import { Icon } from 'components/ui'
import messages from './messages'


const User: React.FC = () => {
  const { address } = useAccount()
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

  const itemClassName = 'flex items-center text-grey-60 transition hover:text-grey-90 text-caption-13 hover:underline ml-3 cursor-pointer'

  return (
    <div className="p-6 flex items-center">
      <Icon className="size-16 mr-4 stroke-grey-70 fill-transparent" name="interface/user_avatar" />
      <div>
        <Message className="text-heading-h3 font-bold" value={messages.user} tag="p" />
        <div className="flex items-center mt-2">
          <div className="text-caption-14">{shortenAddress(address!)}</div>
          <div className={itemClassName} onClick={handleCopyClick}>
            <div className={cx({ '!text-accent-green': isCopied })}>
              <Icon className="size-4" name={isCopied ? 'interface/check' : 'interface/copy'} />
            </div>
            <Message className="ml-1" value={messages.copy} />
          </div>
          <a
            href={`${appChain.blockExplorers!.default.url}/address/${address}`}
            target="_blank"
            rel="noreferrer"
            className={itemClassName}
          >
            <Icon className="size-4" name="interface/external_link" />
            <Message className="ml-1" value={messages.view} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default User
