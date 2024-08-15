import React from 'react'

import { Logo } from 'components/ui'

import Navbar from './components/Navbar/Navbar'
import Copy from './components/Copy/Copy'


const Footer: React.FC = () => {
  return (
    <footer className="p-4 pb-3">
      <div className="flex mb:flex-col ds:items-center justify-between pb-4 border-b border-b-grey-10">
        <Logo className="h-4 mb:mb-4" />
        <Navbar />
      </div>
      <div className="mt-3">
        <Copy />
      </div>
    </footer>
  )
}

export default Footer
