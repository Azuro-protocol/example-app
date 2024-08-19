'use client'

import type { ModalComponent } from '@locmod/modal'
import { Message } from '@locmod/intl'
import { useChain, type FreeBet } from '@azuro-org/sdk'
import dayjs from 'dayjs'
import Image from 'next/image'

import { PlainModal } from 'components/feedback'
import { Button, buttonMessages } from 'components/inputs'

import bgImg from 'public/images/new-free-bet.jpg'

import messages from './messages'


export type NewFreeBetModalProps = {
  freeBet: FreeBet
  onClose?: () => void
}

const NewFreeBetModal: ModalComponent<NewFreeBetModalProps> = (props) => {
  const { freeBet, closeModal, onClose } = props
  const { amount, expiresAt } = freeBet

  const { betToken } = useChain()

  const handleClose = () => {
    closeModal()

    onClose?.()
  }

  return (
    <PlainModal
      contentClassName="!p-0"
      closeModal={handleClose}
    >
      <div className="">
        <div className="pt-20 px-8 pb-8 relative">
          <Image className="absolute left-1/2 -translate-x-1/2 top-0 h-full z-10 rounded-t-md" src={bgImg} alt="new freebet" />
          <div className="relative z-20">
            <div className="text-[2.375rem] leading-[2.625rem] font-bold">
              <div className="text-brand-50">{amount} {betToken.symbol}</div>
              <Message value={messages.freeBet} />
            </div>
            <Message className="text-heading-h4 font-semibold text-accent-green mt-3" value={{ ...messages.until, values: { date: dayjs(expiresAt).format('DD.MM.YYYY, HH:mm') } }} tag="p" />
          </div>
        </div>
        <div className="p-5">
          <Message className="text-caption-14 font-semibold" value={messages.title} tag="p" />
          <Message className="text-caption-13 text-grey-60 mt-2" value={messages.text} tag="p" />
          <Button
            className="w-full mt-6"
            style="secondary"
            title={buttonMessages.gotIt}
            size={32}
            onClick={handleClose}
          />
        </div>
      </div>
    </PlainModal>
  )
}

declare global {
  interface ModalsRegistry extends ExtendModalsRegistry<{ NewFreeBetModal: typeof NewFreeBetModal }> {}
}

export default NewFreeBetModal
