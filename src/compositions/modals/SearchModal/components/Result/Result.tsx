import { type Field, useFieldState } from 'formular'
import { useQuery } from '@tanstack/react-query'
import { type GamesQuery, type GamesQueryVariables, GamesDocument, Game_OrderBy, OrderDirection, GameState } from '@azuro-org/toolkit'
import { useDebounce } from 'hooks'
import { useChain } from '@azuro-org/sdk'
import { gqlRequest } from 'helpers'

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
  const { graphql } = useChain()

  const debouncedValue = useDebounce(value?.trim(), 300)

  const { data: sports, isFetching } = useQuery({
    queryKey: [ 'search', debouncedValue ],
    queryFn: async () => {
      const variables: GamesQueryVariables = {
        first: 1000,
        orderBy: Game_OrderBy.StartsAt,
        orderDirection: OrderDirection.Desc,
        where: {
          state_in: [ GameState.Live, GameState.Prematch ],
          title_contains_nocase: debouncedValue.toLowerCase(),
        },
      }

      const { games } = await gqlRequest<GamesQuery, GamesQueryVariables>({
        url: graphql.feed,
        document: GamesDocument,
        variables,
      })

      const sports = formatGamesIntoSports(games)

      return sports
    },
    refetchOnWindowFocus: false,
    enabled: debouncedValue.length > 1,
  })

  if (!debouncedValue || debouncedValue?.length < 2) {
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
