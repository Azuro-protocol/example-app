import React, { useRef } from 'react'
import cx from 'classnames'
import { useBaseBetslip, useBetTokenBalance, useChain, useDetailedBetslip, usePrepareBet } from '@azuro-org/sdk'
import { type Address } from 'viem'
import { Message } from '@locmod/intl'
import { useAccount } from 'wagmi'
import { formatToFixed } from 'helpers/formatters'
import { buttonMessages } from 'components/inputs'
import { Icon } from 'components/ui'

import messages from './messages'


const BetButton: React.FC = () => {
  const { address } = useAccount()
  const { betToken } = useChain()
  const { items, clear } = useBaseBetslip()
  const { betAmount, odds, totalOdds, selectedFreeBet, isBetAllowed, isOddsFetching, isStatusesFetching } = useDetailedBetslip()
  const { balance, loading: isBalanceFetching } = useBetTokenBalance()

  const totalOddsRef = useRef(totalOdds)

  if (!isOddsFetching) {
    totalOddsRef.current = totalOdds
  }

  const isEnoughBalance = isBalanceFetching || !Boolean(+betAmount) ? true : Boolean(+balance! > +betAmount)

  const {
    submit,
    approveTx,
    betTx,
    isRelayerFeeLoading,
    isAllowanceLoading,
    isApproveRequired,
  } = usePrepareBet({
    betAmount,
    slippage: 10,
    affiliate: process.env.NEXT_PUBLIC_AFFILIATE_ADDRESS as Address,
    selections: items,
    odds,
    totalOdds,
    freeBet: selectedFreeBet,
    onSuccess: () => {
      clear()
    },
  })

  const isPending = approveTx.isPending || betTx.isPending
  const isProcessing = approveTx.isProcessing || betTx.isProcessing

  const isLoading = (
    isOddsFetching
    || isBalanceFetching
    || isStatusesFetching
    || isAllowanceLoading
    || isPending
    || isProcessing
    || isRelayerFeeLoading
  )

  const isDisabled = (
    isLoading
    || !address
    || !isBetAllowed
    || !isEnoughBalance
    || !+betAmount
  )

  const rootClassName = cx('flex items-center justify-between py-1 pr-1 border rounded-md mt-3 w-full', {
    'bg-bg-l1 border-grey-10 cursor-not-allowed': isDisabled,
    'bg-brand-50 text-grey-90 border-white/20': !isDisabled,
  })
  const possibleWinClassName = cx('text-caption-12 flex items-center p-2 rounded-sm flex-none select-none', {
    'bg-grey-15 text-grey-20': isDisabled,
    'bg-white/20 text-grey-90': !isDisabled,
  })

  return (
    <button className={rootClassName} onClick={submit}>
      <div className="w-full text-center px-1">
        {
          isLoading ? (
            <Icon className="size-4 mx-auto" name="interface/spinner" />
          ) : (
            <Message className="font-bold text-caption-14" value={isApproveRequired ? buttonMessages.approve : buttonMessages.placeBet} />
          )
        }
      </div>
      <div className={possibleWinClassName}>
        <Message className="mr-1" value={messages.possibleWin} />
        <div className="font-semibold">{formatToFixed(totalOddsRef.current * +betAmount, 2)} {betToken.symbol}</div>
      </div>
    </button>
  )
}

export default BetButton