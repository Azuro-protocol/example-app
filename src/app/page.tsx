'use client'

import { useSports } from 'hooks'

import Sport, { SportSkeleton } from 'compositions/events/Sport/Sport'
import League, { LeagueSkeleton } from 'compositions/events/League/League'
import TopEvents from 'compositions/events/TopEvents/TopEvents'
import EmptyContent from 'compositions/events/EmptyContent/EmptyContent'


const Sports: React.FC = () => {
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

export default function TopPage() {

  return (
    <>
      <TopEvents />
      <Sports />
    </>
  )
}
