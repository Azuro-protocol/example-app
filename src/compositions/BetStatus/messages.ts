import { BetStatus } from '@azuro-org/toolkit'


export default {
  [BetStatus.Accepted]: {
    en: 'Accepted',
  },
  [BetStatus.Canceled]: {
    en: 'Declined',
  },
  [BetStatus.Live]: {
    en: 'Live',
  },
  [BetStatus.PendingResolution]: {
    en: 'Pending resolution',
  },
  [BetStatus.Resolved]: {
    en: 'Resolved',
  },
  [BetStatus.Preparing]: {
    en: 'Preparing',
  },
  win: {
    en: 'Won',
  },
  lose: {
    en: 'Lost',
  },
  cashedOut: {
    en: 'Cashed-Out',
  },
}
