'use client'

import React, { useState } from 'react'
import { useActivatePromoCode, useChain } from '@azuro-org/sdk'
import { chainsData, isPromoCodeError } from '@azuro-org/toolkit'
import { useClose } from '@headlessui/react'
import { type IntlMessage, Message } from '@locmod/intl'
import { openModal } from '@locmod/modal'
import { type Address } from 'viem'

import { Button, Form, Input } from 'components/inputs'
import { Icon } from 'components/ui'

import messages from './messages'


const MAX_CODE_LENGTH = 32

type PromoCodeInputProps = {
  className?: string
}

const PromoCodeInput: React.FC<PromoCodeInputProps> = ({ className }) => {
  const { appChain } = useChain()
  const close = useClose()
  const [ value, setValue ] = useState('')

  const { activate, isPending, error, reset } = useActivatePromoCode({
    affiliate: process.env.NEXT_PUBLIC_AFFILIATE_ADDRESS as Address,
    onSuccess: (freebet) => {
      // the new freebet announcement only watches the selected chain
      if (freebet.chainId !== appChain.id) {
        openModal('SuccessModal', {
          text: {
            ...messages.addedOnNetwork,
            values: { network: chainsData[freebet.chainId].chain.name },
          },
        })
      }
    },
    onError: (err) => {
      const isUnexpected = !isPromoCodeError(err)
        || err.code === 'unknown'
        || err.code === 'bonus.activate_promo_code_error'

      if (isUnexpected) {
        // the error message can echo the typed code, so only the reason and status are logged
        console.warn('Promo code activation failed:', {
          reason: err.code,
          status: isPromoCodeError(err) ? err.status : undefined,
        })
      }
    },
  })

  const code = value.trim().toUpperCase()
  const isEmpty = !code

  let errorMessage: IntlMessage | undefined

  if (error) {
    errorMessage = isPromoCodeError(error) ? messages.errors[error.code] : messages.genericError
  }

  const handleChange = (value: string) => {
    setValue(value.slice(0, MAX_CODE_LENGTH))

    if (error) {
      reset()
    }
  }

  const handleSubmit = () => {
    if (isEmpty) {
      return
    }

    activate({ code }, {
      onSuccess: () => {
        setValue('')
        // closes the sheet on mobile, which sits above the new freebet announcement
        close()
      },
    })
  }

  return (
    <Form className={className} loading={isPending} onSubmit={handleSubmit}>
      {/* upper case is only displayed: rewriting the value while typing moves the caret and fights autocorrect */}
      <Input
        className="[&>input]:uppercase [&>input::placeholder]:normal-case"
        value={value}
        placeholder={messages.placeholder}
        regExp=""
        isError={Boolean(errorMessage)}
        leftNode={<Icon className="size-4 mr-2 text-grey-60" name="interface/gift" />}
        rightNode={
          (
            <Button
              className="ml-2 -mr-2"
              type="submit"
              title={messages.apply}
              size={32}
              style="secondary"
              loading={isPending}
              disabled={isEmpty}
            />
          )
        }
        onChange={handleChange}
      />
      {
        Boolean(errorMessage) && (
          <Message className="text-caption-13 text-accent-red mt-1" value={errorMessage!} tag="p" />
        )
      }
    </Form>
  )
}

export default PromoCodeInput
