'use client'
import React from 'react'
import { standaloneModal, type ModalComponent } from '@locmod/modal'

import { PlainModal } from 'components/feedback'
import Betslip from 'compositions/Betslip/Betslip'


type BetslipModalProps = {
}

const BetslipModal: ModalComponent<BetslipModalProps> = (props) => {
  const { closeModal } = props

  return (
    <PlainModal contentClassName="pt-8" closeModal={closeModal}>
      <Betslip />
    </PlainModal>
  )
}

declare global {
  interface ModalsRegistry extends ExtendModalsRegistry<{ BetslipModal: typeof BetslipModal }> {}
}

export default standaloneModal('BetslipModal', BetslipModal)
