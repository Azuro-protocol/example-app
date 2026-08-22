'use client'

import React from 'react'
import { Menu } from '@headlessui/react'
import { Message, type IntlMessage } from '@locmod/intl'
import cx from 'classnames'
import { BetKind } from '@azuro-org/sdk'
import { type BetsDateRangePreset } from '@azuro-org/toolkit'

import { Button, Dropdown } from 'components/inputs'
import { Icon } from 'components/ui'

import betsMessages from '../../messages'
import messages from './messages'


type DateRangeOption = {
  preset: BetsDateRangePreset
  title: IntlMessage
}

const dateRangeOptions: DateRangeOption[] = [
  { preset: 'all', title: messages.dateRange.all },
  { preset: 'today', title: messages.dateRange.today },
  { preset: '7d', title: messages.dateRange.last7Days },
  { preset: '30d', title: messages.dateRange.last30Days },
  { preset: 'month', title: messages.dateRange.thisMonth },
  { preset: 'prevMonth', title: messages.dateRange.lastMonth },
]

type DateRangeFilterProps = {
  range: BetsDateRangePreset
  onChange: (range: BetsDateRangePreset) => void
}

// no calendar exists in this app, so the range is picked from a fixed set of presets
const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ range, onChange }) => {
  const activeOption = dateRangeOptions.find(({ preset }) => preset === range) ?? dateRangeOptions[0]!

  return (
    <Dropdown
      buttonClassName="flex items-center text-grey-60 hover:text-grey-90 ui-open:text-grey-90"
      placement="bottomRight"
      content={
        <div className="flex flex-col bg-bg-l3 p-2 rounded-md border border-grey-20 w-40">
          {
            dateRangeOptions.map(({ preset, title }) => {
              const isActive = preset === range

              const className = cx('flex items-center p-1 cursor-pointer w-full text-left', {
                'text-grey-60 hover:text-grey-90': !isActive,
                'text-grey-90': isActive,
              })

              return (
                <Menu.Item key={preset}>
                  <button className={className} onClick={() => onChange(preset)}>
                    <Message className="text-caption-13 font-semibold" value={title} />
                  </button>
                </Menu.Item>
              )
            })
          }
        </div>
      }
    >
      <div className="flex items-center">
        <Message className="text-caption-13 font-semibold mr-1" value={activeOption.title} />
        <Icon className="size-4 ui-open:rotate-180" name="interface/caret_down" />
      </div>
    </Dropdown>
  )
}

type BetKindOption = {
  kind: BetKind | undefined
  title: IntlMessage
}

const betKindOptions: BetKindOption[] = [
  { kind: undefined, title: messages.allKinds },
  { kind: BetKind.Single, title: betsMessages.single },
  { kind: BetKind.Combo, title: betsMessages.combo },
]

type BetKindFilterProps = {
  kind: BetKind | undefined
  onChange: (kind: BetKind | undefined) => void
}

const BetKindFilter: React.FC<BetKindFilterProps> = ({ kind, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      {
        betKindOptions.map(({ kind: value, title }) => {
          const isActive = kind === value

          const className = cx('flex items-center p-1 cursor-pointer', {
            'text-grey-60 hover:text-grey-90': !isActive,
            'text-grey-90': isActive,
          })

          return (
            <button key={value || 'all'} className={className} onClick={() => onChange(value)}>
              <Message className="text-caption-13 font-semibold" value={title} />
            </button>
          )
        })
      }
    </div>
  )
}

export type FiltersProps = {
  range: BetsDateRangePreset
  onRangeChange: (range: BetsDateRangePreset) => void
  kind: BetKind | undefined
  onKindChange: (kind: BetKind | undefined) => void
  /** `true` once the date range or bet kind narrows past its default */
  hasAdvancedFilters: boolean
  onClear: () => void
}

const Filters: React.FC<FiltersProps> = ({ range, onRangeChange, kind, onKindChange, hasAdvancedFilters, onClear }) => {
  return (
    <div className="flex items-center justify-between px-3">
      <BetKindFilter kind={kind} onChange={onKindChange} />
      <div className="flex items-center space-x-2">
        <DateRangeFilter range={range} onChange={onRangeChange} />
        {
          hasAdvancedFilters && (
            <Button title={messages.clear} size={32} style="tertiary" onClick={onClear} />
          )
        }
      </div>
    </div>
  )
}

export default Filters
