'use client'

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { Message } from '@locmod/intl'
import cx from 'classnames'
import { useEffect, useState } from 'react'
import type { ModalComponent } from '@locmod/modal'
import { useWallet } from 'wallet'
import { Icon } from 'components/ui'
import type { IconName } from 'components/ui'

import { PlainModal } from 'components/feedback'

import type { DepositViewProps } from './components/DepositView/DepositView'
import DepositView from './components/DepositView/DepositView'
import WithdrawView from './components/WithdrawView/WithdrawView'
import AccountQRCode from './components/AccountQRCode/AccountQRCode'

import messages from './messages'


type TabId = 'deposit' | 'withdraw'

const tabs: { id: TabId; title: Intl.Message; iconName: IconName; Content: typeof DepositView | typeof WithdrawView }[] = [
  {
    id: 'deposit',
    title: messages.deposit,
    iconName: 'interface/deposit',
    Content: DepositView,
  },
  {
    id: 'withdraw',
    title: messages.withdraw,
    iconName: 'interface/withdraw',
    Content: WithdrawView,
  },
]

type FundingModalProps = {
  initialTab?: TabId
  depositProps?: Pick<DepositViewProps, 'toAmount' | 'type'>
}

const FundingModal: ModalComponent<FundingModalProps> = (props) => {
  const { closeModal, depositProps, initialTab } = props

  const { account, isConnecting, isReconnecting, isAAWallet } = useWallet()
  const initialTabIndex = initialTab && isAAWallet ? tabs.findIndex((tab) => tab.id === initialTab) : 0
  const [ isQRVisible, setQRVisible ] = useState(false)

  const shouldClose = !isConnecting && !isReconnecting && !account
  useEffect(() => {
    if (shouldClose) {
      closeModal()
    }
  }, [ shouldClose ])

  if (shouldClose) {
    return null
  }

  return (
    <PlainModal
      className={cx('ds:max-w-[540px] transition-transform preserve-3d duration-300', isQRVisible ? 'rotate-y-180' : 'rotate-y-0')}
      withCloseButton={!isQRVisible}
      closeModal={closeModal}
    >
      {
        isQRVisible ? (
          <div
            className="bg-70 backface-hidden transition-transform"
            style={{ transform: 'scaleX(-1) translate3d(0px, 0px, 0.04em)', zIndex: isQRVisible ? '10' : undefined }}
          >
            <AccountQRCode className="h-full" onBackClick={() => setQRVisible(false)} />
          </div>
        ) : (
          <div className = "bg-70 relative backface-hidden">
            {
              isAAWallet ? (
                <>
                  <TabGroup defaultIndex={initialTabIndex}>
                    <TabList className="flex h-12 items-stretch gap-4 justify-center border-b border-grey-20 mb-4">
                      {
                        tabs.map((tab) => (
                          <Tab key={tab.id} className="relative inline-flex items-center gap-4 data-[selected]:text-brand-50 text-gray-50 group data-[hover]:text-brand-50">
                            <Icon name={tab.iconName} className="size-5" />
                            <Message value={tab.title} className="text-caption-14 font-semibold" />
                            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-brand-50 rounded-t-full scale-x-0 group-data-[selected]:scale-x-100 transition-transform" />
                          </Tab>
                        ))
                      }
                    </TabList>
                    <TabPanels>
                      {
                        tabs.map(({ id, Content }) => (
                          <TabPanel key={id}>
                            <Content
                              toAmount={depositProps?.toAmount}
                              type={depositProps?.type}
                              showQR={() => setQRVisible(true)}
                            />
                          </TabPanel>
                        ))
                      }
                    </TabPanels>
                  </TabGroup>
                </>
              ) : (
                <DepositView showQR={() => setQRVisible(true)} />
              )
            }
          </div>
        )
      }
    </PlainModal>
  )
}

declare global {
  interface ModalsRegistry extends ExtendModalsRegistry<{ FundingModal: typeof FundingModal }> {}
}

export default FundingModal
