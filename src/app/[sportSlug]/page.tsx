'use client'

import { useSports } from 'hooks'

import Sport from 'compositions/Sport/Sport'
import League from 'compositions/League/League'


export default function SportPage() {
  const { sports, loading } = useSports()

  if (loading) {
    return null
  }

  if (!sports) {
    return null
  }

  const sport = sports[0]

  return (
    <>
      <Sport sport={sport!}>
        {
          sport.leagues.map(league => (
            <League key={`${league.countrySlug}-${league.slug}`} sportSlug={sport.slug} league={league} />
          ))
        }
      </Sport>
    </>
  )
}
