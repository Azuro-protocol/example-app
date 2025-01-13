'use client'

import React from 'react'
import cx from 'classnames'
import { useIntl } from '@locmod/intl'
import { parseUnits } from 'viem'


type InputProps = {
  className?: string
  value: string
  placeholder?: string | Intl.Message
  type?: 'text' | 'number'
  maxValue?: string
  leftNode?: React.ReactElement
  rightNode?: React.ReactElement
  regExp?: string
  isError?: boolean
  noMaxOverload?: boolean
  autoFocus?: boolean
  onChange: (value: string) => void
}

const Input: React.FC<InputProps> = (props) => {
  const {
    className, value, type, maxValue, leftNode, rightNode, placeholder,
    regExp = '^(|0|0\\.[0-9]*|[1-9][0-9]*\\.?[0-9]*)$',
    isError, noMaxOverload, autoFocus = false,
    onChange,
  } = props

  const intl = useIntl()
  const handleChange = (value: string) => {
    let newValue = value

    if (regExp && !new RegExp(regExp).test(newValue)) {
      return
    }

    if (maxValue && noMaxOverload && parseUnits(maxValue, 50) < parseUnits(value, 50)) {
      newValue = maxValue
    }

    onChange(newValue)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event.target.value)
  }

  const labelClassName = cx('flex items-center px-3 border rounded-sm h-10 cursor-text', className, {
    'border-accent-red': isError,
    'border-grey-20': !isError,
  })

  return (
    <label className={labelClassName}>
      {
        Boolean(leftNode) && (
          leftNode
        )
      }
      <input
        className="bg-transparent w-full h-full placeholder:text-grey-40 text-caption-14 font-semibold"
        type={type}
        autoFocus={autoFocus}
        value={value}
        onChange={handleInputChange}
        placeholder={typeof placeholder === 'string' ? placeholder : intl.formatMessage(placeholder)}
      />
      {
        Boolean(rightNode) && (
          rightNode
        )
      }
    </label>
  )
}

export default Input
