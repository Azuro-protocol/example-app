'use client'

import React from 'react'

import Navigation from 'compositions/Navigation/Navigation'


const LeftSidebar: React.FC = () => {
  return (
    <div className="h-full pr-2">
      <Navigation />
    </div>
  )
}

export default LeftSidebar
