'use client'

import { Message } from '@locmod/intl'
import React from 'react'
import { openModal } from '@locmod/modal'
import { Icon } from 'components/ui'

import messages from './messages'


const Search: React.FC = () => {
  return (
    <div
      className="h-16 w-full flex items-center text-grey-40 hover:text-grey-90 py-3 px-6 bg-bg-l0 cursor-pointer"
      onClick={() => openModal('SearchModal')}
    >
      <Icon className="size-5 mr-2" name="interface/search" />
      <Message className="text-caption-13" value={messages.title} />
    </div>
  )
}

export default Search
