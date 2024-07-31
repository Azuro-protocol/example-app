'use client'

import { Message } from '@locmod/intl'
import cx from 'classnames'

import { WalletIcon } from 'components/dataDisplay'
import { Icon } from 'components/ui'
import { Button, buttonMessages } from 'components/inputs'


type ActionScreenProps = {
  walletName: string | undefined
  walletIcon: string | undefined
  title: string | Intl.Message
  text: string | Intl.Message
  isError?: boolean
  isPending?: boolean
  reset: () => void
}

const ActionScreen: React.FC<ActionScreenProps> = (props) => {
  const { walletName, walletIcon, title, text, isError, isPending, reset } = props

  return (
    <div className="relative text-center">
      <button className="absolute top-0 left-0 text-grey-70 hocus:text-grey-90" type="button" onClick={reset}>
        <Icon className="rotate-180 size-5" name="interface/chevron_right" />
      </button>
      <div className={cx('w-16 h-16 p-3 relative mx-auto rounded-full', isError && 'bg-bg-10')}>
        {
          isPending && !isError && (
            <Icon className="absolute top-0 left-0 size-full" name="interface/spinner" />
          )
        }
        {
          isError && (
            <div className="absolute top-full left-full -mt-6 -ml-6 size-8 p-1.5 bg-white shadow-lvl1 rounded-full border border-solid border-bg-10">
              <Icon className="text-accent-red size-full" name="interface/alert_triangle" />
            </div>
          )
        }
        <WalletIcon
          className="size-full"
          name={walletName}
          providedImageSrc={walletIcon}
        />
      </div>
      <Message
        className="mt-4 text-body-22 font-semibold"
        value={title}
        tag="h2"
      />
      <Message
        className="mt-4 text-body-16-p text-grey-70 font-medium"
        value={text}
        tag="p"
      />
      {
        isError && (
          <Button
            className="mt-6 w-full"
            size={40}
            title={buttonMessages.tryAgain}
            onClick={reset}
          />
        )
      }
    </div>
  )
}

export default ActionScreen
