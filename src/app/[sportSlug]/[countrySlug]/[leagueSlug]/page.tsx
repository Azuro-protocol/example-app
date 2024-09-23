'use client'

import { useSports } from 'hooks'

import { LeagueSkeleton } from 'compositions/events/League/League'
import EmptyContent from 'compositions/events/EmptyContent/EmptyContent'
import Navbar, { NavbarSkeleton } from 'compositions/events/Navbar/Navbar'
import FilteredLeagues from 'compositions/events/FilteredLeagues/FilteredLeagues'
import UniqueEvents from 'compositions/events/UniqueEvents/UniqueEvents'


export default function LeaguePage() {
  const { sports, loading } = useSports()

  if (loading) {
    return (
      <>
        <NavbarSkeleton />
        <LeagueSkeleton isPage />
      </>
    )
  }

  if (!sports) {
    return <EmptyContent />
  }

  const sport = sports[0]
  const { slug, leagues } = sport

  return (
    <Navbar>
      {
        sport.slug === 'unique' ? (
          <UniqueEvents leagues={leagues} />
        ) : (
          <FilteredLeagues sportSlug={slug} leagues={leagues} isPage />
        )
      }
    </Navbar>
  )
}
