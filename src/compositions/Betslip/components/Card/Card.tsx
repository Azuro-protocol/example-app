import React from 'react'
import { useBaseBetslip, type BetslipItem } from '@azuro-org/sdk'
import { ConditionStatus } from '@azuro-org/toolkit'
import { formatToFixed } from 'helpers/formatters'

import { Icon, type IconName } from 'components/ui'


type ItemProps = {
  item: BetslipItem
  status: ConditionStatus
  odds: number
  isStatusesFetching: boolean
  isOddsFetching: boolean
}

const Card: React.FC<ItemProps> = (props) => {
  const { item, odds, status, isOddsFetching, isStatusesFetching } = props
  const { marketName, selectionName, game: { sportSlug, countryName, leagueName, title } } = item

  const { removeItem } = useBaseBetslip()

  const isDisabled = !isStatusesFetching && status !== ConditionStatus.Created

  return (
    <div className="rounded-4 overflow-hidden">
      <div className="bg-bg-l2 py-2 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-caption-12 text-grey-60 max-w-[90%]">
            <Icon className="size-4 mr-1 flex-none" name={`sport/${sportSlug}` as IconName} />
            <div className="whitespace-nowrap">{countryName}</div>
            <div className="size-1 rounded-full bg-grey-20 mx-1" />
            <div className="text-ellipsis whitespace-nowrap overflow-hidden">{leagueName}</div>
          </div>
          <button className="text-grey-60 hover:text-grey-90 transition ml-2 p-1" onClick={() => removeItem(item)}>
            <Icon className="size-3" name="interface/close" />
          </button>
        </div>
        <div className="mt-2 text-caption-13 font-semibold">{title}</div>
      </div>
      <div className="bg-betslip-item-bg px-4 py-2 flex items-center justify-between mt-px">
        <div className="text-caption-12">
          <span className="text-grey-60 mr-1">{marketName}:</span>
          <span>{selectionName}</span>
        </div>
        {
          isOddsFetching ? (
            <Icon className="size-5" name="interface/spinner" />
          ) : (
            <div className="h-5 flex items-center px-[0.375rem] bg-brand-5 border border-brand-10 rounded-3 text-brand-50 text-caption-12">
              {formatToFixed(odds || 0, 2)}
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Card
