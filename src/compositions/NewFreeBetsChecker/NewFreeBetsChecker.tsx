import type React from 'react'
import { useEffect } from 'react'
import { openModal } from '@locmod/modal'
import localStorage from '@locmod/local-storage'
import { useDetailedBetslip } from '@azuro-org/sdk'


const NewFreeBetsChecker: React.FC = () => {
  const { freeBets } = useDetailedBetslip()

  useEffect(() => {
    if (freeBets?.length) {
      freeBets?.reduce((promise, freeBet) => {
        const uniqueId = `${freeBet.contractAddress}_${freeBet.id}`
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
                freeBet,
                onClose: () => {
                  resolve()
                  localStorage.setItem(storageName, true)
                },
              })
            })
          ))
      }, Promise.resolve())
    }
  }, [ freeBets ])

  return null
}


export default NewFreeBetsChecker
