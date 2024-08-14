'use client'
import React, { useRef, useState } from 'react'
import { useFloating, useInteractions, useHover, useClick, useDismiss,
  offset, shift, arrow, flip, autoUpdate, safePolygon } from '@floating-ui/react-dom-interactions'
import type { Placement } from '@floating-ui/react-dom-interactions'
import { Message } from '@locmod/intl'
import cx from 'classnames'
import { useMedia, useDevice } from 'contexts'

import { Icon } from 'components/ui'


type TooltipProps = {
  children: React.ReactElement
  title?: string | Intl.Message
  text?: string | Intl.Message
  content?: React.ReactElement
  width?: number // sets specific tooltip width (use only for small text content)
  placement?: Placement
  mobPlacement?: Placement
  isInteractive?: boolean // if "true" prevents tooltip from closing to allow user hover mouse over it and interact with a content
}

const Tooltip: React.FC<TooltipProps> = (props) => {
  let {
    children, title, text, content, width,
    placement: defaultPlacement = 'bottom', mobPlacement,
    isInteractive,
  } = props

  const { isMobileDevice } = useDevice()
  const { isMobileView } = useMedia()
  const [ isVisible, setVisibility ] = useState(false)
  const arrowRef = useRef(null)

  if (mobPlacement && isMobileView) {
    defaultPlacement = mobPlacement
  }

  let crossAxis = 0

  if (defaultPlacement === 'top-start' || defaultPlacement === 'bottom-start') {
    crossAxis = -12
  }
  else if (defaultPlacement === 'top-end' || defaultPlacement === 'bottom-end') {
    crossAxis = 12
  }

  const { x, y, reference, floating, placement, strategy, context, middlewareData } = useFloating({
    open: isVisible,
    onOpenChange: setVisibility,
    placement: defaultPlacement,
    strategy: 'fixed',
    whileElementsMounted: autoUpdate,
    middleware: [
      offset({
        mainAxis: 10,
        crossAxis,
      }),
      shift({
        padding: 10,
      }),
      arrow({
        element: arrowRef,
      }),
      flip(),
    ],
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, {
      restMs: 10,
      handleClose: !isInteractive ? null : safePolygon({
        restMs: 10,
      }),
      enabled: !isMobileDevice,
    }),
    useClick(context, {
      enabled: isMobileDevice,
    }),
    useDismiss(context),
  ])

  const tooltipClassNames = cx(
    'z-[1001] w-fit p-3 bg-bg-l2 rounded-md text-grey-60 border border-grey-20',
    '-sm:max-w-[95vw] sm:max-w-[20rem]'
  )
  const arrowClassNames = cx('absolute block w-4 h-2 text-bg-l2', {
    'top-[99%]': placement === 'top' || placement === 'top-end' || placement === 'top-start',
    'bottom-[99%] rotate-180': placement === 'bottom' || placement === 'bottom-end' || placement === 'bottom-start',
  })

  const floatingProps = getFloatingProps({
    ref: floating,
    className: tooltipClassNames,
    style: {
      position: strategy,
      top: y ?? 0,
      left: x ?? 0,
      width,
    },
  })

  const referenceProps = getReferenceProps({ ref: reference, ...children.props })

  const { arrow: { x: arrowX } = {} } = middlewareData

  const arrowStyle = {
    left: arrowX,
  }

  return (
    <>
      {
        isVisible && (
          <div ref={floating} {...floatingProps}>
            <div
              ref={arrowRef}
              className={arrowClassNames}
              style={arrowStyle}
            >
              <Icon className="w-4 h-2" name="interface/arrow_tooltip" />
            </div>
            {
              Boolean(title) && (
                <Message
                  className="mb-4"
                  value={title}
                  html
                />
              )
            }
            {
              Boolean(text) && (
                <Message
                  value={text}
                  className="text-body-14-p font-medium whitespace-normal"
                  html
                />
              )
            }
            {
              Boolean(content) && (
                content
              )
            }
          </div>
        )
      }
      {React.cloneElement(children, referenceProps)}
    </>
  )
}

export default React.memo(Tooltip)
