'use client'

import React from 'react'
import { standaloneModal, type ModalComponent } from '@locmod/modal'

import { PlainModal } from 'components/feedback'
import LiveStatistics from 'compositions/LiveStatistics/LiveStatistics'


type StatisticsModalProps = {
}

const StatisticsModal: ModalComponent<StatisticsModalProps> = (props) => {
  const { closeModal } = props

  return (
    <PlainModal contentClassName="pt-14" closeModal={closeModal}>
      <LiveStatistics withCollapse={false} withClearButton={false} />
    </PlainModal>
  )
}

declare global {
  interface ModalsRegistry extends ExtendModalsRegistry<{ StatisticsModal: typeof StatisticsModal }> {}
}

export default standaloneModal('StatisticsModal', StatisticsModal)
