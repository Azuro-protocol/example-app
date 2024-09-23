'use client'

import React, { useMemo } from 'react'
import { useParams } from 'next/navigation'
import { Message } from '@locmod/intl'
import { useLive, useNavigation } from '@azuro-org/sdk'
import { type NavigationQuery } from '@azuro-org/toolkit'
import cx from 'classnames'
import { constants } from 'helpers'

import { Icon, type IconName } from 'components/ui'
import { Href } from 'components/navigation'
import { Flag } from 'components/dataDisplay'

import Skeleton from './components/Skeleton/Skeleton'

import messages from './messages'


type LeagueProps = NavigationQuery['sports'][0]['countries'][0]['leagues'][0] & {
  url: string
  country: {
    name: string
    slug: string
  }
}

const League: React.FC<LeagueProps> = (props) => {
  const { url, name, country, games, slug } = props

  const { countrySlug, leagueSlug } = useParams()

  const isActive = Boolean(leagueSlug) && countrySlug === country.slug && slug === leagueSlug

  const rootClassName = cx('flex items-center justify-between py-2 px-4 hover:text-grey-90', {
    'text-grey-60': !isActive,
    'text-grey-90': isActive,
  })

  return (
    <Href to={url} className={rootClassName}>
      <div className="flex items-center overflow-hidden">
        <Flag className="mr-2 flex-none" country={country.slug} />
        <div className="text-caption-13 text-ellipsis whitespace-nowrap overflow-hidden">{name}</div>
      </div>
      <div className="bg-grey-10 px-1 py-px ml-2 text-caption-12">{games?.length || 0}</div>
    </Href>
  )
}

type Top = {
  slug: '/'
  name: Intl.Message
  gamesCount?: number
}

type SportProps = NavigationQuery['sports'][0] | Top

const Sport: React.FC<SportProps> = (props) => {
  const { slug, name, countries } = props as NavigationQuery['sports'][0]
  const { gamesCount } = props as Top

  const { sportSlug } = useParams()

  const isTop = slug === '/'
  const isActive = sportSlug === slug || isTop && !sportSlug
  const isUnique = slug === 'unique'

  const rootClassName = cx('p-px rounded-md overflow-hidden', {
    'bg-card-border-top': isActive,
  })
  const wrapperClassName = cx({ 'bg-bg-l1 rounded-md': isActive })
  const buttonClassName = cx('group px-4 py-2 flex w-full items-center justify-between hover:text-brand-50', {
    'text-grey-60': !isActive,
    'text-brand-50': isActive,
  })
  const iconClassName = cx('h-4 w-4', {
    'rotate-180': isActive,
  })
  const icon: IconName = isTop || isUnique ? 'interface/top' : `sport/${slug}` as IconName

  const leagues = useMemo(() => {
    if (!countries) {
      return
    }

    return countries.map(({ leagues, name, slug: countrySlug }) => {
      return leagues.map(league => ({
        url: `/${slug}/${countrySlug}/${league.slug}`,
        ...league,
        country: {
          name,
          slug: countrySlug,
        },
      }))
    }).flat()
  }, [ countries ])

  return (
    <div className={rootClassName}>
      <div className={wrapperClassName}>
        <Href to={`/${slug}`} className={buttonClassName}>
          <div className="flex items-center">
            <Icon className="size-4 mr-2" name={icon} />
            <Message className="text-caption-13" value={name} />
          </div>
          {
            Boolean(isTop || isUnique || !leagues?.length) ? (
              <div className="text-caption-12 min-w-4 text-center">{gamesCount || 0}</div>
            ) : (
              <Icon className={iconClassName} name="interface/chevron_down" />
            )
          }
        </Href>
        {
          Boolean(!isUnique && isActive && leagues) && (
            leagues?.map((league) => (
              <League key={`${league.country.slug}-${league.slug}`} {...league} />
            ))
          )
        }
      </div>
    </div>
  )
}

type NavigationProps = {
  className?: string
}

const Navigation: React.FC<NavigationProps> = ({ className }) => {
  const { isLive } = useLive()
  const { navigation, loading } = useNavigation({
    withGameCount: true,
    isLive,
  })

  const allTopGames = useMemo(() => {
    if (!navigation) {
      return
    }

    let result = 0

    Object.values(navigation).forEach(({ countries }) => {
      let gamesCount = 0

      countries.forEach(({ leagues }) => {
        gamesCount += leagues.reduce((acc, { games }) => acc + games!.length, 0)
      })


      result += Math.min(gamesCount, constants.topPageGamePerSportLimit)
    })

    return result
  }, [ navigation ])

  const sortedSports = useMemo(() => {
    if (!navigation) {
      return []
    }

    return [ ...navigation ].sort((sport1, sport2) => {
      const sport1Index = constants.sportsOrder.indexOf(sport1.slug)
      const sport2Index = constants.sportsOrder.indexOf(sport2.slug)

      if (!sport1.countries.length || !sport1.countries[0].leagues.length) {
        return 1
      }

      if (!sport2.countries.length || !sport2.countries[0].leagues.length) {
        return -1
      }

      if (sport1Index >= 0 && sport2Index >= 0) {
        return sport1Index - sport2Index
      }

      if (sport1Index < 0 && sport2Index >= 0) {
        return 1
      }

      if (sport1Index >= 0 && sport2Index < 0) {
        return -1
      }

      return 0
    })
  }, [ navigation ])

  if (loading) {
    return <Skeleton className={className} />
  }

  return (
    <div className={className}>
      <Message className="text-caption-13 font-semibold py-2 px-4 mb-2" value={messages.title} tag="p" />
      <Sport slug="/" name={messages.top} gamesCount={allTopGames} />
      {
        sortedSports?.map(sport => (
          <Sport key={sport.slug} {...sport} />
        ))
      }
    </div>
  )
}

export default Navigation
