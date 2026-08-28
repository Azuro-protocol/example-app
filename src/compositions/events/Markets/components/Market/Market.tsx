'use client'

import React from 'react'
import cx from 'classnames'
import { ConditionState, type GameData, type Market as TMarket } from '@azuro-org/toolkit'

import { Icon } from 'components/ui'
import OutcomeButton from 'compositions/OutcomeButton/OutcomeButton'


type ConditionButtonsProps = {
  marketName: string
  condition: TMarket['conditions'][0]
  game: GameData
  conditionStates: Record<string, ConditionState>
}

const ConditionButtons: React.FC<ConditionButtonsProps> = ({ marketName, condition, game, conditionStates }) => {
  const { conditionId, outcomes } = condition

  const isConditionLocked = conditionStates[conditionId] !== ConditionState.Active

  return (
    <div className={cx('grid gap-x-2 gap-y-3 w-full mt-2 first-of-type:mt-0', outcomes.length === 3 ? 'grid-cols-3' : 'grid-cols-2')}>
      {
        outcomes.map((outcome) => (
          <OutcomeButton
            key={`${outcome.conditionId}-${outcome.outcomeId}`}
            marketName={marketName}
            outcome={outcome}
            game={game}
            isLocked={isConditionLocked}
          />
        ))
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
  expandCount?: number
  onExpand?: () => void
}

const Market: React.FC<MarketProps> = ({ market, game, conditionStates, expandCount, onExpand }) => {
  const { name, conditions } = market

  return (
    <div className="w-full mt-2 first-of-type:mt-0">
      {
        expandCount && onExpand ? (
          <div className="mb-[0.375rem] mt-auto grid grid-cols-[1fr_auto_1fr] items-center text-caption-12 font-medium text-grey-60">
            <span />
            <span className="truncate text-center">{name}</span>
            <button
              className="ml-auto flex items-center h-5 pl-2 pr-1 rounded-min border border-grey-20 text-caption-12 text-grey-60 hover:text-grey-90 whitespace-nowrap"
              onClick={onExpand}
            >
              +{expandCount}
              <Icon name="interface/chevron_right" className="size-4" />
            </button>
          </div>
        ) : (
          <div className="mb-[0.375rem] mt-auto text-caption-12 font-medium text-grey-60 ds:text-center">
            {name}
          </div>
        )
      }
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
