import { BetslipDisableReason } from '@azuro-org/sdk'


export default {
  empty: {
    title: {
      en: 'Betslip is empty',
    },
    text: {
      en: 'To add a bet to your betslip, choose a market and make your selection',
    },
  },
  settings: {
    en: 'Settings',
  },
  single: {
    en: 'Single bet',
  },
  batch: {
    en: 'Single bets ({count})',
  },
  combo: {
    en: 'Combo ({count})',
  },
  betAmount: {
    en: 'Bet amount',
  },
  totalBet: {
    en: 'Total bet',
  },
  warnings: {
    [BetslipDisableReason.ComboWithForbiddenItem]: {
      en: 'One or more conditions can\'t be used in combo',
    },
    [BetslipDisableReason.BetAmountGreaterThanMaxBet]: {
      en: 'The maximum allowable bet amount is capped at {maxBet} {symbol}.',
    },
    [BetslipDisableReason.BetAmountLowerThanMinBet]: {
      en: 'The minimum allowable bet amount is capped at {minBet} {symbol}.',
    },
    // [BetslipDisableReason.ComboWithLive]: {
    //   en: 'Live outcome can\'t be used in combo',
    // },
    [BetslipDisableReason.SelectedOutcomesTemporarySuspended]: {
      en: 'Betting on this odd is temporary suspended',
    },
    [BetslipDisableReason.ConditionState]: {
      en: 'One or more outcomes have been removed or suspended. Review your betslip and remove them.',
    },
    [BetslipDisableReason.ComboWithSameGame]: {
      en: 'Combo with outcomes from same game prohibited, please use Batch bet',
    },
    // [BetslipDisableReason.BatchWithLive]: {
    //   en: 'Live outcome can\'t be used in batch',
    // },
    [BetslipDisableReason.FreeBetExpired]: {
      en: 'FreeBet is expired',
    },
  },
}
