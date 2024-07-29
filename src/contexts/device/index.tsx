'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

import { getBrowser, type BrowserType } from './browsers'


export { BrowserType } from './browsers'

// const updateBodyClassName = (isMobile: boolean) => {
//   document.documentElement.classList.remove('desktop', 'mobile')
//   document.documentElement.classList.add(isMobile ? 'mobile' : 'desktop')
// }

const getDeviceByMedia = (): MediaState => {
  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth

  return {
    isMobileView: width <= 834.9,
    isSmView: width >= 768,
    isLgView: width >= 1096,
    isXlView: width >= 1366,
  }
}

const getDeviceByUserAgent = (userAgent: string): DeviceState => {
  const isAndroid = /android/i.test(userAgent)
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent)
  const isOpera = /Opera Mini/i.test(userAgent)
  const isWindows = /IEMobile/i.test(userAgent)
  const isMobileDevice = Boolean(isAndroid || isIOS || isOpera || isWindows)
  const browser = getBrowser(userAgent)

  let isMobileInjectedBrowser = Boolean(isMobileDevice && typeof window !== 'undefined' && window.ethereum)

  return {
    isMobileDevice,
    isMobileInjectedBrowser,
    isIOS,
    isAndroid,
    browser,
  }
}

type DeviceState = {
  isMobileDevice: boolean
  isMobileInjectedBrowser: boolean
  isIOS: boolean
  isAndroid: boolean
  browser: BrowserType
}

type MediaState = {
  // max: '834.9px'
  isMobileView: boolean
  // min: '835px'
  isSmView: boolean
  // min: '1195px'
  isLgView: boolean
  // min: '1981px'
  isXlView: boolean
}

export const DeviceContext = createContext<DeviceState>(null as unknown as DeviceState)
export const MediaContext = createContext<MediaState>(null as unknown as MediaState)

export const useDevice = () => {
  return useContext(DeviceContext)
}

export const useMedia = () => {
  return useContext(MediaContext)
}

type DeviceProviderProps = {
  userAgent: string
}

export const DeviceProvider: React.FC<React.PropsWithChildren<DeviceProviderProps>> = (props) => {
  const { children, userAgent } = props

  const [ device ] = useState(getDeviceByUserAgent(userAgent))
  const [ media, setMedia ] = useState<MediaState>({
    isMobileView: device.isMobileDevice,
    isSmView: !device.isMobileDevice,
    isLgView: !device.isMobileDevice,
    isXlView: !device.isMobileDevice,
  })

  useEffect(() => {
    const handleResize = () => {
      const media = getDeviceByMedia()

      // updateBodyClassName(media.isMobileView)
      setMedia(media)
    }

    // handle the situation where user uses desktop but decided to resize window and reload a page
    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <DeviceContext.Provider value={device}>
      <MediaContext.Provider value={media}>
        {children}
      </MediaContext.Provider>
    </DeviceContext.Provider>
  )
}
