import { useEffect, useState } from 'react'
import { encodeFunctionData, parseUnits } from 'viem'
import { closeModal, openModal } from '@locmod/modal'
import { useChain } from 'context'
import { useForm } from 'formular'
import { useBalances, useIsMounted } from 'hooks'
import { mutate } from 'swr'
import { useConnect } from 'wallet'
import { waitTx } from 'helpers'
import { formatDecimals } from 'helpers/formatters'
import { ethAddress, required } from 'helpers/validators'
import { mixpanel } from 'modules/analytics'
import { erc20Abi } from 'modules/contracts'

import { buttonMessages } from 'components/inputs'

import messages from './messages'


const validateGreaterThanZero = (value: string) => parseFloat(value) > 0 ? undefined : 'Must be greater than 0'

const useWithdraw = () => {
  const { selectedChainId, betToken } = useChain()
  const { betBalance } = useBalances()
  const { account, isAAWallet, aaWalletClient, isReady } = useConnect()
  const isMounted = useIsMounted()
  // const getTxLink = useGetExplorerTxLink()

  const [ isSubmitting, setSubmitting ] = useState(false)

  const form = useForm<{ address: string, amount: string }>({
    fields: {
      address: [ required, ethAddress ],
      amount: [ required, validateGreaterThanZero ],
    },
  })

  const confirmSubmit = async (address: string, amount: string) => {
    try {
      openModal('WaitingModal')

      const formattedAmount = formatDecimals(amount, betToken.decimals)
      const rawAmount = parseUnits(formattedAmount, betToken.decimals)


      mixpanel.track('funding withdraw click', {
        address,
        amount: formattedAmount,
      })

      const data = encodeFunctionData({
        abi: erc20Abi,
        functionName: 'transfer',
        args: [ address as Address, rawAmount ],
      })

      await aaWalletClient!.switchChain({ id: selectedChainId })
      const txHash = await aaWalletClient!.sendTransaction({
        account: aaWalletClient!.account,
        to: betToken.address!,
        data,
      })

      await waitTx({ hash: txHash, chainId: selectedChainId })

      closeModal('WaitingModal')

      const successText = { ...messages.success.text, values: { amount: formattedAmount, symbol: betToken.symbol } }

      mixpanel.track('funding withdraw success')

      mutate([ '/balances', account, selectedChainId ])

      openModal('SuccessModal', {
        title: messages.success.title,
        text: successText,
        buttonProps: {
          title: buttonMessages.gotIt,
        },
        // bottomNode: (
        //   <a
        //     href={getTxLink(txHash)}
        //     className="mt-10 inline-flex items-center text-gray-50 hover:text-white"
        //     target="_blank"
        //     rel="noreferrer"
        //   >
        //     <Icon
        //       name="interface/external_link"
        //       size={16}
        //       className="mr-2"
        //     />
        //     <Message className="text-label font-medium" value={messages.viewExplorer} />
        //   </a>
        // ),
      })
    }
    catch (err) {
      mixpanel.track('funding withdraw error', {
        error_msg: err?.message,
      })

      closeModal('WaitingModal')
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
        icon: '/images/icons/3d/transactions_60.png',
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

  const maxValue = betBalance

  return {
    form,
    maxValue,
    submit,
    isSubmitting,
    isReady,
  }
}

export default useWithdraw
