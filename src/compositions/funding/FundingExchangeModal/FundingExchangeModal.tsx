'use client'

import type { WidgetConfig } from '@lifi/widget'
import { ChainType, LiFiWidget } from '@lifi/widget'
import type { ModalComponent } from '@locmod/modal'
import { openModal } from '@locmod/modal'

import { useChain } from 'context'
import { useEffect } from 'react'
import { useConnect } from 'wallet'
import { PlainModal } from 'components/feedback'


const config: Partial<WidgetConfig> = {
  variant: 'compact',
  subvariant: 'default',
  appearance: 'dark',
  theme: {
    palette: {
      primary: {
        main: '#ababf6',
      },
      secondary: {
        main: '#F5B5FF',
      },
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
    },
    container: {
      fontSize: '16rem',
      boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.08)',
      borderRadius: '16rem',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontSize: '16rem',
          },
          icon: {
            fontSize: '16rem !important',
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            width: '16rem',
            height: '16rem',
          },
        },
      },
      // bug in types, it's required...
      MuiInputCard: undefined,
    },
    shape: {
      borderRadius: 8,
      borderRadiusSecondary: 8,
    },
  },
  disabledUI: [ 'toAddress' ],
  hiddenUI: [ 'appearance', 'walletMenu', 'poweredBy' ],
  walletConfig: {
    onConnect: () => {
      openModal('ConnectModal')
    },
  },
}

export type FundingExchangeModalProps = {
  type?: 'gas' | 'bet'
  toAmount?: string | number
}

const FundingExchangeModal: ModalComponent<FundingExchangeModalProps> = (props) => {
  const { closeModal, type = 'bet', toAmount } = props

  const { account, isAAWallet } = useConnect()
  const { selectedChainId, betToken, nativeToken } = useChain()

  const shouldClose = isAAWallet

  useEffect(() => {
    if (shouldClose) {
      closeModal()
    }
  }, [ shouldClose ])

  if (shouldClose) {
    return null
  }

  return (
    <PlainModal
      className="text-[16px] !bg-transparent"
      withCloseButton={false}
      closeModal={closeModal}
    >
      <LiFiWidget
        integrator="bookxyz"
        toToken={type === 'gas' ? nativeToken.symbol : betToken.symbol}
        toAmount={toAmount}
        toAddress={{ address: account!, chainType: ChainType.EVM }}
        toChain={selectedChainId}
        config={config}
        open
        onClose={() => closeModal()}
      />
    </PlainModal>
  )
}

declare global {
  interface ModalsRegistry extends ExtendModalsRegistry<{ FundingExchangeModal: typeof FundingExchangeModal }> {
  }
}

export default FundingExchangeModal
