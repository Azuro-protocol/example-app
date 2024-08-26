'use client'

import React, { useRef } from 'react'
import { type GameMarkets } from '@azuro-org/toolkit'
import cx from 'classnames'

import { Icon } from 'components/ui'
import OddsValue from 'compositions/OddsValue/OddsValue'

import useButton from './utils/useButton'


type OutcomeButtonProps = {
  outcome: GameMarkets[0]['outcomeRows'][0][0]
  size?: 28 | 40
}

const OutcomeButton: React.FC<OutcomeButtonProps> = ({ outcome, size = 28 }) => {
  const { selectionName } = outcome

  const nodeRef = useRef<HTMLDivElement>(null)
  const { odds, isActive, isLocked, onClick } = useButton({ outcome, nodeRef })

  const buttonClassName = cx(
    'group/button w-full relative flex items-center justify-between ds:px-3 mb:px-2 overflow-hidden',
    'text-caption-13 font-semibold border-none rounded-min select-none',
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
  const oddsClassName = cx('group/odds flex items-center')
  const arrowClassName = cx(
    'size-4 text-transparent transition-color',
    'group-[.increased]/odds:text-accent-green',
    'group-[.decreased]/odds:text-accent-red group-[.decreased]/odds:rotate-180'
  )
  const valueClassName = cx(
    'transition-color',
    'group-[.increased]/odds:text-accent-green',
    'group-[.decreased]/odds:text-accent-red'
  )

  return (
    <button
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
      <div ref={nodeRef} className={oddsClassName}>
        <Icon className={arrowClassName} name="interface/caret_up" />
        <OddsValue className={valueClassName} odds={odds} />
      </div>
    </button>
  )
}

export default OutcomeButton
