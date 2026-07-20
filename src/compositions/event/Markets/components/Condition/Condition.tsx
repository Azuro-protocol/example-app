'use client'

import React from 'react'
import { type GameData, type Market } from '@azuro-org/toolkit'
import { useConditionState } from '@azuro-org/sdk'

import { constants } from 'helpers'

import OutcomeResult from '../OutcomeResult/OutcomeResult'

import CorrectScoreView from './components/CorrectScoreView/CorrectScoreView'
import SearchableMarketView from './components/SearchableMarketView/SearchableMarketView'
import OutcomeGrid, { getOutcomeGridClassName } from './components/OutcomeGrid/OutcomeGrid'


type ConditionProps = {
  condition: Market['conditions'][0]
  category: Market['category']
  marketName: string
  game: GameData
  betsSummary?: Record<string, string>
  isResult?: boolean
}

const Condition: React.FC<ConditionProps> = (props) => {
  const { condition, category, marketName, game, betsSummary, isResult } = props
  const { conditionId, outcomes, state: initialState } = condition

  const { data: state, isLocked } = useConditionState({
    conditionId,
    initialState,
  })

  if (isResult) {
    return (
      <div className={getOutcomeGridClassName(outcomes.length)}>
        {
          outcomes.map((outcome) => (
            <OutcomeResult
              key={outcome.outcomeId}
              outcome={outcome}
              conditionState={state}
              summary={betsSummary?.[outcome.outcomeId]}
              size={40}
            />
          ))
        }
      </div>
    )
  }

  if (category === 'correct_score') {
    return (
      <CorrectScoreView
        outcomes={outcomes}
        marketName={marketName}
        game={game}
        isConditionLocked={isLocked}
      />
    )
  }

  if (category === 'outright' || category === 'players') {
    const storageKey = category === 'players'
      ? constants.localStorageKeys.playersView
      : constants.localStorageKeys.outrightView

    return (
      <SearchableMarketView
        storageKey={storageKey}
        outcomes={outcomes}
        marketName={marketName}
        game={game}
        isConditionLocked={isLocked}
      />
    )
  }

  return (
    <OutcomeGrid
      outcomes={outcomes}
      marketName={marketName}
      game={game}
      isConditionLocked={isLocked}
    />
  )
}

export default Condition
