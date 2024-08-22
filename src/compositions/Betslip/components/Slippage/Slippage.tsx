import { Message, useIntl } from '@locmod/intl'
import React, { useState } from 'react'
import cx from 'classnames'
import localStorage from '@locmod/local-storage'
import { constants } from 'helpers'

import { Input } from 'components/inputs'
import { Icon } from 'components/ui'

import messages from './messages'


type ButtonProps = {
  className?: string
  value: string
  isActive: boolean
  onClick: () => void
}

const Button: React.FC<ButtonProps> = ({ className, value, isActive, onClick }) => {
  return (
    <button
      className={
        cx('h-7 px-3 rounded-t-min rounded-b-ssm text-caption-12 font-medium text-center min-w-11', className, {
          'bg-grey-15 text-grey-60 hover:text-grey-90 cursor-pointer': !isActive,
          'bg-brand-50 text-grey-90 cursor-default': isActive,
        })
      }
      onClick={onClick}
    >
      {value}
    </button>
  )
}

const Slippage: React.FC = () => {
  const storedValue = localStorage.getItem(constants.localStorageKeys.slippage) as string
  const isFixedValue = constants.defaultSlippageValues.includes(storedValue)
  const initialValue = storedValue || constants.defaultSlippage

  const intl = useIntl()
  const [ isCustom, setIsCustom ] = useState(!isFixedValue)
  const [ slippageValue, setSlippageValue ] = useState(initialValue)

  const setValue = (value) => {
    setSlippageValue(value)
    localStorage.setItem(constants.localStorageKeys.slippage, value)
  }

  const handleButtonClick = (value: string) => {
    setIsCustom(false)
    setValue(value)
  }

  return (
    <div className="bg-bg-l2 rounded-md py-2 px-3">
      <Message className="text-caption-12 font-medium text-grey-60" value={messages.title} />
      <div className="flex items-center space-x-[2px] mt-2">
        {
          constants.defaultSlippageValues.map((value) => {
            const isActive = !isCustom && value === slippageValue

            return (
              <Button
                key={value}
                value={`${value}%`}
                isActive={isActive}
                onClick={() => handleButtonClick(value)}
              />
            )
          })
        }
        <Button
          className="w-full"
          value={intl.formatMessage(messages.custom)}
          isActive={isCustom}
          onClick={() => setIsCustom(true)}
        />
      </div>
      {
        isCustom && (
          <Input
            className="rounded-t-ssm mt-1"
            type="number"
            value={slippageValue}
            placeholder="0.00"
            rightNode={<Icon className="size-5 ml-2" name="interface/percentage" />}
            onChange={setValue}
          />
        )
      }
    </div>
  )
}

export default Slippage
