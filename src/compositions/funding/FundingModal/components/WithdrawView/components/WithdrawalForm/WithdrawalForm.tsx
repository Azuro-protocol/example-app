import { Message } from '@locmod/intl'
import { useBetTokenBalance, useChain } from '@azuro-org/sdk'
import { constants } from 'helpers'

import { Button, Form as FormComponent, Input } from 'components/inputs'
import { Warning } from 'components/feedback'
import { Icon } from 'components/ui'

import { useWithdraw } from './utils'
import messages from './messages'


const WithdrawalForm: React.FC<{ className?: string }> = ({ className }) => {
  const { betToken, appChain } = useChain()
  const { form, isReady, maxValue, submit, isSubmitting } = useWithdraw()
  const { balance } = useBetTokenBalance()

  return (
    <FormComponent
      className={className}
      loading={isSubmitting}
      onSubmit={submit}
    >
      <Message
        className="text-caption-13"
        value={
          { ...messages.address.label,
            values: {
              symbol: betToken.symbol,
              chain: appChain.name,
            },
          }
        }
        tag="p"
      />
      <Input
        value={form.fields.address.state.value}
        leftNode={<Icon className="size-4 mr-2" name={constants.chainIcons[appChain.id]} />}
        placeholder={messages.address.hint}
        onChange={(value) => form.fields.address.set(value)}
      />
      <Message
        className="text-caption-13 mt-4"
        value={messages.amount.label}
        tag="p"
      />
      <Input
        value={form.fields.amount.state.value}
        leftNode={<Icon className="size-4 mr-2" name={constants.currencyIcons[appChain.id]} />}
        placeholder="0.00"
        type="number"
        maxValue={maxValue}
        noMaxOverload
        onChange={(value) => form.fields.amount.set(value)}
      />
      <Message
        className="mt-1.5 text-caption-13 text-grey-60"
        tag="p"
        value={{ ...messages.available, values: { amount: balance || '...', symbol: betToken.symbol } }}
      />
      <Button
        className="mt-6 w-full"
        type="submit"
        title={messages.withdraw}
        size={40}
        loading={isSubmitting || !isReady}
      />
      <Warning
        className="mt-3"
        text={{ ...messages.warning, values: { symbol: betToken.symbol, chain: appChain.name } }}
      />
    </FormComponent>
  )
}

export default WithdrawalForm
