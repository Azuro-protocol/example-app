'use client'

import React from 'react'
import { type GameData, type MarketOutcome } from '@azuro-org/toolkit'

import { constants } from 'helpers'

import MarketViewSwitcher from '../MarketViewSwitcher/MarketViewSwitcher'

import CorrectScoreTable from './CorrectScoreTable'
import ScorePicker from './ScorePicker'


type CorrectScoreViewProps = {
  outcomes: MarketOutcome[]
  marketName: string
  game: GameData
  isConditionLocked: boolean
}

const CorrectScoreView: React.FC<CorrectScoreViewProps> = (props) => {
  const { outcomes, marketName, game, isConditionLocked } = props

  return (
    <MarketViewSwitcher
      storageKey={constants.localStorageKeys.correctScoreView}
      compact={
        (
          <ScorePicker
            outcomes={outcomes}
            marketName={marketName}
            game={game}
            isConditionLocked={isConditionLocked}
          />
        )
      }
      table={
        (
          <CorrectScoreTable
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

export default CorrectScoreView
