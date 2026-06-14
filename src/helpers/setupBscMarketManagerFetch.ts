import { constants } from 'helpers'


const OFFICIAL_DEV_API_BASE = 'https://dev-api.onchainfeed.org/api/v1/public'
const BSC_ENVIRONMENT = 'BscDevUSDT'

declare global {
  interface Window {
    __bscMarketManagerFetchPatched?: boolean
  }
}

if (typeof window !== 'undefined' && !window.__bscMarketManagerFetchPatched && constants.bscMarketManagerApiBase) {
  const nativeFetch = window.fetch.bind(window)
  const bscMarketManagerApiBase = constants.bscMarketManagerApiBase.replace(/\/$/, '')

  window.fetch = (input, init) => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url

    if (url.startsWith(OFFICIAL_DEV_API_BASE)) {
      const requestUrl = new URL(url)

      if (requestUrl.searchParams.get('environment') === BSC_ENVIRONMENT) {
        requestUrl.hostname = new URL(bscMarketManagerApiBase).hostname
        requestUrl.protocol = new URL(bscMarketManagerApiBase).protocol
        requestUrl.pathname = `${new URL(bscMarketManagerApiBase).pathname.replace(/\/$/, '')}${requestUrl.pathname.replace('/api/v1/public', '')}`

        return nativeFetch(requestUrl.toString(), init)
      }
    }

    return nativeFetch(input, init)
  }

  window.__bscMarketManagerFetchPatched = true
}
