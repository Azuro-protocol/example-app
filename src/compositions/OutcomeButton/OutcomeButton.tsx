'use client'

import React, { useRef } from 'react'
import { type GameMarkets } from '@azuro-org/toolkit'
import cx from 'classnames'
import { formatToFixed } from 'helpers/formatters'

import { Icon } from 'components/ui'
// import { OddsValue, useOddsValue } from 'compositions/games'

import useButton from './utils/useButton'


type OutcomeButtonProps = {
  outcome: GameMarkets[0]['outcomeRows'][0][0]
  size?: 28 | 40
}

const OutcomeButton: React.FC<OutcomeButtonProps> = ({ outcome, size = 28 }) => {
  const { selectionName } = outcome

  const nodeRef = useRef<HTMLButtonElement>(null)
  // const oddsValue = useOddsValue({ ...props, nodeRef })
  const { odds, isActive, isLocked, onClick } = useButton(outcome)

  const buttonClassName = cx(
    'group/button w-full relative flex items-center justify-between px-3 overflow-hidden',
    'text-caption-13 font-semibold border-none rounded-2 select-none',
    {
      'hover:text-brand-50 hover:bg-brand-5': !isLocked && !isActive,
      'text-grey-10 bg-grey-90': isActive,
      'bg-grey-15': !isActive,
      'text-grey-40 cursor-not-allowed': isLocked,
      'h-7': size === 28,
      'h-10': size === 40,
    }
  )
  const titleClassName = cx('text-left whitespace-normal', {
    'group-hover/button:text-brand-50': !isLocked && !isActive,
    'text-grey-10': isActive,
    'text-grey-60': !isActive,
    'text-grey-40': isLocked,
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
              className="mr-1 size-4 text-grey-40"
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

export default OutcomeButton
