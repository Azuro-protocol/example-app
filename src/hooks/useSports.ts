import { useParams } from 'next/navigation'
import { useSports as _useSports, type UseSportsProps, useLive } from '@azuro-org/sdk'
import { Game_OrderBy, OrderDirection, type SportsQuery } from '@azuro-org/toolkit'
import { useMemo } from 'react'


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
      limit: 10,
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

      const newSport: Sport = {
        ...rest,
        leagues: [],
      }

      countries.forEach(country => {
        const { leagues } = country

        leagues.forEach(league => {
          newSport.leagues.push({
            ...league,
            countrySlug: country.slug,
            countryName: country.name,
          })
        })
      })

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
