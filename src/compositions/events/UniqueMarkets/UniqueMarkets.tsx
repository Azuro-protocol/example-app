'use client'

import React from 'react'
import { GameState } from '@azuro-org/toolkit'
import { useActiveMarkets } from '@azuro-org/sdk'

import { MarketsSkeleton } from 'compositions/events/Markets/Markets'
import Market from 'compositions/events/Markets/components/Market/Market'


type UniqueMarketsProps = {
  gameId: string
  gameState: GameState
}


const UniqueMarkets: React.FC<UniqueMarketsProps> = ({ gameId, gameState }) => {
  const { data: markets, isFetching } = useActiveMarkets({
    gameId,
    query: {
      refetchInterval: 30_000,
    },
  })


  if (isFetching || gameState === GameState.Live && !markets?.length) {
    return <MarketsSkeleton />
  }

  return (
    <div className="w-full">
      {
        markets.map(market => (
          <Market
            key={market.marketKey}
            market={market}
          />
        ))
      }
    </div>
  )
}

export default UniqueMarkets
