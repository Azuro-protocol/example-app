import { Message } from '@locmod/intl'
import React, { useEffect, useState } from 'react'
import { type LiveStatistics } from '@azuro-org/sdk'
import cx from 'classnames'

import messages from './messages'


type LineProps = {
  className?: string
  h: number
  g: number
}

const Line: React.FC<LineProps> = ({ className, h, g }) => {
  const [ width, setWidth ] = useState('5%')

  useEffect(() => {
    const newWidth = h > g ? '100%' : `${Math.max(h * 100 / (g || 1), 5)}%`

    const timeout = setTimeout(() => {
      setWidth(newWidth)
    }, 50)

    return () => {
      clearTimeout(timeout)
    }
  }, [ h, g ])

  return (
    <div
      className={cx('h-full transition-all', className)}
      style={
        {
          width,
        }
      }
    />
  )
}

type StatItemProps = {
  statKey: string
  stat: {
    h: number
    g: number
  }
}

const StatItem: React.FC<StatItemProps> = ({ statKey, stat }) => {
  if (stat.h === -1 && stat.g === -1) {
    return null
  }

  const title: Intl.Message = messages.stats[statKey]

  if (!title) {
    return null
  }

  return (
    <div className="">
      <div className="flex items-center justify-between text-caption-13">
        <div className="font-semibold">{stat.h}</div>
        <Message className="text-grey-60" value={title} />
        <div className="font-semibold">{stat.g}</div>
      </div>
      <div className="bg-bg-l2 h-0.5 rounded-t-ssm flex justify-center mt-1">
        <div className="w-[45%] h-full">
          <Line className="bg-[#0988F0] ml-auto" h={stat.h} g={stat.g} />
        </div>
        <div className="w-[45%] h-full">
          <Line className="bg-[#FF4B45]" h={stat.g} g={stat.h} />
        </div>
      </div>
    </div>
  )
}

type StatisticsProps = {
  stats: LiveStatistics['stats']
}

const Statistics: React.FC<StatisticsProps> = ({ stats }) => {
  return (
    <div className="p-2 bg-grey-15 rounded-sm">
      <Message className="text-heading-h5 font-bold" value={messages.title} />
      <div className="space-y-2 mt-2">
        {
          Object.keys(stats!).map((statKey) => (
            <StatItem key={statKey} statKey={statKey} stat={stats![statKey]} />
          ))
        }
      </div>
    </div>
  )
}

export default Statistics
