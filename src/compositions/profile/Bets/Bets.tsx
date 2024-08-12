'use client'

import { useChain, useLiveBets, usePrematchBets, useRedeemBet, type Bet } from '@azuro-org/sdk'
import { OrderDirection, getGameStatus, GameStatus } from '@azuro-org/toolkit'
import { Message, useIntl } from '@locmod/intl'
import React, { useMemo } from 'react'
import { useAccount } from 'wagmi'
import dayjs from 'dayjs'
import cx from 'classnames'
import { getGameDateTime } from 'helpers/getters'
import { formatToFixed } from 'helpers/formatters'

import { Icon, type IconName } from 'components/ui'
import { OpponentLogo } from 'components/dataDisplay'
import { Href } from 'components/navigation'
import { Button } from 'components/inputs'
import BetStatus from 'compositions/BetStatus/BetStatus'

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
          <div className="size-1 bg-grey-20 rounded-full mx-2" />
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
                country: {
                  name: countryName,
                },
              },
            } = game

            const { date, time } = getGameDateTime(+startsAt * 1000)
            const gameStatus = getGameStatus({ graphStatus: graphGameStatus, startsAt: +startsAt, isGameInLive: isLive })

            // const className = cx("", {
            //   'bg-zinc-200': !isWin && !isLose,
            //   'bg-green-100': isWin,
            //   'bg-red-100': isLose,
            // })

            return (
              <div key={gameId} className="rounded-sm overflow-hidden">
                <div className="bg-bg-l3 flex items-center justify-between py-2 px-3 relative">
                  <div className="flex items-center text-caption-12">
                    <div className="text-grey-70 flex items-center">
                      <Icon className="size-4 mr-2" name={`sport/${sportSlug}` as IconName} />
                      <span>{countryName}</span>
                    </div>
                    <div className="size-1 bg-grey-40 rounded-full mx-2" />
                    <span>{leagueName}</span>
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
                    cx('mt-px flex items-center justify-between p-3', {
                      'bg-bet-game-won': isWin,
                      'bg-bet-game-lost': isLose,
                      'bg-bg-l3': !isWin && !isLose,
                    })
                  }
                >
                  <Href to="" className="flex items-center group/link">
                    {
                      participants.map(({ name, image }, index) => (
                        <OpponentLogo className={cx({ '-mt-2': !index, '-mb-2 -ml-2 z-20': !!index })} key={name} image={image} />
                      ))
                    }
                    <div className="ml-3">
                      <div className="text-caption-12 flex items-center">
                        <span className="text-grey-70 font-medium">{date}</span>
                        <span className="text-grey-60 ml-1">{time}</span>
                        {
                          isCombo && (
                            <>
                              {
                                [ GameStatus.Canceled, GameStatus.Live, GameStatus.Resolved ].includes(gameStatus) && (
                                  <div className="size-1 bg-grey-40 rounded-full mx-2" />
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
                  <div className="grid grid-cols-3 gap-4 w-full ds:max-w-[50%]">
                    <div className="text-caption-13">
                      <Message className="text-grey-60" value={messages.market} />
                      <div className={cx('font-semibold', { 'text-grey-40': gameStatus === GameStatus.Canceled })}>
                        {marketName}
                      </div>
                    </div>
                    <div className="text-caption-13">
                      <Message className="text-grey-60" value={messages.outcome} />
                      <div className={cx('font-semibold', { 'text-grey-40': gameStatus === GameStatus.Canceled })}>
                        {selectionName}
                      </div>
                    </div>
                    <div className="text-caption-13">
                      <Message className="text-grey-60" value={messages.odds} />
                      <div className={cx('font-semibold', { 'text-grey-40': gameStatus === GameStatus.Canceled })}>
                        {formatToFixed(odds, 2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className="py-4 px-3 flex items-center justify-between">
        <div className="flex items-center text-caption-13">
          <Message className="text-grey-70 mr-1" value={messages.betAmount} />
          <span>{amount} {betToken.symbol}</span>
        </div>
        <div className="flex items-center">
          <div className="flex items-center text-caption-13">
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
            Boolean(!isRedeemed && (isWin || isCanceled)) && (
              <Button
                className="ml-3"
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

const useBets = () => {
  const { address } = useAccount()

  const props = {
    filter: {
      bettor: address!,
    },
    orderDir: OrderDirection.Desc,
  }

  const { loading: isPrematchLoading, bets: prematchBets } = usePrematchBets(props)
  const { loading: isLiveLoading, bets: liveBets } = useLiveBets(props)

  const bets = useMemo(() => {
    return [ ...liveBets, ...prematchBets ].sort((betA, betB) => betB.createdAt - betA.createdAt)
  }, [ prematchBets, liveBets ])

  return {
    bets,
    loading: isPrematchLoading || isLiveLoading,
  }
}

const Bets: React.FC = () => {
  const { bets, loading } = useBets()

  if (loading) {
    return null
  }

  console.log(bets, 'bets')

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

export default Bets
