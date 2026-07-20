'use client'

import React from 'react'
import { type IntlMessage, Message } from '@locmod/intl'


type PickerPlaceholderProps = {
  message: IntlMessage
}

const PickerPlaceholder: React.FC<PickerPlaceholderProps> = ({ message }) => {
  return (
    <div className="flex h-10 items-center justify-center rounded-min bg-grey-15 text-caption-13 text-grey-60">
      <Message value={message} />
    </div>
  )
}

export default PickerPlaceholder
