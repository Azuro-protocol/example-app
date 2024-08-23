import { useState } from 'react'
import localStorage from '@locmod/local-storage'
import { constants } from 'helpers'

import type { ViewValue } from '../components/Headline/components'


const useView = () => {
  const storageView = localStorage.getItem(constants.localStorageKeys.gameMarketsView)
  const [ activeView, setActiveView ] = useState<ViewValue>(storageView || 'rows')

  const handleChangeView = (view: ViewValue) => {
    setActiveView(view)
    localStorage.setItem(constants.localStorageKeys.gameMarketsView, view)
  }

  return {
    activeView,
    changeView: handleChangeView,
  }
}

export default useView
