import { useEffect, useState } from 'react'
import { type Address, encodeFunctionData, erc20Abi, parseUnits } from 'viem'
import { openModal } from '@locmod/modal'
import { useBetTokenBalance, useChain } from '@azuro-org/sdk'
import { useForm } from 'formular'
import { useIsMounted } from 'hooks'
import { usePublicClient } from 'wagmi'
import { useWallet } from 'wallet'
import { formatToFixed } from 'helpers/formatters'
import { ethAddress, required } from 'helpers/validators'

import { buttonMessages } from 'components/inputs'

import messages from './messages'


const validateGreaterThanZero = (value: string) => parseFloat(value) > 0 ? undefined : 'Must be greater than 0'

const useWithdraw = () => {
  const { appChain, betToken } = useChain()
  const { data: balanceData, refetch: refetchBetTokenBalance } = useBetTokenBalance()
  const { aaWalletClient, isReady } = useWallet()
  const isMounted = useIsMounted()
  const publicClient = usePublicClient()

  const [ isSubmitting, setSubmitting ] = useState(false)

  const { balance } = balanceData || {}

  const form = useForm<{ address: string, amount: string }>({
    fields: {
      address: [ required, ethAddress ],
      amount: [ required, validateGreaterThanZero ],
    },
  })

  const confirmSubmit = async (address: string, amount: string) => {
    try {
      const formattedAmount = formatToFixed(amount, betToken.decimals)
      const rawAmount = parseUnits(formattedAmount, betToken.decimals)

      const data = encodeFunctionData({
        abi: erc20Abi,
        functionName: 'transfer',
        args: [ address as Address, rawAmount ],
      })

      await aaWalletClient!.switchChain({ id: appChain.id })
      const txHash = await aaWalletClient!.sendTransaction({
        account: aaWalletClient!.account as any,
        to: betToken.address!,
        data,
      })

      await publicClient!.waitForTransactionReceipt({
        hash: txHash,
      })

      const successText = { ...messages.success.text, values: { amount: formattedAmount, symbol: betToken.symbol } }

      refetchBetTokenBalance()

      openModal('SuccessModal', {
        title: messages.success.title,
        text: successText,
        buttonProps: {
          title: buttonMessages.gotIt,
        },
      })
    }
    catch (err) {
      openModal('ErrorModal', {
        text: err?.message,
      })
    }
    finally {
      if (isMounted()) {
        setSubmitting(false)
      }
    }
  }

  const submit = async () => {
    const onClose = () => {
      if (isMounted()) {
        setSubmitting(false)
      }
    }

    try {
      setSubmitting(true)
      const { values: { address, amount }, errors } = await form.submit()

      if (errors) {
        setSubmitting(false)

        return
      }

      const modalText = { ...messages.confirm.text, values: { address } }

      openModal('InfoModal', {
        icon: <img src="/images/illustrations/win.png" alt="" />,
        title: messages.confirm.title,
        text: modalText,
        withCloseButton: true,
        buttonProps: {
          title: buttonMessages.continue,
          style: 'primary',
          onClick: () => confirmSubmit(address, amount),
        },
        onClose,
      })
    }
    catch (err) {
      onClose()
    }
  }

  useEffect(() => {
    form.fields.address.on('blur', form.fields.address.validate)
    form.fields.amount.on('blur', form.fields.amount.validate)

    return () => {
      form.fields.address.on('blur', form.fields.address.validate)
      form.fields.amount.on('blur', form.fields.amount.validate)
    }
  }, [ form ])

  return {
    form,
    maxValue: balance,
    submit,
    isSubmitting,
    isReady,
  }
}

export default useWithdraw
