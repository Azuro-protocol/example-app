import React from 'react'
import cx from 'classnames'

import EmptyContentComp from 'compositions/EmptyContent/EmptyContent'

import messages from './messages'


type EmptyContentProps = {
  className?: string
}

const EmptyContent: React.FC<EmptyContentProps> = ({ className }) => {
  return (
    <EmptyContentComp
      className={cx('py-20', className)}
      image="/images/illustrations/smile_sad.png"
      title={messages.title}
      text={messages.text}
    />
  )
}

export default EmptyContent
