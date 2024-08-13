import { useChain, useDetailedBetslip } from '@azuro-org/sdk'
import React from 'react'
import { constants } from 'helpers'

import { Icon } from 'components/ui'


const AmountInput = () => {
  const { appChain } = useChain()
  const { betAmount, changeBetAmount } = useDetailedBetslip()

  const handleChange = (value: string) => {
    if (!new RegExp('^(|0|0\\.[0-9]*|[1-9][0-9]*\\.?[0-9]*)$').test(value)) {
      return
    }

    const [ int, digits ] = value.split('.')

    if (digits) {
      value = `${int}.${digits.substring(0, 2)}`
    }

    changeBetAmount(value)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event.target.value)
  }

  return (
    <div>
      <label className="flex items-center px-3 border border-grey-20 rounded-t-sm rounded-b-ssm h-10 cursor-text">
        <Icon className="size-5 mr-2" name={constants.currencyIcons[appChain.id]} />
        <input
          className="bg-transparent w-full h-full placeholder:text-grey-60 text-caption-14 font-semibold"
          type="number"
          value={betAmount}
          onChange={handleInputChange}
          placeholder="0.00"
        />
      </label>
    </div>
  )
}

export default AmountInput
