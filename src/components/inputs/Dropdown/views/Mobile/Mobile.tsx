import React, { forwardRef } from 'react'
import { Menu, PopoverButton, Popover, MenuButton, PopoverPanel, MenuItems } from '@headlessui/react'
import cx from 'classnames'

import { PlainModal } from 'components/feedback'
import type { DropdownProps } from '../../Dropdown'

// here is a plain modal, which render controlled by Menu
const closeModalStub = () => null

const Mobile = forwardRef<HTMLDivElement, DropdownProps>((props, ref) => {
  const { children, className, buttonClassName, content, contentClassName, renderType = 'menu' } = props
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

  const isPopover = renderType === 'popover'
  const Wrapper = isPopover ? Popover : Menu
  const Button = isPopover ? PopoverButton : MenuButton
  const Items = isPopover ? PopoverPanel : MenuItems

  return (
    <Wrapper ref={ref} as="div">
      {
        ({ open }) => (
          <>
            <Button
              className={cx(className, buttonClassName)}
              disabled={!content}
            >

              {child}
            </Button>
            {
              open && (
                <PlainModal
                  withCloseButton={false}
                  closeModal={closeModalStub}
                  containerClassName="z-sup-modal"
                  contentClassName={contentClassName}
                >
                  <Items>
                    {content}
                  </Items>
                </PlainModal>
              )
            }
          </>
        )
      }
    </Wrapper>
  )
})

export default Mobile
