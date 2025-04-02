'use client'

import { useEffect } from 'react'
import { useGame, useGameState } from '@azuro-org/sdk'
import { GameState, type GameQuery } from '@azuro-org/toolkit'
import { useParams } from 'next/navigation'
import { liveStatisticsGameIdStore } from 'helpers/stores'

import EventInfo, { EventInfoSkeleton } from 'compositions/event/EventInfo/EventInfo'
import Markets, { MarketsSkeleton } from 'compositions/event/Markets/Markets'


type ContentProps = {
  game: NonNullable<GameQuery['game']>
}

const Content: React.FC<ContentProps> = ({ game }) => {
  const { data: state } = useGameState({
    gameId: game.gameId,
    initialState: game.state,
  })

  useEffect(() => {
    if (game?.state === GameState.Live) {
      liveStatisticsGameIdStore.setGameId(game.gameId)
    }
  }, [ game ])

  return (
    <>
      <EventInfo game={game!} state={state} />
      <Markets gameState={state} game={game} />
    </>
  )
}

export default function EventPage() {
  const params = useParams()

  const { data: game, isFetching } = useGame({
    gameId: params.gameId as string,
  })

  if (isFetching) {
    return (
      <>
        <EventInfoSkeleton />
        <MarketsSkeleton />
      </>
    )
  }

  if (!game) {
    return (
      <div>Game info not found</div>
    )
  }

  return (
    <Content game={game} />
  )
}
