import React from 'react'
import cx from 'classnames'
import { Message } from '@locmod/intl'


type EmptyContentProps = {
  className?: string
  image: string
  title: string | Intl.Message
  text?: string | Intl.Message
}

const EmptyContent: React.FC<EmptyContentProps> = ({ className, image, title, text }) => {
  return (
    <div className={cx('text-center max-w-[13.75rem] mx-auto', className)}>
      <img className="size-16 mx-auto" src={image} alt="" />
      <Message className="text-heading-h5 font-bold mt-2" value={title} tag="p" />
      {
        Boolean(text) && (
          <Message className="text-caption-13 text-grey-60 font-medium mt-1" value={text} />
        )
      }
    </div>
  )
}

export default EmptyContent
