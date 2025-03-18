'use client'

import { BetType } from '@azuro-org/sdk'
import { Message } from '@locmod/intl'
import React from 'react'
import dynamic from 'next/dynamic'
import useBets from 'src/hooks/useBets'

import { Button } from 'components/inputs'
import EmptyContentComp from 'compositions/EmptyContent/EmptyContent'

import { BetCard } from './components'

import messages from './messages'


const BetDetailsModal = dynamic(() => import('./components/BetDetailsModal/BetDetailsModal'))


const EmptyContent: React.FC = () => {
  return (
    <EmptyContentComp
      className="py-6"
      image="/images/illustrations/smile_sad.png"
      title={messages.empty.title}
      text={messages.empty.text}
    />
  )
}

const AcceptedBets: React.FC = () => {
  const { bets, loading } = useBets(BetType.Accepted)

  if (loading) {
    return (
      <div className="bone rounded-sm h-[7.75rem] w-full" />
    )
  }

  if (!bets?.length) {
    return (
      <EmptyContent />
    )
  }

  return (
    <>
      <div className="p-3">
        <Message className="text-caption-14 font-semibold" value={{ ...messages.title, values: { count: bets.length } }} />
      </div>
      <div className="space-y-2 max-h-[28rem] overflow-auto no-scrollbar">
        {
          // TODO
          bets.map((bet: any) => (
            <BetCard key={bet.tokenId} bet={bet} />
          ))
        }
      </div>
      <Button
        className="w-full mt-3"
        to="/profile"
        style="tertiary"
        title={messages.allBets}
        size={40}
      />
      <BetDetailsModal />
    </>
  )
}

export default AcceptedBets
