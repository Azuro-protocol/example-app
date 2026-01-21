import { type GameQuery } from '@azuro-org/toolkit'


declare global {
  namespace AzuroSDK {
    interface BetslipItem {
      marketName: string
      selectionName: string
      game: NonNullable<GameQuery['game']>
    }
  }
}

export {}
