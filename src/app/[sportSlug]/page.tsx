'use client'

import { useSports } from 'hooks'

import Sport, { SportSkeleton } from 'compositions/events/Sport/Sport'
import League, { LeagueSkeleton } from 'compositions/events/League/League'


export default function SportPage() {
  const { sports, loading } = useSports()

  if (loading) {
    return (
      <SportSkeleton>
        <LeagueSkeleton />
      </SportSkeleton>
    )
  }

  if (!sports) {
    return null
  }

  const sport = sports[0]

  return (
    <>
      <Sport sport={sport!} isPage>
        {
          sport.leagues.map(league => (
            <League
              key={`${league.countrySlug}-${league.slug}`}
              sportSlug={sport.slug}
              league={league}
            />
          ))
        }
      </Sport>
    </>
  )
}
