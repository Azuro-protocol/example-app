'use client'

import React from 'react'
import { Message } from '@locmod/intl'
import cx from 'classnames'

import { Icon } from 'components/ui'


type WarningProps = {
  className?: string
  text: string | Intl.Message
}

const Warning: React.FC<WarningProps> = ({ className, text }) => {
  return (
    <div className={cx('bg-accent-yellow-10 p-2 flex items-center text-accent-yellow w-full rounded-sm', className)}>
      <Icon className="size-4 mr-2 flex-none" name="interface/warning" />
      <Message className="text-caption-13 font-medium" value={text} />
    </div>
  )
}

export default Warning
