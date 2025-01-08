'use client'

import React, { useEffect, useMemo, useState, useSyncExternalStore } from 'react'
import { useParams } from 'next/navigation'
import { Message } from '@locmod/intl'
import cx from 'classnames'
import { LIVE_STATISTICS_SUPPORTED_SPORTS, useApolloClients, useLiveStatistics } from '@azuro-org/sdk'
import { GameStatus, type MainGameInfoFragment, MainGameInfoFragmentDoc } from '@azuro-org/toolkit'
import { useIsMounted } from 'hooks'
import { closeModal } from '@locmod/modal'
import { liveStatisticsGameIdStore } from 'helpers/stores'

import { Icon } from 'components/ui'
import { Warning } from 'components/feedback'
import EmptyContent from 'compositions/EmptyContent/EmptyContent'

import { ScoreBoard, Statistics } from './components'

import messages from './messages'


type LiveStatisticsProps = {
  withCollapse?: boolean
  withClearButton?: boolean
}

const LiveStatistics: React.FC<LiveStatisticsProps> = ({ withCollapse = true, withClearButton = true }) => {
  const params = useParams()
  const isMounted = useIsMounted()
  const [ isVisible, setVisible ] = useState(true)
  const [ isWarningVisible, setWarningVisible ] = useState(false)
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

  const { statistics, isFetching, isAvailable } = useLiveStatistics({
    gameId,
    sportId: game?.sport?.sportId!,
    gameStatus: GameStatus.Live,
    enabled: Boolean(game),
  })

  const isGamePage = Boolean(params.gameId)

  useEffect(() => {
    if (!isGamePage || !isAvailable) {
      return
    }

    if (gameId && gameId !== params.gameId) {
      setWarningVisible(true)

      setTimeout(() => {
        if (isMounted()) {
          setWarningVisible(false)
        }
      }, 5000)
    }
  }, [ gameId, params.gameId ])

  if (!isAvailable || !gameId || !LIVE_STATISTICS_SUPPORTED_SPORTS.includes(+game?.sport?.sportId!)) {
    return null
  }

  const handleClearClick = () => {
    closeModal('StatisticsModal')
    liveStatisticsGameIdStore.setGameId('')
  }

  return (
    <div className="rounded-md overflow-hidden">
      <div className="flex items-center justify-between bg-bg-l2 p-3">
        {
          withCollapse ? (
            <button className="text-grey-60 hover:text-grey-90" onClick={() => setVisible(v => !v)}>
              <Icon className={cx('size-5', { 'rotate-180': !isVisible })} name="interface/chevron_up" />
            </button>
          ) : (
            <div className="w-5" />
          )
        }
        <Message className="text-caption-14 font-semibold text-brand-50" value={messages.title} />
        {
          Boolean(isGamePage && !withClearButton) ? (
            <div className="w-5" />
          ) : (
            <button
              className="text-grey-60 hover:text-grey-90"
              onClick={handleClearClick}
            >
              <Icon className="size-5" name="interface/delete" />
            </button>
          )
        }
      </div>
      {
        isVisible && (
          <div className="bg-bg-l2 p-1 mt-px">
            {
              isFetching ? (
                <div className="bone !rounded-sm w-full h-[220px]" />
              ) : (
                Boolean(statistics?.stats) ? (
                  <div className="space-y-2">
                    <ScoreBoard
                      sportId={game!.sport.sportId}
                      participants={game!.participants}
                      scoreBoard={statistics!.scoreBoard}
                    />
                    <Statistics
                      stats={statistics!.stats}
                    />
                    {
                      isWarningVisible && (
                        <div className="pb-2 mt-3">
                          <Warning text={messages.warning} />
                        </div>
                      )
                    }
                  </div>
                ) : (
                  <EmptyContent
                    className="py-10"
                    image="/images/illustrations/smile_sad.png"
                    title={messages.empty.title}
                  />
                )
              )
            }
          </div>
        )
      }
    </div>
  )
}

export default LiveStatistics
