'use client'

import React, { useState } from 'react'
import { useChain } from '@azuro-org/sdk'
import { chainsData, type ChainId } from '@azuro-org/toolkit'
import { useAccount, useDisconnect } from 'wagmi'
import copy from 'copy-to-clipboard'
import { useIsMounted } from 'hooks'
import { Message } from '@locmod/intl'
import { Listbox } from '@headlessui/react'
import cx from 'classnames'
import { constants, shortenAddress } from 'helpers'

import { Icon } from 'components/ui'
import { Dropdown } from 'components/inputs'
import { Href } from 'components/navigation'

import messages from './messages'


type ChainCurrencyProps = {
  className?: string
  chainClassName?: string
  chainId: ChainId
  size: 4 | 5
  borderColor?: 'bg-l0'| 'grey-10' | 'grey-20'
  withGrayscale?: boolean
}

const ChainCurrency: React.FC<ChainCurrencyProps> = ({ className, chainClassName, chainId, size, withGrayscale }) => {
  return (
    <div className={cx('flex items-center', className)}>
      <div className={cx('border-2 rounded-full z-10 transition-colors', chainClassName)}>
        <Icon
          className={`size-${size}`}
          name={constants.chainIcons[chainId]}
        />
      </div>
      <Icon
        className={cx('-ml-1', `size-${size}`, { 'grayscale': withGrayscale })}
        name={constants.currencyIcons[chainId]}
      />
    </div>
  )
}

const ChainSelect: React.FC = () => {
  const { appChain, setAppChainId } = useChain()

  return (
    <div className="border border-grey-20 p-1 rounded-md">
      <Listbox value={appChain.id} onChange={setAppChainId}>
        <Listbox.Button
          className="p-2 flex items-center justify-between w-full group/select"
        >
          <div className="flex items-center">
            <ChainCurrency
              className="mr-2"
              chainClassName="border-bg-l2"
              chainId={appChain.id}
              size={4}
            />
            <div className="text-caption-13">{appChain.name}</div>
          </div>
          <Icon className="size-4 text-grey-60 hover:text-grey-90 transition-colors group-aria-[controls]/select:rotate-180" name="interface/chevron_down" />
        </Listbox.Button>
        <Listbox.Options className="w-full space-y-[2px]">
          {
            Object.values(chainsData).map(({ chain }) => {
              const isActive = appChain.id === chain.id

              return (
                <Listbox.Option
                  key={chain.id}
                  value={chain.id}
                  className="flex items-center justify-between p-2 cursor-pointer bg-bg-l3 first-of-type:rounded-t-sm last-of-type:rounded-b-sm"
                >
                  <div className="flex items-center">
                    <ChainCurrency
                      chainId={chain.id}
                      chainClassName="border-bg-l3"
                      className="mr-2"
                      size={4}
                    />
                    <div className="text-caption-12">{chain.name}</div>
                  </div>
                  <div
                    className={
                      cx('size-4 border flex items-center justify-center rounded-full',
                        {
                          'border-grey-20': !isActive, 'border-brand-70': isActive,
                        })
                    }
                  >
                    {
                      isActive && (
                        <div className="size-3 bg-brand-50 rounded-full" />
                      )
                    }
                  </div>
                </Listbox.Option>
              )
            })
          }
        </Listbox.Options>
      </Listbox>
    </div>
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

  const buttonClassName = 'px-2 py-1 border border-grey-15 text-grey-60 hover:text-grey-90 transition cursor-pointer'

  return (
    <div className="border border-grey-20 p-2 ds:w-[18.75rem] bg-bg-l2 rounded-md overflow-hidden">
      <ChainSelect />
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

type ControlsProps = {
  className?: string
}

const Controls: React.FC<ControlsProps> = ({ className }) => {
  const { address } = useAccount()
  const { appChain } = useChain()

  const rootClassName = cx('wd:h-10 -wd:h-8 bg-transparent flex items-center justify-between border border-grey-15 px-3 w-fit text-grey-60 ui-open:text-grey-90 hover:text-grey-90 ui-open:bg-grey-10 hover:bg-grey-10 ui-open:border-grey-20 hover:border-grey-20 transition-all mb:w-full rounded-md')

  return (
    <Dropdown
      className={cx('group', className)}
      contentClassName="mb:p-0"
      content={<Content />}
      placement="bottomRight"
    >
      <div className={rootClassName}>
        <div className="flex items-center">
          <ChainCurrency
            className="mr-2"
            chainClassName="border-bg-l0 group-hover:border-grey-10 ui-open:border-grey-10"
            chainId={appChain.id}
            size={5}
          />
          <div className="text-caption-13">{shortenAddress(address!)}</div>
          <Icon className="size-4 ui-open:rotate-180" name="interface/caret_down" />
        </div>
      </div>
    </Dropdown>
  )
}

export default Controls
