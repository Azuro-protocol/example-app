'use client'

import { useSports } from 'hooks'
import { useParams } from 'next/navigation'

import Sport, { SportSkeleton } from 'compositions/events/Sport/Sport'
import { LeagueSkeleton } from 'compositions/events/League/League'
import EmptyContent from 'compositions/events/EmptyContent/EmptyContent'
import Navbar from 'compositions/events/Navbar/Navbar'
import FilteredLeagues from 'compositions/events/FilteredLeagues/FilteredLeagues'
import { GameSkeleton } from 'compositions/events/Game/Game'
import UniqueEvents from 'compositions/events/UniqueEvents/UniqueEvents'


const SportWrapper: React.FC = () => {
  const params = useParams()
  const { sports, isFetching } = useSports()

  const isUnique = params.sportSlug === 'unique'

  if (isFetching) {
    return (
      <>
        <SportSkeleton>
          {
            isUnique ? (
              <GameSkeleton className="first-of-type:rounded-t-md" />
            ) : (
              <LeagueSkeleton />
            )
          }
        </SportSkeleton>
      </>
    )
  }

  if (!sports) {
    return <EmptyContent />
  }

  const sport = sports[0]
  const { slug, leagues } = sport

  return (
    <Sport sport={sport!} isPage>
      {
        isUnique ? (
          <UniqueEvents leagues={leagues} />
        ) : (
          <FilteredLeagues
            sportSlug={slug}
            leagues={leagues}
          />
        )
      }
    </Sport>
  )
}

export default function SportPage() {
  return (
    <Navbar>
      <SportWrapper />
    </Navbar>
  )
}
