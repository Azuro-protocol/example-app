'use client'

import { useGame, useGameStatus } from '@azuro-org/sdk'
import { type GameQuery } from '@azuro-org/toolkit'
import { useParams } from 'next/navigation'

import EventInfo from 'compositions/event/EventInfo/EventInfo'
import Markets from 'compositions/event/Markets/Markets'


type ContentProps = {
  game: GameQuery['games'][0]
  isGameInLive: boolean
}

const Content: React.FC<ContentProps> = ({ game, isGameInLive }) => {
  const { status } = useGameStatus({
    graphStatus: game.status,
    startsAt: +game.startsAt,
    isGameExistInLive: isGameInLive,
  })

  return (
    <>
      <EventInfo game={game} status={status} />
      <Markets gameId={game.gameId} gameStatus={status} />
    </>
  )
}

// TODO: Skeleton
export default function EventPage() {
  const params = useParams()

  const { loading, game, isGameInLive } = useGame({
    gameId: params.gameId as string,
  })

  if (loading) {
    return null
  }

  if (!game) {
    return (
      <div>Game info not found</div>
    )
  }

  return (
    <Content game={game} isGameInLive={isGameInLive} />
  )
}
