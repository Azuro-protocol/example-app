import React, { useRef, useEffect, useState } from 'react'
import cx from 'classnames'

import { Icon } from 'components/ui'
import type { IconName } from 'components/ui'


type FallbackImageProps = {
  className?: string
  src?: string | null
  fallback?: string
  iconFallback?: string
  alt?: string
}

const FallbackImage: React.FC<FallbackImageProps> = (props) => {
  const { className, src, fallback, iconFallback, alt } = props
  const [ isFallbackIcon, setFallbackIcon ] = useState(!src)

  const ref = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const handleError = () => {
      if (iconFallback) {
        setFallbackIcon(true)
      }
      else if (ref.current && fallback) {
        ref.current.src = fallback
      }
    }

    if (!src) {
      handleError()

      return
    }

    const img = new window.Image()

    img.onerror = () => {
      // check if component still mounted
      if (ref.current) {
        handleError()
      }
    }

    img.src = src
  }, [ src ])

  return (
    <>
      {
        isFallbackIcon ? (
          <Icon
            className={cx(className, 'text-gray-60' )}
            name={iconFallback as IconName}
          />
        ) : (
          <img
            ref={ref}
            className={className}
            src={src!}
            alt={alt}
          />
        )
      }
    </>
  )
}

export default FallbackImage
