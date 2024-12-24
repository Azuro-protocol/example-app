import { Message } from '@locmod/intl'
import cx from 'classnames'
import { useWallet } from 'wallet'
import { useChain } from '@azuro-org/sdk'

import { Button, ButtonBase, buttonMessages } from 'components/inputs'
import { Icon } from 'components/ui'
import { QRCode } from 'components/feedback'
import TokenChainWarning from 'compositions/funding/FundingModal/components/TokenChainWarning/TokenChainWarning'


import messages from './messages'


const AccountQRCode: React.FC<{ className?: string, onBackClick(): void }> = (props) => {
  const { className, onBackClick } = props
  const { account } = useWallet()
  const { betToken, appChain } = useChain()

  return (
    <div className={cx(className, 'flex flex-col')}>
      <div className="relative flex-1 w-full min-h-[234px] flex items-center justify-center bg-brand-50 rounded-t-md">
        <ButtonBase
          className="absolute top-3.5 left-3.5 bg-overlay-black/20 rounded-full p-1 size-7"
          ariaLabel="Back"
          onClick={onBackClick}
        >
          <Icon name="interface/arrow_back" className="w-full h-full" />
        </ButtonBase>
        {
          Boolean(account) && (
            <QRCode
              className="h-40 w-40 rounded-md bg-white p-2.5"
              uri={account!}
              size={134}
            />
          )
        }
      </div>
      <div className="flex-1 pt-6 px-4 pb-4 text-center">
        <Message
          className="text-grey-90 text-heading-h3 font-bold"
          value={messages.title}
          tag="h3"
        />
        <Message
          className="mt-2 px-5 text-grey-60 text-captions-large"
          value={{ ...messages.text, values: { symbol: betToken.symbol, chain: appChain.name } }}
          tag="p"
        />
        <Button
          className="w-full mt-5"
          title={buttonMessages.gotIt}
          size={40}
          style="secondary"
          onClick={onBackClick}
        />
        <TokenChainWarning className="mt-3" />
      </div>
    </div>
  )
}

export default AccountQRCode


