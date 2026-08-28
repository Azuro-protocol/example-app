import { useBaseBetslip, useOutcomeState } from '@azuro-org/sdk'
import { type GameData, type MarketOutcome } from '@azuro-org/toolkit'
import { type MutableRefObject } from 'react'

import useOddsChange from 'src/hooks/useOddsChange'


type UseButtonProps = {
  marketName: string
  outcome: MarketOutcome
  game: GameData
  nodeRef: MutableRefObject<HTMLDivElement | null>
  conditionLocked?: boolean
}

const useButton = (props: UseButtonProps) => {
  const { marketName, outcome, game, nodeRef, conditionLocked } = props

  // Whether an outcome is offered at all is decided upstream, by the hook the markets come from,
  // which weighs the live visibility of every outcome of the game. `isInitiallyHidden` only seeds
  // that decision's one-way latch here; the button never reads it back. `hidden` on a fetched
  // record means "the feed hadn't offered this at fetch time", not "don't show this" - and the
  // record isn't rewritten when the feed later offers it, so re-deriving from it would hide, or
  // lock, precisely the outcomes that were revealed.
  const { odds, isLocked: isOutcomeLocked } = useOutcomeState({
    conditionId: outcome.conditionId,
    outcomeId: outcome.outcomeId,
    initialOdds: outcome.odds,
    initialState: outcome.state,
    isInitiallyHidden: outcome.hidden,
  })

  useOddsChange({ odds, nodeRef })

  // deliberately excludes isFetching to avoid a lock flash on initial load
  const isLocked = Boolean(conditionLocked) || isOutcomeLocked

  const { items, addItem, removeItem } = useBaseBetslip()

  const isActive = Boolean(items?.find((item) => {
    const propsKey = `${outcome.gameId}-${outcome.conditionId}-${outcome.outcomeId}`
    const itemKey = `${item.gameId}-${item.conditionId}-${item.outcomeId}`

    return propsKey === itemKey
  }))

  const onClick = () => {
    // a locked outcome already in the betslip must remain removable
    if (isActive) {
      removeItem(outcome)

      return
    }

    if (isLocked) {
      return
    }

    addItem({
      marketName,
      game,
      ...outcome,
    })
  }

  return {
    odds,
    isActive,
    isLocked,
    onClick,
  }
}

export default useButton
