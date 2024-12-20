'use client'

import { Message } from '@locmod/intl'
import Image from 'next/image'
import { useEffect } from 'react'
import { mixpanel } from 'modules/analytics'
import fundingImage from 'public/images/icons/3d/continue_funding_wallet_60.png'

import { Tooltip } from 'components/feedback'

import WithdrawalForm from './components/WithdrawalForm/WithdrawalForm'
import messages from './messages'


type WithdrawViewProps = {
  className?: string
}

const steps = [
  {
    ...messages.steps[0],
    components: {
      Tooltip: ({ text, children }) => (
        <Tooltip placement="top" text={text}>
          <button className="border-b border-dotted border-current hover:text-white">
            {children}
          </button>
        </Tooltip>
      ),
    },
  },
  messages.steps[1],
]

const WithdrawView: React.FC<WithdrawViewProps> = (props) => {
  const { className } = props

  useEffect(() => {
    mixpanel.track('funding withdraw show')
  }, [])

  return (
    <div className="pt-24 px-16 pb-16">
      <Image
        className="w-48 h-48 mx-auto"
        src={fundingImage}
        alt=""
      />
      <Message
        className="mt-24 text-center text-fsm-title-4-bold text-white"
        value={messages.title}
        tag="h3"
      />
      <ol className="mt-24 bg-60 rounded-8 text-paragraph-medium divide-y divide-dark-gray-70">
        {
          steps.map((message, index) => (
            <li key={index} className="py-8 px-12 flex items-center">
              <span className="flex-none flex items-center justify-center w-24 h-24 rounded-8 bg-50">
                <span className="text-fill-transparent bg-gradient-primary">{index + 1}</span>
              </span>
              <Message
                className="ml-12 text-gray-50 text-left"
                tag="p"
                value={message}
                html
              />
            </li>
          ))
        }
      </ol>
      <WithdrawalForm className="mt-24" />
    </div>
  )
}

export default WithdrawView
