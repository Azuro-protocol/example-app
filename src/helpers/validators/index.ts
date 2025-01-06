import { isAddress } from '@ethersproject/address'

import messages from './messages'


const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line

const isEmpty = (value: any): boolean => (
  typeof value === 'undefined'
    || value === null
    || value === ''
    || /^\s+$/.test(value)
)

export const required = (value: any) => {
  if (isEmpty(value)) {
    return messages.required
  }
}

export const email = (value: string) => {
  if (!isEmpty(value) && !emailRegex.test(value)) {
    return messages.email
  }
}

export const ethAddress = (value: string) => {
  if (!isEmpty(value) && !isAddress(value)) {
    return messages.ethAddress
  }
}
