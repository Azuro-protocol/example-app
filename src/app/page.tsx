'use client'

import { useSports } from 'hooks'

import Sport, { SportSkeleton } from 'compositions/Sport/Sport'
import League, { LeagueSkeleton } from 'compositions/League/League'


export default function TopPage() {
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

  return (
    <>
      {
        sports.map(sport => (
          <Sport key={sport.slug} sport={sport}>
            {
              sport.leagues.map(league => (
                <League key={`${league.countrySlug}-${league.slug}`} sportSlug={sport.slug} league={league} />
              ))
            }
          </Sport>
        ))
      }
    </>
  )
}
