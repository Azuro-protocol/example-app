'use client'

import React, { useState } from 'react'
import { useBaseBetslip, useBetTokenBalance, useChain, useDetailedBetslip } from '@azuro-org/sdk'
import { Message } from '@locmod/intl'
import cx from 'classnames'

import { Icon } from 'components/ui'
import messages from './messages'
import { AmountInput, BetButton, Card, Chips, FreeBet, Warning, Slippage, QuickBet } from './components'


const EmptyContent: React.FC = () => {
  return (
    <div className="max-w-64 text-center mx-auto mt-6">
      <img className="size-16 mx-auto" src="/images/illustrations/betslip.png" alt="" />
      <Message className="text-heading-h5 font-bold mt-4" value={messages.empty.title} tag="p" />
      <Message className="text-caption-13 mt-2 text-grey-60" value={messages.empty.text} tag="p" />
    </div>
  )
}

type SettingsProps = {
  onClose: () => void
}

const Settings: React.FC<SettingsProps> = ({ onClose }) => {
  return (
    <div>
      <div className="py-3 px-4 flex items-center justify-between">
        <Message className="text-caption-14 font-semibold" value={messages.settings} />
        <button className="text-grey-60 hover:text-grey-90 transition" onClick={onClose}>
          <Icon className="size-5" name="interface/close" />
        </button>
      </div>
      <div className="space-y-2">
        <Slippage />
        <QuickBet />
      </div>
    </div>
  )
}

type TabProps = {
  title: Intl.Message
  isActive: boolean
  onClick: () => void
}

const Tab: React.FC<TabProps> = ({ title, isActive, onClick }) => {
  return (
    <button className={cx('pb-3 relative', { 'text-brand-50': isActive })} onClick={onClick}>
      <Message className="text-caption-14 font-semibold" value={title} />
      {
        isActive && (
          <div className="absolute w-full bottom-0 left-0 h-0.5 bg-brand-50 rounded-t-full" />
        )
      }
    </button>
  )
}

type ContentProps = {
  openSettings: () => void
}

const Content: React.FC<ContentProps> = ({ openSettings }) => {
  const { betToken } = useChain()
  const { items, clear } = useBaseBetslip()
  const {
    odds, statuses, minBet, maxBet, disableReason, selectedFreeBet, betAmount, batchBetAmounts,
    isOddsFetching, isStatusesFetching, isBatch, changeBatch, changeBatchBetAmount,
  } = useDetailedBetslip()
  const { balance, loading: isBalanceFetching } = useBetTokenBalance()

  console.log(statuses, 'statuses')

  const itemsLength = items.length
  const isSingle = itemsLength === 1

  const isEnoughBalance = isBalanceFetching || !Boolean(+betAmount) ? true : Boolean(+balance! > +betAmount)

  return (
    <div>
      <div
        className={
          cx('px-4 flex justify-between', {
            'py-3': isSingle,
            'pt-3': !isSingle,
          })
        }
      >
        {
          isSingle ? (
            <button className="cursor-default">
              <Message className="text-caption-14 font-semibold" value={messages.single} />
            </button>
          ) : (
            <div className="flex items-center space-x-4">
              <Tab
                title={{ ...messages.batch, values: { count: itemsLength } }}
                isActive={isBatch}
                onClick={() => changeBatch(true)}
              />
              <Tab
                title={{ ...messages.combo, values: { count: itemsLength } }}
                isActive={!isBatch}
                onClick={() => changeBatch(false)}
              />
            </div>
          )
        }
        <div className={cx('flex items-center space-x-3 h-fit', { 'pt-0.5': !isSingle })}>
          <button className="text-grey-60 hover:text-grey-90 transition" onClick={openSettings}>
            <Icon className="size-5" name="interface/settings" />
          </button>
          <button className="text-grey-60 hover:text-grey-90 transition" onClick={clear}>
            <Icon className="size-5" name="interface/delete" />
          </button>
        </div>
      </div>
      <div
        className={
          cx('space-y-2 max-h-[24rem] overflow-auto no-scrollbar', {
            'pb-6': !isSingle,
            'pb-2': isSingle,
          })
        }
      >
        {
          items.map((item) => {
            const { conditionId, outcomeId, coreAddress } = item

            return (
              <Card
                key={`${conditionId}-${outcomeId}-${coreAddress}`}
                item={item}
                batchBetAmount={batchBetAmounts[`${conditionId}-${outcomeId}`]}
                status={statuses[conditionId]}
                odds={odds?.[`${conditionId}-${outcomeId}`]}
                isStatusesFetching={isStatusesFetching}
                isOddsFetching={isOddsFetching}
                isBatch={isBatch}
                onBatchAmountChange={(value) => changeBatchBetAmount(item, value)}
              />
            )
          })
        }
      </div>
      <FreeBet />
      <div
        className={
          cx('bg-bg-l2 p-3 rounded-lg z-10 relative', {
            '-mt-4': !isSingle,
            'shadow-betslip': items.length > 2,
          })
        }
      >
        {
          Boolean(!selectedFreeBet && !isBatch) && (
            <>
              <AmountInput isEnoughBalance={isEnoughBalance} />
              <Chips />
            </>
          )
        }
        {
          Boolean(disableReason) && (
            <Warning
              className="mt-3"
              text={
                { ...messages.warnings[disableReason!],
                  values: { minBet, maxBet, symbol: betToken.symbol },
                }
              }
            />
          )
        }
        {
          isBatch && (
            <div className="flex items-center justify-between mb-3">
              <Message className="text-caption-12 text-grey-60" value={messages.totalBet} />
              <div className="text-caption-13">{betAmount} {betToken.symbol}</div>
            </div>
          )
        }
        <BetButton isEnoughBalance={isEnoughBalance} isBalanceFetching={isBalanceFetching} />
      </div>
    </div>
  )
}

const Betslip: React.FC = () => {
  const { items } = useBaseBetslip()
  const [ isSettingsVisible, setSettingsVisible ] = useState(false)

  if (!items.length) {
    return (
      <EmptyContent />
    )
  }

  return (
    <>
      {
        isSettingsVisible ? (
          <Settings onClose={() => setSettingsVisible(false)} />
        ) : (
          <Content openSettings={() => setSettingsVisible(true)} />
        )
      }
    </>
  )
}

export default Betslip
