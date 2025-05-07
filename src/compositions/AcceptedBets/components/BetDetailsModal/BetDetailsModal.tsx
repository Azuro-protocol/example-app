'use client'

import { openModal, standaloneModal, type ModalComponent } from '@locmod/modal'
import { Message } from '@locmod/intl'
import { useChain, type Bet, type BetOutcome, usePrecalculatedCashouts } from '@azuro-org/sdk'
import { GameState } from '@azuro-org/toolkit'
import dayjs from 'dayjs'
import cx from 'classnames'
import { toLocaleString } from 'helpers'
import { getGameDateTime } from 'helpers/getters'

import { PlainModal } from 'components/feedback'
import { Icon, LiveDot } from 'components/ui'
import { Button } from 'components/inputs'
import { Href } from 'components/navigation'
import { OpponentLogo } from 'components/dataDisplay'
import OddsValue from 'compositions/OddsValue/OddsValue'
import BetStatus from 'compositions/BetStatus/BetStatus'

import messages from './messages'


type OutcomeProps = {
  outcome: BetOutcome
  isCombo: boolean
  onLinkClick: () => void
}

const Outcome: React.FC<OutcomeProps> = ({ outcome, isCombo, onLinkClick }) => {
  const { game, marketName, selectionName, odds, isWin, isLose } = outcome
  const {
    title,
    state: gameState, gameId, participants, startsAt,
    sport: {
      slug: sportSlug,
    },
    league: {
      slug: leagueSlug,
    },
    country: {
      slug: countrySlug,
    },
  } = game!

  const { date, time } = getGameDateTime(+startsAt * 1000)
  const isUnique = sportSlug === 'unique'

  // const gameStatus = getGameStatus({
  //   graphStatus: graphGameStatus,
  //   startsAt: +startsAt,
  //   isGameInLive: isLive,
  // })

  return (
    <div className="rounded-md overflow-hidden">
      <Href
        to={`${sportSlug}/${countrySlug}/${leagueSlug}/${gameId}`}
        className="bg-bg-l2 flex items-center p-3 group/link"
        onClick={onLinkClick}
      >
        {
          !isUnique && participants.map(({ name, image }, index) => (
            <OpponentLogo className={cx({ '-mt-2': !index, '-mb-2 -ml-2 z-20': !!index })} key={name} image={image} />
          ))
        }
        <div className="ml-2">
          <div className="flex items-center justify-between">
            <div className="text-caption-12 flex items-center">
              <span className="text-grey-70 font-semibold">{date}</span>
              <span className="text-grey-60 ml-1">{time}</span>
              {
                isCombo && (
                  <>
                    {
                      [ GameState.Live, GameState.Finished ].includes(gameState) && (
                        <div className="size-1 flex-none bg-grey-40 rounded-full mx-2" />
                      )
                    }
                    {/* {
                      gameState === GameState.Stopped && (
                        <div className="flex items-center text-accent-yellow">
                          <Icon className="size-4 mr-[2px]" name="interface/declined" />
                          <Message className="font-semibold" value={messages.gameState.declined} />
                        </div>
                      )
                    } */}
                    {
                      gameState === GameState.Finished && (
                        <Message
                          className={
                            cx('font-semibold', {
                              'text-accent-green': isWin,
                              'text-accent-red': isLose,
                            })
                          }
                          value={isWin ? messages.gameState.win : messages.gameState.lose}
                        />
                      )
                    }
                  </>
                )
              }
            </div>
            {
              gameState === GameState.Live && (
                <LiveDot />
              )
            }
          </div>
          <div className="text-caption-13 font-semibold mt-0.5 group-hover/link:underline">
            {title}
          </div>
        </div>
      </Href>
      <div
        className={
          cx('p-3 mt-px space-y-1.5', {
            'bg-bet-game-won': isWin,
            'bg-bet-game-lost': isLose,
            'bg-bg-l2': !isWin && !isLose,
          })
        }
      >
        <div className="flex items-center justify-between text-caption-12">
          <Message className="text-grey-60" value={messages.market} />
          <div className="text-caption-13 font-semibold text-grey-90">
            {marketName}
          </div>
        </div>
        <div className="flex items-center justify-between text-caption-12">
          <Message className="text-grey-60" value={messages.outcome} />
          <div className="text-caption-13 font-semibold text-grey-90">
            {selectionName}
          </div>
        </div>
        <div className="flex items-center justify-between text-caption-12">
          <Message className="text-grey-60" value={messages.odds} />
          <OddsValue className="text-caption-13 font-semibold text-grey-90" odds={odds} />
        </div>
      </div>
    </div>
  )
}

export type BetDetailsModalProps = {
  bet: Bet
}

const BetDetailsModal: ModalComponent<BetDetailsModalProps> = (props) => {
  const { closeModal, bet } = props

  const { appChain, betToken } = useChain()

  const {
    tokenId, createdAt, status: graphBetStatus, amount, outcomes, freebetId, totalOdds, possibleWin,
    isWin, isCashedOut,
  } = bet

  const isFreeBet = Boolean(freebetId)
  const isCombo = outcomes.length > 1

  const { data, isFetching: isCashoutFetching } = usePrecalculatedCashouts({
    bet,
    query: {
      enabled: !isCashedOut,
    },
  })

  const { cashoutAmount, isAvailable: isCashoutAvailable } = data

  return (
    <PlainModal
      className="!max-w-[26rem]"
      contentClassName="!p-0"
      closeModal={closeModal}
    >
      <div className="pt-5 px-2 pb-2">
        <div className="px-3 w-full">
          <Message className="text-caption-14 font-semibold" value={messages.title} />
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center">
              <div className="text-grey-60 text-caption-12 font-medium">
                {`#${tokenId} / ${dayjs(+createdAt * 1000).format('DD.MM.YYYY, HH:mm')}`}
              </div>
            </div>
            <BetStatus
              graphBetStatus={graphBetStatus}
              games={outcomes.map(({ game }) => game!)}
              isWin={isWin}
              isCashedOut={isCashedOut}
            />
          </div>
        </div>
        <div className="space-y-1 overflow-auto no-scrollbar max-h-[30rem] mt-3">
          {
            outcomes.map((outcome) => (
              <Outcome
                key={outcome.game!.gameId}
                outcome={outcome}
                isCombo={isCombo}
                onLinkClick={() => closeModal()}
              />
            ))
          }
        </div>
        <div className="p-3 space-y-1.5">
          <div className="flex items-center text-caption-12 justify-between">
            {
              isFreeBet ? (
                <div className="flex items-center text-accent-green">
                  <Icon className="size-4" name="interface/gift" />
                  <Message className="font-semibold uppercase ml-1" value={messages.freebet} />
                </div>
              ) : (
                <Message className="text-grey-60" value={messages.betAmount} />
              )
            }
            <span className="text-caption-13 font-semibold">{amount} {betToken.symbol}</span>
          </div>
          <div className="flex items-center text-caption-12 justify-between">
            <Message className="text-grey-60" value={messages.totalOdds} />
            <span className="text-caption-13 font-semibold">{totalOdds}</span>
          </div>
          <div className="flex items-center text-caption-12 justify-between">
            <Message className="text-grey-60" value={messages.possibleWin} />
            <span className="text-caption-13 font-semibold text-brand-50">
              {toLocaleString(possibleWin, { digits: 2 })} {betToken.symbol}
            </span>
          </div>
          <Button
            className="mt-2 w-full"
            style="tertiary"
            title={
              Boolean(!isCashoutAvailable || isCashoutFetching) ? messages.cashout : (
                {
                  ...messages.cashoutReady,
                  values: {
                    amount: cashoutAmount,
                    symbol: betToken.symbol,
                  },
                }
              )
            }
            size={32}
            loading={isCashoutFetching}
            disabled={!isCashoutAvailable}
            onClick={() => openModal('CashoutModal', { bet })}
          />
        </div>
      </div>
    </PlainModal>
  )
}

declare global {
  interface ModalsRegistry extends ExtendModalsRegistry<{ BetDetailsModal: typeof BetDetailsModal }> {}
}

export default standaloneModal('BetDetailsModal', BetDetailsModal)
