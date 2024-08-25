import { type Sport } from 'hooks'
import { useFilterByTime, filterGamesByTime } from 'compositions/events/TimeFilter/TimeFilter'


const useFilteredLeagues = (leagues: Sport['leagues']): Sport['leagues'] => {
  const { filterByTime } = useFilterByTime()

  const filteredByTime = leagues.map(({ games, ...rest }) => {
    return {
      ...rest,
      games: filterGamesByTime(games, filterByTime),
    }
  })
    .filter(({ games }) => games.length)

  return filteredByTime
}

export default useFilteredLeagues
