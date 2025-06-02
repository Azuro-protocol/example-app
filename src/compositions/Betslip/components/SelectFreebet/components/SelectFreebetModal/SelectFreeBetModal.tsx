'use client'

import React, { useState } from 'react'
import { standaloneModal, type ModalComponent } from '@locmod/modal'
import { useChain, useDetailedBetslip } from '@azuro-org/sdk'
import { type Freebet } from '@azuro-org/toolkit'
import { Message } from '@locmod/intl'
import cx from 'classnames'
import dayjs from 'dayjs'

import { PlainModal } from 'components/feedback'
import { Button } from 'components/inputs'

import messages from './messages'


type SelectFreebetModalProps = {
}

const SelectFreebetModal: ModalComponent<SelectFreebetModalProps> = (props) => {
  const { closeModal } = props

  const { betToken } = useChain()
  const { freebets, selectFreebet } = useDetailedBetslip()
  const [ selectedBonus, setBonus ] = useState<Freebet>()

  const handleClick = () => {
    selectFreebet(selectedBonus)
    closeModal()
  }

  return (
    <PlainModal closeModal={closeModal}>
      <>
        <Message className="text-caption-14 font-semibold" value={messages.title} tag="p" />
        <Message className="text-caption-13 text-grey-60 mt-1" value={messages.text} tag="p" />
        <div className="space-y-2 mt-4">
          {
            freebets?.map((freebet) => {
              const { id, amount } = freebet
              const itemClassName = cx('p-2 flex items-center rounded-md border border-bg-l3', {
                'bg-bg-l3': selectedBonus?.id === id,
              })

              return (
                <div key={id} className={itemClassName} onClick={() => setBonus(freebet)}>
                  <img className="size-14 mr-4 rounded-sm" src="/images/freebet.jpg" alt="" />
                  <div className="">
                    <div className="text-caption-14 font-semibold mb-1">#{id}</div>
                    <div className="flex items-center text-caption-13">
                      <Message className="text-grey-60 mr-1" value={messages.value} />
                      <div className="font-semibold">{amount} {betToken.symbol}</div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        {
          Boolean(selectedBonus) && (
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between text-caption-13">
                <Message className="text-grey-60" value={messages.amount} />
                <div className="font-semibold">{selectedBonus!.amount}</div>
              </div>
              <div className="flex items-center justify-between text-caption-13">
                <Message className="text-grey-60" value={messages.until} />
                <div className="font-semibold">{dayjs(selectedBonus!.expiresAt).format('DD.MM.YYYY, HH:mm')}</div>
              </div>
            </div>
          )
        }
        <Button
          className="mt-4 w-full"
          title={messages.apply}
          size={32}
          disabled={!selectedBonus}
          onClick={handleClick}
        />
      </>
    </PlainModal>
  )
}

declare global {
  interface ModalsRegistry extends ExtendModalsRegistry<{ SelectFreebetModal: typeof SelectFreebetModal }> {}
}

export default standaloneModal('SelectFreebetModal', SelectFreebetModal)
