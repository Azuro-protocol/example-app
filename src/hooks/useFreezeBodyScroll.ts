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

const getPageOffset = () => {
  // isCSS1Compat for old browsers support like IE < 9,
  // which do not have window.pageYOffset and window.scrollY
  // For more info check https://developer.mozilla.org/ru/docs/Web/API/Window/scrollY
  const isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat')
  const isSupportPageOffset = typeof window.pageXOffset !== 'undefined'

  if (isSupportPageOffset) {
    return {
      x: window.pageXOffset,
      y: window.pageYOffset,
    }
  }

  return {
    x: isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft,
    y: isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop,
  }
}

let openedModalsCount = 0
let savedOffsetTop = 0

const useFreezeBodyScroll = (enabled = true) => {
  const { isMobileDevice } = useDevice()

  // const translateRoot = useCallback((offset: number) => {
  //   // can't use transform, because it creates new fixed layer and breaks fixed elements
  //   // document.getElementById('__next').style.marginTop = offset ? `${offset}px` : null
  // }, [])

  const addStyles = useCallback(() => {
    // const offsetTop = getPageOffset().y

    document.body.classList.add('body-scroll-frozen')
    document.body.style.paddingRight = `${getScrollBarWidth()}px`

    // if (isMobileDevice && offsetTop > 0) {
    // window.scrollTo(0, 0)
    // translateRoot(-offsetTop)
    // savedOffsetTop = offsetTop
    // }
  }, [ isMobileDevice ])

  const removeStyles = useCallback(() => {
    document.body.classList.remove('body-scroll-frozen')
    document.body.style.paddingRight = '0px'

    // if (isMobileDevice && savedOffsetTop > 0) {
    // translateRoot(0)
    // window.scrollTo(0, savedOffsetTop)
    // savedOffsetTop = 0
    // }
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
