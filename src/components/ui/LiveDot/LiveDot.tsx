import React from 'react'
import cx from 'classnames'


type LiveDotProps = {
  className?: string
  inverse?: boolean
}

const LiveDot: React.FC<LiveDotProps> = ({ className, inverse = false }) => {
  return (
    <div className={cx('size-4 relative flex-none flex items-center justify-center', className)}>
      <div
        className={
          cx('size-1.5 rounded-full shadow-[0_0_0_3px]', {
            'bg-accent-red shadow-accent-red/10': !inverse,
            'bg-grey-90 shadow-grey-90/10': inverse,
          })
        }
      />
      <div
        className={
          cx('absolute inset-0 m-auto size-1.5 animate-ping rounded-full', {
            'bg-accent-red': !inverse,
            'bg-grey-90': inverse,
          })
        }
      />
    </div>
  )
}

export default LiveDot
