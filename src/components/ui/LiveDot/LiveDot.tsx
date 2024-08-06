import React from 'react'
import cx from 'classnames'


type LiveDotProps = {
  className?: string
}

const LiveDot: React.FC<LiveDotProps> = ({ className }) => {
  return (
    <div className={cx('size-4 relative flex-none flex items-center justify-center', className)}>
      <div className="size-[6px] bg-accent-red rounded-full shadow-accent-red/10 shadow-[0_0_0_3px]" />
      <div className="absolute inset-0 m-auto size-[6px] bg-accent-red animate-ping rounded-full" />
    </div>
  )
}

export default LiveDot
