'use client'

import React from 'react'
import cx from 'classnames'


type ScoreStepperProps = {
  className?: string
  label?: string
  value: number
  max: number
  onChange: (value: number) => void
}

const buttonClassName = cx(
  'size-7 flex items-center justify-center rounded-min bg-grey-15 text-grey-60',
  'hover:text-grey-90 disabled:text-grey-40 disabled:cursor-not-allowed'
)

const ScoreStepper: React.FC<ScoreStepperProps> = ({ className, label, value, max, onChange }) => {
  const decrementDisabled = value <= 0
  const incrementDisabled = value >= max

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const raw = event.target.value

    if (raw === '') {
      onChange(0)

      return
    }

    const parsed = parseInt(raw, 10)

    if (Number.isNaN(parsed)) {
      return
    }

    onChange(parsed)
  }

  return (
    <div className={cx('flex min-w-0 flex-col items-center', className)}>
      <div className="flex h-5 w-full items-end justify-center">
        {
          Boolean(label) && (
            <div className="max-w-full truncate text-caption-12 text-grey-60">{label}</div>
          )
        }
      </div>
      <div className="mt-1.5 flex items-center gap-1">
        <button
          className={buttonClassName}
          disabled={decrementDisabled}
          onClick={() => onChange(value - 1)}
        >
          &minus;
        </button>
        <input
          className="w-10 h-7 text-center bg-grey-15 rounded-min text-caption-13 text-grey-90 outline-none"
          inputMode="numeric"
          pattern="^[0-9]*$"
          value={value}
          aria-label={label}
          onChange={handleInputChange}
        />
        <button
          className={buttonClassName}
          disabled={incrementDisabled}
          onClick={() => onChange(value + 1)}
        >
          +
        </button>
      </div>
    </div>
  )
}

export default ScoreStepper
