'use client'

import React, { useState } from 'react'
import { useChain, useWaveStats } from '@azuro-org/sdk'
import { WaveLevelName } from '@azuro-org/toolkit'
import { useAccount, useDisconnect } from 'wagmi'
import copy from 'copy-to-clipboard'
import { useIsMounted } from 'hooks'
import { Message } from '@locmod/intl'
import cx from 'classnames'
import { constants, shortenAddress } from 'helpers'
import { formatToFixed } from 'helpers/formatters'

import { Icon } from 'components/ui'
import { Href } from 'components/navigation'
import { Dropdown } from 'components/inputs'

import messages from './messages'


const azuroIconClassNameByLevel: Record<WaveLevelName, string> = {
  [WaveLevelName.Grey]: 'fill-gradient-azuro-waves-grey',
  [WaveLevelName.Mist]: 'fill-gradient-azuro-waves-mist',
  [WaveLevelName.Sky]: 'fill-gradient-azuro-waves-sky',
  [WaveLevelName.Blue]: 'fill-gradient-azuro-waves-blue',
  [WaveLevelName.Ultramarine]: 'fill-gradient-azuro-waves-ultramarine',
  [WaveLevelName.Bright]: 'fill-gradient-azuro-waves-bright',
  [WaveLevelName.Brilliant]: 'fill-gradient-azuro-waves-brilliant',
  [WaveLevelName.Royal]: 'fill-gradient-azuro-waves-royal',
}

const AzuroWaves: React.FC = () => {
  const { address } = useAccount()
  const { data, isFetching } = useWaveStats({
    account: address!,
  })

  const { points, levelDescription: { name } } = data || { points: '0', levelDescription: { name: WaveLevelName.Grey } }

  return (
    <Href
      className="rounded-4 p-2 mt-2 bg-grey-10 rounded-sm block"
      toTab={constants.links.waves}
    >
      <div className="flex items-center w-full justify-between">
        <div className="flex items-center">
          <Icon
            name="interface/azuro_wave"
            className={cx('size-6', azuroIconClassNameByLevel[name])}
          />
          <div className="ml-2">
            <Message
              className="text-caption-12 font-semibold capitalize"
              value={messages.wave.title}
              tag="p"
            />
            <Message
              className="text-caption-12 text-grey-60 mt-[2px]"
              value={{ ...messages.wave.text, values: { level: name } }}
              tag="p"
            />
          </div>
        </div>
        {
          isFetching ? (
            <div className="bone h-[0.875rem] w-5 rounded-full" />
          ) : (
            <div className="text-caption-12 font-semibold">{formatToFixed(points || 0, 2)}</div>
          )
        }
      </div>
    </Href>
  )
}

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
        <AzuroWaves />
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
