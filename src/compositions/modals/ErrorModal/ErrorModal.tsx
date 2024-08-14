'use client'

import { type ModalComponent } from '@locmod/modal'

import InfoModal, { type InfoModalProps } from 'compositions/modals/InfoModal/InfoModal'

import messages from './messages'


type ErrorModalProps = PartialBy<Pick<InfoModalProps, 'title' | 'text' | 'buttonProps'>, 'title'>

const ErrorModal: ModalComponent<ErrorModalProps> = (props) => {

  return (
    <InfoModal
      icon={<img src="/images/illustrations/smile_sad.png" alt="" />}
      title={messages.title}
      text={messages.text}
      {...props}
    />
  )
}

declare global {
  interface ModalsRegistry extends ExtendModalsRegistry<{ ErrorModal: typeof ErrorModal }> {}
}

export default ErrorModal
