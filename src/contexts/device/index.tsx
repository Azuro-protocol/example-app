'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

import { getBrowser, type BrowserType } from './browsers'


export { BrowserType } from './browsers'

const getDeviceByMedia = (): MediaState => {
  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth

  return {
    isMobileView: width < 802,
    isDesktopView: width >= 802,
    isNarrowView: width >= 802 && width < 1280,
    isWideView: width >= 1280,
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
  // viewport < 802
  isMobileView: boolean
  // viewport >= 802
  isDesktopView: boolean
  // viewport >= 802 && < 1280
  isNarrowView: boolean
  // viewport >= 1280
  isWideView: boolean
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
    isDesktopView: !device.isMobileDevice,
    isNarrowView: !device.isMobileDevice,
    isWideView: !device.isMobileDevice,
  })

  useEffect(() => {
    const handleResize = () => {
      const media = getDeviceByMedia()

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
