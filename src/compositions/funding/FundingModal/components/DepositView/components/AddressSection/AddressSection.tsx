import { useState, type MouseEventHandler } from 'react'
import { Message } from '@locmod/intl'
import { useIsMounted } from 'hooks'
import { useConnect } from 'wallet'
import copy from 'copy-to-clipboard'
import { mixpanel } from 'modules/analytics'

import { Icon } from 'components/ui'
import { Button, ButtonBase } from 'components/inputs'
import TokenChainWarning from 'compositions/modals/FundingModal/components/TokenChainWarning/TokenChainWarning'

import messages from './messages'


const AddressSection: React.FC<{ className?: string, showQR(): void }> = ({ className, showQR }) => {
  const { account } = useConnect()
  const [ isCopied, setCopied ] = useState(false)
  const isMounted = useIsMounted()

  const handleAccountClick: MouseEventHandler<HTMLSpanElement> = (event) => {
    const range = document.createRange()

    range.selectNode(event.currentTarget)
    window.getSelection()?.removeAllRanges()
    window.getSelection()?.addRange(range)
  }

  const handleCopyClick = () => {
    copy(account!)
    setCopied(true)
    mixpanel.track('funding deposit copy address click')

    setTimeout(() => {
      if (isMounted()) {
        setCopied(false)
      }
    }, 1000)
  }

  return (
    <div className={className}>
      <div className="px-12 rounded-6 border border-dark-gray-60 min-h-40 py-10 flex items-center text-body font-medium text-white">
        <span className="max-w-full break-words" onClick={handleAccountClick}>{account}</span>
      </div>
      <div className="mt-8 flex items-center gap-8">
        {
          isCopied ? (
            <div className="flex-1 rounded-6 bg-50 flex items-center justify-center h-36">
              <Icon name="interface/accepted" className="text-accent-green w-16 h-16 mr-8" />
              <Message className="text-gray-50 uppercase text-body font-semibold" value={messages.copied} />
            </div>
          ) : (
            <Button
              className="flex-1"
              title={messages.copy}
              size={36}
              leftIcon="interface/copy"
              onClick={handleCopyClick}
            />
          )
        }
        <ButtonBase
          className="flex-none w-36 h-36 border border-dark-gray-60 rounded-6 p-8 text-gray-50 hover:text-brand-50"
          onClick={showQR}
        >
          <Icon name="interface/qr_code" className="size-full" />
        </ButtonBase>
      </div>
      <TokenChainWarning className="mt-12" />
    </div>
  )
}

export default AddressSection
