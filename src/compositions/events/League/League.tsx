'use client'

import React, { useState } from 'react'
import { type Sport } from 'hooks'
import cx from 'classnames'
import { useGameStatus, useLive } from '@azuro-org/sdk'
import { GameStatus } from '@azuro-org/toolkit'
import { useEntryListener } from '@locmod/intersection-observer'
import { getGameDateTime } from 'helpers/getters'

import { Flag, OpponentLogo } from 'components/dataDisplay'
import { Href } from 'components/navigation'
import { LiveLabel } from 'components/ui'
import Markets, { MarketsSkeleton } from 'compositions/events/Markets/Markets'


export const LeagueSkeleton: React.FC<{isPage?: boolean}> = ({ isPage = false }) => {
  return (
    <div className="mt-1 first-of-type:mt-0">
      {
        isPage ? (
          <div className="py-3 px-4">
            <div className="bone h-[1.375rem] w-44 rounded-full" />
          </div>
        ) : (
          <div className="rounded-t-4 flex items-center justify-between py-2 px-4 bg-bg-l2 mb-[2px]">
            <div className="flex items-center">
              <div className="bone size-4 mr-2 rounded-full" />
              <div className="bone h-[0.875rem] w-[8rem] rounded-4" />
              <div className="size-1 rounded-full mx-2 bg-grey-20" />
              <div className="bone h-[0.875rem] w-[4rem] rounded-4" />
            </div>
          </div>
        )
      }
      <div className="space-y-[2px]">
        {
          new Array(3).fill(0).map((_, index) => {
            const className = cx('flex mb:flex-col ds:items-center justify-between py-2 px-4 bg-bg-l2 last-of-type:rounded-b-4', {
              'first-of-type:rounded-t-4': isPage,
            })

            return (
              <div key={index} className={className}>
                <div className="flex items-center">
                  <div className="bone size-7 -mt-2 rounded-full" />
                  <div className="bone size-7 -mb-2 -ml-2 z-20 rounded-full" />
                  <div className="ml-3">
                    <div className="mb-[2px] flex items-center">
                      <div className="bone h-4 w-8 mr-1 rounded-4" />
                      <span className="bone h-[0.875rem] w-20 rounded-4" />
                    </div>
                    <div className="bone h-4 w-24 rounded-4" />
                  </div>
                </div>
                <div className="w-full max-w-[26.25rem] mb:mt-2">
                  <MarketsSkeleton />
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

type GameProps = {
  className?: string
  leagueUrl: string
  game: Sport['leagues'][0]['games'][0]
  withTopRadios?: boolean
}

const Game: React.FC<GameProps> = ({ className, leagueUrl, game, withTopRadios }) => {
  const { gameId, title, participants, startsAt } = game
  const { date, time } = getGameDateTime(+startsAt * 1000)

  const [ isMarketsVisible, setMarketsVisible ] = useState(false)
  const [ ref ] = useEntryListener((entry) => {
    if (entry.isIntersecting) {
      setMarketsVisible(true)
    }
  }, {
    once: true,
    observerProps: {
      rootMargin: '0px 0px 30% 0px',
    },
  })

  const { isLive } = useLive()
  const { status } = useGameStatus({
    graphStatus: game.status,
    startsAt: +game.startsAt,
    isGameExistInLive: isLive,
  })

  const isInLive = status === GameStatus.Live

  const rootClassName = cx(
    'group flex mb:flex-col ds:items-center justify-between',
    'py-2 px-4 bg-bg-l2 last-of-type:rounded-b-4 relative',
    className,
    {
      'first-of-type:rounded-t-4': withTopRadios,
    })
  const liveClassName = cx(
    'border-l-[2px] border-l-accent-red absolute h-full',
    'left-0 bg-live-game-shadow w-[30%] group-last-of-type:rounded-b-4',
    {
      'group-first-of-type:rounded-t-4': withTopRadios,
    }
  )

  return (
    <div className={rootClassName} ref={ref}>
      {
        isInLive && (
          <div className={liveClassName} />
        )
      }
      <Href to={`${leagueUrl}/${gameId}`} className="flex items-center relative z-10 group/game-link">
        {
          participants.map(({ name, image }, index) => (
            <OpponentLogo className={cx({ '-mt-2': !index, '-mb-2 -ml-2 z-20': !!index })} key={name} image={image} />
          ))
        }
        <div className="ml-3">
          <div className="mb-[2px]">
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
      <div className="w-full max-w-[26.25rem] mb:mt-2">
        {
          isMarketsVisible ? (
            <Markets gameId={gameId} gameStatus={status} />
          ) : (
            <MarketsSkeleton />
          )
        }
      </div>
    </div>
  )
}

type LeagueProps = {
  sportSlug: string
  league: Sport['leagues'][0]
  isPage?: boolean
}

const League: React.FC<LeagueProps> = ({ sportSlug, league, isPage = false }) => {
  const { slug, name, countryName, countrySlug, games } = league

  const leagueUrl = `/${sportSlug}/${countrySlug}/${slug}`

  return (
    <div className="mt-1 first-of-type:mt-0">
      {
        isPage ? (
          <div className="py-3 px-4">
            <div className="text-heading-h4 font-semibold">{name}</div>
          </div>
        ) : (
          <div className="rounded-t-4 flex items-center justify-between py-2 px-4 bg-bg-l2 mb-[2px]">
            <Href to={leagueUrl} className="flex items-center hover:underline">
              <Flag className="mr-2" country={countrySlug} />
              <div className="text-caption-12 text-grey-70">{countryName}</div>
              <div className="size-1 rounded-full mx-2 bg-grey-20" />
              <div className="text-caption-12">{name}</div>
            </Href>
          </div>
        )
      }
      <div className="space-y-[2px]">
        {
          games.map(game => (
            <Game
              key={game.gameId}
              leagueUrl={leagueUrl}
              game={game}
              withTopRadios={isPage}
            />
          ))
        }
      </div>
    </div>
  )
}

export default League
