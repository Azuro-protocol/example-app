import React from 'react'
import { useBaseBetslip, useDetailedBetslip } from '@azuro-org/sdk'
import { Message } from '@locmod/intl'

import { Icon } from 'components/ui'
import messages from './messages'
import { Card } from './components'


const EmptyContent: React.FC = () => {
  return (
    <div className="max-w-64 text-center mx-auto mt-6">
      <img className="size-16 mx-auto" src="/images/illustrations/betslip.png" alt="" />
      <Message className="text-heading-h5 font-bold mt-4" value={messages.empty.title} tag="p" />
      <Message className="text-caption-13 mt-2 text-grey-60" value={messages.empty.text} tag="p" />
    </div>
  )
}

const Betslip: React.FC = () => {
  const { items, clear } = useBaseBetslip()
  const { odds, statuses, isOddsFetching, isStatusesFetching, isBatch } = useDetailedBetslip()

  if (!items.length) {
    return (
      <EmptyContent />
    )
  }

  let title = messages.single

  if ( items.length > 1 ) {
    title = isBatch ? messages.batch : messages.combo
  }

  return (
    <div>
      <div className="py-3 px-4 flex items-center justify-between">
        <Message className="text-caption-14 font-semibold" value={title} />
        <button className="text-grey-60 hover:text-grey-90 transition" onClick={clear}>
          <Icon className="size-5" name="interface/delete" />
        </button>
      </div>
      <div className="space-y-2">
        {
          items.map((item) => {
            const { conditionId, outcomeId, coreAddress } = item

            return (
              <Card
                key={`${conditionId}-${outcomeId}-${coreAddress}`}
                item={item}
                status={statuses[conditionId]}
                odds={odds?.[`${conditionId}-${outcomeId}`]}
                isStatusesFetching={isStatusesFetching}
                isOddsFetching={isOddsFetching}
              />
            )
          })
        }
      </div>
      <div className="bg-bg-l2 p-3" />
    </div>
  )
}

export default Betslip
