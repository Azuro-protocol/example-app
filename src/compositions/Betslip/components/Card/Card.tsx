'use client'

import React, { useRef } from 'react'
import { useBaseBetslip, useChain, type BetslipItem } from '@azuro-org/sdk'
import { ConditionStatus, liveHostAddress } from '@azuro-org/toolkit'
import cx from 'classnames'
import { Message } from '@locmod/intl'
import { constants } from 'helpers'

import { formatToFixed } from 'helpers/formatters'
import useOddsChange from 'src/hooks/useOddsChange'
import { Input } from 'components/inputs'
import { Icon, LiveDot, type IconName } from 'components/ui'
import OddsValue from 'compositions/OddsValue/OddsValue'
import Warning from '../Warning/Warning'

import messages from './messages'


type ItemProps = {
  item: BetslipItem
  batchBetAmount: string
  status: ConditionStatus
  odds: number
  isStatusesFetching: boolean
  isOddsFetching: boolean
  isBatch: boolean
  onBatchAmountChange: (value: string) => void
}

const Card: React.FC<ItemProps> = (props) => {
  const { item, batchBetAmount, odds, status, isOddsFetching, isStatusesFetching, isBatch, onBatchAmountChange } = props
  const { marketName, selectionName, coreAddress, game: { sportSlug, countryName, leagueName, title } } = item

  const { appChain, betToken } = useChain()
  const { removeItem } = useBaseBetslip()
  const nodeRef = useRef<HTMLDivElement>(null)
  useOddsChange({ odds, nodeRef })
  const oddsRef = useRef(odds)

  if (!isOddsFetching) {
    oddsRef.current = odds
  }

  const isDisabled = !isStatusesFetching && status !== ConditionStatus.Created
  const isLive = coreAddress === liveHostAddress
  const isUnique = sportSlug === 'unique'

  const bottomBoxClassName = cx(
    'px-4 py-2 mt-px',
    'group-[.increased]/card:bg-betslip-item-bg-inc',
    'group-[.decreased]/card:bg-betslip-item-bg-dec',
    {
      'bg-betslip-item-bg': !isDisabled,
      'bg-bg-l2': isDisabled,
    }
  )
  const oddsClassName = cx(
    'h-5 flex items-center px-[0.375rem] bg-brand-5 border',
    'border-brand-10 rounded-sm text-brand-50 text-caption-12',
    'group-[.increased]/card:bg-accent-green-5 group-[.increased]/card:border-accent-green-10 group-[.increased]/card:text-accent-green',
    'group-[.decreased]/card:bg-accent-red-5 group-[.decreased]/card:border-accent-red-10 group-[.decreased]/card:text-accent-red'
  )

  return (
    <div ref={nodeRef} className="group/card rounded-md overflow-hidden">
      <div className="bg-bg-l2 py-2 px-4">
        <div className="flex items-center justify-between">
          <div
            className={
              cx('flex items-center text-caption-12 max-w-[90%]', { 'text-grey-20': isDisabled, 'text-grey-60': !isDisabled })
            }
          >
            <Icon className="size-4 mr-1 flex-none" name={`sport/${sportSlug}` as IconName} />
            {
              isUnique ? (
                <div className="text-ellipsis whitespace-nowrap overflow-hidden">{marketName}</div>
              ) : (
                <>
                  <div className="whitespace-nowrap">{countryName}</div>
                  <div className="size-1 rounded-full bg-grey-20 mx-1" />
                  <div className="text-ellipsis whitespace-nowrap overflow-hidden">{leagueName}</div>
                </>
              )
            }
          </div>
          <button className="text-grey-60 hover:text-grey-90 transition ml-2 p-1" onClick={() => removeItem(item)}>
            <Icon className="size-3" name="interface/close" />
          </button>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center">
            <div className={cx('text-caption-13 font-semibold mr-1', { 'text-grey-20': isDisabled })}>{title}</div>
            {
              isLive && (
                <LiveDot />
              )
            }
          </div>
          {
            isDisabled && (
              <Icon className="text-grey-60 size-4" name="interface/lock" />
            )
          }
        </div>
      </div>
      <div className={bottomBoxClassName}>
        {
          isDisabled ? (
            <Warning text={messages.locked} />
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div className="text-caption-12">
                  {
                    !isUnique && (
                      <span className="text-grey-60 mr-1">{marketName}:</span>
                    )
                  }
                  <span>{selectionName}</span>
                </div>
                {
                  isOddsFetching ? (
                    <Icon className="size-5" name="interface/spinner" />
                  ) : (
                    <OddsValue className={oddsClassName} odds={odds} />
                  )
                }
              </div>
              {
                isBatch && (
                  <div className="flex items-center mt-2">
                    <Input
                      className="bg-grey-15"
                      type="number"
                      value={batchBetAmount}
                      placeholder="0.00"
                      leftNode={<Icon className="size-4 mr-2" name={constants.currencyIcons[appChain.id]} />}
                      onChange={onBatchAmountChange}
                    />
                    <div className="text-right ml-3">
                      <Message className="text-caption-12 text-grey-60 w-max" value={messages.possibleWin} tag="p" />
                      <div className="text-caption-13 text-brand-50 font-semibold mt-0.5 w-max text-right ml-auto">
                        {formatToFixed(oddsRef.current * +batchBetAmount, 2)} {betToken.symbol}
                      </div>
                    </div>
                  </div>
                )
              }
            </>
          )
        }
      </div>
    </div>
  )
}

export default Card
