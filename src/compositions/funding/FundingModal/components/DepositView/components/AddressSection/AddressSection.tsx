import { useState, type MouseEventHandler } from 'react'
import { Message } from '@locmod/intl'
import { useIsMounted } from 'hooks'
import { useWallet } from 'wallet'
import copy from 'copy-to-clipboard'

import { Icon } from 'components/ui'
import { Button, ButtonBase } from 'components/inputs'
import TokenChainWarning from 'compositions/funding/FundingModal/components/TokenChainWarning/TokenChainWarning'

import messages from './messages'


const AddressSection: React.FC<{ className?: string, showQR(): void }> = ({ className, showQR }) => {
  const { account } = useWallet()
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

    setTimeout(() => {
      if (isMounted()) {
        setCopied(false)
      }
    }, 1000)
  }

  return (
    <div className={className}>
      <div className="px-3 rounded-md border border-grey-20 min-h-10 py-2.5 flex items-center text-caption-14 font-medium text-grey-90">
        <span className="max-w-full break-words" onClick={handleAccountClick}>{account}</span>
      </div>
      <div className="mt-2 flex items-center gap-2">
        {/* {
          isCopied ? (
            <div className="flex-1 rounded-md bg-brand-50 flex items-center justify-center h-9">
              <Icon name="interface/accepted" className="text-accent-green size-4 mr-2" />
              <Message
                className="uppercase text-caption-14 font-semibold"
                value={messages.copied}
              />
            </div>
          ) : (
          )
        } */}
        <Button
          className="flex-1"
          title={isCopied ? messages.copied : messages.copy}
          size={40}
          leftIcon={isCopied ? 'interface/accepted' : 'interface/copy'}
          onClick={handleCopyClick}
        />
        <ButtonBase
          className="flex-none size-9 border border-grey-20 rounded-md p-2 text-grey-60 hover:text-brand-50"
          onClick={showQR}
        >
          <Icon name="interface/qr_code" className="size-full" />
        </ButtonBase>
      </div>
      <TokenChainWarning className="mt-3" />
    </div>
  )
}

export default AddressSection
