'use client'

import React, { useMemo } from 'react'
import { type GameData, type MarketOutcome } from '@azuro-org/toolkit'

import OutcomeButton from 'compositions/OutcomeButton/OutcomeButton'

import { getScoredOutcomes } from '../../utils/score'
import PickerPlaceholder from '../PickerPlaceholder/PickerPlaceholder'

import ScoreStepper from './ScoreStepper'
import useScoreField from './utils/useScoreField'
import messages from './messages'


type ScorePickerProps = {
  outcomes: MarketOutcome[]
  marketName: string
  game: GameData
  isConditionLocked: boolean
}

const ScorePicker: React.FC<ScorePickerProps> = (props) => {
  const { outcomes, marketName, game, isConditionLocked } = props

  // Map every score outcome by "home-away" and find the highest score on each
  // side — those caps bound the steppers.
  const { outcomeByScore, maxHome, maxAway } = useMemo(() => {
    const outcomeByScore = new Map<string, MarketOutcome>()
    let maxHome = 0
    let maxAway = 0

    getScoredOutcomes(outcomes).forEach(({ outcome, score }) => {
      outcomeByScore.set(`${score.home}-${score.away}`, outcome)
      maxHome = Math.max(maxHome, score.home)
      maxAway = Math.max(maxAway, score.away)
    })

    return { outcomeByScore, maxHome, maxAway }
  }, [ outcomes ])

  const home = useScoreField(maxHome)
  const away = useScoreField(maxAway)

  const matched = outcomeByScore.get(`${home.value}-${away.value}`)

  return (
    <div className="flex items-end justify-center gap-3 ds:gap-6 max-w-md mx-auto">
      <ScoreStepper
        className="flex-none"
        label={game.participants?.[0]?.name}
        value={home.value}
        max={maxHome}
        onChange={home.set}
      />
      <div className="w-full min-w-0">
        {
          matched ? (
            <OutcomeButton
              key={matched.outcomeId}
              marketName={marketName}
              outcome={matched}
              game={game}
              isLocked={isConditionLocked}
              size={40}
            />
          ) : (
            <PickerPlaceholder message={messages.notAvailable} />
          )
        }
      </div>
      <ScoreStepper
        className="flex-none"
        label={game.participants?.[1]?.name}
        value={away.value}
        max={maxAway}
        onChange={away.set}
      />
    </div>
  )
}

export default ScorePicker
