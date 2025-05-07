'use client'

import { AxiosError } from 'axios'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type State } from 'wagmi'
import { PrivyProvider } from '@azuro-org/sdk-social-aa-connector'
import { constants } from 'helpers'
import config, { privyConfig } from './config'


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
    <QueryClientProvider client={queryClient}>
      <PrivyProvider
        appId={constants.privyAppId}
        privyConfig={privyConfig}
        wagmiConfig={config}
        initialWagmiState={initialState}
      >
        {children}
      </PrivyProvider>
    </QueryClientProvider>
  )
}

export default WagmiProvider
