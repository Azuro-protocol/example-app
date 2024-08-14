'use client'

import React, { useEffect, useState } from 'react'
import { GameStatus, type GameMarkets } from '@azuro-org/toolkit'
import { useActiveMarkets, useBetsSummaryBySelection, useResolvedMarkets } from '@azuro-org/sdk'
import { useAccount } from 'wagmi'
import dayjs from 'dayjs'

import { Tooltip } from 'components/feedback'
import { Icon } from 'components/ui'
import OutcomeButton from 'compositions/OutcomeButton/OutcomeButton'
import EmptyContent from 'compositions/EmptyContent/EmptyContent'

import ResultButton from './components/ResultButton/ResultButton'

import messages from './messages'


export const MarketsSkeleton: React.FC = () => {
  return (
    <div>
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
  betsSummary?: Record<string, string>
  isResult?: boolean
}

const Content: React.FC<ContentProps> = (props) => {
  const { markets, betsSummary, isResult } = props

  return (
    <div>
      {
        markets.map(({ name, description, outcomeRows }) => (
          <div key={name}>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <div className="text-caption-14 font-semibold">{name}</div>
                {
                  Boolean(description) && (
                    <Tooltip
                      text={description}
                      placement="bottom"
                      width={400}
                    >
                      <div className="w-fit ml-1 cursor-pointer text-grey-60 hover:text-grey-90">
                        <Icon className="size-4" name="interface/info-circle" />
                      </div>
                    </Tooltip>
                  )
                }
              </div>
            </div>
            <div className="space-y-2 bg-bg-l2 rounded-sm p-2">
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
  startsAt: string
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


const WAIT_TIME = 600000

const ActiveMarkets: React.FC<MarketsProps> = ({ gameId, gameStatus, startsAt }) => {
  const { loading, markets } = useActiveMarkets({
    gameId,
    gameStatus,
    livePollInterval: 10000,
  })
  const isLive = gameStatus === GameStatus.Live

  const startDate = +startsAt * 1000
  const shouldWait = () => isLive && dayjs().diff(startDate) < WAIT_TIME
  const [ waitingTime, setWaitingTime ] = useState(
    shouldWait() ? WAIT_TIME - dayjs().diff(startDate) : 0
  )

  useEffect(() => {
    if (shouldWait() && !markets?.length) {
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
  }, [ gameStatus, markets ])

  if (loading) {
    return <MarketsSkeleton />
  }

  if (!markets) {
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
    <Content markets={markets} />
  )
}

const Markets: React.FC<MarketsProps> = (props) => {
  const { gameStatus } = props

  if (gameStatus === GameStatus.Resolved) {
    return <ResolvedMarkets {...props} />
  }

  if (gameStatus === GameStatus.Canceled || gameStatus === GameStatus.PendingResolution) {
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
    <ActiveMarkets {...props} />
  )
}

export default Markets
