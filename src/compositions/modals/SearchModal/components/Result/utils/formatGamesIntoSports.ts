
import { type GamesQuery, type SportsQuery } from '@azuro-org/toolkit'
import { type Sport } from 'hooks'


type Game = GamesQuery['games'][number]
type Games = Game[]

type Data = Record<string, Omit<SportsQuery['sports'][0], 'countries'> & {
  countries: Record<string, Omit<SportsQuery['sports'][0]['countries'][0], 'leagues'> & {
    leagues: Record<string, SportsQuery['sports'][0]['countries'][0]['leagues'][0]>
  }>
}
>
const formatSportsData = (gamesData: Games): Sport[] => {
  let sportsData: Data = {}

  gamesData.forEach((gameData) => {
    const {
      sport: {
        sportId,
        name: sportName,
        slug: sportSlug,
      },
      league: {
        name: leagueName,
        slug: leagueSlug,
      },
      country: {
        name: countryName,
        slug: countrySlug,
      },
    } = gameData


    if (!sportsData[sportId]) {
      sportsData[sportId] = {
        id: sportId,
        sportId,
        slug: sportSlug,
        name: sportName,
        turnover: '0',
        countries: {},
      }
    }

    if (!sportsData[sportId].countries[countrySlug]) {
      sportsData[sportId].countries[countrySlug] = {
        name: countryName,
        slug: countrySlug,
        turnover: '0',
        leagues: {},
      }
    }

    if (!sportsData[sportId].countries[countrySlug].leagues[leagueSlug]) {
      sportsData[sportId].countries[countrySlug].leagues[leagueSlug] = {
        name: leagueName,
        slug: leagueSlug,
        turnover: '0',
        games: [],
      }
    }

    sportsData[sportId].countries[countrySlug].leagues[leagueSlug].games.push({
      ...gameData,
      turnover: '0',
    })
  })

  return Object.values(sportsData).reduce<Sport[]>((acc, sport) => {
    const { countries: _countries, ...rest } = sport

    const leagues = Object.values(_countries).reduce<Sport['leagues']>((acc, country) => {
      const { leagues: _leagues } = country

      const leagues = Object.values(_leagues).map<Sport['leagues'][0]>(league => ({
        ...league,
        countrySlug: country.slug,
        countryName: country.name,
      }))

      acc.push(...leagues)

      return acc
    }, [])

    acc.push({
      ...rest,
      leagues,
    })

    return acc
  }, [])
}

export default formatSportsData
