'use client'

import { useSports } from 'hooks'

import League from 'compositions/League/League'


export default function LeaguePage() {
  const { sports, loading } = useSports()

  if (loading) {
    return null
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
