'use client'

import React from 'react'
import { type GameData, type MarketOutcome } from '@azuro-org/toolkit'
import cx from 'classnames'

import OutcomeButton from 'compositions/OutcomeButton/OutcomeButton'


type OutcomeGridProps = {
  outcomes: MarketOutcome[]
  marketName: string
  game: GameData
  isConditionLocked: boolean
}

export const getOutcomeGridClassName = (outcomeCount: number) => (
  cx('grid gap-x-2 gap-y-2 empty:hidden', outcomeCount % 3 === 0 ? 'grid-cols-3' : 'grid-cols-2')
)

const OutcomeGrid: React.FC<OutcomeGridProps> = (props) => {
  const { outcomes, marketName, game, isConditionLocked } = props

  return (
    <div className={getOutcomeGridClassName(outcomes.length)}>
      {
        outcomes.map((outcome) => (
          <OutcomeButton
            key={outcome.outcomeId}
            marketName={marketName}
            outcome={outcome}
            game={game}
            isLocked={isConditionLocked}
            size={40}
          />
        ))
      }
    </div>
  )
}

export default OutcomeGrid
