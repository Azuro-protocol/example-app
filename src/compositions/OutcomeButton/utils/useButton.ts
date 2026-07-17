import { useBaseBetslip, useSelectionOdds } from '@azuro-org/sdk'
import { OutcomeState, type GameData, type MarketOutcome } from '@azuro-org/toolkit'
import { type MutableRefObject } from 'react'

import useOddsChange from 'src/hooks/useOddsChange'


type UseButtonProps = {
  marketName: string
  outcome: MarketOutcome
  game: GameData
  nodeRef: MutableRefObject<HTMLDivElement | null>
}

const useButton = (props: UseButtonProps) => {
  const { marketName, outcome, game, nodeRef } = props

  const { data: odds, isFetching: isOddsFetching } = useSelectionOdds({
    selection: outcome,
    initialOdds: outcome.odds,
  })

  useOddsChange({ odds, nodeRef })

  const { items, addItem, removeItem } = useBaseBetslip()

  const isActive = Boolean(items?.find((item) => {
    const propsKey = `${outcome.gameId}-${outcome.conditionId}-${outcome.outcomeId}`
    const itemKey = `${item.gameId}-${item.conditionId}-${item.outcomeId}`

    return propsKey === itemKey
  }))

  const onClick = () => {
    if (isActive) {
      removeItem(outcome)

      return
    }

    // static fallback guard; the parent's live isLocked -> disabled button is the primary gate for live transitions
    if (outcome.hidden || outcome.state !== OutcomeState.Active) {
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
    isOddsFetching,
    onClick,
  }
}

export default useButton
