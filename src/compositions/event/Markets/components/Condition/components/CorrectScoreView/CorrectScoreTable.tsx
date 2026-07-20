'use client'

import React from 'react'
import { type GameData, type MarketOutcome } from '@azuro-org/toolkit'
import cx from 'classnames'

import OutcomeButton from 'compositions/OutcomeButton/OutcomeButton'

import { getScoredOutcomes } from '../../utils/score'


type CorrectScoreTableProps = {
  outcomes: MarketOutcome[]
  marketName: string
  game: GameData
  isConditionLocked: boolean
}

const CorrectScoreTable: React.FC<CorrectScoreTableProps> = (props) => {
  const { outcomes, marketName, game, isConditionLocked } = props

  return (
    <div className="grid grid-flow-dense grid-cols-3 gap-x-2 gap-y-2 empty:hidden">
      {
        getScoredOutcomes(outcomes).map(({ outcome, score }) => {
          const bucketClassName = score.home > score.away
            ? 'col-start-1 order-1'
            : score.home === score.away
              ? 'col-start-2 order-2'
              : 'col-start-3 order-3'

          return (
            <div key={outcome.outcomeId} className={cx(bucketClassName, 'empty:hidden')}>
              <OutcomeButton
                marketName={marketName}
                outcome={outcome}
                game={game}
                isLocked={isConditionLocked}
                size={40}
              />
            </div>
          )
        })
      }
    </div>
  )
}

export default CorrectScoreTable
