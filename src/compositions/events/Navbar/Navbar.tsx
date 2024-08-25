'use client'

import { useParams } from 'next/navigation'
import React from 'react'
import { Message } from '@locmod/intl'

import { Icon, type IconName } from 'components/ui'
import TimeFilter, { FilterByTimeProvider } from 'compositions/events/TimeFilter/TimeFilter'

import messages from './messages'


const Navbar: React.CFC = ({ children }) => {
  const params = useParams()

  const sportSlug = params.sportSlug as string

  return (
    <FilterByTimeProvider>
      <div className="border-b border-b-grey-10 -mx-2 ds:px-6 mb:px-3 flex mb:flex-col ds:items-center justify-between bg-bg-l1 ds:sticky top-0 z-20">
        <div className="flex items-center">
          <Icon className="size-6 mr-3 text-brand-50" name={`sport/${sportSlug}` as IconName} />
          <Message className="text-heading-h2 font-bold" value={messages[sportSlug] || sportSlug} />
        </div>
        <div className="flex items-center">
          <TimeFilter className="ds:h-14 mb:h-10" />
        </div>
      </div>
      {children}
    </FilterByTimeProvider>
  )
}

export default Navbar
