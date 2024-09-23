import React from 'react'
import { type Sport } from 'hooks'

import Game from 'compositions/events/Game/Game'


type UniqueEventsProps = {
  leagues: Sport['leagues']
}

const UniqueEvents: React.FC<UniqueEventsProps> = ({ leagues }) => {
  return (
    <div className="space-y-px">
      {
        leagues.map(({ countrySlug, slug, games }) => {
          const leagueUrl = `/unique/${countrySlug}/${slug}`

          return games.map(game => (
            <Game
              key={`${leagueUrl}/${game.gameId}`}
              leagueUrl={leagueUrl}
              game={game}
              isUnique
            />
          ))
        })
      }
    </div>
  )
}

export default UniqueEvents
