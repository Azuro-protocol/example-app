'use client'

import { useEffect } from 'react'
import { openModal } from '@locmod/modal'
import localStorage from '@locmod/local-storage'
import { useBonuses } from '@azuro-org/sdk'
import { BonusStatus } from '@azuro-org/toolkit'
import { useAccount } from '@azuro-org/sdk-social-aa-connector'
import { type Address } from 'viem'


const NewFreeBetsChecker: React.FC = () => {
  const { address } = useAccount()
  const { data: bonuses } = useBonuses({
    account: address!,
    affiliate: process.env.NEXT_PUBLIC_AFFILIATE_ADDRESS as Address,
    query: {
      enabled: Boolean(address),
    },
  })

  useEffect(() => {
    if (!bonuses?.length) {
      return
    }

    const activeFreebets = bonuses.filter((freebet) => {
      return freebet.status === BonusStatus.Available
    })

    activeFreebets.reduce((promise, freebet) => {
      const uniqueId = freebet.id
      const storageName = `bonus-${uniqueId}`
      const wasShown = localStorage.getItem<boolean>(storageName)

      if (wasShown) {
        return promise
      }

      // as it's possible to have few bonuses, we should show them one-by-one
      return promise
        .then(() => (
          new Promise((resolve) => {
            openModal('NewFreeBetModal', {
              freebet,
              onClose: () => {
                resolve()
                localStorage.setItem(storageName, true)
              },
            })
          })
        ))
    }, Promise.resolve())
  }, [ bonuses ])

  return null
}


export default NewFreeBetsChecker
