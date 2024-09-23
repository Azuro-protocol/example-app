'use client'

import { useChain, useRedeemBet, BetType, type Bet } from '@azuro-org/sdk'
import { getGameStatus, GameStatus } from '@azuro-org/toolkit'
import { Message, useIntl } from '@locmod/intl'
import React, { useMemo } from 'react'
import dayjs from 'dayjs'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import cx from 'classnames'
import { useBets } from 'hooks'
import { getGameDateTime } from 'helpers/getters'
import { formatToFixed } from 'helpers/formatters'

import { Icon, type IconName } from 'components/ui'
import { OpponentLogo } from 'components/dataDisplay'
import { Href } from 'components/navigation'
import { Button } from 'components/inputs'
import BetStatus from 'compositions/BetStatus/BetStatus'
import EmptyContent from 'compositions/EmptyContent/EmptyContent'
import OddsValue from 'compositions/OddsValue/OddsValue'

import messages from './messages'


type BetProps = {
  bet: Bet
}

const Bet: React.FC<BetProps> = ({ bet }) => {
  const {
    createdAt, status: graphBetStatus, amount, outcomes,
    payout, possibleWin, freebetId, txHash,
    isWin, isLose, isCanceled, isRedeemed, isLive,
  } = bet

  const intl = useIntl()
  const { betToken, appChain } = useChain()
  const { submit, isPending, isProcessing } = useRedeemBet()

  const isCombo = outcomes.length > 1
  const isLoading = isPending || isProcessing
  const isFreeBet = Boolean(freebetId)
  const withButton = !isRedeemed && (isWin || isCanceled)

  const { resultTitle, resultAmount } = useMemo(() => {
    if (isWin) {
      return {
        resultTitle: intl.formatMessage(messages.winning),
        resultAmount: `${formatToFixed(payout || possibleWin, 3)} ${betToken.symbol}`,
      }
    }

    if (isLose) {
      return {
        resultTitle: intl.formatMessage(messages.loss),
        resultAmount: `-${formatToFixed(amount!, 2)} ${betToken.symbol}`,
      }
    }

    if (isCanceled) {
      return {
        resultTitle: intl.formatMessage(messages.possibleWin),
        resultAmount: '––',
      }
    }

    return {
      resultTitle: intl.formatMessage(messages.possibleWin),
      resultAmount: `${formatToFixed(possibleWin!, 3)} ${betToken.symbol}`,
    }
  }, [])

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
          isLiveBet={isLive}
          isWin={isWin}
          isLose={isLose}
        />
      </div>
      <div className="space-y-1">
        {
          outcomes.map((outcome) => {

            const { odds, marketName, game, selectionName, isWin, isLose } = outcome

            const {
              title,
              status: graphGameStatus, gameId, participants, startsAt,
              sport: {
                slug: sportSlug,
              },
              league: {
                name: leagueName,
                slug: leagueSlug,
                country: {
                  name: countryName,
                  slug: countrySlug,
                },
              },
            } = game

            const { date, time } = getGameDateTime(+startsAt * 1000)
            const gameStatus = getGameStatus({ graphStatus: graphGameStatus, startsAt: +startsAt, isGameInLive: isLive })
            const isUnique = sportSlug === 'unique'

            const marketBoxClassName = 'text-caption-13 mb:flex mb:items-center mb:justify-between'
            const marketClassName = cx('font-semibold', { 'text-grey-40': gameStatus === GameStatus.Canceled })

            return (
              <div key={gameId} className="rounded-sm overflow-hidden">
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
                  <Href to={`${sportSlug}/${countrySlug}/${leagueSlug}/${gameId}`} className="flex items-center group/link">
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
                                [ GameStatus.Canceled, GameStatus.Live, GameStatus.Resolved ].includes(gameStatus) && (
                                  <div className="size-1 flex-none bg-grey-40 rounded-full mx-2" />
                                )
                              }
                              {
                                gameStatus === GameStatus.Canceled && (
                                  <div className="flex items-center text-accent-yellow">
                                    <Icon className="size-4 mr-[2px]" name="interface/declined" />
                                    <Message className="font-semibold" value={messages.gameStatus.declined} />
                                  </div>
                                )
                              }
                              {
                                gameStatus === GameStatus.Live && (
                                  <Message className="font-semibold text-accent-red" value={messages.gameStatus.live} />
                                )
                              }
                              {
                                gameStatus === GameStatus.Resolved && (
                                  <Message
                                    className={
                                      cx('font-semibold', {
                                        'text-accent-green': isWin,
                                        'text-accent-red': isLose,
                                      })
                                    }
                                    value={isWin ? messages.gameStatus.win : messages.gameStatus.lose}
                                  />
                                )
                              }
                            </>
                          )
                        }
                      </div>
                      <div className="text-caption-13 font-semibold mt-[2px] group-hover/link:underline">{title}</div>
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
          })
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
            <span className="text-grey-70 mr-1">{resultTitle}</span>
            <span
              className={
                cx('font-semibold', {
                  'text-grey-70': isLose || isCanceled,
                  'text-accent-green': isWin,
                })
              }
            >{resultAmount}
            </span>
          </div>
          {
            withButton && (
              <Button
                className="ds:ml-3"
                style="secondary"
                title={isWin ? messages.redeem : messages.refund}
                size={32}
                loading={isLoading}
                onClick={handleRedeem}
              />
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

type ContentProps = {
  bets: Bet[]
  isFetching: boolean
}

const Content: React.FC<ContentProps> = ({ bets, isFetching }) => {

  if (isFetching) {
    return (
      <div className="py-20">
        <Icon className="size-12 mx-auto" name="interface/spinner" />
      </div>
    )
  }

  if (!bets?.length) {
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
    <div className="space-y-2">
      {
        bets.map(bet => (
          <Bet key={`${bet.createdAt}-${bet.tokenId}`} bet={bet} />
        ))
      }
    </div>
  )
}

const Bets: React.FC = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const tab = searchParams.get('tab') as BetType || undefined

  const { bets, loading } = useBets(tab)

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
      <Content bets={bets} isFetching={loading} />
    </div>
  )
}

export default Bets
