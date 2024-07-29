'use client'

import React, { forwardRef, useCallback } from 'react'

import { Href } from 'components/navigation'


export type ButtonBaseProps = {
  // basic
  children?: React.ReactNode
  className?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
  onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
  // links
  to?: string // router link
  href?: string // external link
  toTab?: string // external link in new tab
  // misc
  disabled?: boolean
  loading?: boolean
  tag?: string
  type?: string
  dataTestId?: string
  rel?: string
  target?: string
  ariaLabel?: string
}

const ButtonBase = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonBaseProps>((props, ref) => {
  const {
    children, className,
    disabled, loading,
    to, toTab, href, onClick, onMouseEnter,
    tag = 'button', type = 'button',
    dataTestId,
    rel, target, ariaLabel,
  } = props

  const handleClick = useCallback((event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (disabled || loading) {
      event.preventDefault()

      return
    }

    if (typeof onClick === 'function') {
      onClick(event)
    }
  }, [ loading, disabled, onClick ])

  let node: string | React.ElementType = tag

  let nodeProps: any = {
    ref,
    className,
    disabled,
    onClick: handleClick,
    onMouseEnter,
    'aria-busy': loading,
    'aria-label': ariaLabel,
    'data-testid': dataTestId,
  }

  if (to || toTab || href) {
    node = Href

    nodeProps = {
      ...nodeProps,
      to,
      href,
      toTab,
      rel,
      target,
    }
  }
  else if (tag === 'button' || tag === 'input') {
    nodeProps.type = type
  }
  else {
    nodeProps.role = 'button'
  }

  return React.createElement(
    node,
    nodeProps,
    children
  )
})


export default ButtonBase
