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
  win: {
    en: 'Won',
  },
  lose: {
    en: 'Lost',
  },
}
