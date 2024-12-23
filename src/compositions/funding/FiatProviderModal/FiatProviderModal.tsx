import React, { useState } from 'react'
import { type ModalComponentProps, standaloneModal } from '@locmod/modal'
import cx from 'classnames'

import { PlainModal } from 'components/feedback'


type FiatProviderModalProps = {
  providerParams?: URLSearchParams
}

const FiatProviderModal: React.FC<FiatProviderModalProps & ModalComponentProps> = (props) => {
  const { closeModal, providerParams } = props
  const [ isLoading, setIsLoading ] = useState(true)

  const paramsWithPrefix = providerParams ? `?${providerParams}` : ''

  const onLoad = () => {
    setIsLoading(false)
  }

  const modalClassName = cx(
    'mb:overflow-y-hidden', {
      'ds:rounded-[26px]': !isLoading,
      'ds:rounded-t-md': isLoading,
    })
  const iframeClassName = cx(
    'w-full', {
      'hidden': isLoading,
    })

  return (
    <PlainModal
      className={modalClassName}
      withCloseButton={false}
      closeModal={closeModal}
      contentClassName="flex ds:h-[625px] mb:h-[80vh] -mb-3"
    >
      {
        isLoading && (
          <div className="bone self-center mx-auto" />
        )
      }
      <iframe
        src={`https://widget.mtpelerin.com/${paramsWithPrefix}`}
        frameBorder="no"
        className={iframeClassName}
        onLoad={onLoad}
      />
    </PlainModal>
  )
}

declare global {
  interface ModalsRegistry extends ExtendModalsRegistry<{ FiatProviderModal: typeof FiatProviderModal }> {}
}

export default standaloneModal('FiatProviderModal', FiatProviderModal)
