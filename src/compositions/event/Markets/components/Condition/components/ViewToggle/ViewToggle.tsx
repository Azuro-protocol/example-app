'use client'

import React from 'react'
import cx from 'classnames'
import { Message } from '@locmod/intl'

import type { MarketView } from '../../utils/useMarketView'

import messages from './messages'


const views = [
  { value: 'table', title: messages.table },
  { value: 'compact', title: messages.compact },
] as const

type ViewToggleProps = {
  className?: string
  activeView: MarketView
  onChange: (view: MarketView) => void
}

const ViewToggle: React.FC<ViewToggleProps> = ({ className, activeView, onChange }) => {
  return (
    <div className={cx('flex items-center gap-0.5 p-0.5 rounded-min bg-grey-10 w-fit', className)}>
      {
        views.map(({ value, title }) => {
          const isActive = activeView === value

          const buttonClassName = cx('px-2 py-0.5 rounded-min text-caption-12 font-medium', {
            'bg-grey-15 text-grey-90': isActive,
            'text-grey-60 hover:text-grey-90': !isActive,
          })

          return (
            <button
              key={value}
              className={buttonClassName}
              onClick={() => onChange(value)}
            >
              <Message value={title} />
            </button>
          )
        })
      }
    </div>
  )
}

export default ViewToggle
