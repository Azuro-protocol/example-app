'use client'

import React, { useEffect, useState } from 'react'
import { XMasonry, XBlock } from 'react-xmasonry'
import { GameState, getIsPendingResolution } from '@azuro-org/toolkit'
import { type GameQuery, type GameMarkets, type Market } from '@azuro-org/toolkit'
import { useActiveMarkets, useBetsSummaryBySelection, useConditionState, useResolvedMarkets } from '@azuro-org/sdk'
import { useAccount } from '@azuro-org/sdk-social-aa-connector'
import dayjs from 'dayjs'
import cx from 'classnames'

import { Tooltip } from 'components/feedback'
import { Icon } from 'components/ui'
import OutcomeButton from 'compositions/OutcomeButton/OutcomeButton'
import EmptyContent from 'compositions/EmptyContent/EmptyContent'

import OutcomeResult from './components/OutcomeResult/OutcomeResult'
import Headline from './components/Headline/Headline'

import useView from './utils/useView'
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

type ConditionProps = {
  condition: Market['conditions'][0]
  marketName: string
  game: NonNullable<GameQuery['game']>
  betsSummary?: Record<string, string>
  isResult?: boolean
}

const Condition: React.FC<ConditionProps> = (props) => {
  const { condition, marketName, game, betsSummary, isResult } = props
  const { conditionId, outcomes, state: initialState } = condition

  const { data: state, isLocked } = useConditionState({
    conditionId,
    initialState,
  })

  return (
    <div className="flex justify-between">
      <div className="flex gap-2 w-full">
        {
          outcomes.map((outcome) => {
            const key = outcome.outcomeId

            if (isResult) {
              return (
                <OutcomeResult
                  key={key}
                  outcome={outcome}
                  conditionState={state}
                  summary={betsSummary?.[key]}
                  size={40}
                />
              )
            }

            return (
              <OutcomeButton
                key={key}
                marketName={marketName}
                outcome={outcome}
                game={game}
                isLocked={isLocked}
                size={40}
              />
            )
          })
        }
      </div>
    </div>
  )
}

type ContentProps = {
  markets: GameMarkets
  game: NonNullable<GameQuery['game']>
  betsSummary?: Record<string, string>
  isResult?: boolean
}

const Content: React.FC<ContentProps> = (props) => {
  const { markets, game, betsSummary, isResult } = props

  const { areAllCollapsed, collapsedMarketIds, collapse, collapseAll } = useCollapse(markets)
  const { activeView, changeView } = useView()

  return (
    <>
      <Headline
        activeView={activeView}
        isCollapsed={areAllCollapsed}
        onChangeView={changeView}
        onCollapse={collapseAll}
      />
      <div className="-mx-2">
        <XMasonry
          maxColumns={10}
          targetBlockWidth={478}
        >
          {
            markets.map(({ name, description, conditions, marketKey }) => {
              const isCollapsed = collapsedMarketIds.includes(marketKey)

              return (
                <XBlock
                  key={name}
                  width={activeView === 'columns' ? 1 : 2}
                >
                  <div className="px-2">
                    <button
                      className={
                        cx('flex items-center justify-between p-4 w-full group cursor-pointer', {
                          'border-b border-b-grey-10': isCollapsed,
                        })
                      }
                      onClick={() => collapse(marketKey)}
                    >
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
                      <div className="px-2 bg-grey-10 text-grey-60 group-hover:bg-grey-15 group-hover:text-grey-90 rounded-ssm">
                        <Icon className="size-4" name={isCollapsed ? 'interface/chevron_down' : 'interface/chevron_up'} />
                      </div>
                    </button>
                    {
                      !isCollapsed && (
                        <div className="space-y-2 bg-bg-l2 rounded-sm p-2">
                          {
                            conditions.map((condition, index) => (
                              <Condition
                                key={`${index}-${condition.outcomes.length}`}
                                condition={condition}
                                marketName={name}
                                game={game}
                                betsSummary={betsSummary}
                                isResult={isResult}
                              />
                            ))
                          }
                        </div>
                      )
                    }
                  </div>
                </XBlock>
              )
            })
          }
        </XMasonry>
      </div>
    </>
  )
}

type MarketsProps = {
  game: NonNullable<GameQuery['game']>
  gameState: GameState
}

const ResolvedMarkets: React.FC<MarketsProps> = ({ game, gameState }) => {
  const { address } = useAccount()
  const { data: markets, isLoading } = useResolvedMarkets({ gameId: game.gameId })
  const { data: betsSummary } = useBetsSummaryBySelection({
    account: address!,
    gameId: game.gameId,
    gameState,
  })

  if (isLoading) {
    return <MarketsSkeleton />
  }

  if (!markets?.length) {
    return <div>Empty</div>
  }

  return (
    <Content
      markets={markets}
      game={game}
      betsSummary={betsSummary}
      isResult
    />
  )
}


const WAIT_TIME = 600000

const ActiveMarkets: React.FC<MarketsProps> = ({ game, gameState }) => {
  const { data: markets, isLoading, isPlaceholderData } = useActiveMarkets({
    gameId: game.id,
    query: {
      refetchInterval: 10_000,
    },
  })
  const isLive = gameState === GameState.Live

  const startDate = +game.startsAt * 1000
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
  }, [ gameState, markets ])

  if (isLoading || isPlaceholderData) {
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
    <Content markets={markets} game={game} />
  )
}

const Markets: React.FC<MarketsProps> = (props) => {
  const { gameState, game } = props

  if (gameState === GameState.Finished) {
    return <ResolvedMarkets {...props} />
  }

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
    <ActiveMarkets {...props} />
  )
}

export default Markets
