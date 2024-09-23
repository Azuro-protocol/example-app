'use client'

import { type Bet, BetType, useChain } from '@azuro-org/sdk'
import dayjs from 'dayjs'
import { Message } from '@locmod/intl'
import React from 'react'
import useBets from 'src/hooks/useBets'

import { Icon, type IconName } from 'components/ui'
import { Button } from 'components/inputs'
import BetStatus from 'compositions/BetStatus/BetStatus'
import EmptyContentComp from 'compositions/EmptyContent/EmptyContent'

import messages from './messages'


type BetCardProps = {
  bet: Bet
}

const BetCard: React.FC<BetCardProps> = ({ bet }) => {
  const {
    tokenId, createdAt, status: graphBetStatus, amount, outcomes, freebetId,
    isWin, isLose, isLive,
  } = bet

  const { betToken } = useChain()

  const isCombo = outcomes.length > 1
  const isFreeBet = Boolean(freebetId)
  const isUnique = outcomes[0].game.sport.slug === 'unique'

  return (
    <div className="rounded-sm overflow-hidden">
      <div className="flex items-center justify-between bg-bg-l3 py-2 px-3">
        <div className="flex items-center">
          <div className="text-grey-60 text-caption-12 font-medium">
            {`#${tokenId} / ${dayjs(+createdAt * 1000).format('DD.MM.YYYY, HH:mm')}`}
          </div>
        </div>
        <BetStatus
          graphBetStatus={graphBetStatus}
          games={outcomes.map(({ game }) => game)}
          isLiveBet={isLive}
          isWin={isWin}
          isLose={isLose}
        />
      </div>
      <div className="bg-bg-l2 py-2 px-3">
        <div className="flex items-center text-caption-12 font-medium text-grey-60">
          <Icon className="size-4 mr-2" name={`sport/${outcomes[0].game.sport.slug}` as IconName} />
          {
            isCombo ? (
              <>
                <span className="text-ellipsis whitespace-nowrap overflow-hidden mr-1">{outcomes[0].game.title}</span>
                <Message
                  value={messages.others}
                />
              </>
            ) : (
              <>
                {
                  isUnique ? (
                    <div className="text-ellipsis whitespace-nowrap overflow-hidden">{outcomes[0].marketName}</div>
                  ) : (
                    <>
                      <span>{outcomes[0].game.sport.name}</span>
                      <div className="size-1 bg-grey-20 rounded-full mx-1" />
                      <span className="text-ellipsis whitespace-nowrap overflow-hidden">{outcomes[0].game.league.name}</span>
                    </>
                  )
                }
              </>
            )
          }
        </div>
        {
          !isCombo && (
            <div className="mt-2 text-caption-13 font-semibold">
              {outcomes[0].game.title}
            </div>
          )
        }
      </div>
      <div className="mt-px bg-bg-l2 pt-2 px-3 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-caption-12">
            {
              isCombo ? (
                <>
                  <div className="text-grey-60 mr-1">{outcomes.length}</div>
                  <Message className="text-grey-60 mr-1" value={messages.events} />
                  <Message value={messages.combo} />
                </>
              ) : (
                <>
                  {
                    !isUnique && (
                      <div className="text-grey-60 mr-1">{outcomes[0].marketName}:</div>
                    )
                  }
                  <div>{outcomes[0].selectionName}</div>
                </>
              )
            }
          </div>
          <div className="flex items-center">
            <div className="text-caption-12 font-semibold">{amount} {betToken.symbol}</div>
            {
              isFreeBet && (
                <div className="flex items-center text-accent-green ml-2">
                  <Icon className="size-3" name="interface/gift" />
                  <Message className="text-caption-12 font-semibold uppercase ml-1" value={messages.freebet} />
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

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
          bets.map(bet => (
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
    </>
  )
}

export default AcceptedBets
