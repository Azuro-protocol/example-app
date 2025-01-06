'use client'

import React from 'react'
import { type GameQuery, GameStatus } from '@azuro-org/toolkit'
import {
  type LiveStatistics,
  type HomeGuest,
  type BasketballScoreBoard,
  type TennisScoreBoard,
  type VolleyballScoreBoard,

  useLiveStatistics,
} from '@azuro-org/sdk'
import { Message } from '@locmod/intl'
import cx from 'classnames'
import { getGameDateTime, getLiveTotalScore } from 'helpers/getters'

import { Icon, LiveLabel, type IconName } from 'components/ui'
import { Flag, OpponentLogo } from 'components/dataDisplay'
import { TotalScore as LiveTotalScore } from 'compositions/LiveStatistics/components'

import messages from './messages'


export const EventInfoSkeleton: React.FC = () => {
  return (
    <div className="-mx-2">
      <div className="flex items-center justify-center text-grey-60 text-caption-12 font-medium py-3 border-b border-b-grey-10">
        <div className="bone size-4 rounded-full" />
        <div className="bone mr-2 -ml-1 size-4 rounded-full" />
        <div className="bone h-[0.875rem] w-40 rounded-full" />
      </div>
      <div className="ds:py-8 mb:py-4 w-full mb:px-9">
        <div className="relative flex items-center ds:justify-around mb:justify-center ds:max-w-[50%] mx-auto">
          <div className="bone mb:absolute mb:left-0 mb:top-0 size-14 rounded-full" />
          <div className="bone h-[1.125rem] w-10 rounded-full" />
          <div className="bone mb:absolute mb:right-0 mb:top-0 size-14 rounded-full" />
        </div>
        <div className="bone mx-auto h-[1.625rem] w-24 rounded-full mt-4" />
      </div>
    </div>
  )
}

type LiveScoreProps = {
  participants: GameQuery['games'][0]['participants']
  sportId: string
  liveScoreBoard: LiveStatistics['scoreBoard']
}

const LiveScore: React.FC<LiveScoreProps> = ({ participants, sportId, liveScoreBoard }) => {
  let scoreValue = getLiveTotalScore(sportId, liveScoreBoard)

  let parts: HomeGuest<number>[] = []

  if (+sportId === 31) {
    const { q1, q2, q3, q4 } = (liveScoreBoard as BasketballScoreBoard)
    parts = [ q1, q2, q3, q4 ]
  }

  if (+sportId === 45) {
    const { s1, s2, s3, s4, s5 } = (liveScoreBoard as TennisScoreBoard)
    parts = [ s1, s2, s3, s4, s5 ]
  }

  if (+sportId === 26) {
    const { s1, s2, s3, s4, s5 } = (liveScoreBoard as VolleyballScoreBoard)
    parts = [ s1, s2, s3, s4, s5 ]
  }

  if (!parts.length) {
    return null
  }

  return (
    <div className="flex justify-between ds:mx-6 mt-5 relative">
      <div className="space-y-4 py-1">
        <OpponentLogo image={participants[1].image} size={28} />
        <OpponentLogo image={participants[1].image} size={28} />
      </div>
      <div className="flex">
        <div className="flex border border-grey-10 rounded-sm divide-x divide-grey-10 mr-2">
          {
            parts.map(({ h, g }, index) => (
              <div key={index} className="text-caption-13 font-semibold text-center min-w-9">
                <div className="py-3 px-2.5">{h}</div>
                <div className="py-3 px-2.5">{g}</div>
              </div>
            ))
          }
        </div>
        <div className="bg-brand-50 border border-brand-50 rounded-sm text-caption-13 font-semibold text-center min-w-9">
          <div className="py-3 px-2.5">{scoreValue!.h}</div>
          <div className="py-3 px-2.5">{scoreValue!.g}</div>
        </div>
      </div>
      <div className="absolute left-0 h-px w-full bg-grey-10 top-1/2 -translate-y-1/2" />
    </div>
  )
}

type TitleProps = {
  status: GameStatus
  startsAt: string
  sportId: string
  liveScoreBoard: LiveStatistics['scoreBoard'] | undefined
  isFetching: boolean
}

const Title: React.FC<TitleProps> = ({ status, startsAt, sportId, liveScoreBoard, isFetching }) => {
  const { date, time } = getGameDateTime(+startsAt * 1000)

  let content = (
    <div>
      <div className="text-caption-14 font-semibold">{time}</div>
      <div className="text-caption-13 text-grey-70">{date}</div>
    </div>
  )

  if (status === GameStatus.Resolved) {
    content = (
      <div className="text-caption-13 font-medium text-gray-50 text-center">
        <Message className="text-grey-70" value={messages.ended} />
        <div>{date}</div>
      </div>
    )
  }

  if (status === GameStatus.Live) {
    content = isFetching ? <div /> : (
      <LiveTotalScore
        className="!text-heading-h2 !font-extrabold"
        sportId={sportId}
        scoreBoard={liveScoreBoard!}
      />
    )
  }

  return (
    <div className="text-center mb:h-12 flex items-center justify-center">
      {content}
    </div>
  )
}

type EventInfoProps = {
  game: GameQuery['games'][0]
  status: GameStatus
}

const EventInfo: React.FC<EventInfoProps> = ({ game, status }) => {
  const {
    gameId,
    sport: {
      sportId,
      slug: sportSlug,
    },
    startsAt,
    participants,
    title,
    league: {
      name: leagueName,
      country: {
        slug: countrySlug,
        name: countryName,
      },
    },
  } = game

  const { statistics, isFetching } = useLiveStatistics({
    gameId,
    sportId,
    gameStatus: status,
    enabled: Boolean(game),
  })

  const isLive = status === GameStatus.Live

  return (
    <div className="-mx-2">
      <div
        className={
          cx('flex items-center justify-center text-grey-60 text-caption-12 font-medium py-3', {
            'border-b border-b-grey-10': !isLive,
          })
        }
      >
        <Icon className="size-4" name={`sport/${sportSlug}` as IconName} />
        <Flag className="mr-2 border border-grey-10 -ml-1" country={countrySlug} />
        <span>{countryName}</span>
        <div className="size-[2px] mx-2 bg-grey-70 rounded-full" />
        <span>{leagueName}</span>
      </div>
      {
        isLive && (
          <div className="w-full">
            <div className="bg-live-event-gradient h-px w-full" />
            <div className="mx-auto flex items-center bg-accent-red px-2 py-0.5 rounded-b-min w-fit">
              <LiveLabel inverse />
            </div>
          </div>
        )
      }
      <div className="ds:py-8 mb:py-4 w-full mb:px-9">
        <div className="relative flex items-center ds:justify-around mb:justify-center ds:max-w-[50%] mx-auto">
          <OpponentLogo className="mb:absolute mb:left-0 mb:top-0" image={participants[0].image} size={56} />
          <Title
            status={status}
            startsAt={startsAt}
            sportId={sportId}
            liveScoreBoard={statistics?.scoreBoard}
            isFetching={isFetching}
          />
          <OpponentLogo className="mb:absolute mb:right-0 mb:top-0" image={participants[1].image} size={56} />
        </div>
        <div className="text-center ds:text-heading-h3 mb:text-heading-h5 font-bold mt-4">{title}</div>
        {
          Boolean(statistics) && (
            <LiveScore
              sportId={sportId}
              participants={participants}
              liveScoreBoard={statistics!.scoreBoard}
            />
          )
        }
      </div>
    </div>
  )
}

export default EventInfo
