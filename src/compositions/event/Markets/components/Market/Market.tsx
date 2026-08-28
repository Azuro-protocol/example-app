'use client'

import React, { useMemo } from 'react'
import { isOutcomeSettled, type GameData, type Market as TMarket, type MarketCondition, type OutcomeState } from '@azuro-org/toolkit'
import { useOutcomesState } from '@azuro-org/sdk'
import cx from 'classnames'

import { Tooltip } from 'components/feedback'
import { Icon } from 'components/ui'

import Condition, { getOutcomeKey } from '../Condition/Condition'


/**
 * A hidden condition wasn't offered by the feed, and while the game runs which of those to show is
 * already decided upstream by the hook the markets come from - it weighs the live visibility of
 * every condition of the game, so re-reading the fetched flag here would drop the ones it
 * deliberately revealed.
 *
 * Once the game is over the hidden conditions are fetched on purpose, to show how they settled. One
 * that settled to nothing has no result to show and only duplicates the condition that did resolve
 * the same market, so it's withdrawn.
 */
const getIsWithdrawn = (condition: MarketCondition, outcomeStates: Record<string, OutcomeState>, isGameOver: boolean) => {
  if (!isGameOver || !condition.hidden) {
    return false
  }

  return !condition.outcomes.some((outcome) => isOutcomeSettled(outcomeStates[getOutcomeKey(outcome)]))
}

type MarketProps = {
  market: TMarket
  game: GameData
  isGameOver: boolean
  isCollapsed: boolean
  betsSummary?: Record<string, string>
  onCollapse: (marketKey: string) => void
}

const Market: React.FC<MarketProps> = (props) => {
  const { market, game, isGameOver, isCollapsed, betsSummary, onCollapse } = props
  const { marketKey, name, description, category, conditions } = market

  const outcomes = useMemo(() => conditions.flatMap(({ outcomes }) => outcomes), [ conditions ])

  // The whole market subscribes once, one level above its conditions: whether a condition has
  // settled decides both which of them render and whether this market has anything left to show, so
  // it can't be answered inside a condition that has already drawn the market's header.
  const { data: outcomeStates } = useOutcomesState({ outcomes })

  const shownConditions = conditions.filter((condition) => !getIsWithdrawn(condition, outcomeStates, isGameOver))

  if (!shownConditions.length) {
    return null
  }

  return (
    <div>
      <button
        className={
          cx('flex items-center justify-between p-4 w-full group cursor-pointer', {
            'border-b border-b-grey-10': isCollapsed,
          })
        }
        onClick={() => onCollapse(marketKey)}
      >
        <div className="flex items-center">
          <div className="text-caption-14 font-semibold">{name}</div>
          {
            Boolean(description) && (
              <Tooltip
                text={description}
                placement="bottom"
                width={400}
              >
                <div className="w-fit ml-1 cursor-pointer text-grey-60 hover:text-grey-90">
                  <Icon className="size-4" name="interface/info-circle" />
                </div>
              </Tooltip>
            )
          }
        </div>
        <div className="px-2 bg-grey-10 text-grey-60 group-hover:bg-grey-15 group-hover:text-grey-90 rounded-ssm">
          <Icon className="size-4" name={isCollapsed ? 'interface/chevron_down' : 'interface/chevron_up'} />
        </div>
      </button>
      {
        !isCollapsed && (
          <div className="space-y-2 bg-bg-l2 rounded-sm p-2">
            {
              shownConditions.map((condition) => (
                <Condition
                  key={condition.conditionId}
                  condition={condition}
                  category={category}
                  marketName={name}
                  game={game}
                  outcomeStates={outcomeStates}
                  betsSummary={betsSummary}
                />
              ))
            }
          </div>
        )
      }
    </div>
  )
}

export default Market
