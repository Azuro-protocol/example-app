'use client'

import {
  type LiveStatistics,
} from '@azuro-org/sdk'
import cx from 'classnames'
import { getLiveTotalScore } from 'helpers/getters'


export type TotalScoreProps = {
  className?: string
  sportId: string
  scoreBoard: LiveStatistics['scoreBoard']
}

const TotalScore: React.FC<TotalScoreProps> = ({ className, sportId, scoreBoard }) => {
  if (!scoreBoard) {
    return null
  }

  const scoreValue = getLiveTotalScore(sportId, scoreBoard)

  if (!scoreValue) {
    return null
  }

  return (
    <div className={cx('bg-card-border-bottom p-px rounded-full overflow-hidden w-fit flex-none mx-1 text-caption-13 font-semibold', className)}>
      <div className="bg-bg-l3 rounded-full py-1 px-2 w-fit">
        {scoreValue.h}<span className="text-grey-70 mx-1.5">:</span>{scoreValue.g}
      </div>
    </div>
  )
}

export default TotalScore
