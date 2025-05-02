'use client'

import React from 'react'

import { Logo } from 'components/ui'
import Navigation from 'compositions/Navigation/Navigation'
import LiveSwitcher from 'compositions/LiveSwitcher/LiveSwitcher'


const LeftSidebar: React.FC = () => {
  return (
    <div className="h-full">
      <div className="px-4 py-5 sticky top-0 flex items-center justify-between">
      <Logo className="w-[355px]" />
        {/* <button className="text-grey-60 hover:text-grey-90 transition" onClick={() => openModal('SearchModal')}>
          <Icon className="size-5" name="interface/search" />
        </button> */}
      </div>
      <div className="overflow-auto wd:h-[calc(100vh_-_4rem)] no-scrollbar">
        <LiveSwitcher />
        <Navigation className="mt-2" />
      </div>
    </div>
  )
}

export default LeftSidebar
