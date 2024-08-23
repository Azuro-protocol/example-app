import { useMemo, useState } from 'react'
import localStorage from '@locmod/local-storage'
import { type GameMarkets } from '@azuro-org/toolkit'
import { constants } from 'helpers'


const useCollapse = (markets: GameMarkets) => {
  const initialCollapsedMarkets: string[] = localStorage.getItem(constants.localStorageKeys.collapsedMarkets) || []

  const [ collapsedMarketIds, setCollapsedMarketIds ] = useState(initialCollapsedMarkets)

  const marketIds = useMemo<string[]>(() => {
    if (!markets?.length) {
      return []
    }

    return markets.map(({ marketKey }) => marketKey)
  }, [ markets ])

  const areAllCollapsed = !marketIds.some((marketId) => !collapsedMarketIds.includes(marketId))

  const collapse = (marketId: string ) => {
    let newCollapsed: string[]
    const isCollapse = !collapsedMarketIds.includes(marketId)

    if (isCollapse) {
      newCollapsed = [ ...collapsedMarketIds, marketId ]
    }
    else {
      newCollapsed = collapsedMarketIds.filter(market => market !== marketId)
    }

    localStorage.setItem(constants.localStorageKeys.collapsedMarkets, newCollapsed)
    setCollapsedMarketIds(newCollapsed)
  }

  const collapseAll = () => {
    let newCollapsed: string[] = []

    if (!areAllCollapsed) {
      newCollapsed = marketIds
    }

    localStorage.setItem(constants.localStorageKeys.collapsedMarkets, newCollapsed)

    setCollapsedMarketIds(newCollapsed)
  }

  return { areAllCollapsed, collapsedMarketIds, collapse, collapseAll }
}

export default useCollapse
