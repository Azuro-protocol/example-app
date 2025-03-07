'use client'

import React from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { useWallet } from 'wallet'

import { Button, buttonMessages } from 'components/inputs'
import TabbedBetslip from 'compositions/TabbedBetslip/TabbedBetslip'
import LiveStatistics from 'compositions/LiveStatistics/LiveStatistics'

import Controls from '../Controls/Controls'


const RightSidebar: React.FC = () => {
  const { account, isReconnecting, isConnecting } = useWallet()
  const { login } = usePrivy()

  return (
    <>
      <div className="px-6 py-3 sticky top-0 z-20">
        {
          Boolean(account) ? (
            <Controls className="ml-auto" />
          ) : (
            <Button
              className="ml-auto"
              title={buttonMessages.connectWallet}
              size={40}
              loading={isConnecting || isReconnecting}
              onClick={login}
            />
          )
        }
      </div>
      <div
        className="bg-bg-l1 border border-grey-10 rounded-r-md -ml-px overflow-auto wd:h-[calc(100vh_-_4.5rem)] no-scrollbar p-2 space-y-2"
      >
        <LiveStatistics withBottomLine />
        <TabbedBetslip />
      </div>
    </>
  )
}

export default RightSidebar
