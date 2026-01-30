'use client'

import React, { useState } from 'react'
import { Message } from '@locmod/intl'
import cx from 'classnames'

import Betslip from 'compositions/Betslip/Betslip'
import AcceptedBets from 'compositions/AcceptedBets/AcceptedBets'

import messages from './messages'


const tabs = [ 'betslip', 'myBets' ] as const

const TabbedBetslip: React.FC = () => {
  const [ activeTab, setActiveTab ] = useState<typeof tabs[number]>('betslip')

  return (
    <>
      <div className="bg-bg-l0 rounded-md border border-tech-cyan/20 p-1 flex items-center">
        {
          tabs.map(tab => {
            const isActive = activeTab === tab

            return (
              <button
                key={tab}
                className={
                  cx('w-full p-2 text-center rounded-sm transition', {
                    'text-grey-60 hover:text-tech-cyan': !isActive,
                    'text-tech-cyan bg-tech-cyan-10': isActive,
                  })
                }
                onClick={() => setActiveTab(tab)}
              >
                <Message value={messages[tab]} />
              </button>
            )
          })
        }
      </div>
      {
        activeTab === 'betslip' && (
          <Betslip />
        )
      }
      {
        activeTab === 'myBets' && (
          <AcceptedBets />
        )
      }
    </>
  )
}

export default TabbedBetslip
