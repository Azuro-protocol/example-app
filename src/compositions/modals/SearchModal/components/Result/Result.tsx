import { useEffect, useState } from 'react'
import type { QueryOptions } from '@apollo/client'
import { type Field, useFieldState } from 'formular'
// import { useApolloClients } from '@azuro-org/sdk'
import { type GamesQuery, type GamesQueryVariables, GamesDocument, Game_OrderBy, OrderDirection } from '@azuro-org/toolkit'
import { type Sport as TSport, useDebounce, useIsMounted } from 'hooks'

import EmptyContent from 'compositions/EmptyContent/EmptyContent'
import Sport, { SportSkeleton } from 'compositions/events/Sport/Sport'
import League, { LeagueSkeleton } from 'compositions/events/League/League'

import messages from './messages'
import formatGamesIntoSports from './utils/formatGamesIntoSports'


type ResultProps = {
  field: Field<string>
}

type SearchState = {
  isFetching: boolean
  sports: TSport[]
}

// const getQueryOptions = (value: string, hoursBeforeStart: number = 0): QueryOptions<GamesQueryVariables, GamesQuery> => ({
//   query: GamesDocument,
//   fetchPolicy: 'network-only',
//   variables: {
//     where: {
//       startsAt_gt: Math.floor(Date.now() / 1000 - 60 * 60 * hoursBeforeStart),
//       hasActiveConditions: true,
//       title_contains_nocase: value.toLowerCase(),
//     },
//     orderBy: Game_OrderBy.StartsAt,
//     orderDirection: OrderDirection.Asc,
//   },
// })

const Result: React.FC<ResultProps> = ({ field }) => {
  const { value } = useFieldState(field)
  const isMounted = useIsMounted()
  const [ { isFetching, sports }, setState ] = useState<SearchState>({
    isFetching: false,
    sports: [],
  })

  const debouncedValue = useDebounce(value?.trim(), 300)
  // TODO
  // const apolloClients = useApolloClients()

  // const fetch = async () => {
  //   setState({
  //     isFetching: true,
  //     sports: [],
  //   })

  //   try {
  //     const [ liveResult, prematchResult ] = await Promise.all([
  //       apolloClients.liveClient.query<GamesQuery, GamesQueryVariables>(getQueryOptions(debouncedValue, 6)),
  //       apolloClients.prematchClient.query<GamesQuery, GamesQueryVariables>(getQueryOptions(debouncedValue, 0)),
  //     ])

  //     const sports = formatGamesIntoSports([
  //       ...liveResult.data?.games,
  //       ...prematchResult.data?.games,
  //     ])

  //     // check if value didn't change while waiting for fetch
  //     if (isMounted() && field.state.value === value) {
  //       setState({
  //         isFetching: false,
  //         sports,
  //       })
  //     }
  //   }
  //   catch (err) {
  //     if (isMounted()) {
  //       setState({
  //         isFetching: false,
  //         sports: [],
  //       })
  //     }
  //   }
  // }

  // useEffect(() => {
  //   if (debouncedValue?.length > 1) {
  //     fetch()
  //   }
  // }, [ debouncedValue ])

  // if (!debouncedValue || debouncedValue?.length < 2) {
  //   return null
  // }

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
