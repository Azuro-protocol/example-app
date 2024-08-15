import React, { useMemo } from 'react'
import { getBetStatus, type GraphBetStatus, type GameQuery, BetStatus as TBetStatus } from '@azuro-org/toolkit'
import { Message } from '@locmod/intl'
import cx from 'classnames'

import { Icon, LiveDot, type IconName } from 'components/ui'

import messages from './messages'


type Data = Record<TBetStatus, {
  icon: IconName | React.ReactElement
  title: Intl.Message
  color: string
}>

const statusData: Data = {
  [TBetStatus.Accepted]: {
    icon: 'interface/accepted',
    title: messages[TBetStatus.Accepted],
    color: 'text-accent-pink',
  },
  [TBetStatus.Live]: {
    icon: <LiveDot />,
    title: messages[TBetStatus.Live],
    color: 'text-grey-50',
  },
  [TBetStatus.Canceled]: {
    icon: 'interface/declined',
    title: messages[TBetStatus.Canceled],
    color: 'text-grey-60',
  },
  [TBetStatus.PendingResolution]: {
    icon: 'interface/pending',
    title: messages[TBetStatus.PendingResolution],
    color: 'text-accent-blue',
  },
  [TBetStatus.Resolved]: {
    icon: 'interface/win',
    title: messages[TBetStatus.Resolved],
    color: 'text-accent-green',
  },
}

type BetStatusProps = {
  graphBetStatus: GraphBetStatus
  games: Pick<GameQuery['games'][0], 'status' | 'startsAt'>[]
  isLiveBet: boolean
  isWin: boolean | null
  isLose: boolean | null
}

const BetStatus: React.FC<BetStatusProps> = ({ graphBetStatus, games, isLiveBet, isWin, isLose }) => {
  const betStatus = useMemo(() => {
    return getBetStatus({
      graphStatus: graphBetStatus,
      games,
      isLiveBet,
    })
  }, [])

  let { icon, title, color } = statusData[betStatus]

  if (betStatus === TBetStatus.Resolved) {
    if (isWin) {
      icon = 'interface/win'
      title = messages.win
      color = 'text-accent-green'
    }
    else {
      icon = 'interface/lose'
      title = messages.lose
      color = 'text-accent-red'
    }
  }

  return (
    <div className={cx('flex items-center', `${color}`)}>
      {
        typeof icon === 'string' ? (
          <Icon className="size-4" name={icon as IconName} />
        ) : (
          icon
        )
      }
      <Message className="text-caption-13 ml-1" value={title} />
    </div>
  )
}

export default BetStatus
