import { useEffect, useMemo, useRef, useState } from 'react'
import { useStatuses } from '@azuro-org/sdk'
import { type Selection, ConditionStatus } from '@azuro-org/toolkit'
import { useMedia } from 'contexts'

import { type MarketsByKey } from '../Markets'


type Props = {
  sortedMarkets: string[]
  marketsByKey: MarketsByKey
}

const useMarket = ({ sortedMarkets, marketsByKey }: Props) => {
  const [ isOpen, setOpen ] = useState(false)
  const [ activeMarket, setActiveMarket ] = useState(sortedMarkets[0])
  const [ activeConditionIndex, setActiveConditionIndex ] = useState(0)
  const { isMobileView } = useMedia()

  const contentRef = useRef<HTMLDivElement>(null)
  const isOpenRef = useRef(isOpen)
  isOpenRef.current = isOpen

  const selections = useMemo(() => {
    return Object.values(marketsByKey).reduce<Selection[]>((acc, market) => {
      const { outcomeRows } = market

      outcomeRows.forEach(outcomes => {
        outcomes.forEach((outcome) => {
          acc.push(outcome)
        })
      })

      return acc
    }, [])
  }, [ marketsByKey ])

  const { statuses, loading } = useStatuses({ selections })

  const otherMarkets = useMemo(() => {
    return sortedMarkets.filter(key => key !== activeMarket)
  }, [ activeMarket, sortedMarkets ])

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

  useEffect(() => {
    const activeStatus = statuses[marketsByKey[activeMarket].outcomeRows[activeConditionIndex][0].conditionId] || ConditionStatus.Created

    if (activeStatus === ConditionStatus.Created || isOpenRef.current) {
      return
    }

    // try to find condition with Created status in active market
    let nextConditionIndex = marketsByKey[activeMarket].outcomeRows[activeConditionIndex].findIndex(({ conditionId }) => {
      return statuses[conditionId] === ConditionStatus.Created
    })

    if (nextConditionIndex !== -1) {
      setActiveConditionIndex(nextConditionIndex)
    }
    else {
      // try to find next market and condition with Created status
      nextConditionIndex = 0
      const nextMarket = sortedMarkets.find(marketId => {
        return marketsByKey[marketId].outcomeRows.find((conditions, index) => {
          const isMatch = statuses[conditions[0].conditionId] === ConditionStatus.Created

          if (isMatch) {
            nextConditionIndex = index
          }

          return isMatch
        })
      })

      if (nextMarket) {
        setActiveMarket(nextMarket)
        setActiveConditionIndex(nextConditionIndex)
      }
    }
  }, [ statuses ])

  return {
    contentRef,
    statuses,
    activeMarket,
    activeConditionIndex,
    otherMarkets,
    isOpen,
    isMobileView,
    isFetching: loading,
    setOpen,
  }
}


export default useMarket
