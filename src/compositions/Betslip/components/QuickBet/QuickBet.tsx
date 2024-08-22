import { Message } from '@locmod/intl'
import React, { useState } from 'react'
import localStorage from '@locmod/local-storage'
import { useChain } from '@azuro-org/sdk'
import { constants } from 'helpers'

import { Input } from 'components/inputs'

import messages from './messages'


const inputPattern = '^(|[1-9][0-9]*)$'

export const getQuickBetStorageValue = () => {
  const storageValue = localStorage.getItem<string[]>(constants.localStorageKeys.quickBet)

  if (Array.isArray(storageValue) && storageValue.every((value) => /^\d+$/.test(value))) {
    return storageValue
  }

  return constants.defaultQuickBetsValues
}

const QuickBet: React.FC = () => {
  const { betToken } = useChain()
  const [ fields, setFields ] = useState(getQuickBetStorageValue())

  const handleChange = (value: string, index) => {
    const newValue = getQuickBetStorageValue()
    newValue[index] = +value ? value : constants.defaultQuickBetsValues[index]
    localStorage.setItem(constants.localStorageKeys.quickBet, newValue)

    setFields(newValue)
  }

  return (
    <div className="bg-bg-l2 rounded-md py-2 px-3">
      <Message className="text-caption-12 font-medium text-grey-60" value={messages.title} />
      <div className="mt-2 space-y-2">
        {
          fields.map((_, index) => {
            return (
              <Input
                key={index}
                regExp={inputPattern}
                type="number"
                value={fields[index]}
                placeholder="0.00"
                rightNode={<div className="text-caption-12 font-medium text-grey-60 ml-2">{betToken.symbol}</div>}
                onChange={(value) => handleChange(value, index)}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default QuickBet
