'use client'

import React from 'react'
import { GameStatus } from '@azuro-org/toolkit'
import { useActiveMarkets } from '@azuro-org/sdk'

import { MarketsSkeleton } from 'compositions/events/Markets/Markets'
import Market from 'compositions/events/Markets/components/Market/Market'


type UniqueMarketsProps = {
  gameId: string
  gameStatus: GameStatus
}


const UniqueMarkets: React.FC<UniqueMarketsProps> = ({ gameId, gameStatus }) => {
  const { markets, loading } = useActiveMarkets({ gameId, gameStatus, livePollInterval: 30_000 })


  if (loading || gameStatus === GameStatus.Live && !markets?.length) {
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
