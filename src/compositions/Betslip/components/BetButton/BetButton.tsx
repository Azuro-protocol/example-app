import React, { useRef } from 'react'
import cx from 'classnames'
import { useBaseBetslip, useChain, useDetailedBetslip, useBet } from '@azuro-org/sdk'
import { type Address } from 'viem'
import { Message } from '@locmod/intl'
import { useAccount } from '@azuro-org/sdk-social-aa-connector'
import { openModal } from '@locmod/modal'
import localStorage from '@locmod/local-storage'
import { constants, isUserRejectedRequestError, toLocaleString } from 'helpers'

import { Icon } from 'components/ui'
import { buttonMessages } from 'components/inputs'

import messages from './messages'


type BetButtonProps = {
  isEnoughBalance: boolean
  isBalanceFetching: boolean
}

const BetButton: React.FC<BetButtonProps> = ({ isEnoughBalance, isBalanceFetching }) => {
  const { address } = useAccount()
  const { betToken } = useChain()
  const { items, clear } = useBaseBetslip()
  const {
    betAmount, odds, totalOdds,
    isBetAllowed, isOddsFetching, isStatesFetching, isMaxBetFetching,
  } = useDetailedBetslip()

  const totalOddsRef = useRef(totalOdds)

  if (!isOddsFetching) {
    totalOddsRef.current = totalOdds
  }

  const slippage = +(localStorage.getItem(constants.localStorageKeys.slippage) as string || constants.defaultSlippage)

  const {
    submit,
    approveTx,
    betTx,
    isRelayerFeeLoading,
    isAllowanceLoading,
    isApproveRequired,
  } = useBet({
    // betAmount: isBatch ? batchBetAmounts : betAmount,
    betAmount,
    slippage,
    affiliate: process.env.NEXT_PUBLIC_AFFILIATE_ADDRESS as Address,
    selections: items,
    odds,
    totalOdds,
    // freeBet: selectedFreeBet,
    onSuccess: () => {
      openModal('SuccessModal', {
        title: messages.success.title,
      })
      clear()
    },
    onError: (err) => {
      if (!isUserRejectedRequestError(err)) {
        openModal('ErrorModal')
      }

      console.log('Bet err:', err)
    },
  })

  const isPending = approveTx.isPending || betTx.isPending
  const isProcessing = approveTx.isProcessing || betTx.isProcessing

  const isLoading = (
    isOddsFetching
    || isMaxBetFetching
    || isBalanceFetching
    || isStatesFetching
    || isAllowanceLoading
    || isPending
    || isProcessing
    || isRelayerFeeLoading
  )

  const isDisabled = (
    isLoading
    || !address
    || !isBetAllowed
    || (!isEnoughBalance && !isApproveRequired)
    || !+betAmount
  )

  const rootClassName = cx('flex items-center justify-between py-1 pr-1 border rounded-md w-full', {
    'bg-bg-l1 border-grey-10 cursor-not-allowed': isDisabled,
    'bg-brand-50 text-grey-90 border-white/20': !isDisabled,
  })
  const possibleWinClassName = cx('text-caption-12 flex items-center p-2 rounded-sm flex-none select-none', {
    'bg-grey-15 text-grey-20': isDisabled,
    'bg-white/20 text-grey-90': !isDisabled,
  })

  return (
    <button className={rootClassName} onClick={submit} disabled={isDisabled}>
      <div className="w-full text-center px-1">
        {
          isLoading ? (
            <Icon className="size-4 mx-auto" name="interface/spinner" />
          ) : (
            <Message
              className="font-bold text-caption-14"
              value={isApproveRequired ? buttonMessages.approve : buttonMessages.placeBet}
            />
          )
        }
      </div>
      <div className={possibleWinClassName}>
        <Message className="mr-1" value={messages.possibleWin} />
        <div className="font-semibold">{toLocaleString(totalOddsRef.current * +betAmount, { digits: 2 })} {betToken.symbol}</div>
      </div>
    </button>
  )
}

export default BetButton
