import { getCookies, setCookie, getCookie } from 'cookies-next'
import type { OptionsType, DefaultOptions } from 'cookies-next/lib/types'
import { constants } from 'helpers'


const validateServerOptions = (options?: OptionsType): void => {
  if (__SERVER__ && !options?.res) {
    throw new Error('Request should be defined')
  }
}

const setItem = (key: string, data: any, options: DefaultOptions = {}): void => {
  const defaultOptions: DefaultOptions = {
    maxAge: 365 * 24 * 60 * 60, // 1 year
    httpOnly: false,
    sameSite: 'lax',
    path: '/',
    domain: constants.baseUrl.replace('https://', ''),
  }

  validateServerOptions(options)

  setCookie(key, data, {
    ...defaultOptions,
    ...options,
  })
}

const setSessionItem = (key: string, data: any, options: DefaultOptions = {}): void => {
  setItem(key, data, { ...options, maxAge: 0 })
}

const getItem = (key: string, options: OptionsType = {}) => {
  validateServerOptions(options)

  return getCookie(key, options)
}

const getAllItems = (options?: OptionsType) => {
  validateServerOptions(options)

  return getCookies(options)
}

const removeItem = (key: string, options?: DefaultOptions): void => {
  return setItem(key, '', { ...options, maxAge: -1 })
}

export default {
  setItem,
  setSessionItem,
  getItem,
  getAllItems,
  removeItem,
}
