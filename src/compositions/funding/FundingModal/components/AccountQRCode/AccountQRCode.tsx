import { Message } from '@locmod/intl'
import cx from 'classnames'
import { useWallet } from 'wallet'

import TokenChainWarning from 'compositions/modals/FundingModal/components/TokenChainWarning/TokenChainWarning'
import { Button, ButtonBase, buttonMessages } from 'components/inputs'
import { Icon } from 'components/ui'
import { QRCode } from 'components/feedback'


import messages from './messages'


const AccountQRCode: React.FC<{ className?: string, onBackClick(): void }> = (props) => {
  const { className, onBackClick } = props
  const { account } = useWallet()
  const { betToken, chain } = useChain()

  return (
    <div className={cx(className, 'flex flex-col')}>
      <div className="relative flex-1 w-full min-h-[234rem] flex items-center justify-center bg-brand-70 rounded-t-8">
        <ButtonBase
          className="absolute top-14 left-14 bg-overlay-black/20 rounded-full p-4 w-28 h-28"
          ariaLabel="Back"
          onClick={onBackClick}
        >
          <Icon name="interface/arrow_back" className="w-full h-full" />
        </ButtonBase>
        {
          Boolean(account) && (
            <QRCode
              className="w-[134rem] h-[134rem] rounded-8 bg-white p-10"
              uri={account!}
              size={134}
            />
          )
        }
      </div>
      <div className="flex-1 pt-24 px-16 pb-16 text-center">
        <Message
          className="text-white text-fsm-title-4-bold"
          value={messages.title}
          tag="h3"
        />
        <Message
          className="mt-8 px-20 text-gray-50 text-captions-large"
          value={{ ...messages.text, values: { symbol: betToken.symbol, chain: chain.name } }}
          tag="p"
        />
        <Button
          className="w-full mt-20"
          title={buttonMessages.gotIt}
          size={36}
          style="secondary"
          onClick={onBackClick}
        />
        <TokenChainWarning className="mt-12" />
      </div>
    </div>
  )
}

export default AccountQRCode


