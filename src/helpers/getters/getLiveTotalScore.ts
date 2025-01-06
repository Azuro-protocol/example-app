import {
  type LiveStatistics,
  type HomeGuest,
  type SoccerScoreBoard,
  type BasketballScoreBoard,
  type TennisScoreBoard,
  type VolleyballScoreBoard,
} from '@azuro-org/sdk'


const getLiveTotalScore = (sportId: string | number, scoreBoard: LiveStatistics['scoreBoard']): HomeGuest<number> | undefined => {
  if (+sportId === 33) {
    return (scoreBoard as SoccerScoreBoard).goals
  }

  if (+sportId === 31) {
    return (scoreBoard as BasketballScoreBoard).total
  }

  if (+sportId === 45) {
    return (scoreBoard as TennisScoreBoard).sets
  }

  if (+sportId === 26) {
    return (scoreBoard as VolleyballScoreBoard).sets
  }
}

export default getLiveTotalScore
