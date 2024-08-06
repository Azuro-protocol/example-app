'use client'

import React from 'react'

import { Logo } from 'components/ui'
import Navigation from 'compositions/Navigation/Navigation'
import LiveSwitcher from 'compositions/LiveSwitcher/LiveSwitcher'


const LeftSidebar: React.FC = () => {
  return (
    <div className="h-full">
      <div className="px-4 py-5">
        <Logo className="h-6" withLogo />
      </div>
      <LiveSwitcher />
      <Navigation className="mt-2" />
    </div>
  )
}

export default LeftSidebar
