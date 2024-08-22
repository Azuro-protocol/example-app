import React from 'react'
import cx from 'classnames'


type InputProps = {
  className?: string
  value: string
  placeholder?: string
  type?: 'text' | 'number'
  leftNode?: React.ReactElement
  rightNode?: React.ReactElement
  regExp?: string
  isError?: boolean
  onChange: (value: string) => void
}

const Input: React.FC<InputProps> = (props) => {
  const {
    className, value, type, leftNode, rightNode, placeholder,
    regExp = '^(|0|0\\.[0-9]*|[1-9][0-9]*\\.?[0-9]*)$',
    isError,
    onChange,
  } = props
  const handleChange = (value: string) => {
    if (regExp && !new RegExp(regExp).test(value)) {
      return
    }

    onChange(value)
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
        className="bg-transparent w-full h-full placeholder:text-grey-60 text-caption-14 font-semibold"
        type={type}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
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
