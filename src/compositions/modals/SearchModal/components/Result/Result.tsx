import { useMemo } from 'react'
import { type Field, useFieldState } from 'formular'
import { useDebounce } from 'hooks'
import { useSearchGames } from '@azuro-org/sdk'

import EmptyContent from 'compositions/EmptyContent/EmptyContent'
import Sport, { SportSkeleton } from 'compositions/events/Sport/Sport'
import League, { LeagueSkeleton } from 'compositions/events/League/League'

import messages from './messages'
import formatGamesIntoSports from './utils/formatGamesIntoSports'


type ResultProps = {
  field: Field<string>
}

const Result: React.FC<ResultProps> = ({ field }) => {
  const { value } = useFieldState(field)
  const debouncedValue = useDebounce(value?.trim(), 300)

  const { data, isFetching } = useSearchGames({
    input: value
  })

  const sports = useMemo(() => {
    if (!data?.games) {
      return []
    }

    return formatGamesIntoSports(data.games)
  }, [data?.games])

  if (!debouncedValue || debouncedValue?.length < 3) {
    return null
  }

  if (isFetching) {
    return (
      <SportSkeleton>
        <LeagueSkeleton />
      </SportSkeleton>
    )
  }

  if (!sports?.length) {
    return (
      <EmptyContent
        className="!bg-transparent"
        image="/images/illustrations/smile_sad.png"
        title={messages.empty.title}
        text={messages.empty.text}
      />
    )
  }

  return (
    <div className="space-y-4 bg-bg-l1 rounded-md border border-grey-10 px-2 pb-2">
      {
        sports.map((sport) => (
          <Sport key={sport.name} sport={sport} withLink={false}>
            {
              sport.leagues.map(league => (
                <League
                  key={`${league.countrySlug}-${league.slug}`}
                  sportSlug={sport.slug}
                  league={league}
                />
              ))
            }
          </Sport>
        ))
      }
    </div>
  )
}

export default Result
