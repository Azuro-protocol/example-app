import { useBaseBetslip, useOutcomeState } from '@azuro-org/sdk'
import { type GameData, type MarketOutcome } from '@azuro-org/toolkit'
import { type MutableRefObject, useRef } from 'react'

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

  const { odds, isLocked: isOutcomeLocked, isHidden: liveHidden } = useOutcomeState({
    conditionId: outcome.conditionId,
    outcomeId: outcome.outcomeId,
    initialOdds: outcome.odds,
    initialState: outcome.state,
    isInitiallyHidden: outcome.hidden,
  })

  useOddsChange({ odds, nodeRef })

  // don't hide if previously outcome was NOT hidden to avoid flickering
  const hiddenRef = useRef(outcome.hidden)

  if (liveHidden === false && hiddenRef.current) {
    hiddenRef.current = false
  }

  const isHidden = hiddenRef.current

  // deliberately excludes isFetching to avoid a lock flash on initial load
  const isLocked = Boolean(conditionLocked) || isOutcomeLocked || isHidden

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
    isHidden,
    onClick,
  }
}

export default useButton
