'use client'
import cx from 'classnames'
import { forwardRef, type AnchorHTMLAttributes } from 'react'
import Link from 'next/link'
import { Message } from '@locmod/intl'


export type HrefProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  className?: string
  href?: string
  to?: string
  toTab?: string
  mailto?: string
  message?: Intl.Message | string
  onClick?: (props: any) => void
}

const Href = forwardRef<HTMLAnchorElement, HrefProps>((props, ref) => {
  const { children, className, href, to, toTab, mailto, message, ...rest } = props

  const rootClassName = cx(className, {
    'cursor-pointer': (to || toTab || mailto || href || rest.onClick) && !rest['aria-disabled'],
  })

  rest.tabIndex = rest.tabIndex || 0

  const content = message ? (
    <Message value={message} />
  ) : children

  if (href) {
    return (
      <a
        ref={ref}
        className={rootClassName}
        href={href}
        rel="noopener noreferrer nofollow"
        {...rest}
      >
        {content}
      </a>
    )
  }

  if (to) {
    return (
      <Link
        ref={ref}
        className={rootClassName}
        href={to}
        {...rest}
      >
        {content}
      </Link>
    )
  }

  if (toTab) {
    return (
      <a
        ref={ref}
        className={rootClassName}
        href={toTab}
        target="_blank"
        rel="noopener noreferrer nofollow"
        {...rest}
      >
        {content}
      </a>
    )
  }

  if (mailto) {
    return (
      <a
        ref={ref}
        className={rootClassName}
        href={`mailto:${mailto}`}
        {...rest}
      >
        {content || mailto}
      </a>
    )
  }

  return (
    <a
      ref={ref}
      className={rootClassName}
      {...rest}
    >
      {content}
    </a>
  )
})

export default Href
