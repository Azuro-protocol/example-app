'use client'

import React from 'react'
import cx from 'classnames'

import { Icon, type IconName } from 'components/ui'


const views = [
  {
    value: 'rows',
    icon: 'interface/horizontal_view',
  },
  {
    value: 'columns',
    icon: 'interface/vertical_view',
  },
] as const

export type ViewValue = typeof views[number]['value']

type ViewItemProps = {
  icon: IconName
  isActive: boolean
  onClick: () => void
}

const ViewItem: React.FC<ViewItemProps> = ({ isActive, onClick, icon }) => {
  const viewClassName = cx('p-1 rounded-min', {
    'text-grey-90 bg-grey-15': isActive,
    'text-grey-60 hover:text-grey-90': !isActive,
  })

  return (
    <button className={viewClassName} onClick={onClick}>
      <Icon className="size-5" name={icon} />
    </button>
  )
}

export type ViewProps = {
  activeView: ViewValue
  onChangeView: (view: ViewValue) => void
}

const View: React.FC<ViewProps> = ({ activeView, onChangeView }) => {
  return (
    <div className="flex space-x-1">
      {
        views.map(({ value, icon }) => (
          <ViewItem
            key={value}
            isActive={activeView === value}
            icon={icon}
            onClick={() => onChangeView(value)}
          />
        ))
      }
    </div>
  )
}

export default View
