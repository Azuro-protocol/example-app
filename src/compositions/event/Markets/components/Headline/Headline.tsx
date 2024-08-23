'use client'

import React from 'react'

import { View, type ViewProps } from './components'


type HeadlineProps = ViewProps

const Headline: React.FC<HeadlineProps> = (props) => {
  const { activeView, onChangeView } = props

  return (
    <div className="bg-card-border-bottom p-px rounded-lg overflow-hidden">
      <div className="py-2 px-4 flex items-center justify-between bg-grey-10 rounded-lg">
        <div />
        <div className="flex items-center space-x-2">
          <View activeView={activeView} onChangeView={onChangeView} />
        </div>
      </div>
    </div>
  )
}

export default Headline
