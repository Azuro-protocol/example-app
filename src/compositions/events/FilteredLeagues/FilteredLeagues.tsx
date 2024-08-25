'use client'

import React from 'react'
import { type Sport } from 'hooks'

import League from 'compositions/events/League/League'
import EmptyFilteredContent from 'compositions/events/EmptyFilteredContent/EmptyFilteredContent'

import useFilteredLeagues from './utils/useFilteredLeagues'


type LeaguesProps = {
  sportSlug: string
  leagues: Sport['leagues']
  isPage?: boolean
}

const FilteredLeagues: React.FC<LeaguesProps> = ({ sportSlug, leagues, isPage }) => {
  const filteredLeagues = useFilteredLeagues(leagues)

  if (!filteredLeagues?.length) {
    return (
      <EmptyFilteredContent />
    )
  }

  return (
    <>
      {
        filteredLeagues.map(league => (
          <League
            key={`${league.countrySlug}-${league.slug}`}
            sportSlug={sportSlug}
            league={league}
            isPage={isPage}
          />
        ))
      }
    </>
  )
}

export default FilteredLeagues
