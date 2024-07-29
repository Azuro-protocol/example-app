'use client'

import React from 'react'
import cx from 'classnames'
import { useMedia } from 'contexts'


type MediaProps = {
  className?: string
} & AtLeastOne<{
  mobile?: boolean
  desktop?: boolean
  narrow?: boolean
  wide?: boolean
}>

const Media: React.CFC<MediaProps> = ({ children, className, desktop, mobile, narrow, wide }) => {
  const { isDesktopView, isMobileView, isNarrowView, isWideView } = useMedia()

  const isMobile = mobile && isMobileView
  const isDesktop = desktop && isDesktopView
  const isNarrow = narrow && isNarrowView
  const isWide = wide && isWideView

  const isVisible = (
    isMobile
    || isDesktop
    || isNarrow
    || isWide
  )

  if (isVisible) {
    const rootClassName = cx(className, {
      'mobile': isMobile,
      'desktop': isDesktop,
      'narrow': isNarrow,
      'wide': isWide,
    })

    return (
      <div className={rootClassName}>
        {children}
      </div>
    )
  }

  return null
}

export default Media
