'use client'
import React, { useRef, useEffect } from 'react'
import cx from 'classnames'

import s from './Overlay.module.scss'


export type OverlayProps = React.PropsWithChildren<{
  className?: string
  onClick?: React.MouseEventHandler<HTMLDivElement>
}>

const Overlay: React.FC<React.PropsWithChildren<OverlayProps>> = ({ children, className, onClick }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // ATTN this workaround required to fix transition animation glitch (elements jumping from top to down when moving)
    //  timeout means that animation is finished
    const timer = setTimeout(() => {
      if (ref.current) {
        ref.current.classList.add('overflow-x-hidden', 'overflow-y-auto')
      }
    }, 400)

    return () => {
      clearTimeout(timer)
    }
  })

  const overlayClassNames = cx(
    s.overlay,
    className,
    'fixed top-0 left-0 z-[999] bg-black/60 w-full h-full ease-in-out-quadratic'
  )

  return (
    <div
      ref={ref}
      className={overlayClassNames}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default Overlay
