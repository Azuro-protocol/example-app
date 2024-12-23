import { closeModal, openModal } from '@locmod/modal'
import { useSignMessage } from 'wagmi'
import { useWallet } from 'wallet'
import { useChain } from '@azuro-org/sdk'
import { gnosis, polygon } from 'viem/chains'
import { constants } from 'helpers'


const logo = `${process.env.NEXT_PUBLIC_BASE_URL}/images/logos/logo-symbol.png`

const useBuyWithCardClick = () => {
  const { account, isAAWallet, aaWalletClient } = useWallet()
  const { appChain, betToken } = useChain()
  const { signMessageAsync } = useSignMessage()

  const initProvider = async () => {

    try {
      const code = Math.floor(1000 + Math.random() * 9000)
      const message = `MtPelerin-${code}`

      const signature = isAAWallet
        ? await aaWalletClient!.signMessage({ message })
        : await signMessageAsync({ message })

      const hash = Buffer.from(signature.replace('0x', ''), 'hex').toString('base64')

      // https://developers.mtpelerin.com/integration-guides/parameters-and-customization/basic-customization
      const net: string = ({
        [gnosis.id]: 'xdai_mainnet',
        [polygon.id]: 'matic_mainnet',
      })[appChain.id]

      // betToken.isNative ||
      const crys = isAAWallet ? [
        betToken.symbol.toUpperCase(),
      ] : [
        appChain.nativeCurrency.symbol.toUpperCase(),
        betToken.symbol.toUpperCase(),
      ]

      const providerParams = new URLSearchParams({
        lang: 'en',
        tab: 'buy',
        tabs: JSON.stringify([ 'buy' ]),
        bdc: betToken.symbol.toUpperCase(),
        crys: JSON.stringify(crys),
        net,
        nets: JSON.stringify([ net ]),
        chain: net,
        addr: account!,
        mylogo: logo,
        hash,
        code: String(code),
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
      console.log(err)
    }
  }

  return () => {
    if (!account) {
      openModal('ConnectModal', {
        onFinish: initProvider,
      })
    }
    else {
      initProvider()
    }
  }
}

export default useBuyWithCardClick
