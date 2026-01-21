import { createContext, useContext } from 'react'
import BrowserRuntime from './BrowserRuntime'
import ServerRuntime from './ServerRuntime'


export const svgRuntime = typeof window === 'undefined' ? new ServerRuntime() : new BrowserRuntime()

const SvgProviderContext = createContext<SvgProvider.Runtime>(svgRuntime)

const SvgProvider: React.CFC = ({ children }) => {

  return (
    <SvgProviderContext.Provider value={svgRuntime}>
      {children}
    </SvgProviderContext.Provider>
  )
}

export const useSvgProvider = () => useContext(SvgProviderContext)

export default SvgProvider
