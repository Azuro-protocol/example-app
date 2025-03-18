'use client'

import { useEffect } from 'react'
import { useGame } from '@azuro-org/sdk'
import { GameState, type GameQuery } from '@azuro-org/toolkit'
import { useParams } from 'next/navigation'
import { liveStatisticsGameIdStore } from 'helpers/stores'

import EventInfo, { EventInfoSkeleton } from 'compositions/event/EventInfo/EventInfo'
import Markets, { MarketsSkeleton } from 'compositions/event/Markets/Markets'


type ContentProps = {
  game: GameQuery['game']
}

const Content: React.FC<ContentProps> = ({ game }) => {
  // const { status } = useGameStatus({
  //   graphStatus: game.status,
  //   startsAt: +game.startsAt,
  //   isGameExistInLive: isGameInLive,
  // })

  useEffect(() => {
    if (game?.state === GameState.Live) {
      liveStatisticsGameIdStore.setGameId(game.gameId)
    }
  }, [ game ])

  return (
    <>
      <EventInfo game={game} status={game!.state} />
      <Markets gameId={game!.gameId} gameState={game!.state} startsAt={game!.startsAt} />
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
