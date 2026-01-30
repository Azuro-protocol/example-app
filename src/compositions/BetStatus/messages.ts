import { BetStatus } from '@azuro-org/toolkit'


export default {
  [BetStatus.Accepted]: { en: 'Accepted', zh: '已接受' },
  [BetStatus.Canceled]: { en: 'Declined', zh: '已拒绝' },
  [BetStatus.Live]: { en: 'Live', zh: '滚球' },
  [BetStatus.PendingResolution]: { en: 'Pending resolution', zh: '待结算' },
  [BetStatus.Resolved]: { en: 'Resolved', zh: '已结算' },
  win: { en: 'Won', zh: '赢' },
  lose: { en: 'Lost', zh: '输' },
  cashedOut: { en: 'Cashed-Out', zh: '已兑现' },
}
