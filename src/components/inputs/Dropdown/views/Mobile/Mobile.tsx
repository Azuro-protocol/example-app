import React, { forwardRef } from 'react'
import { Menu } from '@headlessui/react'
import cx from 'classnames'

import { PlainModal } from 'components/feedback'
import type { DropdownProps } from '../../Dropdown'

// here is a plain modal, which render controlled by Menu
const closeModalStub = () => null

type DropdownModalProps = {
  contentClassName?: string
  content: React.ReactElement
}

const DropdownModal: React.CFC<DropdownModalProps> = (props) => {
  const { content, contentClassName } = props

  return (
    <PlainModal
      withCloseButton={false}
      closeModal={closeModalStub}
      containerClassName="z-sup-modal"
      contentClassName={contentClassName}
    >
      <Menu.Items>
        {content}
      </Menu.Items>
    </PlainModal>
  )
}

const Mobile = forwardRef<HTMLDivElement, DropdownProps>((props, ref) => {
  const { children, className, buttonClassName, content, contentClassName } = props
  let child

  if (typeof children === 'function') {
    child = children({ isOpened: false })
  }
  else {
    child = (
      <div className="inline-flex items-center">
        {children}
      </div>
    )
  }

  return (
    <Menu ref={ref} as="div">
      {
        ({ open }) => (
          <>
            <Menu.Button
              className={cx(className, buttonClassName)}
              disabled={!content}
            >

              {child}
            </Menu.Button>
            {
              open && (
                <DropdownModal
                  content={content}
                  contentClassName={contentClassName}
                />
              )
            }
          </>
        )
      }
    </Menu>
  )
})

export default Mobile
