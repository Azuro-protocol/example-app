import { useEffect, useState } from 'react'
import localStorage from '@locmod/local-storage'


export type MarketView = 'table' | 'compact'

const useMarketView = (storageKey: string, defaultView: MarketView = 'compact') => {
  const [ activeView, setActiveView ] = useState<MarketView>(defaultView)

  useEffect(() => {
    const stored = localStorage.getItem(storageKey)

    if (stored) {
      setActiveView(stored === 'table' ? 'table' : 'compact')
    }
  }, [])

  const changeView = (view: MarketView) => {
    setActiveView(view)
    localStorage.setItem(storageKey, view)
  }

  return {
    activeView,
    changeView,
  }
}

export default useMarketView
