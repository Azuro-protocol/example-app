'use client'

import { Message } from '@locmod/intl'
import { closeModal, openModal } from '@locmod/modal'
import { useEffect, useMemo } from 'react'
import { useWallet } from 'wallet'

import { useBetTokenBalance, useChain } from '@azuro-org/sdk'
import { constants } from 'helpers'
import { Tooltip } from 'components/feedback'
import { Icon } from 'components/ui'
import type { FundingExchangeModalProps } from 'compositions/funding/FundingExchangeModal/FundingExchangeModal'

import AddressSection from './components/AddressSection/AddressSection'
import OtherMethodCard from './components/OtherMethodCard/OtherMethodCard'
import useBuyWithCardClick from './utils/useBuyWithCardClick'
import messages from './messages'


export type DepositViewProps = FundingExchangeModalProps & {
  className?: string
  showQR: () => void
}

const DepositView: React.FC<DepositViewProps> = (props) => {
  const { className, showQR, toAmount, type } = props

  const { account, isAAWallet } = useWallet()
  const { appChain, betToken } = useChain()
  const { balance, loading: isBalancesFetching, refetch: refetchBetTokenBalance } = useBetTokenBalance()

  const handleBuyCryptoClick = useBuyWithCardClick()

  const steps = useMemo(() => {
    const iconClassName = 'inline grayscale w-16 h-16 align-text-top'

    return [
      {
        ...messages.steps[0],
        values: {
          symbol: betToken.symbol,
        },
        components: {
          Tooltip: ({ text, children }) => <Tooltip placement="top" text={text}><button className="border-b border-dotted border-current hover:text-grey-90">{children}</button></Tooltip>,
        },
      },
      {
        ...messages.steps[1],
        values: {
          isAAWallet,
          symbol: betToken.symbol,
          chain: appChain.name,
        },
        components: {
          TokenIcon: () => <Icon className={iconClassName} name={constants.currencyIcons[appChain.id]} />,
          ChainIcon: () => <Icon className={iconClassName} name={constants.chainIcons[appChain.id]} />,
        },
      },
    ]
  }, [ isAAWallet, appChain, betToken ])

  const handleExchangeClick = () => {
    openModal('FundingExchangeModal', {
      toAmount,
      type,
    })

    closeModal('FundingModal')
  }

  useEffect(() => {
    const interval = setInterval(() => {
      refetchBetTokenBalance()
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [ account ])

  return (
    <div className={className}>
      <div className="py-6 px-4 text-center">
        <div className="inline-flex relative size-12 mx-auto">
          <Icon className="size-full" name={constants.currencyIcons[appChain.id]} />
          <Icon className="absolute top-full left-full -ml-4 -mt-4 size-6 border-2 border-bg-60 rounded-full" name={constants.chainIcons[appChain.id]} />
        </div>
        <Message
          className="mt-6 text-heading-h2 font-bold"
          tag="h3"
          value={{ ...messages.title, values: { symbol: betToken.symbol, chain: appChain.name } }}
        />
        <p className="mt-12 text-caption-14 flex items-baseline justify-center">
          <Message
            className="text-gray-50"
            value={messages.balance}
          />
          &nbsp;
          {
            isBalancesFetching ? (
              <div className="bone size-3" />
            ) : (
              `${balance || 0} ${betToken.symbol}`
            )
          }
        </p>
      </div>
      <ol className="mx-4 bg-60 rounded-md text-caption-14 divide-y divide-grey-70">
        {
          steps.map((message, index) => (
            <li key={index} className="py-2 px-3 flex items-center">
              <span className="flex-none flex items-center justify-center size-6 rounded-md bg-brand-50">
                <span className="">{index + 1}</span>
              </span>
              <Message
                className="ml-3 text-gray-50 text-left"
                tag="p"
                value={message}
                html
              />
            </li>
          ))
        }
      </ol>
      <AddressSection className="p-4" showQR={showQR} />
      <div className="flex items-center gap-2">
        <hr className="flex-1 border-grey-70" />
        <Message className="flex-none text-grey-60 text-label font-medium" value={messages.other} />
        <hr className="flex-1 border-grey-70" />
      </div>
      <div className="p-4 grid gap-3">
        <OtherMethodCard
          title={messages.noCrypto}
          icons={[ 'logo/visa', 'logo/mastercard', 'logo/paypal', 'logo/apple_pay', 'logo/google_pay' ]}
          buttonTitle={messages.buyCard}
          onClick={handleBuyCryptoClick}
        />
        {
          !isAAWallet && (
            <OtherMethodCard
              title={messages.bridgeSwap}
              icons={[ 'currency/usdc', 'currency/dai', 'networks/ethereum', 'divider', 'networks/arbitrum', 'networks/base' ]}
              buttonTitle={messages.exchange}
              onClick={handleExchangeClick}
            />
          )
        }
      </div>
    </div>
  )
}

export default DepositView
