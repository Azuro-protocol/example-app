'use client'

import React from 'react'

import { Icon } from 'components/ui'

import { View, type ViewProps } from './components'


type HeadlineProps = {
  isCollapsed: boolean
  onCollapse: () => void
} & ViewProps

const Headline: React.FC<HeadlineProps> = (props) => {
  const { activeView, isCollapsed, onChangeView, onCollapse } = props

  return (
    <div className="bg-card-border-bottom p-px rounded-lg overflow-hidden">
      <div className="py-2 px-4 flex items-center justify-between bg-grey-10 rounded-lg">
        <div />
        <div className="flex items-center space-x-2">
          <View activeView={activeView} onChangeView={onChangeView} />
          <button className="p-1" onClick={onCollapse}>
            <Icon
              className="size-5"
              name={isCollapsed ? 'interface/expand' : 'interface/collapse'}
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Headline
