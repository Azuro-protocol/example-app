'use client'

import { useSports } from 'hooks'

import Sport from 'compositions/Sport/Sport'
import League from 'compositions/League/League'


export default function TopPage() {
  const { sports, loading } = useSports()

  if (loading) {
    return null
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
