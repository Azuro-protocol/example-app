import { useChain, useDetailedBetslip, BetslipDisableReason } from '@azuro-org/sdk'
import React from 'react'
import { constants } from 'helpers'

import { Icon } from 'components/ui'
import { Input } from 'components/inputs'


type AmountInputProps = {
  isEnoughBalance: boolean
}

const AmountInput: React.FC<AmountInputProps> = ({ isEnoughBalance }) => {
  const { appChain } = useChain()
  const { betAmount, changeBetAmount, disableReason } = useDetailedBetslip()

  const handleChange = (value: string) => {
    const [ int, digits ] = value.split('.')

    if (digits) {
      value = `${int}.${digits.substring(0, 2)}`
    }

    changeBetAmount(value)
  }

  const isError = !isEnoughBalance || [
    BetslipDisableReason.BetAmountGreaterThanMaxBet,
    BetslipDisableReason.BetAmountLowerThanMinBet,
  ].includes(disableReason!)

  return (
    <Input
      className="rounded-b-ssm"
      type="number"
      value={betAmount}
      placeholder="0.00"
      leftNode={<Icon className="size-5 mr-2" name={constants.currencyIcons[appChain.id]} />}
      onChange={handleChange}
      isError={isError}
    />
  )
}

export default AmountInput
