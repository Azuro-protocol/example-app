import React, { useState } from 'react'
import { type ModalComponentProps } from '@locmod/modal'
import cx from 'classnames'

import { PlainModal } from 'components/feedback'
import { ModalSkeleton } from 'compositions/modals'


type FiatProviderModalProps = {
  providerParams?: URLSearchParams
}

const FiatProviderModal: React.FC<FiatProviderModalProps & ModalComponentProps> = (props) => {
  const { closeModal, providerParams } = props
  const [ isLoading, setIsLoading ] = useState(true)

  const paramsWithPrefix = providerParams ? `?${providerParams}` : ''

  console.log(providerParams, isLoading, 'providerParams')

  const onLoad = () => {
    setIsLoading(false)
  }

  const modalClassName = cx(
    'mb:overflow-y-hidden',
    {
      'ds:rounded-[26px]': !isLoading,
      'ds:rounded-t-md': isLoading,
    }
  )
  const iframeClassName = cx(
    'w-full h-full', {
      'hidden': isLoading,
    }
  )

  return (
    <PlainModal
      className={modalClassName}
      closeModal={closeModal}
      contentClassName="flex-none ds:h-[625px] mb:h-[80vh] -mb-3"
    >
      {
        isLoading && (
          <ModalSkeleton />
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

export default FiatProviderModal
