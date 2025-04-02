'use client'

import React from 'react'
import cx from 'classnames'
import { useFreezeBodyScroll } from 'hooks'
import { Message } from '@locmod/intl'
import { type GameQuery, GameState, type GameMarkets, type Market as TMarket, type ConditionState } from '@azuro-org/toolkit'
import { useActiveMarkets } from '@azuro-org/sdk'

import { Icon } from 'components/ui'
import { Overlay } from 'components/layout'

import useMarket from './utils/useMarket'
import Market, { type MarketProps, MarketSkeleton } from './components/Market/Market'

import messages from './messages'


export type MarketsByKey = Record<string, TMarket>

type HeadMarketProps = {
  conditionIndex: number
  isOpen: boolean
} & MarketProps

const HeadMarket: React.FC<HeadMarketProps> = ({ market, game, conditionIndex, conditionStates, isOpen }) => {
  const { conditions } = market

  const headMarket: TMarket = {
    ...market,
    conditions: isOpen ? conditions : [
      conditions[conditionIndex].outcomes.length > 3 ? ({
        ...conditions[conditionIndex],
        outcomes: conditions[conditionIndex].outcomes.slice(0, 2),
      }) : (
        conditions[conditionIndex]
      ),
    ],
  }

  return (
    <Market market={headMarket} game={game} conditionStates={conditionStates} />
  )
}

type MobileMarketsProps = {
  sortedMarkets: string[]
  marketsByKey: MarketsByKey
  game: NonNullable<GameQuery['game']>
  conditionStates: Record<string, ConditionState>
  onClose: () => void
}

const MobileMarkets: React.FC<MobileMarketsProps> = (props) => {
  const { sortedMarkets, marketsByKey, game, conditionStates, onClose } = props

  useFreezeBodyScroll()

  const handleContentClick = (event: React.MouseEvent) => {
    event.stopPropagation()
  }

  return (
    <Overlay className="flex items-end" onClick={onClose}>
      <div
        className="relative w-full bg-grey-10 rounded-t-min px-4 pb-4 max-h-[70vh] overflow-auto no-scrollbar"
        onClick={handleContentClick}
      >
        <div className="flex items-center justify-between p-4 -mx-4 bg-grey-10 sticky top-0 z-10">
          <Message className="text-caption-13 font-semibold" value={messages.markets} />
          <div className="size-4 text-grey-90" onClick={onClose}>
            <Icon name="interface/close" />
          </div>
        </div>
        {
          sortedMarkets.map(marketId => (
            <Market
              key={marketId}
              market={marketsByKey[marketId]}
              game={game}
              conditionStates={conditionStates}
            />
          ))
        }
      </div>
    </Overlay>
  )
}

export const MarketsSkeleton: React.FC = () => {
  return (
    <div className="ds:p-2 border border-transparent">
      <div className="flex">
        <MarketSkeleton />
        <div className="bone size-7 mt-5 ml-2 rounded-min flex-none border border-transparent" />
      </div>
    </div>
  )
}

type ContentProps = {
  markets: GameMarkets
  game: NonNullable<GameQuery['game']>
}

const Content: React.FC<ContentProps> = ({ markets, game }) => {
  const {
    contentRef, states, activeMarketKey, marketsByKey, activeConditionIndex, otherMarkets, sortedMarketKeys,
    isOpen, isMobileView, isFetching, setOpen,
  } = useMarket({ markets })

  if (isFetching) {
    return <MarketsSkeleton />
  }

  const headMarket = marketsByKey[activeMarketKey!]
  const isDisabled = !Boolean(otherMarkets.length) && headMarket.conditions.length === 1 && headMarket.conditions[0].outcomes.length <= 3

  const contentClassName = cx('w-full flex mb:border-transparent ds:p-2 border', {
    'absolute bg-grey-10 overflow-y-auto no-scrollbar max-h-[20rem] border-grey-15 pb-2 z-30 rounded-md': isOpen && !isMobileView,
    'border-transparent': !isOpen,
  })
  const buttonClassName = cx(
    'size-7 flex items-center justify-center flex-none rounded-min',
    'group border border-grey-20 text-gray-70 ml-2 mt-5 sticky top-5',
    'disabled:cursor-not-allowed disabled:text-grey-40 disabled:border-grey-10',
    {
      'hover:text-grey-90 hover:border-grey-40': !isDisabled,
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
          {
            Boolean(headMarket) && (
              <HeadMarket
                conditionIndex={activeConditionIndex}
                market={marketsByKey[activeMarketKey!]}
                game={game}
                isOpen={isOpen}
                conditionStates={states}
              />
            )
          }
          {
            isOpen && (
              <>
                {
                  isMobileView ? (
                    <MobileMarkets
                      sortedMarkets={sortedMarketKeys}
                      marketsByKey={marketsByKey}
                      game={game}
                      conditionStates={states}
                      onClose={handleClose}
                    />
                  ) : (
                    otherMarkets.map(marketId => (
                      <Market
                        key={marketId}
                        market={marketsByKey[marketId]}
                        game={game}
                        conditionStates={states}
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
            className={cx('size-4', { 'rotate-180': isOpen })}
            name="interface/chevron_down"
          />
        </button>
      </div>
    </div>
  )
}

type MarketsProps = {
  gameState: GameState
  game: NonNullable<GameQuery['game']>
}

const Markets: React.FC<MarketsProps> = ({ game, gameState }) => {
  const { data: markets, isFetching, isPlaceholderData } = useActiveMarkets({ gameId: game.gameId })

  if (isFetching || isPlaceholderData || gameState === GameState.Live && !markets?.length) {
    return <MarketsSkeleton />
  }

  if (!markets?.length) {
    return null
  }

  return (
    <Content markets={markets} game={game} />
  )
}

export default Markets
