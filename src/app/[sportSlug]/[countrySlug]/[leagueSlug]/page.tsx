'use client'

import { useSports } from 'hooks'

import { LeagueSkeleton } from 'compositions/events/League/League'
import EmptyContent from 'compositions/events/EmptyContent/EmptyContent'
import Navbar from 'compositions/events/Navbar/Navbar'
import FilteredLeagues from 'compositions/events/FilteredLeagues/FilteredLeagues'
import UniqueEvents from 'compositions/events/UniqueEvents/UniqueEvents'


const League: React.FC = () => {
  const { sports, isFetching } = useSports()

  if (isFetching) {
    return (
      <>
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
    <>
      {
        sport.slug === 'unique' ? (
          <UniqueEvents leagues={leagues} />
        ) : (
          <FilteredLeagues sportSlug={slug} leagues={leagues} isPage />
        )
      }
    </>
  )
}

export default function LeaguePage() {

  return (
    <Navbar>
      <League />
    </Navbar>
  )
}
