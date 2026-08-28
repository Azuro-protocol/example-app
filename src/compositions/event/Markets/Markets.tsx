'use client'

import React, { useEffect, useState } from 'react'
import { GameState, getIsPendingResolution } from '@azuro-org/toolkit'
import { type GameData, type GameMarkets } from '@azuro-org/toolkit'
import { useActiveMarkets, useBetsSummaryBySelection } from '@azuro-org/sdk'
import { useAccount } from '@azuro-org/sdk-social-aa-connector'
import dayjs from 'dayjs'

import EmptyContent from 'compositions/EmptyContent/EmptyContent'

import Market from './components/Market/Market'
import Headline from './components/Headline/Headline'

import useCollapse from './utils/useCollapse'

import messages from './messages'


export const MarketsSkeleton: React.FC = () => {
  return (
    <div>
      <div className="bone rounded-full w-full h-[2.875rem]" />
      {
        new Array(3).fill(0).map((_, index) => (
          <div key={index}>
            <div className="flex items-center justify-between p-4">
              <div className="bone h-[1.125rem] w-24 rounded-full" />
            </div>
            <div className="space-y-2 bg-bg-l2 rounded-sm p-2">
              <div className="flex justify-between">
                <div className="flex gap-2 w-full">
                  <div className="bone h-10 w-full rounded-min" />
                  <div className="bone h-10 w-full rounded-min" />
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

type ContentProps = {
  markets: GameMarkets
  game: GameData
  isGameOver: boolean
  betsSummary?: Record<string, string>
}

const Content: React.FC<ContentProps> = (props) => {
  const { markets, game, isGameOver, betsSummary } = props

  const { areAllCollapsed, collapsedMarketIds, collapse, collapseAll } = useCollapse(markets)

  return (
    <>
      <Headline
        isCollapsed={areAllCollapsed}
        onCollapse={collapseAll}
      />
      <div className="space-y-2">
        {
          markets.map((market) => (
            <Market
              key={market.marketKey}
              market={market}
              game={game}
              isGameOver={isGameOver}
              isCollapsed={collapsedMarketIds.includes(market.marketKey)}
              betsSummary={betsSummary}
              onCollapse={collapse}
            />
          ))
        }
      </div>
    </>
  )
}

type MarketsProps = {
  game: GameData
  gameState: GameState
}

const WAIT_TIME = 600000
const emptyList: GameMarkets = []

const GameMarkets: React.FC<MarketsProps> = ({ game, gameState }) => {
  const { address } = useAccount()

  // hidden markets stay out of the way while a game runs, but once it's over they're part of the
  // result - a canceled game is just as over as a finished one, and every outcome is refunded
  const isGameOver = gameState === GameState.Finished || gameState === GameState.Canceled

  const { data: markets = emptyList, isLoading, isPlaceholderData } = useActiveMarkets({
    gameId: game.gameId,
    extended: true,
    includeHidden: isGameOver,
    query: {
      refetchInterval: 10_000,
    },
  })

  // the hook self-gates on a finished game, so it stays idle while the game is running
  const { data: betsSummary } = useBetsSummaryBySelection({
    account: address!,
    gameId: game.gameId,
    gameState,
  })

  const isLive = gameState === GameState.Live

  const startDate = +game.startsAt * 1000
  const shouldWait = () => isLive && dayjs().diff(startDate) < WAIT_TIME
  const [ waitingTime, setWaitingTime ] = useState(
    shouldWait() ? WAIT_TIME - dayjs().diff(startDate) : 0
  )

  useEffect(() => {
    if (shouldWait() && !markets.length) {
      const interval = setInterval(() => {
        const newWaitingTime = Math.max(WAIT_TIME - dayjs().diff(startDate), 0)

        if (newWaitingTime === 0) {
          clearInterval(interval)
        }
        setWaitingTime(newWaitingTime)
      }, 1000)

      return () => {
        clearInterval(interval)
      }
    }
  }, [ gameState, markets ])

  if (isLoading || isPlaceholderData) {
    return <MarketsSkeleton />
  }

  if (!markets.length) {
    if (isLive) {
      if (waitingTime) {
        const time = dayjs.duration(waitingTime).format('mm:ss')

        return (
          <EmptyContent
            image="/images/illustrations/smile_sad.png"
            title={messages.livePending.title}
            text={{ ...messages.livePending.text, values: { time } }}
          />
        )
      }
      else {
        return (
          <EmptyContent
            image="/images/illustrations/smile_sad.png"
            title={messages.empty.live.title}
            text={messages.empty.live.text}
          />
        )
      }
    }

    return (
      <EmptyContent
        className="py-20"
        image="/images/illustrations/smile_sad.png"
        title={messages.empty.prematch.title}
        text={messages.empty.prematch.text}
      />
    )
  }

  return (
    <Content
      markets={markets}
      game={game}
      isGameOver={isGameOver}
      betsSummary={betsSummary}
    />
  )
}

const Markets: React.FC<MarketsProps> = (props) => {
  const { gameState, game } = props

  const isPendingResolution = getIsPendingResolution({ state: gameState, startsAt: game.startsAt })

  if (isPendingResolution) {
    return (
      <EmptyContent
        className="py-20"
        image="/images/illustrations/smile_sad.png"
        title={messages.ended.title}
        text={messages.ended.text}
      />
    )
  }

  return (
    <GameMarkets {...props} />
  )
}

export default Markets
