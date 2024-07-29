'use client'

import React, { useMemo } from 'react'
import { useParams } from 'next/navigation'
import { Message } from '@locmod/intl'
import { useNavigation } from '@azuro-org/sdk'
import { type NavigationQuery } from '@azuro-org/toolkit'
import cx from 'classnames'

import { Icon, type IconName } from 'components/ui'
import { Href } from 'components/navigation'
import { Flag } from 'components/dataDisplay'

import messages from './messages'


type LeagueProps = NavigationQuery['sports'][0]['countries'][0]['leagues'][0] & {
  country: {
    name: string
    slug: string
  }
}

const League: React.FC<LeagueProps> = (props) => {
  const { slug, name, country, games } = props

  return (
    <div className="flex items-center justify-between py-2 px-3 text-grey-60">
      <div className="flex items-center overflow-hidden">
        <Flag className="mr-2" country={country.slug} />
        <div className="text-caption-13 text-ellipsis whitespace-nowrap overflow-hidden">{name}</div>
      </div>
      <div className="bg-grey-10 px-1 py-px ml-2 text-caption-12">{games?.length || 0}</div>
    </div>
  )
}

type SportProps = NavigationQuery['sports'][0]

const Sport: React.FC<SportProps> = (props) => {
  const { slug, name, countries } = props

  const { sportSlug } = useParams()

  const isActive = sportSlug === slug

  const rootClassName = cx('p-px rounded-4 overflow-hidden', {
    'bg-card-border': isActive,
  })
  const wrapperClassName = cx({ 'bg-bg-l1 rounded-4': isActive })
  const buttonClassName = cx('group px-4 py-2 flex w-full items-center justify-between hover:text-brand-50', {
    'text-brand-50': isActive,
  })
  const iconClassName = cx('h-4 w-4', {
    'rotate-180': isActive,
  })

  const leagues = useMemo(() => {
    return countries.map(({ leagues, name, slug }) => {
      return leagues.map(league => ({
        ...league,
        country: {
          name,
          slug,
        },
      }))
    }).flat()
  }, [ countries ])

  return (
    <div className={rootClassName}>
      <div className={wrapperClassName}>
        <Href to={`/${slug}`} className={buttonClassName}>
          <div className="flex items-center">
            <Icon className="h-4 w-4 mr-2" name={`sport/${slug}` as IconName} />
            <div className="text-caption-13">{name}</div>
          </div>
          <Icon className={iconClassName} name="interface/chevron_down" />
        </Href>
        {
          isActive && (
            leagues.map((league) => (
              <League key={`${league.country.slug}-${league.slug}`} {...league} />
            ))
          )
        }
      </div>
    </div>
  )
}

const Navigation: React.FC = () => {
  const { navigation, loading } = useNavigation({
    withGameCount: true,
  })

  return (
    <div>
      <Message className="text-caption-13 font-semibold py-2 px-4" value={messages.title} />
      {
        navigation?.map(sport => (
          <Sport key={sport.slug} {...sport} />
        ))
      }
    </div>
  )
}

export default Navigation
