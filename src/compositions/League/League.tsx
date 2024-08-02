'use client'

import React from 'react'
import { type Sport } from 'hooks'
import cx from 'classnames'
import { useGameStatus, useLive } from '@azuro-org/sdk'
import { getGameDateTime } from 'helpers/getters'

import { Flag, OpponentLogo } from 'components/dataDisplay'
import { Href } from 'components/navigation'
import Markets from 'compositions/Markets/Markets'


type GameProps = {
  leagueUrl: string
  game: Sport['leagues'][0]['games'][0]
}

const Game: React.FC<GameProps> = ({ leagueUrl, game }) => {
  const { gameId, title, participants, startsAt } = game
  const { date, time } = getGameDateTime(+startsAt * 1000)

  const { isLive } = useLive()
  const { status } = useGameStatus({
    graphStatus: game.status,
    startsAt: +game.startsAt,
    isGameExistInLive: isLive,
  })

  console.log(status, 'status')

  return (
    <div className="flex items-center justify-between py-2 px-4 bg-bg-l2">
      <div className="flex items-center">
        {
          participants.map(({ name, image }, index) => (
            <OpponentLogo className={cx({ '-mt-2': !index, '-mb-2 -ml-2 z-20': !!index })} key={name} image={image} />
          ))
        }
        <div className="ml-3">
          <div className="mb-[2px]">
            <span className="text-caption-13 font-semibold text-grey-70 mr-1">{time}</span>
            <span className="text-caption-12 text-grey-60">{date}</span>
          </div>
          <div className="text-caption-13 font-semibold">{title}</div>
        </div>
      </div>
      <Markets gameId={gameId} gameStatus={status} />
    </div>
  )
}

type LeagueProps = {
  sportSlug: string
  league: Sport['leagues'][0]
}

const League: React.FC<LeagueProps> = ({ sportSlug, league }) => {
  const { slug, name, countryName, countrySlug, games } = league

  const leagueUrl = `/${sportSlug}/${countrySlug}/${slug}`

  return (
    <div className="overflow-hidden rounded-4 mt-1 first-of-type:mt-0">
      <div className="flex items-center justify-between py-2 px-4 bg-bg-l2 mb-[2px]">
        <Href to={leagueUrl} className="flex items-center">
          <Flag className="mr-2" country={countrySlug} />
          <div className="text-caption-12 text-grey-70">{countryName}</div>
          <div className="size-1 rounded-full mx-2 bg-grey-20" />
          <div className="text-caption-12">{name}</div>
        </Href>
      </div>
      <div className="space-y-[2px]">
        {
          games.map(game => (
            <Game key={game.gameId} leagueUrl={leagueUrl} game={game} />
          ))
        }
      </div>
    </div>
  )
}

export default League
