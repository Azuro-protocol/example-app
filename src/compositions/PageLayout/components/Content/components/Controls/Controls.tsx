'use client'

import React from 'react'
import cx from 'classnames'

import { Balance, User } from './components'


type ControlsProps = {
  className?: string
}

const Controls: React.FC<ControlsProps> = ({ className }) => {
  return (
    <div className={cx('flex items-center space-x-2 w-fit', className)}>
      <Balance />
      <User />
    </div>
  )
}

export default Controls
