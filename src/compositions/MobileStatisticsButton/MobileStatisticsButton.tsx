'use client'

import React, { useSyncExternalStore } from 'react'
import { useBaseBetslip } from '@azuro-org/sdk'
import { openModal } from '@locmod/modal'
import dynamic from 'next/dynamic'
import cx from 'classnames'
import { liveStatisticsGameIdStore } from 'helpers/stores'

import { Button } from 'components/inputs'
import { Media } from 'components/layout'

import messages from './messages'


const StatisticsModal = dynamic(() => import('./components/StatisticsModal/StatisticsModal'))

const MobileBetslipButton: React.FC = () => {
  const { items } = useBaseBetslip()
  const gameId = useSyncExternalStore(
    liveStatisticsGameIdStore.subscribe,
    liveStatisticsGameIdStore.getSnapshot,
    () => ''
  )

  return (
    <div className={cx({ 'hidden': !gameId })}>
      <Button
        title={messages.title}
        style="secondary"
        leftIcon="interface/statistics"
        rightNode={
          items.length ? (
            <div className="bg-grey-90 text-caption-13 font-semibold px-1 min-w-8 h-8 ml-2 text-bg-l0 rounded-min flex items-center justify-center -mr-3">{items.length}</div>
          ) : undefined
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
