'use client'

import React, { useMemo } from 'react'
import { useOddsView } from 'contexts'


type OddsValueProps = {
  className?: string
  odds: string | number
}

const OddsValue: React.FC<OddsValueProps> = ({ className, odds }) => {
  const { oddsView, formatViewValue } = useOddsView()

  const formattedValue = useMemo(() => {
    if (!odds) {
      return '--'
    }

    return formatViewValue(odds)
  }, [ oddsView, odds ])

  return (
    <div className={className}>
      { formattedValue }
    </div>
  )
}

export default OddsValue
