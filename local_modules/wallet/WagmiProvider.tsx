'use client'
import { AxiosError } from 'axios'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type State, WagmiProvider as WagmiBaseProvider } from 'wagmi'
import config from './config'


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
        {children}
      </QueryClientProvider>
    </WagmiBaseProvider>
  )
}

export default WagmiProvider
