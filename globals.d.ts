import { type GameQuery } from '@azuro-org/toolkit'


declare global {
  declare const __SERVER__: boolean
  declare const __CLIENT__: boolean

  namespace AzuroSDK {
    interface BetslipItem {
      marketName: string
      selectionName: string
      game: NonNullable<GameQuery['game']>
    }
  }
}

export {}
