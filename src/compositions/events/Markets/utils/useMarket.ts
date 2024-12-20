import { useEffect, useMemo, useRef, useState } from 'react'
import { useActiveMarket } from '@azuro-org/sdk'
import { type GameMarkets } from '@azuro-org/toolkit'
import { useMedia } from 'contexts'


type Props = {
  markets: GameMarkets
}

const useMarket = ({ markets }: Props) => {
  const [ isOpen, setOpen ] = useState(false)
  const { isMobileView } = useMedia()

  const contentRef = useRef<HTMLDivElement>(null)
  const isOpenRef = useRef(isOpen)
  isOpenRef.current = isOpen

  const {
    activeMarketKey,
    activeConditionIndex,
    marketsByKey,
    otherMarkets,
    sortedMarketKeys,
    loading,
  } = useActiveMarket({ markets })

  useMemo(() => {
    if (!isMobileView && !isOpen && contentRef.current) {
      contentRef.current.scrollTop = 0
    }

  }, [ isOpen, isMobileView ])

  useEffect(() => {
    if (isMobileView && !isOpen) {
      return
    }

    const handleOutsideClick = (event: MouseEvent) => {
      const composedPath = event.composedPath()

      if (!composedPath.includes(contentRef.current!)) {
        setOpen(false)
      }
    }

    // should be capture to avoid immediate triggering
    document.addEventListener('click', handleOutsideClick, { capture: true })

    return () => {
      document.removeEventListener('click', handleOutsideClick, { capture: true })
    }
  }, [ isOpen, isMobileView ])

  return {
    contentRef,
    activeMarketKey,
    activeConditionIndex,
    marketsByKey,
    otherMarkets,
    sortedMarketKeys,
    isOpen,
    isMobileView,
    isFetching: loading,
    setOpen,
  }
}


export default useMarket
