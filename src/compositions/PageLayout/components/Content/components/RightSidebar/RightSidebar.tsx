'use client'

import React from 'react'

import { openModal } from '@locmod/modal'
import { Button, buttonMessages } from 'components/inputs'


const RightSidebar: React.FC = () => {
  return (
    <>
      <div className="px-6 py-3">
        <Button
          className="ml-auto"
          title={buttonMessages.connectWallet}
          size={40}
          onClick={() => openModal('ConnectModal')}
        />
      </div>
      <div className="bg-bg-l1 border border-grey-10 rounded-r-4 h-full -ml-px">
      1
      </div>
    </>
  )
}

export default RightSidebar
