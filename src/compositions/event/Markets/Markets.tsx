'use client'

import React from 'react'
import { GameStatus, type GameMarkets } from '@azuro-org/toolkit'
import { useActiveMarkets, useBetsSummaryBySelection, useResolvedMarkets } from '@azuro-org/sdk'
import { useAccount } from 'wagmi'

import OutcomeButton from 'compositions/OutcomeButton/OutcomeButton'

import ResultButton from './components/ResultButton/ResultButton'


type ContentProps = {
  markets: GameMarkets
  betsSummary?: Record<string, string>
  isResult?: boolean
}

const Content: React.FC<ContentProps> = (props) => {
  const { markets, betsSummary, isResult } = props

  return (
    <div>
      {
        markets.map(({ name, outcomeRows }) => (
          <div key={name}>
            <div className="flex items-center justify-between p-4">
              <div className="text-caption-14 font-semibold">{name}</div>
            </div>
            <div className="space-y-2 bg-bg-l2 rounded-3 p-2">
              {
                outcomeRows.map((outcomes, index) => (
                  <div key={`${index}-${outcomes.length}`} className="flex justify-between">
                    <div className="flex gap-2 w-full">
                      {
                        outcomes.map((outcome) => {
                          const key = outcome.outcomeId

                          if (isResult) {
                            return (
                              <ResultButton
                                key={key}
                                outcome={outcome}
                                summary={betsSummary?.[key]}
                                size={40}
                              />
                            )
                          }

                          return (
                            <OutcomeButton
                              key={key}
                              outcome={outcome}
                              size={40}
                            />
                          )
                        })
                      }
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        ))
      }
    </div>
  )
}

type MarketsProps = {
  gameId: string
  gameStatus: GameStatus
}

const ResolvedMarkets: React.FC<MarketsProps> = ({ gameId, gameStatus }) => {
  const { address } = useAccount()
  const { groupedMarkets, loading } = useResolvedMarkets({ gameId })
  const { betsSummary } = useBetsSummaryBySelection({
    account: address!,
    gameId,
    gameStatus,
  })

  if (loading) {
    return <div>Loading...</div>
  }

  if (!groupedMarkets?.length) {
    return <div>Empty</div>
  }

  return (
    <Content markets={groupedMarkets} betsSummary={betsSummary} isResult />
  )
}

const ActiveMarkets: React.FC<MarketsProps> = ({ gameId, gameStatus }) => {
  const { loading, markets } = useActiveMarkets({
    gameId,
    gameStatus,
    livePollInterval: 10000,
  })

  if (loading) {
    return <div>Loading...</div>
  }

  if (!markets) {
    return <div>Empty</div>
  }

  return (
    <Content markets={markets} />
  )
}

const Markets: React.FC<MarketsProps> = (props) => {
  const { gameStatus } = props

  if (gameStatus === GameStatus.Resolved) {
    return <ResolvedMarkets {...props} />
  }

  return (
    <ActiveMarkets {...props} />
  )
}

export default Markets
