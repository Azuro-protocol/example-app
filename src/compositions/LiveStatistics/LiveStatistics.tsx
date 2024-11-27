'use client'

import React, { useMemo, useState, useSyncExternalStore } from 'react'
import { useParams } from 'next/navigation'
import { Message } from '@locmod/intl'
import cx from 'classnames'
import { useApolloClients, useLiveStatistics } from '@azuro-org/sdk'
import { GameStatus, type MainGameInfoFragment, MainGameInfoFragmentDoc } from '@azuro-org/toolkit'
import { liveStatisticsGameIdStore } from 'helpers/stores'

import { Icon } from 'components/ui'

import { Statistics } from './components'

import messages from './messages'


const LiveStatistics: React.FC = () => {
  const params = useParams()
  const [ isVisible, setVisible ] = useState(true)
  const { liveClient } = useApolloClients()
  const gameId = useSyncExternalStore(
    liveStatisticsGameIdStore.subscribe,
    liveStatisticsGameIdStore.getSnapshot,
    () => ''
  )

  const game = useMemo(() => {
    return liveClient!.cache.readFragment<MainGameInfoFragment>({
      id: liveClient!.cache.identify({ __typename: 'Game', id: gameId }),
      fragment: MainGameInfoFragmentDoc,
      fragmentName: 'MainGameInfo',
    })
  }, [ gameId ])

  const { statistics, isFetching } = useLiveStatistics({
    gameId,
    sportId: game?.sport?.sportId!,
    gameStatus: GameStatus.Live,
    enabled: Boolean(game),
  })

  if (!gameId) {
    return null
  }

  const isGamePage = Boolean(params.gameId)

  if (isFetching) {
    return 'Loading'
  }

  if (!statistics?.stats) {
    return 'Empty'
  }

  return (
    <div className="rounded-md overflow-hidden">
      <div className="flex items-center justify-between bg-bg-l2 p-3">
        <button className="text-grey-60 hover:text-grey-90" onClick={() => setVisible(v => !v)}>
          <Icon className={cx('size-5', { 'rotate-180': !isVisible })} name="interface/chevron_up" />
        </button>
        <Message className="text-caption-14 font-semibold text-brand-50" value={messages.title} />
        {
          isGamePage ? (
            <div className="w-5" />
          ) : (
            <button
              className="text-grey-60 hover:text-grey-90"
              onClick={() => liveStatisticsGameIdStore.setGameId('')}
            >
              <Icon className="size-5" name="interface/delete" />
            </button>
          )
        }
      </div>
      {
        isVisible && (
          <div className="bg-bg-l2 p-1 mt-px">
            <Statistics stats={statistics!.stats} />
          </div>
        )
      }
    </div>
  )
}

export default LiveStatistics
