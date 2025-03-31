'use client'

import { BetType, useBets } from '@azuro-org/sdk'
import { OrderDirection } from '@azuro-org/toolkit'
import { useAccount } from '@azuro-org/sdk-social-aa-connector'
import { Message } from '@locmod/intl'
import React from 'react'
import dynamic from 'next/dynamic'

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
  const { address } = useAccount()

  const props = {
    filter: {
      bettor: address!,
      type: BetType.Accepted,
    },
    itemsPerPage: 500,
    orderDir: OrderDirection.Desc,
  }
  const { data, isLoading } = useBets(props)

  if (isLoading) {
    return (
      <div className="bone rounded-sm h-[7.75rem] w-full" />
    )
  }

  const { pages } = data || {}

  if (!pages?.length || !pages[0].bets.length) {
    return (
      <EmptyContent />
    )
  }

  return (
    <>
      <div className="p-3">
        <Message
          className="text-caption-14 font-semibold"
          value={{ ...messages.title, values: { count: pages[0].bets.length } }}
        />
      </div>
      <div className="space-y-2 max-h-[28rem] overflow-auto no-scrollbar">
        {
          pages?.map(({ bets, nextPage }) => {
            return (
              <React.Fragment key={`${nextPage}`}>
                {
                  bets.map((bet: any) => (
                    <BetCard key={bet.tokenId} bet={bet} />
                  ))
                }
              </React.Fragment>
            )
          })
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
