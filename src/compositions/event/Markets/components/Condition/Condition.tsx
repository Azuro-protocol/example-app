'use client'

import React from 'react'
import { isOutcomeSettled, type GameData, type Market, type MarketOutcome, type OutcomeState } from '@azuro-org/toolkit'
import { useConditionState, useOutcomesState } from '@azuro-org/sdk'

import { constants } from 'helpers'

import OutcomeButton from 'compositions/OutcomeButton/OutcomeButton'

import OutcomeResult from '../OutcomeResult/OutcomeResult'

import CorrectScoreView from './components/CorrectScoreView/CorrectScoreView'
import SearchableMarketView from './components/SearchableMarketView/SearchableMarketView'
import { getOutcomeGridClassName } from './components/OutcomeGrid/OutcomeGrid'


const getOutcomeKey = ({ conditionId, outcomeId }: Pick<MarketOutcome, 'conditionId' | 'outcomeId'>) => (
  `${conditionId}-${outcomeId}`
)

type OutcomeProps = {
  outcome: MarketOutcome
  state: OutcomeState
  marketName: string
  game: GameData
  isConditionLocked: boolean
  summary?: string
}

/**
 * Resolution is per-outcome: within one condition an outcome can be won, lost or voided while its
 * siblings are still bettable, so every cell picks its own presentation instead of the whole page
 * switching between odds and results.
 */
const Outcome: React.FC<OutcomeProps> = (props) => {
  const { outcome, state, marketName, game, isConditionLocked, summary } = props

  if (isOutcomeSettled(state)) {
    return (
      <OutcomeResult
        outcome={outcome}
        state={state}
        summary={summary}
        size={40}
      />
    )
  }

  return (
    <OutcomeButton
      marketName={marketName}
      outcome={outcome}
      game={game}
      isLocked={isConditionLocked}
      size={40}
    />
  )
}

type ConditionProps = {
  condition: Market['conditions'][0]
  category: Market['category']
  marketName: string
  game: GameData
  betsSummary?: Record<string, string>
}

const Condition: React.FC<ConditionProps> = (props) => {
  const { condition, category, marketName, game, betsSummary } = props
  const { conditionId, outcomes, state: initialState } = condition

  // the condition state only drives lock/live behaviour now - it no longer decides won/lost/void
  const { isLocked } = useConditionState({
    conditionId,
    initialState,
  })

  const { data: outcomeStates } = useOutcomesState({ outcomes })

  // pickers exist to compose a bet, so they only make sense while something is still bettable
  const hasBettableOutcomes = outcomes.some((outcome) => !isOutcomeSettled(outcomeStates[getOutcomeKey(outcome)]))

  if (hasBettableOutcomes && category === 'correct_score') {
    return (
      <CorrectScoreView
        outcomes={outcomes}
        marketName={marketName}
        game={game}
        isConditionLocked={isLocked}
      />
    )
  }

  if (hasBettableOutcomes && (category === 'outright' || category === 'players')) {
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
    <div className={getOutcomeGridClassName(outcomes.length)}>
      {
        outcomes.map((outcome) => (
          <Outcome
            key={outcome.outcomeId}
            outcome={outcome}
            state={outcomeStates[getOutcomeKey(outcome)]}
            marketName={marketName}
            game={game}
            isConditionLocked={isLocked}
            summary={betsSummary?.[outcome.outcomeId]}
          />
        ))
      }
    </div>
  )
}

export default Condition
