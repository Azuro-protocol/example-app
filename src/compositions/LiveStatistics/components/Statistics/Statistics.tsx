import { Message } from '@locmod/intl'
import React, { useEffect, useMemo, useState } from 'react'
import { type LiveStatistics } from '@azuro-org/sdk'
import cx from 'classnames'

import messages from './messages'


type LineProps = {
  className?: string
  h: number
  g: number
}

const Line: React.FC<LineProps> = ({ className, h, g }) => {
  const [ width, setWidth ] = useState('0%')

  useEffect(() => {
    const newWidth = h > g ? '100%' : `${Math.max(h * 100 / (g || 1), 0)}%`

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
  return (
    <div className="">
      <div className="flex items-center justify-between text-caption-13">
        <div className="font-semibold">{stat.h}</div>
        <Message className="text-grey-60" value={messages.stats[statKey]} />
        <div className="font-semibold">{stat.g}</div>
      </div>
      <div className="bg-bg-l2 h-0.5 rounded-t-ssm flex justify-center mt-1">
        <div className="w-full h-full">
          <Line className="bg-[#0988F0] ml-auto" h={stat.h} g={stat.g} />
        </div>
        <div className="w-full h-full">
          <Line className="bg-[#FF4B45]" h={stat.g} g={stat.h} />
        </div>
      </div>
    </div>
  )
}

const itemsOnPage = 6

type StatisticsProps = {
  stats: LiveStatistics['stats']
}

const Statistics: React.FC<StatisticsProps> = ({ stats }) => {
  const activeStats = useMemo(() => {
    if (stats === null) {
      return {}
    }

    return Object.keys(stats).reduce<Partial<LiveStatistics['stats']>>((acc, key) => {
      if (stats[key].h !== -1 && stats[key].g !== -1 && messages.stats[key]) {
        acc![key] = stats[key]
      }

      return acc
    }, {})
  }, [ stats ])

  const pages = Math.ceil(Object.keys(activeStats!).length / itemsOnPage)
  const [ activePage, setActivePage ] = useState(1)

  if (!Object.keys(activeStats!).length) {
    return null
  }

  return (
    <div className="p-2 bg-bg-l3 rounded-min">
      <div className="flex items-center justify-between">
        <Message className="text-heading-h5 font-bold" value={messages.title} />
        {
          Boolean(pages > 1) && (
            <div className="flex items-center bg-bg-l1 rounded-min p-0.5 space-x-0.5">
              {
                new Array(pages).fill(0).map((_, index) => {
                  const isActive = index + 1 === activePage

                  return (
                    <button
                      key={index}
                      className={
                        cx('flex items-center justify-center rounded-ssm text-caption-13 w-7 h-6', {
                          'text-grey-40 hover:text-grey-90': !isActive,
                          'text-grey-90 bg-bg-l3': isActive,
                        })
                      }
                      onClick={() => setActivePage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  )
                })
              }
            </div>
          )
        }
      </div>
      <div className="space-y-2 mt-2 min-h-[10.75rem]">
        {
          Object.keys(activeStats!).slice(
            (activePage - 1) * itemsOnPage,
            activePage * itemsOnPage
          ).map((statKey) => (
            <StatItem key={statKey} statKey={statKey} stat={stats![statKey]} />
          ))
        }
      </div>
    </div>
  )
}

export default Statistics
