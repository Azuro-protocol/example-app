import { useLiveBets, usePrematchBets, type BetType } from '@azuro-org/sdk'
import { OrderDirection } from '@azuro-org/toolkit'
import { useMemo } from 'react'
import { useAccount } from '@azuro-org/sdk-social-aa-connector'


const useBets = (type: BetType | undefined) => {
  const { address } = useAccount()

  const props = {
    filter: {
      bettor: address!,
      type,
    },
    orderDir: OrderDirection.Desc,
  }

  const { loading: isPrematchLoading, bets: prematchBets } = usePrematchBets(props)
  const { loading: isLiveLoading, bets: liveBets } = useLiveBets(props)

  const bets = useMemo(() => {
    return [ ...liveBets, ...prematchBets ]
  }, [ prematchBets, liveBets ])

  return {
    bets,
    loading: isPrematchLoading || isLiveLoading,
  }
}

export default useBets
