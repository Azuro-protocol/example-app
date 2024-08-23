'use client'

import { useParams } from 'next/navigation'
import React from 'react'
import { Message } from '@locmod/intl'

import { Icon, type IconName } from 'components/ui'

import messages from './messages'


const Navbar: React.FC = () => {
  const params = useParams()

  const sportSlug = params.sportSlug as string

  return (
    <div className="border-b border-b-grey-10 -mx-2 px-6 flex items-center justify-between bg-bg-l1 sticky top-0">
      <div className="flex items-center">
        <Icon className="size-6 mr-3 text-brand-50" name={`sport/${sportSlug}` as IconName} />
        <Message className="text-heading-h2 font-bold" value={messages[sportSlug] || sportSlug} />
      </div>
    </div>
  )
}

export default Navbar
