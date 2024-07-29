import { useCallback, useEffect } from 'react'
import { useDevice } from 'contexts'


const getScrollBarWidth = () => {
  const outer = document.createElement('div')

  outer.style.visibility = 'hidden'
  outer.style.width = '100px'
  // @ts-ignore
  outer.style.msOverflowStyle = 'scrollbar' // needed for WinJS apps

  document.body.appendChild(outer)

  const widthNoScroll = outer.offsetWidth

  outer.style.overflow = 'scroll'

  const inner = document.createElement('div')

  inner.style.width = '100%'
  outer.appendChild(inner)

  const widthWithScroll = inner.offsetWidth

  outer.parentNode?.removeChild(outer)

  return widthNoScroll - widthWithScroll
}

let openedModalsCount = 0

const useFreezeBodyScroll = (enabled = true) => {
  const { isMobileDevice } = useDevice()

  const addStyles = useCallback(() => {
    document.body.classList.add('body-scroll-frozen')
    document.body.style.paddingRight = `${getScrollBarWidth()}px`
  }, [ isMobileDevice ])

  const removeStyles = useCallback(() => {
    document.body.classList.remove('body-scroll-frozen')
    document.body.style.paddingRight = '0px'
  }, [ isMobileDevice ])

  useEffect(() => {
    if (enabled) {
      if (openedModalsCount === 0) {
        addStyles()
      }
      openedModalsCount++

      return () => {
        openedModalsCount--

        if (openedModalsCount === 0) {
          removeStyles()
        }
      }
    }
  }, [ addStyles, removeStyles, enabled ])
}

export default useFreezeBodyScroll
