'use client'

import React from 'react'
import { type GameData, type MarketOutcome } from '@azuro-org/toolkit'

import MarketViewSwitcher from '../MarketViewSwitcher/MarketViewSwitcher'
import OutcomePicker from '../OutcomePicker/OutcomePicker'
import OutcomeGrid from '../OutcomeGrid/OutcomeGrid'


type SearchableMarketViewProps = {
  storageKey: string
  outcomes: MarketOutcome[]
  marketName: string
  game: GameData
  isConditionLocked: boolean
}

const SearchableMarketView: React.FC<SearchableMarketViewProps> = (props) => {
  const { storageKey, outcomes, marketName, game, isConditionLocked } = props

  return (
    <MarketViewSwitcher
      storageKey={storageKey}
      compact={
        (
          <OutcomePicker
            outcomes={outcomes}
            marketName={marketName}
            game={game}
            isConditionLocked={isConditionLocked}
          />
        )
      }
      table={
        (
          <OutcomeGrid
            outcomes={outcomes}
            marketName={marketName}
            game={game}
            isConditionLocked={isConditionLocked}
          />
        )
      }
    />
  )
}

export default SearchableMarketView
