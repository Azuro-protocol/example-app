'use client'
import type { ReactElement, ReactNode } from 'react'
import cx from 'classnames'
import type { ModalComponent } from '@locmod/modal'
import { Message } from '@locmod/intl'

import { PlainModal } from 'components/feedback'
import { Button, buttonMessages, type ButtonProps } from 'components/inputs'


export type InfoModalProps = {
  children?: ReactNode
  bottomChildren?: ReactNode
  className?: string
  contentClassName?: string
  icon: ReactElement
  title: Intl.Message | string
  text?: Intl.Message | string
  bottomText?: Intl.Message | string
  buttonProps?: Omit<ButtonProps, 'styling' | 'size'>
  closeOnButtonClick?: boolean
  overlayClosable?: boolean
  onClose?: () => void
}

const InfoModal: ModalComponent<InfoModalProps> = (props) => {
  const {
    closeModal, children, bottomChildren, className, contentClassName,
    icon, title, text, closeOnButtonClick = true,
    overlayClosable = true, buttonProps,
  } = props

  const handleClick: ButtonProps['onClick'] = (event) => {
    if (typeof buttonProps?.onClick === 'function') {
      buttonProps.onClick(event)
    }

    if (closeOnButtonClick) {
      handleClose()
    }
  }

  const handleClose = () => {
    closeModal(true)
  }

  return (
    <PlainModal
      className={cx(className)}
      closeModal={handleClose}
      overlayClosable={overlayClosable}
    >
      <div className={cx('text-center flex items-center flex-col', contentClassName)}>
        <div className="size-16 flex items-center justify-center">
          {icon}
        </div>
        <Message
          className="mt-4 text-caption-14 font-semibold"
          value={title}
          html
        />
        {
          Boolean(text) && (
            <Message
              className="mt-2 text-caption-13 text-grey-70"
              value={text}
              html
            />
          )
        }
        {children}
        <Button
          {...buttonProps}
          title={buttonProps?.title || buttonMessages.okay}
          style="secondary"
          className={cx('mt-6 w-full', buttonProps?.className)}
          size={32}
          onClick={handleClick}
        />
        {bottomChildren}
      </div>
    </PlainModal>
  )
}

declare global {
  interface ModalsRegistry extends ExtendModalsRegistry<{ InfoModal: typeof InfoModal }> {}
}

export default InfoModal
