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
    [BetslipDisableReason.ComboWithLive]: {
      en: 'Live outcome can\'t be used in combo',
    },
    [BetslipDisableReason.ConditionStatus]: {
      en: 'One or more outcomes have been removed or suspended. Review your betslip and remove them.',
    },
    [BetslipDisableReason.PrematchConditionInStartedGame]: {
      en: 'Game has started',
    },
    [BetslipDisableReason.ComboWithSameGame]: {
      en: 'Combo with outcomes from same game prohibited, please use Batch bet',
    },
    [BetslipDisableReason.BatchWithLive]: {
      en: 'Live outcome can\'t be used in batch',
    },
    [BetslipDisableReason.FreeBetWithLive]: {
      en: 'FreeBet can\'t be used for live',
    },
    [BetslipDisableReason.FreeBetWithCombo]: {
      en: 'FreeBet can\'t be used for combo',
    },
    [BetslipDisableReason.FreeBetWithBatch]: {
      en: 'FreeBet can\'t be used for batch',
    },
    [BetslipDisableReason.FreeBetExpired]: {
      en: 'FreeBet is expired',
    },
    [BetslipDisableReason.FreeBetMinOdds]: {
      en: 'Odds\'s too low for FreeBet',
    },
  },
}
