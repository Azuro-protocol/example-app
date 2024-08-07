'use client'

import { useSports } from 'hooks'

import League, { LeagueSkeleton } from 'compositions/events/League/League'


export default function LeaguePage() {
  const { sports, loading } = useSports()

  if (loading) {
    return <LeagueSkeleton />
  }

  if (!sports) {
    return null
  }

  const sport = sports[0]
  const league = sport.leagues[0]

  return (
    <>
      <League sportSlug={sport.slug} league={league} />
    </>
  )
}
