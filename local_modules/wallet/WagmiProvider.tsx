'use client'
import { AxiosError } from 'axios'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type State, WagmiProvider as WagmiBaseProvider } from 'wagmi'
// import { PromptSettingType } from '@particle-network/authkit'
// import { ParticleAuthContextProvider } from '@azuro-org/sdk-social-aa-connector'
import config from './config'
import iconImage from 'src/app/icon.png'


const noRetryErrorCode = [ 404 ]

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      placeholderData: <T extends any>(prev: T) => prev,
      retry: (retryCount, error) => {
        if (error instanceof AxiosError) {
          const status = error?.response?.status

          if (status && noRetryErrorCode.includes(status)) {
            return false
          }
        }

        return retryCount < 3
      },
    },
  },
})

const WagmiProvider: React.CFC<{ initialState?: State }> = (props) => {
  const { children, initialState } = props

  return (
    <WagmiBaseProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {/*<ParticleAuthContextProvider
          options={{
            chains: config.chains,
            // web3Modal: true,
            projectId: '0d035c36-2b19-4145-a283-1b740058ef0e',
            clientKey: 'cjbManuVXiwRZ404UjXXAfDz64Hg8t1ac9MCRTdG',
            appId: 'e3ea3e33-a460-4b73-a1fc-3bb49fed43fd',
            wallet: {
              visible: true,
            },
            promptSettingConfig: {
              promptPaymentPasswordSettingWhenSign: PromptSettingType.none,
              promptMasterPasswordSettingWhenLogin: PromptSettingType.none,
            },
            themeType: 'dark',
            customStyle: {
              logo: iconImage.src,
              projectName: 'Social Login',
              zIndex: 2147483650, // must greater than 2147483646
            },
          }}
        >*/}
        {children}
        {/*</ParticleAuthContextProvider>*/}
      </QueryClientProvider>
    </WagmiBaseProvider>
  )
}

export default WagmiProvider
