'use client'

import React from 'react'
import { useBetsReport } from '@azuro-org/sdk'
import { type BetsFilter, type BetsReportRow } from '@azuro-org/toolkit'
import { Message, type IntlMessage } from '@locmod/intl'
import cx from 'classnames'
import { toLocaleString, shortenAddress } from 'helpers'

import messages from './messages'


// matches how the rest of the bet card renders a bet with no meaningful amount to show
const NO_VALUE = '––'

type StatProps = {
  className?: string
  title: IntlMessage
  value: React.ReactNode
  valueClassName?: string
}

const Stat: React.FC<StatProps> = ({ className, title, value, valueClassName }) => {
  return (
    <div className={cx('w-full py-2 px-3', className)}>
      <Message className="text-label-12 text-grey-60 mb-[2px]" value={title} tag="p" />
      <div className={cx('text-caption-13 font-semibold', valueClassName)}>{value}</div>
    </div>
  )
}

type ReportRowProps = {
  row: BetsReportRow
  /** shown above the strip when the bettor's history spans more than one token */
  withTokenLabel: boolean
}

const ReportRow: React.FC<ReportRowProps> = ({ row, withTokenLabel }) => {
  const { token, turnover, roi, freebet } = row

  const symbol = token.symbol || shortenAddress(token.address)

  let roiValue = NO_VALUE
  let roiClassName: string | undefined

  if (roi !== null) {
    roiValue = `${roi > 0 ? '+' : ''}${toLocaleString(roi, { digits: 2 })}%`

    if (roi > 0) {
      roiClassName = 'text-accent-green'
    }
    else if (roi < 0) {
      roiClassName = 'text-accent-red'
    }
  }

  return (
    <div className="rounded-md bg-bg-l2 border border-grey-20 overflow-hidden">
      {
        withTokenLabel && (
          <div className="px-3 pt-2 text-label-12 text-grey-60 font-semibold">{symbol}</div>
        )
      }
      <div className="flex items-center">
        <Stat
          title={messages.staked}
          value={`${toLocaleString(turnover, { digits: 2 })} ${symbol}`}
        />
        <Stat
          className="border-l border-l-grey-20"
          title={messages.roi}
          value={roiValue}
          valueClassName={roiClassName}
        />
      </div>
      {
        Boolean(freebet.count) && (
          <div
            className="px-3 py-2 border-t border-t-grey-20 flex items-center justify-between text-caption-13"
          >
            <Message
              className="text-grey-70"
              value={{ ...messages.freebets, values: { count: freebet.count } }}
            />
            <span className="font-semibold text-accent-green">
              +{toLocaleString(freebet.returns, { digits: 2 })} {symbol}
            </span>
          </div>
        )
      }
    </div>
  )
}

export type ReportProps = {
  filter: BetsFilter
}

// exact over every matching bet, not only the pages the list below has loaded - see useBetsReport
const Report: React.FC<ReportProps> = ({ filter }) => {
  const { data: report, isLoading } = useBetsReport({ filter })

  if (isLoading) {
    return (
      <div className="rounded-md bg-bg-l2 border border-grey-20 h-[4.5rem] bone" />
    )
  }

  // nothing matched the current filter - the list below already renders its own empty state
  if (!report?.betsCount) {
    return null
  }

  return (
    <div className="space-y-2">
      <div className="rounded-md bg-bg-l2 border border-grey-20 overflow-hidden">
        {/*
          `report.betsCount` is the only count that includes freebet-funded bets, so it is the one
          figure that matches the list rendered below. It is rendered once here, per report, rather
          than inside `ReportRow`, whose own `betsCount` deliberately excludes freebets and is
          per-token besides.
        */}
        <Stat title={messages.betsCount} value={report.betsCount} />
      </div>
      {
        report.single ? (
          <ReportRow row={report.single} withTokenLabel={false} />
        ) : (
          report.byToken.map((row) => (
            <ReportRow key={row.token.address} row={row} withTokenLabel />
          ))
        )
      }
      {
        report.isTruncated && (
          <Message className="text-label-12 text-accent-yellow px-1" value={messages.truncated} />
        )
      }
      <Message className="text-label-12 text-grey-60 px-1" value={messages.excludesLegacy} />
    </div>
  )
}

export default Report
