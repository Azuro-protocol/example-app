import React from 'react'
import { type GameQuery, GameStatus } from '@azuro-org/toolkit'
import { Message } from '@locmod/intl'

import { getGameDateTime } from 'helpers/getters'
import { Icon, LiveLabel, type IconName } from 'components/ui'
import { Flag, OpponentLogo } from 'components/dataDisplay'

import messages from './messages'


type TitleProps = {
  status: GameStatus
  startsAt: string
  title: string
}

const Title: React.FC<TitleProps> = ({ status, startsAt, title }) => {
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
    content = (
      <LiveLabel />
    )
  }

  return (
    <div className="text-center">
      <div className="mb:h-12 flex items-center justify-center">
        {content}
      </div>
      <div className="ds:text-heading-h3 mb:text-heading-h5 font-bold mt-3">{title}</div>
    </div>
  )
}

type EventInfoProps = {
  game: GameQuery['games'][0]
  status: GameStatus
}

const EventInfo: React.FC<EventInfoProps> = ({ game, status }) => {
  const {
    sport: {
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

  return (
    <div className="-mx-2">
      <div className="flex items-center justify-center text-grey-60 text-caption-12 font-medium py-3 border-b border-b-grey-10">
        <Icon className="size-4" name={`sport/${sportSlug}` as IconName} />
        <Flag className="mr-2 border border-grey-10 -ml-1" country={countrySlug} />
        <span>{countryName}</span>
        <div className="size-[2px] mx-2 bg-grey-70 rounded-full" />
        <span>{leagueName}</span>
      </div>
      <div className="ds:py-8 mb:py-4 w-full ds:max-w-[70%] mb:px-9 mx-auto">
        <div className="relative flex items-center ds:justify-around mb:justify-center">
          <OpponentLogo className="mb:absolute mb:left-0 mb:top-0" image={participants[0].image} size={48} />
          <Title status={status} startsAt={startsAt} title={title!} />
          <OpponentLogo className="mb:absolute mb:right-0 mb:top-0" image={participants[1].image} size={48} />
        </div>
      </div>
    </div>
  )
}

export default EventInfo
