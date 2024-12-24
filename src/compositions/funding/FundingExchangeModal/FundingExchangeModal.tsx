'use client'

import type { WidgetConfig } from '@lifi/widget'
import { ChainType, LiFiWidget } from '@lifi/widget'
import type { ModalComponent } from '@locmod/modal'
import { useChain } from '@azuro-org/sdk'
import { openModal } from '@locmod/modal'

import { useEffect } from 'react'
import { useWallet } from 'wallet'
import { PlainModal } from 'components/feedback'


const config: Partial<WidgetConfig> = {
  variant: 'compact',
  subvariant: 'default',
  appearance: 'dark',
  theme: {
    palette: {
      primary: {
        main: '#ED742E',
      },
      secondary: {
        main: '#111111',
      },
    },
    typography: {
      fontFamily: 'Inter, sans-serif',
    },
    container: {
      fontSize: '16px',
      boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.08)',
      borderRadius: '16px',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontSize: '16px',
          },
          icon: {
            fontSize: '16px !important',
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            width: '16px',
            height: '16px',
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

  const { account, isAAWallet } = useWallet()
  const { appChain, betToken } = useChain()

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
        toToken={type === 'gas' ? appChain.nativeCurrency.symbol : betToken.symbol}
        toAmount={toAmount}
        toAddress={{ address: account!, chainType: ChainType.EVM }}
        toChain={appChain.id}
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
