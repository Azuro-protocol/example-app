import { useParams } from 'next/navigation'
import { useSports as _useSports, type UseSportsProps, useLive } from '@azuro-org/sdk'
import { Game_OrderBy, OrderDirection, type SportsQuery } from '@azuro-org/toolkit'
import { useMemo } from 'react'
import { constants } from 'helpers'


type GraphSport = SportsQuery['sports'][0]
type GraphLeague = GraphSport['countries'][0]['leagues'][0]

export type Sport = Omit<GraphSport, 'countries'> & {
  leagues: Array<GraphLeague & {
    countrySlug: string
    countryName: string
  }>
}

const useSports = () => {
  const params = useParams()
  const isTopPage = !params.sportSlug || params.sportSlug === '/'
  const { isLive } = useLive()

  const props: UseSportsProps = isTopPage ? {
    gameOrderBy: Game_OrderBy.Turnover,
    filter: {
      limit: constants.topPageGamePerSportLimit,
    },
    isLive,
  } : {
    gameOrderBy: Game_OrderBy.StartsAt,
    orderDir: OrderDirection.Asc,
    filter: {
      sportSlug: params.sportSlug as string,
      countrySlug: params.countrySlug as string,
      leagueSlug: params.leagueSlug as string,
    },
    isLive,
  }

  const { loading, sports } = _useSports(props)

  const formattedSports = useMemo(() => {
    if (!sports?.length) {
      return
    }

    return sports.reduce<Sport[]>((newSports, sport) => {
      const { countries, ...rest } = sport

      let gamesCount = 0
      const newSport: Sport = {
        ...rest,
        leagues: [],
      }

      for (let countryIndex = 0; countryIndex < countries.length; countryIndex++) {
        const country = countries[countryIndex]
        const { leagues } = country

        if (isTopPage && gamesCount >= constants.topPageGamePerSportLimit) {
          break
        }

        for (let leagueIndex = 0; leagueIndex < leagues.length; leagueIndex++) {
          const league = leagues[leagueIndex]
          const { games, ...rest } = league

          if (isTopPage && gamesCount >= constants.topPageGamePerSportLimit) {
            break
          }

          let leagueGames

          if (isTopPage) {
            const sliceEnd = constants.topPageGamePerSportLimit - gamesCount

            leagueGames = games.slice(0, sliceEnd)
            gamesCount += leagueGames.length
          }
          else {
            leagueGames = games
          }

          newSport.leagues.push({
            ...rest,
            countrySlug: country.slug,
            countryName: country.name,
            games: leagueGames,
          })
        }
      }

      newSports.push(newSport)

      return newSports
    }, [])
  }, [ sports ])

  return {
    sports: formattedSports,
    loading,
  }
}

export default useSports
