'use client'

import { useSports } from 'hooks'

import Sport, { SportSkeleton } from 'compositions/events/Sport/Sport'
import { LeagueSkeleton } from 'compositions/events/League/League'
import EmptyContent from 'compositions/events/EmptyContent/EmptyContent'
import Navbar from 'compositions/events/Navbar/Navbar'
import FilteredLeagues from 'compositions/events/FilteredLeagues/FilteredLeagues'


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
  const { slug, leagues } = sport

  return (
    <Navbar>
      <Sport sport={sport!} isPage>
        <FilteredLeagues
          sportSlug={slug}
          leagues={leagues}
        />
      </Sport>
    </Navbar>
  )
}
