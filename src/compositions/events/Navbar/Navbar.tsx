'use client'

import { useParams } from 'next/navigation'
import React from 'react'
import { Message } from '@locmod/intl'
import { useLive } from '@azuro-org/sdk'
import cx from 'classnames'

import { Icon, type IconName } from 'components/ui'
import TimeFilter, { FilterByTimeProvider } from 'compositions/events/TimeFilter/TimeFilter'
import ChangeOddsView from 'compositions/ChangeOddsView/ChangeOddsView'

import messages from './messages'


export const NavbarSkeleton: React.FC = () => {
  return (
    <div className="border-b border-b-grey-10 -mx-2 ds:px-6 mb:px-3 py-3">
      <div className="flex items-center">
        <div className="bone size-6 rounded-full mr-3" />
        <div className="bone rounded-full h-8 w-32" />
      </div>
    </div>
  )
}

const Navbar: React.CFC = ({ children }) => {
  const { isLive } = useLive()
  const params = useParams()

  const sportSlug = params.sportSlug as string || 'top'
  const icon: IconName = sportSlug === 'top' ? 'interface/top' : `sport/${sportSlug}` as IconName
  const isTimeFilterVisible = !isLive && sportSlug !== 'unique'

  const className = cx('border-b border-b-grey-10 -mx-2 ds:px-6 mb:px-3 flex mb:flex-col ds:items-center justify-between ds:sticky top-0 z-20 bg-bg-l1', {
    'py-3': !isTimeFilterVisible,
  })

  return (
    <FilterByTimeProvider>
      <div className={className}>
        <div className="flex items-center">
          <Icon className="size-6 mr-3 text-brand-50" name={icon} />
          <Message className="text-heading-h2 font-bold" value={messages[sportSlug] || sportSlug} />
        </div>
        <div className="flex items-center space-x-2">
          {
            isTimeFilterVisible && (
              <TimeFilter className="ds:h-14 mb:h-10" />
            )
          }
          <ChangeOddsView />
        </div>
      </div>
      {children}
    </FilterByTimeProvider>
  )
}

export default Navbar
