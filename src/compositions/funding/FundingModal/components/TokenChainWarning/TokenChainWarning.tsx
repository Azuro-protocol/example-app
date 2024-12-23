import React from 'react'
import { useChain } from '@azuro-org/sdk'

import { Warning } from 'components/feedback'

import messages from './messages'


type TokenChainWarningProps = {
  className?: string
}

const TokenChainWarning: React.FC<TokenChainWarningProps> = ({ className }) => {
  const { betToken, appChain } = useChain()

  return (
    <Warning
      className={className}
      text={{ ...messages.warning, values: { symbol: betToken.symbol, chain: appChain.name } }}
    />
  )
}

export default TokenChainWarning
