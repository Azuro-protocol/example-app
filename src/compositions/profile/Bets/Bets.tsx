'use client'

import { useChain, useRedeemBet, BetType, type Bet, type BetOutcome, usePrecalculatedCashouts, useBets, useLegacyBets } from '@azuro-org/sdk'
import { GameState, OrderDirection } from '@azuro-org/toolkit'
import { Message } from '@locmod/intl'
import React, { useEffect, useMemo } from 'react'
import dayjs from 'dayjs'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import cx from 'classnames'
import { openModal } from '@locmod/modal'
import { useAccount } from '@azuro-org/sdk-social-aa-connector'
import { useEntry } from '@locmod/intersection-observer'
import { type InfiniteData, type UseInfiniteQueryResult } from '@tanstack/react-query'
import { toLocaleString } from 'helpers'
import { getGameDateTime } from 'helpers/getters'

import { Icon, type IconName } from 'components/ui'
import { OpponentLogo } from 'components/dataDisplay'
import { Href } from 'components/navigation'
import { Button } from 'components/inputs'
import BetStatus from 'compositions/BetStatus/BetStatus'
import EmptyContent from 'compositions/EmptyContent/EmptyContent'
import OddsValue from 'compositions/OddsValue/OddsValue'

import ConnectButtonWrapper from 'compositions/ConnectButtonWrapper/ConnectButtonWrapper'
import messages from './messages'


type OutcomeProps = {
  outcome: BetOutcome
  isCombo: boolean
}

const Outcome: React.FC<OutcomeProps> = ({ outcome, isCombo }) => {
  const { odds, marketName, game, selectionName, isWin, isLose, isLive } = outcome

  const {
    title,
    state: gameState, gameId, participants, startsAt,
    sport: {
      slug: sportSlug,
    },
    league: {
      name: leagueName,
      slug: leagueSlug,
    },
    country: {
      name: countryName,
      slug: countrySlug,
    },
  } = game

  const isUnique = sportSlug === 'unique'
  const withResult = isWin !== null || isLose !== null
  const { date, time } = getGameDateTime(+startsAt * 1000)

  const marketBoxClassName = 'text-caption-13 mb:flex mb:items-center mb:justify-between'
  const marketClassName = cx('font-semibold', { 'text-grey-40': gameState === GameState.Stopped })

  return (
    <div className="rounded-sm overflow-hidden">
      <div className="bg-bg-l3 flex items-center justify-between py-2 ds:px-3 mb:px-2 relative">
        <div className="flex items-center text-caption-12">
          <Icon className="size-4 mr-2 text-grey-70" name={`sport/${sportSlug}` as IconName} />
          {
            isUnique ? (
              <Message className="text-grey-70" value={messages.unique} />
            ) : (
              <>
                <span className="text-grey-70">{countryName}</span>
                <div className="size-1 flex-none bg-grey-40 rounded-full mx-2" />
                <span>{leagueName}</span>
              </>
            )
          }
        </div>
        {
          isLive && (
            <>
              <div className="absolute h-full w-[30%] top-0 right-0 bg-live-bet-shadow z-10" />
              <div className="flex items-center text-accent-red z-20">
                <Icon className="size-4 mr-1" name="interface/live" />
                <Message className="text-caption-12 font-semibold uppercase" value={messages.live} />
              </div>
            </>
          )
        }
      </div>
      <div
        className={
          cx('mt-px flex ds:items-center ds:justify-between p-3 mb:px-2 mb:flex-col', {
            'bg-bet-game-won': isWin,
            'bg-bet-game-lost': isLose,
            'bg-bg-l3': !isWin && !isLose,
          })
        }
      >
        <Href
          to={`${sportSlug}/${countrySlug}/${leagueSlug}/${gameId}`}
          className="flex items-center group/link"
        >
          {
            !isUnique && participants.map(({ name, image }, index) => (
              <OpponentLogo className={cx({ '-mt-2': !index, '-mb-2 -ml-2 z-20': !!index })} key={name} image={image} />
            ))
          }
          <div className={cx({ 'ml-3': !isUnique })}>
            <div className="text-caption-12 flex items-center">
              <span className="text-grey-70 font-medium">{date}</span>
              <span className="text-grey-60 ml-1">{time}</span>
              {
                isCombo && (
                  <>
                    {
                      [ GameState.Stopped, GameState.Live ].includes(gameState) && (
                        <div className="size-1 flex-none bg-grey-40 rounded-full mx-2" />
                      )
                    }
                    {
                      gameState === GameState.Stopped && (
                        <div className="flex items-center text-grey-60">
                          <Icon className="size-4 mr-[2px]" name="interface/declined" />
                          <Message className="font-semibold" value={messages.gameState.stopped} />
                        </div>
                      )
                    }
                    {
                      gameState === GameState.Live && (
                        <Message className="font-semibold text-accent-red" value={messages.gameState.live} />
                      )
                    }
                    {
                      Boolean(gameState === GameState.Finished && withResult) && (
                        <>
                          <div className="size-1 flex-none bg-grey-40 rounded-full mx-2" />
                          <Message
                            className={
                              cx('font-semibold', {
                                'text-accent-green': isWin,
                                'text-accent-red': isLose,
                              })
                            }
                            value={isWin ? messages.gameState.win : messages.gameState.lose}
                          />
                        </>
                      )
                    }
                  </>
                )
              }
            </div>
            <div className="text-caption-13 font-semibold mt-0.5 group-hover/link:underline">{title}</div>
          </div>
        </Href>
        <div className="ds:grid ds:grid-cols-3 ds:gap-4 w-full ds:max-w-[50%] mb:space-y-2 mb:pt-2 mb:border-t mb:border-t-grey-20 mb:mt-2">
          <div className={marketBoxClassName}>
            <Message className="text-grey-60" value={messages.market} />
            <div className={marketClassName}>
              {marketName}
            </div>
          </div>
          <div className={marketBoxClassName}>
            <Message className="text-grey-60" value={messages.outcome} />
            <div className={marketClassName}>
              {selectionName}
            </div>
          </div>
          <div className={marketBoxClassName}>
            <Message className="text-grey-60" value={messages.odds} />
            <OddsValue className={marketClassName} odds={odds} />
          </div>
        </div>
      </div>
    </div>
  )
}

type BetProps = {
  bet: Bet
}

const Bet: React.FC<BetProps> = ({ bet }) => {
  const {
    createdAt, status: graphBetStatus, amount, outcomes,
    payout, cashout, possibleWin, freebetId, txHash, tokenId,
    isWin, isLose, isCanceled, isRedeemed, isCashedOut,
  } = bet

  const { betToken, appChain } = useChain()
  const { submit, isPending, isProcessing } = useRedeemBet()
  const { data: { cashoutAmount, isAvailable: isCashoutAvailable } } = usePrecalculatedCashouts({
    bet,
    query: {
      enabled: !isCashedOut,
    },
  })

  const isCombo = outcomes.length > 1
  const isLoading = isPending || isProcessing
  const isFreeBet = Boolean(freebetId)
  const withButton = !isRedeemed && !isCashedOut && (isWin || isCanceled)

  const { resultTitle, resultAmount } = useMemo(() => {
    if (isCashedOut) {
      return {
        resultTitle: messages.cashedOut,
        resultAmount: `${toLocaleString(cashout!, { digits: 2 })} ${betToken.symbol}`,
      }
    }

    if (isWin) {
      return {
        resultTitle: messages.winning,
        resultAmount: `${toLocaleString(payout || possibleWin, { digits: 2 })} ${betToken.symbol}`,
      }
    }

    if (isLose) {
      return {
        resultTitle: messages.loss,
        resultAmount: `-${toLocaleString(amount, { digits: 2 })} ${betToken.symbol}`,
      }
    }

    if (isCanceled) {
      return {
        resultTitle: messages.possibleWin,
        resultAmount: '––',
      }
    }

    return {
      resultTitle: messages.possibleWin,
      resultAmount: `${toLocaleString(possibleWin, { digits: 2 })} ${betToken.symbol}`,
    }
  }, [ isCashedOut ])

  const handleRedeem = async () => {
    try {
      await submit({ bets: [ bet ] })
    }
    catch {}
  }

  return (
    <div className="rounded-md bg-bg-l2 px-1">
      <div className="flex items-center justify-between py-2 px-3">
        <div className="flex items-center text-caption-13">
          <Message className="font-semibold" value={isCombo ? messages.combo : messages.single} />
          <div className="size-1 flex-none bg-grey-20 rounded-full mx-2" />
          <a
            className="flex items-center text-grey-60 hover:text-grey-90 hover:underline"
            href={`${appChain.blockExplorers!.default.url}/tx/${txHash}`}
            target="_blank"
            rel="noreferrer"
          >
            <span>{dayjs(+createdAt * 1000).format('DD.MM.YYYY, HH:mm')}</span>
            <Icon className="size-4 ml-1" name="interface/external_link" />
          </a>
        </div>
        <BetStatus
          graphBetStatus={graphBetStatus}
          games={outcomes.map(({ game }) => game)}
          isWin={isWin}
          isCashedOut={isCashedOut}
        />
      </div>
      <div className="space-y-1">
        {
          outcomes.map((outcome) => (
            <Outcome
              key={outcome.game.gameId}
              outcome={outcome}
              isCombo={isCombo}
            />
          ))
        }
      </div>
      <div
        className={
          cx('ds:px-3 mb:px-2 flex ds:items-center ds:justify-between mb:flex-col mb:space-y-2', {
            'ds:py-2 mb:py-2': withButton,
            'ds:py-4 mb:py-2': !withButton,
          })
        }
      >
        <div className="flex items-center text-caption-13 mb:justify-between">
          {
            isFreeBet ? (
              <div className="flex items-center text-accent-green mr-2">
                <Icon className="size-4" name="interface/gift" />
                <Message className="font-semibold uppercase ml-1" value={messages.freebet} />
              </div>
            ) : (
              <Message className="text-grey-70 mr-1" value={messages.betAmount} />
            )
          }
          <span>{amount} {betToken.symbol}</span>
        </div>
        <div className="flex ds:items-center mb:flex-col mb:space-y-3">
          <div className="flex items-center text-caption-13 mb:justify-between">
            <Message className="text-grey-70 mr-1" value={resultTitle} />
            <span
              className={
                cx('font-semibold', {
                  'text-grey-70': isLose || isCanceled || isCashedOut,
                  'text-accent-green': isWin && !isCashedOut,
                })
              }
            >{resultAmount}
            </span>
          </div>
          {
            isCashoutAvailable && (
              <Button
                className="ds:ml-3"
                style="tertiary"
                title={
                  {
                    ...messages.cashout,
                    values: {
                      amount: toLocaleString(cashoutAmount!, { digits: 2 }),
                      symbol: betToken.symbol,
                    },
                  }
                }
                size={32}
                onClick={() => openModal('CashoutModal', { bet })}
              />
            )
          }
          {
            withButton && (
              <ConnectButtonWrapper>
                <Button
                  className="ds:ml-3"
                  style="secondary"
                  title={isWin ? messages.redeem : messages.refund}
                  size={32}
                  loading={isLoading}
                  onClick={handleRedeem}
                />
              </ConnectButtonWrapper>
            )
          }
        </div>
      </div>
    </div>
  )
}

const tabs = [
  {
    title: messages.tabs.all,
    value: undefined,
  },
  {
    title: messages.tabs.unredeemed,
    value: BetType.Unredeemed,
  },
  {
    title: messages.tabs.accepted,
    value: BetType.Accepted,
  },
  {
    title: messages.tabs.cashedOut,
    value: BetType.CashedOut,
  },
  {
    title: messages.tabs.settled,
    value: BetType.Settled,
  },
]

type NavbarProps = {
  activeType: BetType | undefined
  onClick: (type: BetType | undefined) => void
}

const Navbar: React.FC<NavbarProps> = ({ activeType, onClick }) => {
  return (
    <div className="flex items-center space-x-2 px-3">
      {
        tabs.map(({ title, value }) => {
          const isActive = activeType === value

          const className = cx('flex items-center p-1 cursor-pointer', {
            'text-grey-60 hover:text-grey-90': !isActive,
            'text-grey-90': isActive,
          })

          return (
            <button key={value || 'all'} className={className} onClick={() => onClick(value)}>
              <Message className="text-caption-13 font-semibold" value={title} />
            </button>
          )
        })
      }
    </div>
  )
}

type FetchMoreProps = {
  fetch: () => void
  skip: boolean
}

const FetchMore: React.FC<FetchMoreProps> = ({ fetch, skip }) => {
  const [ ref, entry ] = useEntry()

  const isIntersecting = Boolean(entry?.isIntersecting)

  useEffect(() => {
    if (!skip && isIntersecting) {
      fetch()
    }
  }, [ isIntersecting, skip, fetch ])

  return <div ref={ref} className="" />
}

type BetsPagesProps = {
  query: UseInfiniteQueryResult<InfiniteData<{
    bets: Bet[];
    nextPage: number | undefined;
  }>>
  withEmptyContent?: boolean
}

const BetsPages: React.FC<BetsPagesProps> = (props) => {
  const { query, withEmptyContent = false } = props
  const { data, isPlaceholderData, fetchNextPage, hasNextPage } = query
  const { pages } = data || {}

  const isFetching = query.isFetching && !query.isRefetching || query.isFetching && query.isPlaceholderData || query.isFetchingNextPage

  if (withEmptyContent && !isFetching && (!pages?.length || !pages[0].bets.length)) {
    return (
      <EmptyContent
        className="py-20"
        image="/images/illustrations/smile_sad.png"
        title={messages.empty.title}
        text={messages.empty.text}
      />
    )
  }

  return (
    <>
      <div className="space-y-2">
        {
          !isPlaceholderData && (
            <>
              {
                pages?.map(({ bets, nextPage }) => {
                  return (
                    <React.Fragment key={`${nextPage}`}>
                      {
                        bets.map(bet => (
                          <Bet key={`${bet.createdAt}-${bet.tokenId}`} bet={bet} />
                        ))
                      }
                    </React.Fragment>
                  )
                })
              }
            </>
          )
        }
        {
          isFetching && (
            <div className="py-20">
              <Icon className="size-12 mx-auto" name="interface/spinner" />
            </div>
          )
        }
      </div>
      {Boolean(pages && !isPlaceholderData) && <FetchMore fetch={fetchNextPage} skip={!hasNextPage} />}
    </>
  )
}

type ContentProps = {
  tab: BetType
}

const Content: React.FC<ContentProps> = ({ tab }) => {
  const { address } = useAccount()
  const props = {
    filter: {
      bettor: address!,
      type: tab,
    },
    orderDir: OrderDirection.Desc,
  }

  const betsQuery = useBets(props)
  const legacyBetsQuery = useLegacyBets({
    ...props,
    query: {
      enabled: !betsQuery.isFetching && !betsQuery.hasNextPage,
    },
  })

  return (
    <>
      <BetsPages
        query={betsQuery}
      />
      {
        Boolean(!betsQuery.hasNextPage && !betsQuery.isFetching) && (
          <BetsPages
            query={legacyBetsQuery}
            withEmptyContent
          />
        )
      }
    </>
  )
}

const Bets: React.FC = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const tab = searchParams.get('tab') as BetType || undefined

  const handleTabChange = (type: BetType | undefined) => {
    const params = new URLSearchParams(searchParams.toString())

    if (type) {
      params.set('tab', type)
    }
    else {
      params.delete('tab')
    }

    router.replace(pathname + '?' + params)
  }

  return (
    <div className="space-y-3">
      <Navbar activeType={tab} onClick={(type) => handleTabChange(type)} />
      <Content tab={tab} />
    </div>
  )
}

export default Bets
