import {
  type LiveStatistics,
  type HomeGuest,
  type SoccerScoreBoard,
  type BasketballScoreBoard,
  type TennisScoreBoard,
  type VolleyballScoreBoard,
} from '@azuro-org/sdk'
import { type GamesQuery } from '@azuro-org/toolkit'
import { OpponentLogo } from 'components/dataDisplay'


type ScoreProps = {
  sportId: string
  scoreBoard: LiveStatistics['scoreBoard']
}

const Score: React.FC<ScoreProps> = ({ sportId, scoreBoard }) => {
  if (!scoreBoard) {
    return null
  }

  let scoreValue: HomeGuest<number> | undefined = undefined

  if (+sportId === 33) {
    scoreValue = (scoreBoard as SoccerScoreBoard).goals
  }

  if (+sportId === 31) {
    scoreValue = (scoreBoard as BasketballScoreBoard).total
  }

  if (+sportId === 45) {
    const board = scoreBoard as TennisScoreBoard
    const { state } = board

    scoreValue = board[state.toLowerCase()]

    if (!scoreValue) {
      const { sets } = board

      scoreValue = sets
    }
  }

  if (+sportId === 26) {
    const board = scoreBoard as VolleyballScoreBoard
    const { state } = board

    scoreValue = board[state.toLowerCase()]

    if (!scoreValue) {
      const { sets } = board

      scoreValue = sets
    }
  }

  if (!scoreValue) {
    return null
  }

  return (
    <div className="bg-card-border-bottom p-px rounded-full overflow-hidden w-fit flex-none mx-1">
      <div className="bg-bg-l3  rounded-full py-1 px-2 w-fit text-caption-13 font-semibold">
        {scoreValue.h}<span className="text-grey-70 mx-1.5">:</span>{scoreValue.g}
      </div>
    </div>
  )
}

type ScoreBoardProps = {
  participants: GamesQuery['games'][0]['participants']
} & ScoreProps

const ScoreBoard: React.FC<ScoreBoardProps> = ({ sportId, scoreBoard, participants }) => {

  return (
    <div className="p-2 bg-bg-l3 rounded-sm flex items-center justify-between">
      <div className="flex items-center space-x-1 text-caption-13 font-semibold text-brand-50 w-full">
        <OpponentLogo className="!bg-transparent" image={participants[0].image} />
        <div className="text-ellipsis whitespace-nowrap overflow-hidden max-w-[4.5rem]">{participants[0].name}</div>
      </div>
      <Score sportId={sportId} scoreBoard={scoreBoard} />
      <div className="flex items-center justify-end space-x-1 text-caption-13 font-semibold text-brand-50 w-full">
        <div className="text-ellipsis whitespace-nowrap overflow-hidden max-w-[4.5rem]">{participants[1].name}</div>
        <OpponentLogo className="!bg-transparent" image={participants[1].image} />
      </div>
    </div>
  )
}

export default ScoreBoard
