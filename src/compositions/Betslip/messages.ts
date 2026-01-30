import { BetslipDisableReason } from '@azuro-org/sdk'


export default {
  empty: {
    title: {
      en: 'Betslip is empty',
      zh: '投注单为空',
    },
    text: {
      en: 'To add a bet to your betslip, choose a market and make your selection',
      zh: '选择市场和选项即可将投注加入投注单',
    },
  },
  settings: {
    en: 'Settings',
    zh: '设置',
  },
  single: {
    en: 'Single bet',
    zh: '单注',
  },
  batch: {
    en: 'Single bets ({count})',
    zh: '单注（{count}）',
  },
  combo: {
    en: 'Combo ({count})',
    zh: '串关（{count}）',
  },
  betAmount: {
    en: 'Bet amount',
    zh: '投注金额',
  },
  totalBet: {
    en: 'Total bet',
    zh: '总投注',
  },
  warnings: {
    [BetslipDisableReason.ComboWithForbiddenItem]: {
      en: 'One or more conditions can\'t be used in combo',
      zh: '一个或多个选项不能用于串关',
    },
    [BetslipDisableReason.BetAmountGreaterThanMaxBet]: {
      en: 'The maximum allowable bet amount is capped at {maxBet} {symbol}.',
      zh: '单笔投注上限为 {maxBet} {symbol}。',
    },
    [BetslipDisableReason.BetAmountLowerThanMinBet]: {
      en: 'The minimum allowable bet amount is capped at {minBet} {symbol}.',
      zh: '单笔投注下限为 {minBet} {symbol}。',
    },
    [BetslipDisableReason.SelectedOutcomesTemporarySuspended]: {
      en: 'Betting on this odd is temporary suspended',
      zh: '该赔率暂不可投注',
    },
    [BetslipDisableReason.ConditionState]: {
      en: 'One or more outcomes have been removed or suspended. Review your betslip and remove them.',
      zh: '部分选项已移除或暂停，请检查投注单并移除。',
    },
    [BetslipDisableReason.ComboWithSameGame]: {
      en: 'Combo with outcomes from same game prohibited, please use Batch bet',
      zh: '同一场比赛的选项不能串关，请使用单注。',
    },
    [BetslipDisableReason.FreeBetExpired]: {
      en: 'FreeBet is expired',
      zh: '免费投注已过期',
    },
  },
}
