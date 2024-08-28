'use client'

import React from 'react'

import { openModal } from '@locmod/modal'
import { useAccount } from 'wagmi'

import { Button, buttonMessages } from 'components/inputs'
import TabbedBetslip from 'compositions/TabbedBetslip/TabbedBetslip'

import Controls from '../Controls/Controls'


const RightSidebar: React.FC = () => {
  const { address } = useAccount()

  return (
    <>
      <div className="px-6 py-3 sticky top-0 z-20">
        {
          Boolean(address) ? (
            <Controls className="ml-auto" />
          ) : (
            <Button
              className="ml-auto"
              title={buttonMessages.connectWallet}
              size={40}
              onClick={() => openModal('ConnectModal')}
            />
          )
        }
      </div>
      <div className="bg-bg-l1 border border-grey-10 rounded-r-md -ml-px overflow-auto wd:h-[calc(100vh_-_4.5rem)] no-scrollbar px-2 pt-1">
        <TabbedBetslip />
      </div>
    </>
  )
}

export default RightSidebar
