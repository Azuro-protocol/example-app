import React, { forwardRef } from 'react'
import cx from 'classnames'
import { Menu } from '@headlessui/react'

import type { DropdownProps } from '../../Dropdown'


const Desktop = forwardRef<HTMLDivElement, DropdownProps>((props, ref) => {
  const {
    children, className, buttonClassName, contentClassName: _contentClassName,
    dropListClassName, content, placement = 'bottomLeft',
  } = props

  const rootClassName = cx('relative flex w-fit', className)
  const menuClassName = cx(dropListClassName, 'absolute w-fit z-[100]', {
    'top-[calc(100%_+_0.5rem)] left-1/2 -translate-x-1/2': placement === 'center',
    'top-[calc(100%_+_0.5rem)] right-0': placement === 'bottomRight',
    'top-[calc(100%_+_0.5rem)] left-0': placement === 'bottomLeft',
  })
  const contentClassName = cx(_contentClassName, 'w-fit')

  const btnClassName = cx(buttonClassName)

  return (
    <Menu
      ref={ref}
      as="div"
      className={rootClassName}
    >
      <Menu.Button
        aria-label="Menu"
        className={btnClassName}
      >
        {
          ({ open }) => {
            if (typeof children === 'function') {
              return children({ isOpened: open })
            }

            const controlClassName = cx('hover:text-grey-90 inline-flex items-center', open ? 'text-grey-90' : 'text-gray-60')

            return (
              <div className={controlClassName}>
                {children}
              </div>
            )
          }
        }
      </Menu.Button>
      <Menu.Items className={menuClassName}>
        <div className={contentClassName}>
          {content}
        </div>
      </Menu.Items>
    </Menu>
  )
})

export default Desktop
