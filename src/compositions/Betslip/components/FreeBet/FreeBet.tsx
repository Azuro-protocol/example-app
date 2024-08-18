'use client'

import { useBaseBetslip, useChain, useDetailedBetslip } from '@azuro-org/sdk'
import { Message } from '@locmod/intl'
import dynamic from 'next/dynamic'
import { openModal } from '@locmod/modal'
import React, { useEffect } from 'react'

import { Icon } from 'components/ui'

import messages from './messages'


const SelectFreeBetModal = dynamic(() => import('./components/SelectFreeBetModal/SelectFreeBetModal'))

const FreeBet: React.FC = () => {
  const { betToken } = useChain()
  const { items } = useBaseBetslip()
  const { freeBets, selectedFreeBet, selectFreeBet } = useDetailedBetslip()

  const clearFreeBet = () => {
    selectFreeBet(undefined)
  }

  useEffect(() => {
    if (selectedFreeBet && items.length > 1) {
      clearFreeBet()
    }
  }, [ selectedFreeBet ])

  if (!freeBets?.length || items.length > 1) {
    return null
  }

  return (
    <>
      <div className="-mx-2 border-t border-t-grey-10 group">
        {
          Boolean(selectedFreeBet) ? (
            <div className="py-2 px-5 flex items-center justify-between text-caption-13 font-semibold">
              <div className="flex items-center text-accent-green">
                <Icon className="size-4" name="interface/gift" />
                <Message className="uppercase mx-1" value={messages.freebet} />
                <div>#{selectedFreeBet!.id}</div>
              </div>
              <div className="flex items-center">
                <div className="mr-1">{selectedFreeBet!.amount} {betToken.symbol}</div>
                <button onClick={clearFreeBet}>
                  <Icon className="size-5 text-grey-40 hover:text-grey-90" name="interface/clear" />
                </button>
              </div>
            </div>
          ) : (
            <div
              className="py-2 px-5 flex items-center justify-between text-grey-60 group-hover:text-grey-90 cursor-pointer"
              onClick={() => openModal('SelectFreeBetModal')}
            >
              <Message className="text-caption-12" value={messages.apply} />
              <Icon className="size-5" name="interface/chevron_right" />
            </div>
          )
        }
      </div>
      <SelectFreeBetModal />
    </>
  )
}

export default FreeBet
