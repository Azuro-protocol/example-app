import { BetType } from '@azuro-org/sdk'


export default {
  single: {
    en: 'Single',
  },
  combo: {
    en: 'Combo',
  },
  live: {
    en: 'LIVE BET',
  },
  unique: {
    en: 'Unique Events',
  },
  market: {
    en: 'Market',
  },
  outcome: {
    en: 'Outcome',
  },
  odds: {
    en: 'Odds',
  },
  betAmount: {
    en: 'Bet amount:',
  },
  possibleWin: {
    en: 'Possible win:',
  },
  freebet: {
    en: 'Freebet',
  },
  winning: {
    en: 'Winning:',
  },
  loss: {
    en: 'Loss:',
  },
  redeem: {
    en: 'Redeem',
  },
  refund: {
    en: 'Refund',
  },
  gameStatus: {
    declined: {
      en: 'Declined',
    },
    win: {
      en: 'Won',
    },
    lose: {
      en: 'Lost',
    },
    live: {
      en: 'Live\’',
    },
  },
  empty: {
    title: {
      en: 'No bets to be displayed',
    },
    text: {
      en: 'You have not placed any bets yet. Place your first bet and it will appear here.',
    },
  },
  cashout: {
    en: 'cash-out ≈{amount} {symbol}',
  },
  tabs: {
    all: {
      en: 'All',
    },
    [BetType.Unredeemed]: {
      en: 'Unredeemed',
    },
    [BetType.Accepted]: {
      en: 'Accepted',
    },
    [BetType.CashedOut]: {
      en: 'Cached-Out',
    },
    [BetType.Settled]: {
      en: 'Settled',
    },
  },
}
