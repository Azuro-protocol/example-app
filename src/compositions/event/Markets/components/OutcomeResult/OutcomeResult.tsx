'use client'

import React from 'react'
import { ConditionState, type MarketOutcome } from '@azuro-org/toolkit'
import cx from 'classnames'
import { useChain } from '@azuro-org/sdk'
import { Message } from '@locmod/intl'
import { toLocaleString } from 'helpers'

import messages from './messages'


type OutcomeResultProps = {
  outcome: MarketOutcome
  conditionState: ConditionState
  summary?: string
  size?: 28 | 40
}

const OutcomeResult: React.FC<OutcomeResultProps> = ({ outcome, conditionState, summary, size = 28 }) => {
  const { selectionName, isWon } = outcome

  const { betToken } = useChain()

  const isCanceled = conditionState === ConditionState.Canceled

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
          <Message className="text-grey-90" value={messages.refunded} />
        )
      }
      {
        Boolean(!isCanceled && summary) && (
          <div className={betsSummaryClassName}>
            {`${toLocaleString(summary!, { digits: 1 })} ${betToken.symbol}`}
          </div>
        )
      }
    </div>
  )
}

export default OutcomeResult
