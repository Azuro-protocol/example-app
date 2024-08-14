'use client'

import React from 'react'
import { type GameMarkets, ConditionStatus } from '@azuro-org/toolkit'
import cx from 'classnames'
import { useChain } from '@azuro-org/sdk'
import { Message } from '@locmod/intl'
import { formatToFixed } from 'helpers/formatters'

import messages from './messages'


type OutcomeButtonProps = {
  outcome: GameMarkets[0]['outcomeRows'][0][0]
  summary?: string
  size?: 28 | 40
}

const OutcomeButton: React.FC<OutcomeButtonProps> = ({ outcome, summary, size = 28 }) => {
  const { selectionName, status, isWon } = outcome

  const { betToken } = useChain()

  const isCanceled = status === ConditionStatus.Canceled

  const buttonClassName = cx(
    'w-full relative flex items-center justify-between px-3 overflow-hidden',
    'text-caption-13 font-semibold border-none rounded-min select-none',
    {
      'h-7': size === 28,
      'h-10': size === 40,
      'bg-result-button-won': !isCanceled && isWon,
      'bg-result-button-lost': !isCanceled && !isWon,
    }
  )
  const titleClassName = cx('text-left whitespace-normal')

  const betsSummaryClassName = cx({
    'text-accent-red': !isWon,
    'text-accent-green': isWon,
  })

  return (
    <div className={buttonClassName}>
      <div className={titleClassName}>
        {selectionName}
      </div>
      {
        isCanceled && (
          <Message className="text-white" value={messages.refunded} />
        )
      }
      {
        Boolean(!isCanceled && summary) && (
          <div className={betsSummaryClassName}>{`${formatToFixed(summary!, 3)} ${betToken.symbol}`}</div>
        )
      }
    </div>
  )
}

export default OutcomeButton
