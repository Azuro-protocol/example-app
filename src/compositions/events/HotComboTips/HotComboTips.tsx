'use client'

import React from 'react'
import { Message } from '@locmod/intl'
import { usePredefinedCombo, useOdds, useBaseBetslip } from '@azuro-org/sdk'
import { type PredefinedComboData } from '@azuro-org/toolkit'
import cx from 'classnames'

import { Button } from 'components/inputs'
import OddsValue from 'compositions/OddsValue/OddsValue'

import messages from './messages'


const ComboCardSkeleton: React.FC = () => {
  return (
    <div className="bone h-48 w-full rounded-md" />
  )
}

type ComboCardProps = {
  combo: PredefinedComboData
}

const ComboCard: React.FC<ComboCardProps> = ({ combo }) => {
  const { addItems } = useBaseBetslip()

  const selections = combo.conditions.map((condition) => ({
    conditionId: condition.conditionId,
    outcomeId: condition.outcome.outcomeId,
  }))

  const { data: { odds, totalOdds }, isFetching: isOddsFetching } = useOdds({ selections })

  const handleAdd = () => {
    const items: AzuroSDK.BetslipItem[] = combo.conditions.map((condition) => ({
      marketName: condition.title ?? condition.outcome.title,
      selectionName: condition.outcome.title,
      game: condition.game as AzuroSDK.BetslipItem['game'],
      conditionId: condition.conditionId,
      outcomeId: condition.outcome.outcomeId,
      gameId: condition.game.gameId,
      isExpressForbidden: condition.isExpressForbidden,
    }))

    addItems(items, true)
  }

  const displayTotalOdds = totalOdds || +combo.totalOdds

  return (
    <div className="bg-grey-10 rounded-md overflow-hidden">
      <div className="p-4 space-y-2">
        {
          combo.conditions.map((condition, idx) => {
            const oddsKey = `${condition.conditionId}-${condition.outcome.outcomeId}`
            const conditionOdds = odds[oddsKey] ?? +condition.outcome.odds

            return (
              <div key={condition.id}>
                {
                  idx > 0 && (
                    <div className="h-px bg-grey-15 mb-2" />
                  )
                }
                <div className="text-caption-12 text-grey-60 text-ellipsis whitespace-nowrap overflow-hidden">
                  {condition.game.title}
                </div>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <div className="text-caption-13 font-medium text-ellipsis whitespace-nowrap overflow-hidden min-w-0">
                    {condition.title ?? condition.outcome.title}
                    {
                      condition.title && (
                        <span className="text-grey-60"> · {condition.outcome.title}</span>
                      )
                    }
                  </div>
                  {
                    isOddsFetching ? (
                      <div className="bone h-5 w-12 rounded-sm flex-none" />
                    ) : (
                      <OddsValue
                        className="flex-none h-5 flex items-center px-1.5 bg-brand-5 border border-brand-10 rounded-sm text-brand-50 text-caption-12"
                        odds={conditionOdds}
                      />
                    )
                  }
                </div>
              </div>
            )
          })
        }
      </div>
      <div className="px-4 pb-4 pt-2 border-t border-grey-15 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-caption-12">
          <Message className="text-grey-60" value={messages.totalOdds} />
          {
            isOddsFetching ? (
              <div className="bone h-5 w-14 rounded-sm" />
            ) : (
              <OddsValue
                className="font-semibold text-brand-50"
                odds={displayTotalOdds}
              />
            )
          }
        </div>
        <Button
          size={32}
          style="primary"
          title={messages.addToBetslip}
          onClick={handleAdd}
        />
      </div>
    </div>
  )
}

const HotComboTips: React.FC = () => {
  const { data: combos, isFetching } = usePredefinedCombo()

  if (!isFetching && !combos?.length) {
    return null
  }

  return (
    <div className="relative pt-6">
      <div className="px-4">
        <h2 className="text-heading-h1 font-bold">
          <Message className="text-brand-50" value={messages.title} />
        </h2>
      </div>
      <div className={cx('grid gap-2 mt-6 px-4', 'ds:grid-cols-2 wd:grid-cols-3')}>
        {
          isFetching ? (
            <>
              <ComboCardSkeleton />
              <ComboCardSkeleton />
              <ComboCardSkeleton />
            </>
          ) : (
            combos!.map((combo, index) => (
              <ComboCard key={index} combo={combo} />
            ))
          )
        }
      </div>
    </div>
  )
}

export default HotComboTips
