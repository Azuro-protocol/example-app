'use client'

import { Message } from '@locmod/intl'
import Image from 'next/image'
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

  return (
    <div className="pt-6 px-4 pb-4">
      <Image
        className="size-12 mx-auto"
        src={fundingImage}
        alt=""
      />
      <Message
        className="mt-6 text-center text-heading-h2 font-bold"
        value={messages.title}
        tag="h3"
      />
      <ol className="mt-6 bg-60 rounded-md text-caption-14 divide-y divide-grey-70">
        {
          steps.map((message, index) => (
            <li key={index} className="py-2 px-3 flex items-center">
              <span className="flex-none flex items-center justify-center size-6 rounded-md bg-brand-50">
                <span className="">{index + 1}</span>
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
      <WithdrawalForm className="mt-6" />
    </div>
  )
}

export default WithdrawView
