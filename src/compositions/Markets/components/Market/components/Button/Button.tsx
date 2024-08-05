'use client'

import React, { useRef } from 'react'
import { type GameMarkets } from '@azuro-org/toolkit'
import cx from 'classnames'
import { formatToFixed } from 'helpers/formatters'

import { Icon } from 'components/ui'
// import { OddsValue, useOddsValue } from 'compositions/games'

import useOddsButton from './utils/useOddsButton'


type ButtonProps = {
  outcome: GameMarkets[0]['outcomeRows'][0][0]
}

const Button: React.FC<ButtonProps> = ({ outcome }) => {
  const { selectionName } = outcome

  const nodeRef = useRef<HTMLButtonElement>(null)
  // const oddsValue = useOddsValue({ ...props, nodeRef })
  const { odds, isActive, isLocked, onClick } = useOddsButton(outcome)

  const buttonClassName = cx(
    'group w-full relative flex items-center justify-between h-7 px-3 overflow-hidden',
    'text-caption-13 font-semibold border-none rounded-2 select-none',
    {
      'hover:text-brand-50 hover:bg-brand-5': !isLocked && !isActive,
      'text-grey-10 bg-grey-90': isActive,
      'bg-grey-15': !isActive,
      'text-gray-40 cursor-not-allowed': isLocked,
    }
  )
  const titleClassName = cx('text-left whitespace-normal', {
    'group-hover:text-brand-50': !isLocked && !isActive,
    'text-grey-10': isActive,
    'text-grey-60': !isActive,
    'text-gray-40': isLocked,
  })

  return (
    <button
      ref={nodeRef}
      className={buttonClassName}
      disabled={isLocked}
      onClick={onClick}
    >
      <div className="flex items-center">
        {
          (isLocked) && (
            <Icon
              className="mr-1 size-4"
              name="interface/lock"
            />
          )
        }
        <div className={titleClassName}>
          {selectionName}
        </div>
      </div>
      {/* <OddsValue value={formatViewValue(oddsValue)} /> */}
      <span>{odds ? formatToFixed(odds, 2) : '--'}</span>
    </button>
  )
}

export default Button
