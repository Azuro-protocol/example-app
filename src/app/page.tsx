'use client'

import { useSports } from 'hooks'

import Sport, { SportSkeleton } from 'compositions/events/Sport/Sport'
import { LeagueSkeleton } from 'compositions/events/League/League'
import TopEvents from 'compositions/events/TopEvents/TopEvents'
import EmptyContent from 'compositions/events/EmptyContent/EmptyContent'
import Navbar, { NavbarSkeleton } from 'compositions/events/Navbar/Navbar'
import FilteredLeagues from 'compositions/events/FilteredLeagues/FilteredLeagues'
import UniqueEvents from 'compositions/events/UniqueEvents/UniqueEvents'


const Sports: React.FC = () => {
  const { sports, loading } = useSports()

  if (loading) {
    return (
      <>
        <NavbarSkeleton />
        <SportSkeleton>
          <LeagueSkeleton />
        </SportSkeleton>
      </>
    )
  }

  if (!sports) {
    return <EmptyContent />
  }

  return (
    <Navbar>
      {
        sports.map(sport => (
          <Sport key={sport.slug} sport={sport}>
            {
              sport.slug === 'unique' ? (
                <UniqueEvents leagues={sport.leagues} />
              ) : (
                <FilteredLeagues
                  sportSlug={sport.slug}
                  leagues={sport.leagues}
                />
              )
            }
          </Sport>
        ))
      }
    </Navbar>
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
