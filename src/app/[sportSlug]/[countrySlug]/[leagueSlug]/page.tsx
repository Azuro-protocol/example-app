'use client'

import { useSports } from 'hooks'

import { LeagueSkeleton } from 'compositions/events/League/League'
import EmptyContent from 'compositions/events/EmptyContent/EmptyContent'
import Navbar from 'compositions/events/Navbar/Navbar'
import FilteredLeagues from 'compositions/events/FilteredLeagues/FilteredLeagues'


export default function LeaguePage() {
  const { sports, loading } = useSports()

  if (loading) {
    return <LeagueSkeleton isPage />
  }

  if (!sports) {
    return <EmptyContent />
  }

  const sport = sports[0]
  const { slug, leagues } = sport

  return (
    <Navbar>
      <FilteredLeagues sportSlug={slug} leagues={leagues} isPage />
    </Navbar>
  )
}
