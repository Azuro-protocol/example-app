'use client'

import React from 'react'

import useMarketView from '../../utils/useMarketView'
import ViewToggle from '../ViewToggle/ViewToggle'


type MarketViewSwitcherProps = {
  storageKey: string
  compact: React.ReactNode
  table: React.ReactNode
}

const MarketViewSwitcher: React.FC<MarketViewSwitcherProps> = (props) => {
  const { storageKey, compact, table } = props

  const { activeView, changeView } = useMarketView(storageKey)

  return (
    <>
      <div className="flex justify-end mb-2">
        <ViewToggle activeView={activeView} onChange={changeView} />
      </div>
      {activeView === 'compact' ? compact : table}
    </>
  )
}

export default MarketViewSwitcher
