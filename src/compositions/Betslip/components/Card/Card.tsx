'use client'

import React, { useRef } from 'react'
import { useBaseBetslip, useChain, type BetslipItem } from '@azuro-org/sdk'
import { ConditionStatus } from '@azuro-org/toolkit'
import cx from 'classnames'
import { Message } from '@locmod/intl'
import { formatToFixed } from 'helpers/formatters'

import useOddsChange from 'src/hooks/useOddsChange'
import { Icon, LiveDot, type IconName } from 'components/ui'
import messages from './messages'


type ItemProps = {
  item: BetslipItem
  status: ConditionStatus
  odds: number
  isStatusesFetching: boolean
  isOddsFetching: boolean
}

const Card: React.FC<ItemProps> = (props) => {
  const { item, odds, status, isOddsFetching, isStatusesFetching } = props
  const { marketName, selectionName, coreAddress, game: { sportSlug, countryName, leagueName, title } } = item

  const { contracts } = useChain()
  const { removeItem } = useBaseBetslip()
  const nodeRef = useRef<HTMLDivElement>(null)
  useOddsChange({ odds, nodeRef })

  const isDisabled = !isStatusesFetching && status !== ConditionStatus.Created
  const isLive = contracts.liveCore && coreAddress === contracts.liveCore.address

  const bottomBoxClassName = cx(
    'px-4 py-2 flex items-center justify-between mt-px',
    'group-[.increased]/card:bg-betslip-item-bg-inc',
    'group-[.decreased]/card:bg-betslip-item-bg-dec',
    {
      'bg-betslip-item-bg': !isDisabled,
      'bg-bg-l2': isDisabled,
    }
  )
  const oddsClassName = cx(
    'h-5 flex items-center px-[0.375rem] bg-brand-5 border',
    'border-brand-10 rounded-3 text-brand-50 text-caption-12',
    'group-[.increased]/card:bg-accent-green-5 group-[.increased]/card:border-accent-green-10 group-[.increased]/card:text-accent-green',
    'group-[.decreased]/card:bg-accent-red-5 group-[.decreased]/card:border-accent-red-10 group-[.decreased]/card:text-accent-red'
  )

  return (
    <div ref={nodeRef} className="group/card rounded-4 overflow-hidden">
      <div className="bg-bg-l2 py-2 px-4">
        <div className="flex items-center justify-between">
          <div
            className={
              cx('flex items-center text-caption-12 max-w-[90%]', { 'text-grey-20': isDisabled, 'text-grey-60': !isDisabled })
            }
          >
            <Icon className="size-4 mr-1 flex-none" name={`sport/${sportSlug}` as IconName} />
            <div className="whitespace-nowrap">{countryName}</div>
            <div className="size-1 rounded-full bg-grey-20 mx-1" />
            <div className="text-ellipsis whitespace-nowrap overflow-hidden">{leagueName}</div>
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
            <div className="bg-accent-yellow-10 p-2 flex items-center text-accent-yellow w-full rounded-sm">
              <Icon className="size-4 mr-2" name="interface/warning" />
              <Message className="text-caption-13 font-medium" value={messages.locked} />
            </div>
          ) : (
            <>
              <div className="text-caption-12">
                <span className="text-grey-60 mr-1">{marketName}:</span>
                <span>{selectionName}</span>
              </div>
              {
                isOddsFetching ? (
                  <Icon className="size-5" name="interface/spinner" />
                ) : (
                  <div className={oddsClassName}>
                    {formatToFixed(odds || 0, 2)}
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
