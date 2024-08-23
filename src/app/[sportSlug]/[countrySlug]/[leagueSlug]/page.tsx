'use client'

import { useSports } from 'hooks'

import League, { LeagueSkeleton } from 'compositions/events/League/League'
import EmptyContent from 'compositions/events/EmptyContent/EmptyContent'
import Navbar from 'compositions/events/Navbar/Navbar'


export default function LeaguePage() {
  const { sports, loading } = useSports()

  if (loading) {
    return <LeagueSkeleton isPage />
  }

  if (!sports) {
    return <EmptyContent />
  }

  const sport = sports[0]
  const league = sport.leagues[0]

  return (
    <>
      <Navbar />
      <League sportSlug={sport.slug} league={league} isPage />
    </>
  )
}
