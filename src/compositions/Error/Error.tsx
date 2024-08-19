'use client'

import Image from 'next/image'
import { Message } from '@locmod/intl'

import err404Image from 'public/images/illustrations/404.png'

import { Button } from 'components/inputs'

import messages from './messages'


type ErrorProps = {
}

const Error: React.FC<ErrorProps> = () => {
  return (
    <div className="py-20 flex flex-col items-center justify-center">
      <Image src={err404Image} alt="404 error" />
      <Message className="text-heading-h5 font-bold mt-5" value={messages.title} />
      <Message className="text-caption-13 text-grey-60 mt-1" value={messages.text} />
      <Button
        className="mt-5"
        style="secondary"
        title={messages.buttonTitle}
        size={40}
      />
    </div>
  )
}

export default Error
