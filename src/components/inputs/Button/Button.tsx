import React, { forwardRef } from 'react'
import { Message } from '@locmod/intl'
import cx from 'classnames'

import { ButtonBase } from 'components/inputs'
import type { ButtonBaseProps } from 'components/inputs'
import { Icon } from 'components/ui'
import type { IconName } from 'components/ui'

import s from './Button.module.scss'


const iconSizes = {
  26: 12,
  32: 14,
  36: 16,
}

export const widths = [] as const
export const sizes = [ 26, 32, 36, 40 ] as const
export const styles = [ 'primary', 'secondary', 'tertiary' ] as const

type ButtonWidth = typeof widths[number]
export type ButtonSize = typeof sizes[number]
export type ButtonStyle = typeof styles[number]

export type ButtonProps = ButtonBaseProps & OnlyOne<{
  children: React.ReactNode | undefined
  title?: string | Intl.Message
  leftIcon?: IconName
  rightIcon?: IconName
  size: ButtonSize
  width?: ButtonWidth
  style?: ButtonStyle
  html?: boolean
  fullWidth?: boolean
  fullWidthOnMobile?: boolean
  dataTestId?: string
}, 'children' | 'title'>

const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>((props, ref) => {
  let {
    children, className, title, width, size, html, style = 'primary',
    loading, disabled, fullWidth, fullWidthOnMobile,
    leftIcon, rightIcon,
    ...rest
  } = props

  if (loading) {
    leftIcon = 'interface/spinner'
  }

  const rootClassName = cx(s.button, className, 'button', s[`size-${size}`], {
    [s[style]]: s[style],
    [s[`w-${width}`]]: width,
    'w-full': fullWidth,
    'mb:w-full': fullWidthOnMobile,
    [s.disabled]: loading || disabled,
  })

  const content = title ? <Message value={title} html={html} /> : children
  const iconSize = iconSizes[size]

  return (
    <ButtonBase
      ref={ref}
      className={rootClassName}
      loading={loading}
      disabled={disabled}
      {...rest}
    >
      <div className={s.content}>
        {
          leftIcon && (
            <Icon
              className="mr-6"
              name={leftIcon}
            />
          )
        }
        {content}
        {
          rightIcon && (
            <Icon
              className="ml-6"
              name={rightIcon}
            />
          )
        }
      </div>
    </ButtonBase>
  )
})


export default Button
