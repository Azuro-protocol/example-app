'use client'

import React from 'react'
import { type GameQuery, GameState } from '@azuro-org/toolkit'
import { useActiveMarkets } from '@azuro-org/sdk'

import { MarketsSkeleton } from 'compositions/events/Markets/Markets'
import Market from 'compositions/events/Markets/components/Market/Market'


type UniqueMarketsProps = {
  game: NonNullable<GameQuery['game']>
  gameState: GameState
}


const UniqueMarkets: React.FC<UniqueMarketsProps> = ({ game, gameState }) => {
  const { data: markets, isFetching } = useActiveMarkets({
    gameId: game.gameId,
    query: {
      refetchInterval: 30_000,
    },
  })


  if (isFetching || gameState === GameState.Live && !markets?.length) {
    return <MarketsSkeleton />
  }

  return (
    <div className="w-full">
      {/* TODO */}
      {/* {
        markets.map(market => (
          <Market
            key={market.marketKey}
            market={market}
            game={game}
          />
        ))
      } */}
    </div>
  )
}

export default UniqueMarkets
