import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useAccount } from '@azuro-org/sdk-social-aa-connector'
import { BetKind, BetStatusFilter } from '@azuro-org/sdk'
import { betsDateRangePresets, getBetsDateRange, type BetsDateRangePreset, type BetsFilter } from '@azuro-org/toolkit'
import { useMemo } from 'react'
import { type Address } from 'viem'


const isDateRangePreset = (value: string | null): value is BetsDateRangePreset => {
  return betsDateRangePresets.includes(value as BetsDateRangePreset)
}

const isBetKind = (value: string | null): value is BetKind => {
  return value === BetKind.Single || value === BetKind.Combo
}

// `BetStatusFilter.Pending` has no subgraph representation - the bets query applies no narrowing
// for it - so it is not one of this app's tabs and must never be accepted from the URL; an
// unrecognised `?tab=` value (this one included) falls back to "all" below.
const isBetStatus = (value: string | null): value is BetStatusFilter => {
  return value !== BetStatusFilter.Pending && Object.values(BetStatusFilter).includes(value as BetStatusFilter)
}

export type UseBetsFiltersResult = {
  /** ready to hand straight to both `useBets` and `useBetsReport` */
  filter: BetsFilter
  /** `true` once the date range or bet kind narrows past its default */
  hasAdvancedFilters: boolean
  status: BetStatusFilter | undefined
  setStatus: (status: BetStatusFilter | undefined) => void
  range: BetsDateRangePreset
  setRange: (range: BetsDateRangePreset) => void
  kind: BetKind | undefined
  setKind: (kind: BetKind | undefined) => void
  /** resets the date range and bet kind to their defaults, leaving the status tab untouched */
  clearAdvancedFilters: () => void
}

/**
 * Single owner of the My Bets filter state, backed by the URL (`?tab=`, `?range=`, `?kind=`) so
 * back/forward navigation and a reload restore it. Each param is dropped from the URL while it is
 * at its default, keeping the canonical link clean.
 *
 * The returned `filter` is the one object to pass to both `useBets` and `useBetsReport` - handing
 * them the same filter is what guarantees the bet list and the summary above it describe exactly
 * the same bets.
 * */
const useBetsFilters = (): UseBetsFiltersResult => {
  const { address } = useAccount()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const rawStatus = searchParams.get('tab')
  const status = isBetStatus(rawStatus) ? rawStatus : undefined

  const rawRange = searchParams.get('range')
  const range = isDateRangePreset(rawRange) ? rawRange : 'all'

  const rawKind = searchParams.get('kind')
  const kind = isBetKind(rawKind) ? rawKind : undefined

  const setParam = (key: string, value: string | undefined) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set(key, value)
    }
    else {
      params.delete(key)
    }

    router.replace(pathname + '?' + params)
  }

  const setStatus = (nextStatus: BetStatusFilter | undefined) => setParam('tab', nextStatus)
  const setRange = (nextRange: BetsDateRangePreset) => {
    setParam('range', nextRange === 'all' ? undefined : nextRange)
  }
  const setKind = (nextKind: BetKind | undefined) => setParam('kind', nextKind)

  const clearAdvancedFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    params.delete('range')
    params.delete('kind')

    router.replace(pathname + '?' + params)
  }

  const hasAdvancedFilters = range !== 'all' || kind !== undefined

  const filter: BetsFilter = useMemo(() => {
    return {
      bettor: address!,
      affiliate: process.env.NEXT_PUBLIC_AFFILIATE_ADDRESS as Address,
      status,
      kind,
      ...getBetsDateRange(range),
    }
  }, [ address, status, kind, range ])

  return {
    filter,
    hasAdvancedFilters,
    status,
    setStatus,
    range,
    setRange,
    kind,
    setKind,
    clearAdvancedFilters,
  }
}

export default useBetsFilters
