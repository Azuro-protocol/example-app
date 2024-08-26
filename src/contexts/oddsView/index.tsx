import React, { createContext, useContext, useState } from 'react'
import localStorage from '@locmod/local-storage'
import { constants } from 'helpers'
import { formatToFixed } from 'helpers/formatters'


export enum OddsView {
  Fractional = 'fractional',
  Decimal = 'decimal',
  Moneyline = 'moneyline',
}

// continued fraction https://en.wikipedia.org/wiki/Continued_fraction
const decimalToFraction = (value) => {
  if (value == parseInt(value)) {
    return `${parseInt(value)}/1`
  }

  const eps = 1.0E-4
  let h, h1, h2, k, k1, k2, a, x

  x = +value - 1
  a = Math.floor(x)
  h1 = 1
  k1 = 0
  h = a
  k = 1

  while (x - a > eps * k * k) {
    x = 1 / (x - a)
    a = Math.floor(x)
    h2 = h1; h1 = h
    k2 = k1; k1 = k
    h = h2 + a * h1
    k = k2 + a * k1
  }

  return h + '/' + k
}

const decimalToAmerican = (value: number) => {
  let multiplier = 100

  if (value < 2) {
    multiplier = -100

    return formatToFixed(multiplier / (value - 1), 0)
  }

  return `+${formatToFixed((value - 1) * multiplier, 0)}`
}

export const oddsViews = {
  [OddsView.Fractional]: 'UK Odds (1/2)',
  [OddsView.Decimal]: 'EU Odds (1.5)',
  [OddsView.Moneyline]: 'US Odds (-200)',
}

const values = Object.keys(oddsViews)

type Context = {
  oddsView: OddsView
  setOddsView: (oddView: OddsView) => void
  formatViewValue: (value: string | number) => string
}

const Context = createContext<Context>(null as any)

export const useOddsView = () => {
  return useContext(Context)
}

export const OddsViewProvider: React.CFC = ({ children }) => {
  let initialValue = localStorage.getItem(constants.localStorageKeys.oddsView) as OddsView

  if (!initialValue || !values.includes(initialValue)) {
    initialValue = OddsView.Decimal
  }

  const [ oddsView, setActiveOddsView ] = useState<OddsView>(initialValue)

  const setOddsView = (value: OddsView) => {
    localStorage.setItem(constants.localStorageKeys.oddsView, value)
    setActiveOddsView(value)
  }

  const formatViewValue = (value: string | number) => {
    if (oddsView === OddsView.Fractional) {
      return decimalToFraction(value)
    }

    if (oddsView === OddsView.Moneyline) {
      return decimalToAmerican(+value).toString()
    }

    return formatToFixed(value, 2).toString()
  }

  const context: Context = {
    oddsView,
    setOddsView,
    formatViewValue,
  }

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  )
}
