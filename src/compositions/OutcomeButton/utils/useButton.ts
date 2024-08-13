import { useBaseBetslip, useSelection } from '@azuro-org/sdk'
import { type GameMarkets } from '@azuro-org/toolkit'
import { type MutableRefObject } from 'react'

import useOddsChange from 'src/hooks/useOddsChange'


type UseButtonProps = {
  outcome: GameMarkets[0]['outcomeRows'][0][0]
  nodeRef: MutableRefObject<HTMLDivElement | null>
}

const useButton = ({ outcome, nodeRef }: UseButtonProps) => {
  const { odds, isLocked, isOddsFetching } = useSelection({
    selection: outcome,
    initialOdds: outcome.odds,
    initialStatus: outcome.status,
  })
  useOddsChange({ odds, nodeRef })

  const { items, addItem, removeItem } = useBaseBetslip()

  const isActive = Boolean(items?.find((item) => {
    const propsKey = `${outcome.coreAddress}-${outcome.lpAddress}-${outcome.gameId}-${outcome.conditionId}-${outcome.outcomeId}`
    const itemKey = `${item.coreAddress}-${item.lpAddress}-${item.game.gameId}-${item.conditionId}-${item.outcomeId}`

    return propsKey === itemKey
  }))

  const onClick = () => {
    if (isLocked) {
      return
    }

    if (isActive) {
      removeItem(outcome)
    }
    else {
      addItem(outcome)
    }
  }

  return {
    odds,
    isActive,
    isLocked,
    isOddsFetching,
    onClick,
  }
}

export default useButton
