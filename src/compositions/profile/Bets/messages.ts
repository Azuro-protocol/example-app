import { BetType } from '@azuro-org/sdk'


export default {
  single: { en: 'Single', zh: '单注' },
  combo: { en: 'Combo', zh: '串关' },
  live: { en: 'LIVE BET', zh: '滚球投注' },
  unique: { en: 'Unique Events', zh: '特色赛事' },
  market: { en: 'Market', zh: '盘口' },
  outcome: { en: 'Outcome', zh: '选项' },
  odds: { en: 'Odds', zh: '赔率' },
  betAmount: { en: 'Bet amount:', zh: '投注金额：' },
  possibleWin: { en: 'Possible win:', zh: '预计赢额：' },
  freebet: { en: 'Freebet', zh: '免费投注' },
  winning: { en: 'Winning:', zh: '赢额：' },
  cashedOut: { en: 'Cash-Out Amount:', zh: '兑现金额：' },
  loss: { en: 'Loss:', zh: '输：' },
  redeem: { en: 'Redeem', zh: '领取' },
  refund: { en: 'Refund', zh: '退款' },
  gameState: {
    stopped: { en: 'Stopped', zh: '已停止' },
    win: { en: 'Won', zh: '赢' },
    lose: { en: 'Lost', zh: '输' },
    live: { en: "Live'", zh: '滚球' },
  },
  empty: {
    title: { en: 'No bets to be displayed', zh: '暂无投注' },
    text: {
      en: 'You have not placed any bets yet. Place your first bet and it will appear here.',
      zh: '您尚未进行任何投注，完成首笔投注后将显示在此。',
    },
  },
  cashout: {
    en: 'cash-out ≈{amount} {symbol}',
    zh: '兑现 ≈{amount} {symbol}',
  },
  tabs: {
    all: { en: 'All', zh: '全部' },
    [BetType.Unredeemed]: { en: 'Unredeemed', zh: '待领取' },
    [BetType.Accepted]: { en: 'Accepted', zh: '已接受' },
    [BetType.CashedOut]: { en: 'Cashed-Out', zh: '已兑现' },
    [BetType.Settled]: { en: 'Settled', zh: '已结算' },
  },
}
