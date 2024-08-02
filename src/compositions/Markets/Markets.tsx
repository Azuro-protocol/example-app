'use client'

import React, { useMemo } from 'react'
import cx from 'classnames'
import { useFreezeBodyScroll } from 'hooks'
import { Message } from '@locmod/intl'
import { type GameMarkets, type GameStatus } from '@azuro-org/toolkit'
import { useActiveMarkets } from '@azuro-org/sdk'

import { Icon } from 'components/ui'
import { Overlay } from 'components/layout'

import useMarket from './utils/useMarket'
import Market, { type MarketProps, MarketSkeleton } from './components/Market/Market'

import messages from './messages'


export type MarketsByKey = Record<string, GameMarkets[0]>

type HeadMarketProps = {
  conditionIndex: number
  isOpen: boolean
} & MarketProps

const HeadMarket: React.FC<HeadMarketProps> = ({ market, conditionIndex, isOpen }) => {
  const { outcomeRows } = market

  const headMarket = {
    ...market,
    outcomeRows: isOpen ? outcomeRows : [ outcomeRows[conditionIndex] ],
  }

  return (
    <Market market={headMarket} />
  )
}

type MobileMarketsProps = {
  sortedMarkets: string[]
  marketsByKey: MarketsByKey
  onClose: () => void
}

const MobileMarkets: React.FC<MobileMarketsProps> = ({ sortedMarkets, marketsByKey, onClose }) => {
  useFreezeBodyScroll()

  const handleContentClick = (event: React.MouseEvent) => {
    event.stopPropagation()
  }

  return (
    <Overlay className="flex items-end" onClick={onClose}>
      <div
        className="relative w-full bg-grey-10 rounded-t-2 px-4 pb-4 max-h-[70vh] overflow-auto no-scrollbar"
        onClick={handleContentClick}
      >
        <div className="flex items-center justify-between p-4 -mx-4 bg-grey-10 sticky top-0 z-10">
          <Message className="text-caption-12 font-semibold" value={messages.markets} />
          <div className="size-5 text-grey-90" onClick={onClose}>
            <Icon name="interface/close" />
          </div>
        </div>
        {
          sortedMarkets.map(marketId => (
            <Market
              key={marketId}
              market={marketsByKey[marketId]}
            />
          ))
        }
      </div>
    </Overlay>
  )
}

export const MarketsSkeleton: React.FC = () => {
  return (
    <div className="ds:p-2 mb:px-4 mb:pb-3">
      <div className="flex">
        <MarketSkeleton />
        <div className="bone size-7 mt-7 ml-2" />
      </div>
    </div>
  )
}

type ContentProps = {
  marketsByKey: MarketsByKey
  sortedMarkets: string[]
}

const Content: React.FC<ContentProps> = ({ marketsByKey, sortedMarkets }) => {
  const {
    contentRef, activeMarket, activeConditionIndex, otherMarkets,
    isOpen, isMobileView, setOpen,
  } = useMarket({ marketsByKey, sortedMarkets })

  const isDisabled = !Boolean(otherMarkets.length)

  const contentClassName = cx('w-full flex mb:border-transparent ds:p-2 mb:px-4 mb:pb-3 z-[10] border', {
    'absolute bg-grey-10 overflow-y-auto no-scrollbar max-h-[20rem] border-grey-15 pb-2': isOpen && !isMobileView,
    'border-transparent': !isOpen,
  })
  const buttonClassName = cx(
    'h-7 w-7 flex items-center justify-center flex-none',
    'group border border-grey-20 text-gray-70 ml-2 mt-7 sticky top-7',
    'disabled:cursor-not-allowed disabled:text-grey-40 disabled:border-grey-40',
    {
      'hover:text-grey-90': !isDisabled,
    }
  )

  const handleClose = () => {
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen(v => !v)
  }

  return (
    <div className="w-full ds:relative ds:h-16">
      <div ref={contentRef} className={contentClassName}>
        <div className="w-full h-fit">
          <HeadMarket
            conditionIndex={activeConditionIndex}
            market={marketsByKey[activeMarket]}
            isOpen={isOpen}
          />
          {
            isOpen && (
              <>
                {
                  isMobileView ? (
                    <MobileMarkets
                      sortedMarkets={sortedMarkets}
                      marketsByKey={marketsByKey}
                      onClose={handleClose}
                    />
                  ) : (
                    otherMarkets.map(marketId => (
                      <Market
                        key={marketId}
                        market={marketsByKey[marketId]}
                      />
                    ))
                  )
                }
              </>
            )
          }
        </div>
        <button
          className={buttonClassName}
          disabled={isDisabled}
          onClick={handleToggle}
        >
          <Icon
            className={cx({ 'rotate-180 size-5': isOpen })}
            name="interface/chevron_down"
          />
        </button>
      </div>
    </div>
  )
}

type MarketsProps = {
  gameId: string
  gameStatus: GameStatus
}

const Markets: React.FC<MarketsProps> = ({ gameId, gameStatus }) => {
  const { markets, loading } = useActiveMarkets({ gameId, gameStatus })

  const { sortedMarkets, marketsByKey } = useMemo(() => {
    const defaultValue = {
      sortedMarkets: [],
      marketsByKey: {},
    }

    if (!markets?.length) {
      return defaultValue
    }

    return markets.reduce<{sortedMarkets: string[], marketsByKey: MarketsByKey}>((acc, market) => {
      const { marketKey } = market

      acc.sortedMarkets.push(marketKey)
      acc.marketsByKey[marketKey] = market

      return acc
    }, defaultValue)
  }, [ markets ])

  if (loading) {
    return <MarketSkeleton />
  }

  return (
    <Content marketsByKey={marketsByKey} sortedMarkets={sortedMarkets} />
  )
}

export default React.memo(Markets)
