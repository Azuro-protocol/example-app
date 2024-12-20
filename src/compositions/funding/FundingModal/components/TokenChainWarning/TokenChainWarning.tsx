'use client'

import { Message } from '@locmod/intl'
import cx from 'classnames'
import { useChain } from 'context'

import { Icon } from 'components/ui'

import messages from './messages'


type TokenChainWarningProps = {
  className?: string
}

const TokenChainWarning: React.FC<TokenChainWarningProps> = (props) => {
  const { className } = props
  const { betToken, chain } = useChain()

  return (
    <div className={cx(className, 'py-12 px-16 flex items-center rounded-6 bg-peach-10 text-label font-medium text-accent-peach')}>
      <Icon
        className="mr-12"
        name="interface/warning"
        size={16}
      />
      <Message value={{ ...messages.warning, values: { symbol: betToken.symbol, chain: chain.name } }} />
    </div>
  )
}

export default TokenChainWarning
