'use client'

import React from 'react'
import { OutcomeState, type MarketOutcome } from '@azuro-org/toolkit'
import cx from 'classnames'
import { useChain } from '@azuro-org/sdk'
import { Message } from '@locmod/intl'
import { toLocaleString } from 'helpers'

import messages from './messages'


type OutcomeResultProps = {
  outcome: MarketOutcome
  /** the outcome's own live state - resolution is per-outcome, the condition doesn't decide it */
  state: OutcomeState
  summary?: string
  size?: 28 | 40
}

const OutcomeResult: React.FC<OutcomeResultProps> = ({ outcome, state, summary, size = 28 }) => {
  const { selectionName } = outcome

  const { betToken } = useChain()

  const isWon = state === OutcomeState.Won
  const isLost = state === OutcomeState.Lost
  // `Canceled` means the outcome was voided and the stake returned
  const isRefunded = state === OutcomeState.Canceled

  const buttonClassName = cx(
    'w-full relative flex items-center justify-between px-3 overflow-hidden',
    'text-caption-13 font-semibold border-none rounded-min select-none',
    {
      'h-7': size === 28,
      'h-10': size === 40,
      'bg-result-button-won': isWon,
      'bg-result-button-lost': isLost,
      // refunded and anything not settled yet stay neutral - only a positively lost outcome looks lost
      'bg-grey-15': !isWon && !isLost,
    }
  )
  const titleClassName = cx('text-left whitespace-normal')

  const betsSummaryClassName = cx({
    'text-accent-green': isWon,
    'text-accent-red': isLost,
    'text-grey-60': !isWon && !isLost,
  })

  return (
    <div className={buttonClassName}>
      <div className={titleClassName}>
        {selectionName}
      </div>
      {
        isRefunded && (
          <Message className="text-grey-90" value={messages.refunded} />
        )
      }
      {
        Boolean(!isRefunded && summary) && (
          <div className={betsSummaryClassName}>
            {`${toLocaleString(summary!, { digits: 1 })} ${betToken.symbol}`}
          </div>
        )
      }
    </div>
  )
}

export default OutcomeResult
