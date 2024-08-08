import { useBaseBetslip, useSelection } from '@azuro-org/sdk'
import { type GameMarkets } from '@azuro-org/toolkit'
import { useMemo, useRef, type MutableRefObject } from 'react'


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
  const prevOdds = useRef<number>()
  const timerRef = useRef<NodeJS.Timeout | null>(null)


  useMemo(() => {
    if (prevOdds.current) {
      if (prevOdds.current === odds) {
        return
      }

      nodeRef.current?.classList.remove('increased', 'decreased')
      clearTimeout(timerRef.current!)

      nodeRef.current?.classList.add(odds > prevOdds.current ? 'increased' : 'decreased')

      timerRef.current = setTimeout(() => {
        nodeRef.current?.classList.remove('increased', 'decreased')
      }, 1500)
    }

    prevOdds.current = odds
  }, [ odds ])

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
