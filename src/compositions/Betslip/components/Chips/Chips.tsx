import React from 'react'
import cx from 'classnames'
import { useBetTokenBalance, useDetailedBetslip } from '@azuro-org/sdk'
import { Message } from '@locmod/intl'
import { useAccount } from 'wagmi'
import { formatToFixed } from 'helpers/formatters'

import { getQuickBetStorageValue } from '../QuickBet/QuickBet'

import messages from './messages'


type ChipProps = {
  title: string | Intl.Message
  isActive: boolean
  isDisabled?: boolean
  onClick: () => void
}

const Chip: React.FC<ChipProps> = ({ title, isActive, isDisabled, onClick }) => {
  const className = cx('h-7 px-2 text-center hover:text-grey-90 w-full rounded-t-ssm rounded-b-sm', {
    'bg-brand-50 text-grey-90': isActive,
    'text-grey-60 bg-bg-l3 hover:text-brand-50': !isActive,
    'cursor-now-allowed text-grey-20': isDisabled,
  })

  return (
    <button className={className} onClick={onClick}>
      <Message className="text-caption-12 font-medium uppercase" value={title} />
    </button>
  )
}

const Chips: React.FC = () => {
  const { address } = useAccount()
  const { betAmount, changeBetAmount } = useDetailedBetslip()
  const { balance, loading } = useBetTokenBalance()

  if (!address) {
    return null
  }

  const chips = getQuickBetStorageValue()

  return (
    <div className="flex items-center space-x-[2px] mt-1">
      {
        chips.map(chipValue => {
          const isActive = +betAmount === +chipValue

          return (
            <Chip
              key={chipValue}
              title={String(chipValue)}
              isActive={isActive}
              onClick={() => changeBetAmount(String(chipValue))}
            />
          )
        })
      }
      <Chip
        title={messages.max}
        isActive={Boolean(+betAmount) && formatToFixed((balance || 0), 2) === +betAmount}
        isDisabled={loading}
        onClick={() => changeBetAmount(balance!)}
      />
    </div>
  )
}

export default Chips
