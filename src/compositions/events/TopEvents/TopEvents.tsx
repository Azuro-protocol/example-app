'use client'

import '@glidejs/glide/dist/css/glide.core.min.css'
import Glide from '@glidejs/glide'
import React, { useEffect, useRef } from 'react'
import { Message } from '@locmod/intl'
import { useParams } from 'next/navigation'
import { useActiveMarket, useActiveMarkets, useGames } from '@azuro-org/sdk'
import { ConditionState, Game_OrderBy, type GameMarkets, type GamesQuery } from '@azuro-org/toolkit'
import cx from 'classnames'
import { getGameDateTime } from 'helpers/getters'

import { Icon, type IconName } from 'components/ui'
import { OpponentLogo } from 'components/dataDisplay'
import { Href } from 'components/navigation'
import OutcomeButton from 'compositions/OutcomeButton/OutcomeButton'

import messages from './messages'


const CardSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cx('bone h-[12.125rem] w-full rounded-md', className)} />
  )
}

type ConditionProps = {
  markets: GameMarkets
  game: GamesQuery['games'][0]
}

const Condition: React.FC<ConditionProps> = ({ markets, game }) => {
  const { data } = useActiveMarket({ markets })

  const { marketsByKey, activeMarketKey, states } = data

  const { name, conditions } = marketsByKey[activeMarketKey!]
  const { conditionId, outcomes } = conditions[0]

  return (
    <>
      {
        outcomes.map(outcome => (
          <OutcomeButton
            key={outcome.outcomeId}
            marketName={name}
            outcome={outcome}
            game={game}
            isLocked={states[conditionId] !== ConditionState.Active}
          />
        ))
      }
    </>
  )
}

type CardProps = {
  game: GamesQuery['games'][0]
}

const Card: React.FC<CardProps> = ({ game }) => {
  const {
    sport: {
      slug: sportSlug,
    },
    league: {
      name: leagueName,
      slug: leagueSlug,
    },
    country: {
      name: countryName,
      slug: countrySlug,
    },
    gameId,
    participants,
    startsAt,
    title,
  } = game

  const { date, time } = getGameDateTime(+startsAt * 1000)

  const { data: markets, isFetching } = useActiveMarkets({
    gameId: game.gameId,
  })

  return (
    <div className="bg-card-border-bottom p-px rounded-md overflow-hidden">
      <div className="p-4 bg-grey-10 rounded-md">
        <Href to={`${sportSlug}/${countrySlug}/${leagueSlug}/${gameId}`} className="flex items-center justify-center text-grey-60 text-caption-13 hover:underline">
          <Icon className="size-4 mr-2 flex-none" name={`sport/${sportSlug}` as IconName} />
          <span className="text-ellipsis whitespace-nowrap overflow-hidden">{countryName}</span>
          <div className="size-[2px] rounded-full bg-grey-20 mx-1" />
          <span className="text-ellipsis whitespace-nowrap overflow-hidden">{leagueName}</span>
        </Href>
        <div className="mt-3 flex items-center justify-between px-7">
          <OpponentLogo image={participants[0].image} size={48} />
          <div className="text-caption-12 text-center">
            <div className="text-grey-60">{date}</div>
            <div className="font-semibold mt-[2px]">{time}</div>
          </div>
          <OpponentLogo image={participants[1].image} size={48} />
        </div>
        <div className="mt-5 text-caption-13 font-semibold text-center text-ellipsis whitespace-nowrap overflow-hidden">{title}</div>
        <div className="mt-3 flex items-center space-x-2">
          {
            isFetching ? (
              <>
                <div className="bone w-full h-7 rounded-sm" />
                <div className="bone w-full h-7 rounded-sm" />
                <div className="bone w-full h-7 rounded-sm" />
              </>
            ) : (
              <Condition markets={markets} game={game} />
            )
          }
        </div>
      </div>
    </div>
  )
}

const sliderConfiguration = {
  gap: 8,
  perView: 3,
  startAt: 0,
  focusAt: 0,
  autoplay: 5000,
  bound: true,
  breakpoints: {
    802: {
      perView: 1.1,
    },
  },
}

const Events: React.FC = () => {
  const { data: games, isFetching } = useGames({
    filter: {
      limit: 9,
    },
    orderBy: Game_OrderBy.Turnover,
  })
  const containerRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    if (!games?.length || isFetching) {
      return
    }

    const slider = new Glide(containerRef.current, sliderConfiguration)

    slider.mount()

    return () => {
      slider?.destroy()
    }
  }, [ games, isFetching ])

  if (isFetching) {
    return (
      <div className="flex items-center justify-between mt-6 space-x-2">
        <CardSkeleton />
        <CardSkeleton className="mb:hidden" />
        <CardSkeleton className="mb:hidden" />
      </div>
    )
  }

  return (
    <div ref={containerRef} className="glide !static group mt-6">
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides">
          {
            games?.map((game, index) => (
              <li key={index} className="glide__slide overflow-hidden">
                <Card game={game} />
              </li>
            ))
          }
        </ul>
      </div>
      <div className="absolute top-6 right-6 flex items-center" data-glide-el="controls">
        <button className="w-8 h-6 flex items-center justify-center bg-bg-l0 rounded-tl-full rounded-tr-1 rounded-br-1 rounded-bl-full border border-grey-15 text-grey-60 hover:text-grey-90 transition" data-glide-dir="<">
          <Icon className="size-5" name="interface/chevron_left" />
        </button>
        <button className="w-8 h-6 flex items-center justify-center bg-bg-l0 rounded-tl-1 rounded-tr-full rounded-br-full rounded-bl-1 border border-grey-15 text-grey-60 hover:text-grey-90 transition ml-1" data-glide-dir=">">
          <Icon className="size-5" name="interface/chevron_right" />
        </button>
      </div>
    </div>
  )
}

const TopEvents: React.FC = () => {
  const params = useParams()
  const sport = messages[params.sportSlug as string]

  return (
    <div className="relative pt-6">
      <div className="px-4">
        <Message className="text-caption-13 text-grey-60 uppercase" value={messages.title} />
        <h1 className="text-heading-h1 font-bold">
          <Message className="text-brand-50" value={messages.top} />
          {
            Boolean(sport) && (
              <Message className="ml-2" value={sport} />
            )
          }
          <Message className="ml-2" value={messages.events} />
        </h1>
      </div>
      <Events />
    </div>
  )
}

export default TopEvents
