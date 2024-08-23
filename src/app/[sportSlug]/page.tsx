'use client'

import { useSports } from 'hooks'

import Sport, { SportSkeleton } from 'compositions/events/Sport/Sport'
import League, { LeagueSkeleton } from 'compositions/events/League/League'
import EmptyContent from 'compositions/events/EmptyContent/EmptyContent'
import Navbar from 'compositions/events/Navbar/Navbar'


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
    return <EmptyContent />
  }

  const sport = sports[0]

  return (
    <>
      <Navbar />
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
