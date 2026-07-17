'use client'

import React from 'react'
import cx from 'classnames'
import { ConditionState, OutcomeState, type GameData, type Market as TMarket } from '@azuro-org/toolkit'
import { useOutcomesState } from '@azuro-org/sdk'

import OutcomeButton from 'compositions/OutcomeButton/OutcomeButton'


type ConditionButtonsProps = {
  marketName: string
  condition: TMarket['conditions'][0]
  game: GameData
  conditionStates: Record<string, ConditionState>
}

const ConditionButtons: React.FC<ConditionButtonsProps> = ({ marketName, condition, game, conditionStates }) => {
  const { conditionId, outcomes } = condition
  const { outcomesMap } = useOutcomesState({ outcomes })

  const isConditionLocked = conditionStates[conditionId] !== ConditionState.Active

  // individually hidden outcomes are not rendered
  const visibleOutcomes = outcomes.filter((outcome) => {
    const outcomeState = outcomesMap[`${conditionId}-${outcome.outcomeId}`]

    return !(outcomeState?.hidden ?? outcome.hidden)
  })

  if (!visibleOutcomes.length) {
    return null
  }

  return (
    <div className={cx('grid gap-x-2 gap-y-3 w-full mt-2 first-of-type:mt-0', visibleOutcomes?.length === 3 ? 'grid-cols-3' : 'grid-cols-2')}>
      {
        visibleOutcomes.map((outcome) => {
          const outcomeState = outcomesMap[`${conditionId}-${outcome.outcomeId}`]
          const isLocked = isConditionLocked || (outcomeState?.state ?? outcome.state) !== OutcomeState.Active

          return (
            <OutcomeButton
              key={`${outcome.conditionId}-${outcome.outcomeId}`}
              marketName={marketName}
              outcome={outcome}
              game={game}
              isLocked={isLocked}
            />
          )
        })
      }
    </div>
  )
}

type ButtonsProps = {
  marketName: string
  conditions: TMarket['conditions']
  game: GameData
  conditionStates: Record<string, ConditionState>
}

const Buttons: React.FC<ButtonsProps> = ({ marketName, conditions, game, conditionStates }) => {
  return (
    <div className="w-full">
      {
        conditions.map((condition) => (
          <ConditionButtons
            key={condition.conditionId}
            marketName={marketName}
            condition={condition}
            game={game}
            conditionStates={conditionStates}
          />
        ))
      }
    </div>
  )
}

export const MarketSkeleton: React.FC = () => {
  return (
    <div className="w-full mt-2 first-of-type:mt-0">
      <div className="bone w-[110px] h-[0.875rem] ds:mx-auto !block rounded-md mb-[0.375rem]" />
      <div className="grid gap-x-2 gap-y-3 grid-cols-2 w-full">
        <div className="bone w-full h-7 rounded-min" />
        <div className="bone w-full h-7 rounded-min" />
      </div>
    </div>
  )
}

export type MarketProps = {
  market: TMarket
  game: GameData
  conditionStates: Record<string, ConditionState>
}

const Market: React.FC<MarketProps> = ({ market, game, conditionStates }) => {
  const { name, conditions } = market

  return (
    <div className="w-full mt-2 first-of-type:mt-0">
      <div className="mb-[0.375rem] mt-auto text-caption-12 font-medium text-grey-60 ds:text-center">
        {name}
      </div>
      <Buttons
        marketName={name}
        conditions={conditions}
        game={game}
        conditionStates={conditionStates}
      />
    </div>
  )
}

export default Market
