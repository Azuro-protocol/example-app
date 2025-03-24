'use client'

import React from 'react'
import cx from 'classnames'
import { type GameQuery, type Market as TMarket } from '@azuro-org/toolkit'

import OutcomeButton from 'compositions/OutcomeButton/OutcomeButton'


type ButtonsProps = {
  marketName: string
  rows: TMarket['outcomeRows']
  game: NonNullable<GameQuery['game']>
}

const Buttons: React.FC<ButtonsProps> = ({ marketName, rows, game }) => {
  return (
    <div className="w-full">
      {
        rows.map((outcomes, index) => (
          <div key={index} className={cx('grid gap-x-2 gap-y-3 w-full mt-2 first-of-type:mt-0', outcomes?.length === 3 ? 'grid-cols-3' : 'grid-cols-2')}>
            {
              outcomes.map(outcome => (
                <OutcomeButton
                  key={`${outcome.conditionId}-${outcome.outcomeId}`}
                  marketName={marketName}
                  outcome={outcome}
                  game={game}
                />
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

export const MarketSkeleton: React.FC = () => {
  return (
    <div className="w-full mt-2 first-of-type:mt-0">
      <div className="bone w-[110px] h-[0.875rem] ds:mx-auto !block rounded-md mb-[0.375rem]" />
      <div className="grid gap-x-2 gap-y-3 grid-cols-2 w-full">
        <div className="bone w-full h-7 rounded-min" />
        <div className="bone w-full h-7 rounded-min" />
      </div>
    </div>
  )
}

export type MarketProps = {
  market: TMarket
  game: NonNullable<GameQuery['game']>
}

const Market: React.FC<MarketProps> = ({ market, game }) => {
  const { name, outcomeRows } = market

  return (
    <div className="w-full mt-2 first-of-type:mt-0">
      <div className="mb-[0.375rem] mt-auto text-caption-12 font-medium text-grey-60 ds:text-center">
        {name}
      </div>
      <Buttons marketName={name} rows={outcomeRows} game={game} />
    </div>
  )
}

export default Market
