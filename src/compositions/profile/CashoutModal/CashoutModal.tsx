'use client'

import { useEffect, useState } from 'react'
import { openModal, standaloneModal, type ModalComponent } from '@locmod/modal'
import { Message } from '@locmod/intl'
import { useChain, useCashout, type Bet } from '@azuro-org/sdk'
import dayjs from 'dayjs'
import cx from 'classnames'
import { formatToFixed } from 'helpers/formatters'

import { PlainModal } from 'components/feedback'
import { Icon } from 'components/ui'
import { Button, buttonMessages } from 'components/inputs'

import messages from './messages'


export type CashoutModalProps = {
  tokenId: string
  outcomes: Bet['outcomes']
}

const CashoutModal: ModalComponent<CashoutModalProps> = (props) => {
  const { closeModal, tokenId, outcomes } = props

  const [ secondsLeft, setSecondsLeft ] = useState(0)
  const { betToken } = useChain()
  const {
    submit,
    calculationQuery,
    cashoutTx,
    approveTx,
    isAllowanceFetching,
    isApproveRequired,
    isCashoutAvailable,
  } = useCashout({
    tokenId,
    selections: outcomes,
    onSuccess: () => {
      closeModal()
    },
    onError: (err) => {
      console.log(err, 'err')
    },
  })

  const { data, error, isFetching: isCalculationFetching, refetch } = calculationQuery
  const { cashoutAmount, approveExpiredAt } = data || {}

  const isPending = approveTx.isPending || cashoutTx.isPending
  const isProcessing = approveTx.isProcessing || cashoutTx.isProcessing
  const isLoading = (
    isCalculationFetching ||
    isAllowanceFetching ||
    isPending ||
    isProcessing
  )
  const isOver = !isCalculationFetching && !secondsLeft

  useEffect(() => {
    if (!approveExpiredAt) {
      return
    }

    setSecondsLeft(dayjs(approveExpiredAt).diff(dayjs(), 'seconds'))

    const interval = setInterval(() => {
      const diff = dayjs(approveExpiredAt).diff(dayjs(), 'seconds')

      if (diff > 0) {
        setSecondsLeft(diff)
      }
      else {
        setSecondsLeft(0)
        clearInterval(interval)
      }
    }, 1000)

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [ approveExpiredAt ])

  useEffect(() => {
    if (error) {
      closeModal()
      openModal('InfoModal', {
        title: messages.error.title,
        text: messages.error.text,
        icon: <img src="/images/illustrations/smile_sad.png" alt="" />,
      })
    }
  }, [ error ])

  return (
    <PlainModal
      className="!max-w-[26rem]"
      contentClassName="!p-0"
      closeModal={closeModal}
    >
      <div className="px-2 pt-5 pb-3">
        <Message className="text-caption-14 font-semibold px-3" value={messages.title} />
        <div className="rounded-md overflow-hidden mt-3 space-y-px">
          <div className="bg-grey-15 p-3 flex items-center justify-between">
            {
              isCalculationFetching ? (
                <Icon className="size-6" name="interface/spinner" />
              ) : (
                <div
                  className={
                    cx('text-heading-h3 font-bold', {
                      'line-through text-grey-40': isOver,
                    })
                  }
                >
                  {formatToFixed(cashoutAmount!, 2)} {betToken.symbol}
                </div>
              )
            }
            <Message className="text-caption-13 text-grey-60" value={messages.amount} />
          </div>
          <div className="bg-grey-15 p-3">
            <Message className="text-caption-12 text-grey-60 font-normal" value={messages.tip} />
          </div>
        </div>
        <div className="px-3">
          <Button
            className="mt-5 w-full"
            title={isApproveRequired ? buttonMessages.approve : messages.buttonTitle}
            size={40}
            loading={isLoading}
            disabled={isOver || !isCashoutAvailable}
            onClick={submit}
          />
        </div>
        <div className="mt-3 text-center">
          {
            isOver ? (
              <div className="flex items-center justify-center">
                <Message className="text-grey-60 text-caption-12" value={messages.over} />
                <Button
                  className="ml-2"
                  title={messages.request}
                  style="tertiary"
                  size={32}
                  onClick={() => refetch()}
                />
              </div>
            ) : (
              <>
                <Message className="text-grey-60 text-caption-12" value={messages.time} />
                {' '}
                {
                  Boolean(secondsLeft) && (
                    <span>{secondsLeft}s</span>
                  )
                }
              </>
            )
          }
        </div>
      </div>
    </PlainModal>
  )
}

declare global {
  interface ModalsRegistry extends ExtendModalsRegistry<{ CashoutModal: typeof CashoutModal }> {}
}

export default standaloneModal('CashoutModal', CashoutModal)
