import { type GamesQuery } from '@azuro-org/toolkit'

import { OpponentLogo } from 'components/dataDisplay'

import TotalScore, { type TotalScoreProps } from '../TotalScore/TotalScore'


type ScoreBoardProps = {
  participants: GamesQuery['games'][0]['participants']
} & TotalScoreProps

const ScoreBoard: React.FC<ScoreBoardProps> = ({ sportId, scoreBoard, participants }) => {

  return (
    <div className="px-2 py-1 flex items-center justify-between">
      <div className="flex items-center space-x-1 text-caption-13 font-semibold text-brand-50 w-full">
        <OpponentLogo className="!bg-transparent" image={participants[0].image} />
        <div className="text-ellipsis whitespace-nowrap overflow-hidden max-w-[4.5rem]">{participants[0].name}</div>
      </div>
      <TotalScore sportId={sportId} scoreBoard={scoreBoard} />
      <div className="flex items-center justify-end space-x-1 text-caption-13 font-semibold text-brand-50 w-full">
        <div className="text-ellipsis whitespace-nowrap overflow-hidden max-w-[4.5rem]">{participants[1].name}</div>
        <OpponentLogo className="!bg-transparent" image={participants[1].image} />
      </div>
    </div>
  )
}

export default ScoreBoard
