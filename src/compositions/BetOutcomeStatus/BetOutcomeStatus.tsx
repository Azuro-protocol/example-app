'use client'

import React from 'react'
import { type BetOutcome } from '@azuro-org/sdk'
import { Message } from '@locmod/intl'
import cx from 'classnames'

import messages from './messages'


export type BetOutcomeState = 'won' | 'lost' | 'refunded' | 'pending'

/**
 * Settlement is per leg, so a combo can hold a won, a lost, a voided and a still-running leg at
 * once. A voided leg reports `isWin: false, isLose: false, isCanceled: true` - the void has to be
 * checked first, otherwise it reads as "settled and not won", i.e. lost.
 */
export const getBetOutcomeState = ({ isWin, isLose, isCanceled }: Pick<BetOutcome, 'isWin' | 'isLose' | 'isCanceled'>): BetOutcomeState => {
  if (isCanceled) {
    return 'refunded'
  }

  if (isWin) {
    return 'won'
  }

  if (isLose) {
    return 'lost'
  }

  return 'pending'
}

type BetOutcomeStatusProps = {
  className?: string
  state: BetOutcomeState
}

/** Names a settled leg's result. Renders nothing while the leg is still pending. */
const BetOutcomeStatus: React.FC<BetOutcomeStatusProps> = ({ className, state }) => {
  if (state === 'pending') {
    return null
  }

  return (
    <Message
      className={
        cx('font-semibold', className, {
          'text-accent-green': state === 'won',
          'text-accent-red': state === 'lost',
          'text-grey-60': state === 'refunded',
        })
      }
      value={messages[state]}
    />
  )
}

export default BetOutcomeStatus
