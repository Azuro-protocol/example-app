'use client'

import React, { useEffect, useState, useSyncExternalStore } from 'react'
import { useParams } from 'next/navigation'
import { Message } from '@locmod/intl'
import cx from 'classnames'
import { useGame, useLiveStatistics } from '@azuro-org/sdk'
import { type GamesQuery } from '@azuro-org/toolkit'
import { useIsMounted } from 'hooks'
import { closeModal } from '@locmod/modal'
import { liveStatisticsGameIdStore } from 'helpers/stores'

import { Icon } from 'components/ui'
import { Warning } from 'components/feedback'
import EmptyContent from 'compositions/EmptyContent/EmptyContent'

import { ScoreBoard, Statistics } from './components'

import messages from './messages'


type ContentProps = {
  storeGameId: string
  game: GamesQuery['games'][0]
  isGamePage: boolean
  withCollapse?: boolean
  withClearButton?: boolean
  withBottomLine?: boolean
}

const Content: React.FC<ContentProps> = (props) => {
  const { storeGameId, game, isGamePage, withCollapse = true, withClearButton = true, withBottomLine = false } = props

  const [ isVisible, setVisible ] = useState(true)
  const [ isWarningVisible, setWarningVisible ] = useState(false)
  const isMounted = useIsMounted()

  const { data: statistics, isFetching, isAvailable } = useLiveStatistics({
    gameId: game.gameId,
    sportId: game?.sport?.sportId!,
    gameState: game?.state,
  })


  useEffect(() => {
    if (!isGamePage || !isAvailable) {
      return
    }

    if (storeGameId !== game.gameId) {
      setWarningVisible(true)

      setTimeout(() => {
        if (isMounted()) {
          setWarningVisible(false)
        }
      }, 5000)
    }
  }, [ storeGameId, game.gameId ])

  if (!isAvailable) {
    return null
  }

  const handleClearClick = () => {
    closeModal('StatisticsModal')
    liveStatisticsGameIdStore.setGameId('')
  }

  return (
    <>
      <div className="rounded-sm overflow-hidden">
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
          <div className="flex items-center text-brand-50">
            <Icon className="mr-1 size-4" name="interface/tracker" />
            <Message className="text-caption-14 font-semibold" value={messages.title} />
          </div>
          {
            Boolean(isGamePage || !withClearButton) ? (
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
                    <div className="space-y-1">
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
      {
        withBottomLine && (
          <div className="-mx-2 h-px bg-grey-10 my-2" />
        )
      }
    </>
  )
}

type LiveStatisticsProps = {
  withCollapse?: boolean
  withClearButton?: boolean
  withBottomLine?: boolean
}

const LiveStatistics: React.FC<LiveStatisticsProps> = (props) => {
  const params = useParams()

  const storeGameId = useSyncExternalStore(
    liveStatisticsGameIdStore.subscribe,
    liveStatisticsGameIdStore.getSnapshot,
    () => ''
  )

  let gameId = storeGameId

  if (params.gameId) {
    gameId = params.gameId as string
  }

  const { data: game, isFetching } = useGame({ gameId })

  const isGamePage = Boolean(params.gameId)

  if (isFetching || !game) {
    return null
  }

  return (
    <Content
      {...props}
      storeGameId={storeGameId}
      game={game!}
      isGamePage={isGamePage}
    />
  )
}

export default LiveStatistics
