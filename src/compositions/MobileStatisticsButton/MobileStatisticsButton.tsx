'use client'

import React, { useSyncExternalStore } from 'react'
import { useParams } from 'next/navigation'
import { closeModal, openModal } from '@locmod/modal'
import dynamic from 'next/dynamic'
import cx from 'classnames'
import { liveStatisticsGameIdStore } from 'helpers/stores'

import { Button } from 'components/inputs'
import { Media } from 'components/layout'
import { Icon } from 'components/ui'

import messages from './messages'


const StatisticsModal = dynamic(() => import('./components/StatisticsModal/StatisticsModal'))

const MobileBetslipButton: React.FC = () => {
  const params = useParams()
  const gameId = useSyncExternalStore(
    liveStatisticsGameIdStore.subscribe,
    liveStatisticsGameIdStore.getSnapshot,
    () => ''
  )

  const isGamePage = Boolean(params.gameId)

  const handleClearClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    liveStatisticsGameIdStore.setGameId('')
  }

  return (
    <div className={cx({ 'hidden': !gameId })}>
      <Button
        title={messages.title}
        style="secondary"
        leftIcon="interface/statistics"
        rightNode={
          isGamePage ? undefined : (
            <div className="ml-4" onClick={handleClearClick}>
              <Icon className="size-4" name="interface/close" />
            </div>
          )
        }
        size={40}
        onClick={() => openModal('StatisticsModal')}
      />
      <Media narrow mobile>
        <StatisticsModal />
      </Media>
    </div>
  )
}

export default MobileBetslipButton
