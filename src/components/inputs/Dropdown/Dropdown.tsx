import React, { useRef } from 'react'
import { useMedia } from 'contexts'

import Desktop from './views/Desktop/Dekstop'
import Mobile from './views/Mobile/Mobile'


export type DropdownProps = {
  dropListClassName?: string
  children: React.ReactElement | ((params: { isOpened: boolean }) => React.ReactElement)
  className?: string
  content?: any
  buttonClassName?: string
  contentClassName?: string
  placement?: 'bottomLeft' | 'bottomRight' | 'center' | 'arrowCenter' | 'topCenter'
}

type DropdownType = React.FC<Omit<DropdownProps, 'onClick'>>

const Dropdown: DropdownType = (props) => {
  const { isMobileView } = useMedia()
  const menuRef = useRef<HTMLDivElement>(null)

  return React.createElement(isMobileView ? Mobile : Desktop, {
    ...props,
    ref: menuRef,
  })
}

export default Dropdown
