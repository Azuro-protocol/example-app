import { useBaseBetslip, useSelectionOdds } from '@azuro-org/sdk'
import { type GameQuery, type MarketOutcome } from '@azuro-org/toolkit'
import { type MutableRefObject } from 'react'

import useOddsChange from 'src/hooks/useOddsChange'


type UseButtonProps = {
  marketName: string
  outcome: MarketOutcome
  game: NonNullable<GameQuery['game']>
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
    }
    else {
      addItem({
        marketName,
        game,
        ...outcome,
      })
    }
  }

  return {
    odds,
    isActive,
    isOddsFetching,
    onClick,
  }
}

export default useButton
