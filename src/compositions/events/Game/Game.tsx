'use client'

import React, { useSyncExternalStore } from 'react'
import cx from 'classnames'
import { LIVE_STATISTICS_SUPPORTED_SPORTS, LIVE_STATISTICS_SUPPORTED_PROVIDERS, useGameState } from '@azuro-org/sdk'
import { type GameQuery, GameState, getProviderFromId } from '@azuro-org/toolkit'
import { openModal } from '@locmod/modal'
import { getGameDateTime } from 'helpers/getters'
import { liveStatisticsGameIdStore } from 'helpers/stores'

import { OpponentLogo } from 'components/dataDisplay'
import { Href } from 'components/navigation'
import { Icon, LiveLabel } from 'components/ui'
import Markets, { MarketsSkeleton } from 'compositions/events/Markets/Markets'


export const GameSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  const rootClassName = cx('flex mb:flex-col ds:items-center justify-between py-2 px-4 bg-bg-l2 last-of-type:rounded-b-md', className)

  return (
    <div className={rootClassName}>
      <div className="flex items-center">
        <div className="bone size-7 -mt-2 rounded-full" />
        <div className="bone size-7 -mb-2 -ml-2 z-20 rounded-full" />
        <div className="ml-3">
          <div className="mb-[2px] flex items-center">
            <div className="bone h-4 w-8 mr-1 rounded-md" />
            <span className="bone h-[0.875rem] w-20 rounded-md" />
          </div>
          <div className="bone h-4 w-24 rounded-md" />
        </div>
      </div>
      <div className="w-full max-w-[26.25rem] mb:mt-2">
        <MarketsSkeleton />
      </div>
    </div>
  )
}

type GameProps = {
  className?: string
  leagueUrl: string
  game: NonNullable<GameQuery['game']>
  withTopRadius?: boolean
  isUnique?: boolean
}

const Game: React.FC<GameProps> = ({ className, leagueUrl, game, withTopRadius, isUnique }) => {
  const { gameId, title, participants, startsAt } = game
  const { date, time } = getGameDateTime(+startsAt * 1000)

  const { data: state } = useGameState({
    gameId,
    initialState: game.state,
  })
  const statisticsGameId = useSyncExternalStore(
    liveStatisticsGameIdStore.subscribe,
    liveStatisticsGameIdStore.getSnapshot,
    () => ''
  )

  const providerId = getProviderFromId(gameId)
  const isSportAllowed = LIVE_STATISTICS_SUPPORTED_SPORTS.includes(+game.sport.sportId)
  const isProviderAllowed = LIVE_STATISTICS_SUPPORTED_PROVIDERS.includes(providerId)
  const isInLive = state === GameState.Live
  const isStatisticsAvailable = isProviderAllowed && isSportAllowed
  const isSelectedForStatistics = statisticsGameId === gameId

  const handleStatisticsClick = () => {
    liveStatisticsGameIdStore.setGameId(gameId)
    openModal('StatisticsModal')
  }

  const rootClassName = cx(
    'group flex mb:flex-col ds:items-center justify-between',
    'py-2 ds:pl-4 ds:pr-2 mb:px-2 bg-bg-l2 last-of-type:rounded-b-md relative',
    className,
    {
      'first-of-type:rounded-t-md': withTopRadius || isUnique,
    })
  const liveClassName = cx(
    'absolute h-full before:content-[\'*\'] before:h-full before:w-0.5 before:absolute before:top-0 before:left-0 before:bg-accent-red overflow-hidden',
    'left-0 top-0 bg-live-game-shadow w-[30%] group-last-of-type:rounded-b-md',
    {
      'group-first-of-type:rounded-t-md': withTopRadius,
    }
  )

  return (
    <div className={rootClassName}>
      {
        isInLive && (
          <div className={liveClassName} />
        )
      }
      <div className="flex items-end w-full relative z-10">
        <Href to={`${leagueUrl}/${gameId}`} className="flex items-center group/game-link">
          {
            !isUnique && (
              participants.map(({ name, image }, index) => (
                <OpponentLogo className={cx({ '-mt-2': !index, '-mb-2 -ml-2 z-20': !!index })} key={name} image={image} />
              ))
            )
          }
          <div className={cx({ 'ml-3': !isUnique })}>
            <div>
              {
                isInLive ? (
                  <LiveLabel className="mr-1" />
                ) : (
                  <>
                    <span className="text-caption-13 font-semibold text-grey-70 mr-1">{time}</span>
                    <span className="text-caption-12 text-grey-60">{date}</span>
                  </>
                )
              }
            </div>
            <div className="text-caption-13 font-semibold group-hover/game-link:underline">{title}</div>
          </div>
        </Href>
        {
          isInLive && (
            <button
              className={
                cx('hover:text-brand-50 ml-auto mb:mr-1 disabled:text-grey-20 disabled:cursor-not-allowed', {
                  'text-brand-50': isSelectedForStatistics,
                  'text-grey-70': !isSelectedForStatistics,
                })
              }
              disabled={!isStatisticsAvailable}
              onClick={handleStatisticsClick}
            >
              <Icon className="size-5" name="interface/statistics" />
            </button>
          )
        }
      </div>
      <div className="w-full ds:max-w-[26.25rem] mb:mt-2">
        <Markets gameState={state} game={game} />
      </div>
    </div>
  )
}

export default Game
