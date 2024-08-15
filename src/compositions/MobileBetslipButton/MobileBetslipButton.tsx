'use client'

import React from 'react'
import { useBaseBetslip } from '@azuro-org/sdk'
import { openModal } from '@locmod/modal'
import dynamic from 'next/dynamic'

import { Button } from 'components/inputs'
import { Media } from 'components/layout'

import messages from './messages'


const BetslipModal = dynamic(() => import('./components/BetslipModal/BetslipModal'))

const MobileBetslipButton: React.FC = () => {
  const { items } = useBaseBetslip()

  return (
    <>
      <Button
        className="fixed left-1/2 -translate-x-1/2 bottom-2 z-[40]"
        title={messages.title}
        style="primary"
        leftIcon="interface/betslip"
        rightNode={
          items.length ? (
            <div className="bg-grey-90 text-caption-13 font-semibold px-1 min-w-8 h-8 ml-2 text-bg-l0 rounded-min flex items-center justify-center -mr-3">{items.length}</div>
          ) : undefined
        }
        size={40}
        onClick={() => openModal('BetslipModal')}
      />
      <Media narrow mobile>
        <BetslipModal />
      </Media>
    </>
  )
}

export default MobileBetslipButton
