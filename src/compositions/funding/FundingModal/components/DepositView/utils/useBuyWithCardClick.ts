import { closeModal, openModal } from '@locmod/modal'
import { useSignMessage } from 'wagmi'
import { useConnect } from 'wallet'
import logger from 'logger'
import { useChain } from 'context'
import { constants } from 'helpers'
import { object } from 'helpers/primitives'
import { ChainId } from 'helpers/enums'
import { mixpanel } from 'modules/analytics'

import messages from './messages'


// const logo = `${process.env.NEXT_PUBLIC_BASE_URL}/images/logos/logo-symbol.png`
const logo = 'https://bookmaker.xyz/images/logos/logo-symbol.png'

const useBuyWithCardClick = () => {
  const { account, isAAWallet, aaWalletClient } = useConnect()
  const { selectedChainId, nativeToken, betToken } = useChain()
  const { signMessageAsync } = useSignMessage()

  const initProvider = async () => {
    openModal('WaitingModal', { title: isAAWallet ? undefined : messages.signTransaction })

    mixpanel.track('getcrypto fiat widget click', {
      onramp_solution: 'pelerin',
    })

    try {
      const code = Math.floor(1000 + Math.random() * 9000)
      const message = `MtPelerin-${code}`

      const signature = isAAWallet
        ? await aaWalletClient!.signMessage({ message })
        : await signMessageAsync({ message })

      const hash = Buffer.from(signature.replace('0x', ''), 'hex').toString('base64')

      // https://developers.mtpelerin.com/integration-guides/parameters-and-customization/basic-customization
      const net = ({
        [ChainId.Gnosis]: 'xdai_mainnet',
        [ChainId.Polygon]: 'matic_mainnet',
        [ChainId.Arbitrum]: 'arbitrum_mainnet',
      })[selectedChainId]

      const crys = betToken.isNative || isAAWallet ? [
        betToken.symbol.toUpperCase(),
      ] : [
        nativeToken.symbol.toUpperCase(),
        betToken.symbol.toUpperCase(),
      ]

      const providerParams = object.toQueryString({
        lang: 'en',
        tab: 'buy',
        tabs: [ 'buy' ],
        bdc: betToken.symbol.toUpperCase(),
        crys,
        net,
        nets: [ net ],
        chain: net,
        addr: account,
        mylogo: logo,
        hash,
        code,
        mode: 'dark',
        success: '#ababfc',
        primary: '#ababfc',
        _ctkn: constants.mtPelerinToken,
      })

      closeModal('FundingModal')
      openModal('FiatProviderModal', {
        providerParams,
      })
    }
    catch (err) {
      logger.error(err)
    }
    finally {
      closeModal('WaitingModal')
    }
  }

  return () => {
    if (!account) {
      openModal('ConnectModal', {
        onSuccess: initProvider,
      })
    }
    else {
      initProvider()
    }
  }
}

export default useBuyWithCardClick
