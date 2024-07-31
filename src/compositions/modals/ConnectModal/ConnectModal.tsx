'use client'

import { type ReactNode, useEffect } from 'react'
import { type ModalComponent } from '@locmod/modal'
import { type Connector, useAccount, useConnect } from 'wagmi'
import { Message } from '@locmod/intl'
import { useDevice } from 'contexts'

import { PlainModal } from 'components/feedback'

import { ActionScreen, Buttons } from './components'
import messages from './messages'


type ConnectModalProps = {
  withSuccessModal?: boolean
  onFinish?: () => void
}

const ConnectModal: ModalComponent<ConnectModalProps> = (props) => {
  const { closeModal, onFinish } = props

  const { isConnected, connector } = useAccount()
  const { connectAsync, connectors, isPending, isError, error, variables, reset } = useConnect()
  const { isMobileDevice } = useDevice()

  const handleButtonClick = (connector: Connector) => {
    connectAsync({
      connector,
    })
      .catch((error: any) => {
        if (error?.message && /Connection request reset/i.test(error?.message)) {
          return
        }

        console.error(error)
      })
  }

  useEffect(() => {
    if (!isConnected && !isPending && isMobileDevice && window.ethereum) {
      const injectedConnectors = connectors.filter(({ type }) => type === 'injected')
      const eip6963Connectors = injectedConnectors.length > 1
        ? injectedConnectors.filter(({ id, name }) => id !== 'injected' && name !== 'Injected')
        : injectedConnectors

      const connector = eip6963Connectors.length ? eip6963Connectors[0] : injectedConnectors[0]

      if (connector) {
        handleButtonClick(connector)
      }
    }
  }, [ /* don't add deps, to only fire once on init */ ])

  useEffect(() => {
    if (!connector || !isConnected) {
      return
    }

    closeModal()

    onFinish?.()
  }, [ connector, isConnected ])

  let content: ReactNode

  // @ts-expect-error
  const walletIcon = variables?.connector?.icon
  const walletName = variables?.connector?.name

  if (isPending) {
    content = (
      <ActionScreen
        walletName={walletName}
        walletIcon={walletIcon}
        title={messages.waiting.title}
        text={messages.waiting.text}
        isPending
        reset={reset}
      />
    )
  }
  else if (isError) {
    let title: Intl.Message
    let text: Intl.Message

    if ('code' in error) {
      title = messages.errors[error.code]?.title
      text = messages.errors[error.code]?.text
    }

    content = (
      <ActionScreen
        walletName={walletName}
        walletIcon={walletIcon}
        title={title! || messages.errors.default.title}
        text={text! || messages.errors.default.text}
        isError
        reset={reset}
      />
    )
  }
  else {
    content = (
      <>
        <Message
          className="mb-4 text-heading-h4 text-center font-bold"
          value={messages.connect}
          tag="h2"
        />
        <Buttons onClick={handleButtonClick} />
      </>
    )
  }

  return (
    <PlainModal closeModal={closeModal}>
      {content}
    </PlainModal>
  )
}

declare global {
  interface ModalsRegistry extends ExtendModalsRegistry<{ ConnectModal: typeof ConnectModal }> {}
}

export default ConnectModal
