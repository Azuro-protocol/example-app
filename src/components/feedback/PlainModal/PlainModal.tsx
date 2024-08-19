'use client'
import { useCallback, useEffect, type MouseEventHandler } from 'react'
import { createPortal } from 'react-dom'
import { useFreezeBodyScroll } from 'hooks'
import cx from 'classnames'

import { Overlay } from 'components/layout'
import { Icon } from 'components/ui'

import s from './PlainModal.module.scss'


export type PlainModalProps = {
  className?: string
  contentClassName?: string
  containerClassName?: string
  overlayClosable?: boolean
  withCloseButton?: boolean
  closeModal: (withOnClose?: boolean) => void
}

const PlainModal: React.CFC<PlainModalProps> = (props) => {
  const {
    children, className, contentClassName, containerClassName,
    overlayClosable = true, withCloseButton = true,
    closeModal,
  } = props

  useFreezeBodyScroll()

  const handleOverlayClick: MouseEventHandler<HTMLDivElement> = useCallback((event) => {
    event.stopPropagation()

    if (overlayClosable) {
      closeModal(true)
    }
  }, [ overlayClosable, closeModal ])

  const handleCloseButtonClick = useCallback(() => {
    closeModal(true)
  }, [ closeModal ])

  const handleModalClick: MouseEventHandler<HTMLDivElement> = useCallback((event) => {
    event.stopPropagation()
  }, [])

  const rootClassName = cx(
    s.container,
    containerClassName,
    'flex w-full',
    'mb:absolute mb:left-0 mb:flex-col mb:justify-end mb:h-full',
    'ds:items-center ds:justify-center ds:min-h-full m-auto'
  )

  const modalClassName = cx(
    className,
    'relative bg-grey-10 w-full font-medium flex flex-col',
    'mb:max-h-full rounded-t-md',
    'ds:max-w-[22.25rem] ds:rounded-md'
  )

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        closeModal(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return createPortal(
    <Overlay onClick={handleOverlayClick}>
      <div className={rootClassName}>
        <div
          tabIndex={0}
          role="dialog"
          aria-modal="true"
          className={modalClassName}
          onClick={handleModalClick}
        >
          {
            withCloseButton && (
              <button
                className="absolute top-4 right-4 p-2 z-40 bg-grey-15 border-grey-20 border rounded-full text-grey-70 hover:text-grey-90"
                onClick={handleCloseButtonClick}
              >
                <Icon className="size-3" name="interface/close" />
              </button>
            )
          }
          <div className={cx(contentClassName, 'py-6 px-4 flex-1 overflow-y-auto overflow-x-hidden')}>
            {children}
          </div>
        </div>
      </div>
    </Overlay>,
    document.getElementById('modals')!
  )
}

export default PlainModal
