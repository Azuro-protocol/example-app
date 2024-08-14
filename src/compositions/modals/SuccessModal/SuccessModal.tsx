'use client'

import type { ModalComponent } from '@locmod/modal'

import InfoModal, { type InfoModalProps } from 'compositions/modals/InfoModal/InfoModal'

import messages from './messages'


type SuccessModalProps = PartialBy<Omit<InfoModalProps, 'icon'>, 'title'>

export const SuccessModal: ModalComponent<SuccessModalProps> = (props) => (
  <InfoModal
    icon={<img src="/images/illustrations/win.png" alt="" />}
    title={messages.title}
    {...props}
  />
)

declare global {
  interface ModalsRegistry extends ExtendModalsRegistry<{ SuccessModal: typeof SuccessModal }> {}
}

export default SuccessModal
