'use client'

import React, { useMemo, useState } from 'react'
import { type GameData, type MarketOutcome } from '@azuro-org/toolkit'
import { Combobox, ComboboxInput, ComboboxOptions, ComboboxOption } from '@headlessui/react'
import { useIntl } from '@locmod/intl'

import OutcomeButton from 'compositions/OutcomeButton/OutcomeButton'
import OddsValue from 'compositions/OddsValue/OddsValue'

import PickerPlaceholder from '../PickerPlaceholder/PickerPlaceholder'

import messages from './messages'


type OutcomePickerProps = {
  outcomes: MarketOutcome[]
  marketName: string
  game: GameData
  isConditionLocked: boolean
}

const OutcomePicker: React.FC<OutcomePickerProps> = (props) => {
  const { outcomes, marketName, game, isConditionLocked } = props

  const [ selected, setSelected ] = useState<MarketOutcome | null>(null)
  const [ query, setQuery ] = useState('')

  const intl = useIntl()

  const filteredOutcomes = useMemo(() => {
    if (!query) {
      return outcomes
    }

    return outcomes.filter((outcome) => (
      outcome.selectionName.toLowerCase().includes(query.toLowerCase())
    ))
  }, [ outcomes, query ])

  return (
    <div className="grid gap-2 ds:grid-cols-2 items-end">
      <Combobox
        value={selected}
        onChange={setSelected}
        onClose={() => setQuery('')}
      >
        <div className="relative">
          <ComboboxInput
            className="w-full h-10 px-3 bg-grey-15 rounded-min text-caption-13 text-grey-90 placeholder:text-grey-40 outline-none"
            placeholder={intl.formatMessage(messages.searchPlaceholder)}
            displayValue={(outcome: MarketOutcome | null) => outcome?.selectionName ?? ''}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxOptions className="absolute z-20 mt-1 w-full max-h-60 overflow-auto bg-bg-l3 border border-grey-20 rounded-min">
            {
              filteredOutcomes.map((outcome) => (
                <ComboboxOption
                  key={outcome.outcomeId}
                  value={outcome}
                  className="flex items-center justify-between gap-2 px-3 py-2 cursor-pointer text-caption-13 text-grey-60 data-[focus]:bg-grey-15 data-[focus]:text-grey-90"
                >
                  <span className="truncate">{outcome.selectionName}</span>
                  <OddsValue className="flex-none" odds={outcome.odds} />
                </ComboboxOption>
              ))
            }
          </ComboboxOptions>
        </div>
      </Combobox>
      {
        selected ? (
          <OutcomeButton
            key={selected.outcomeId}
            marketName={marketName}
            outcome={selected}
            game={game}
            isLocked={isConditionLocked}
            size={40}
          />
        ) : (
          <PickerPlaceholder message={messages.selectHint} />
        )
      }
    </div>
  )
}

export default OutcomePicker
