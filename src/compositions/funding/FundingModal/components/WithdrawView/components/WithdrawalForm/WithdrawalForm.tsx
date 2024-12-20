import { Message } from '@locmod/intl'
import { useChain } from 'context'
import { useBalances } from 'hooks'

import { Icon } from 'components/ui'
import { Button, Form as FormComponent, Input } from 'components/inputs'

import { useWithdraw } from './utils'
import messages from './messages'


const WithdrawalForm: React.FC<{ className?: string }> = ({ className }) => {
  const { betToken, chain } = useChain()
  const { form, isReady, maxValue, submit, isSubmitting } = useWithdraw()
  const { betBalance } = useBalances()

  return (
    <FormComponent
      className={className}
      loading={isSubmitting}
      onSubmit={submit}
    >
      <Input
        field={form.fields.address}
        label={{ ...messages.address.label, values: { symbol: betToken.symbol, chain: chain.name } }}
        leftIcon={chain.icon}
        placeholder={messages.address.hint}
      />
      <Input
        className="mt-16"
        field={form.fields.amount}
        label={messages.amount.label}
        leftIcon={betToken.icon}
        placeholder="0.00"
        maxValue={maxValue}
        noMaxOverload
        withNumericPattern
      />
      <Message
        className="mt-6 text-label text-gray-60"
        tag="p"
        value={{ ...messages.available, values: { amount: betBalance || '...', symbol: betToken.symbol } }}
      />
      <Button
        className="mt-24 w-full"
        type="submit"
        title={messages.withdraw}
        size={36}
        loading={isSubmitting || !isReady}
        fullWidth
      />
      <div className="mt-12 py-12 px-16 flex items-center rounded-6 bg-peach-10 text-label font-medium text-accent-peach">
        <Icon
          className="mr-12"
          name="interface/warning"
          size={16}
        />
        <Message value={{ ...messages.warning, values: { symbol: betToken.symbol, chain: chain.name } }} />
      </div>
    </FormComponent>
  )
}

export default WithdrawalForm
