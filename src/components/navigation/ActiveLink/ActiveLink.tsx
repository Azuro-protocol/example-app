'use client'
import { forwardRef, type AnchorHTMLAttributes } from 'react'
import cx from 'classnames'
import { Message } from '@locmod/intl'
import { type LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'

import { Href } from 'components/navigation'


export type ActiveLinkProps = Pick<LinkProps, 'scroll' | 'shallow' | 'replace'> & AnchorHTMLAttributes<HTMLAnchorElement> & {
  className?: string
  activeClassName?: string
  activeRegex?: string
  to?: string
  toTab?: string
  message?: Intl.Message | string
  isActive?: boolean
  onClick?: (props: any) => void
}

const ActiveLink: React.CFC<ActiveLinkProps> = forwardRef<HTMLAnchorElement, ActiveLinkProps>((props, ref) => {
  const { children, className, activeClassName, activeRegex, isActive: _isActive, to, toTab, message, onClick, ...rest } = props

  const pathname = usePathname()
  const isActive = _isActive ?? (activeRegex ? new RegExp(activeRegex).test(pathname) : pathname === to)

  const rootClassName = cx(className, isActive ? activeClassName : null)

  return (
    <Href
      ref={ref}
      className={rootClassName}
      to={to}
      toTab={toTab}
      {...rest}
    >
      {
        message ? (
          <Message value={message} />
        ) : children
      }
    </Href>
  )
})

export default ActiveLink
