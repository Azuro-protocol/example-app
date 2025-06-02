'use client'

import { useBaseBetslip, useChain, useDetailedBetslip } from '@azuro-org/sdk'
import { Message } from '@locmod/intl'
import dynamic from 'next/dynamic'
import { openModal } from '@locmod/modal'
import React, { useEffect } from 'react'

import { Icon } from 'components/ui'

import messages from './messages'


const SelectFreebetModal = dynamic(() => import('./components/SelectFreebetModal/SelectFreeBetModal'))

const SelectFreebet: React.FC = () => {
  const { betToken } = useChain()
  const { items } = useBaseBetslip()
  const { freebets, selectedFreebet, selectFreebet, isFreebetsFetching } = useDetailedBetslip()

  const clearFreebet = () => {
    selectFreebet(undefined)
  }

  useEffect(() => {
    if (selectedFreebet) {
      clearFreebet()
    }
  }, [ items ])

  if (!freebets?.length && !isFreebetsFetching) {
    return null
  }

  return (
    <>
      <div className="-mx-2 border-t border-t-grey-10 group bg-bg-l1 relative z-10">
        {
          Boolean(selectedFreebet) ? (
            <div className="py-2 px-5 flex items-center justify-between text-caption-13 font-semibold">
              <div className="flex items-center text-accent-green">
                <Icon className="size-4" name="interface/gift" />
                <Message className="uppercase mx-1" value={messages.freebet} />
              </div>
              <div className="flex items-center">
                <div className="mr-1">{selectedFreebet!.amount} {betToken.symbol}</div>
                <button onClick={clearFreebet}>
                  <Icon className="size-5 text-grey-40 hover:text-grey-90" name="interface/clear" />
                </button>
              </div>
            </div>
          ) : (
            <button
              className="py-2 px-5 flex items-center justify-between text-grey-60 group-hover:text-grey-90 w-full"
              onClick={() => openModal('SelectFreebetModal')}
              disabled={isFreebetsFetching}
            >
              <Message className="text-caption-12" value={messages.apply} />
              <Icon
                className="size-5"
                name={isFreebetsFetching ? 'interface/spinner' : 'interface/chevron_right'}
              />
            </button>
          )
        }
      </div>
      <SelectFreebetModal />
    </>
  )
}

export default SelectFreebet
