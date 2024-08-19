'use client'

import { useEffect } from 'react'
import { useWallet } from 'wallet'
import { useRouter } from 'next/navigation'

import Bets from 'compositions/profile/Bets/Bets'
import User from 'compositions/profile/User/User'


export default function ProfilePage() {
  const { account, isReconnecting } = useWallet()
  const router = useRouter()

  useEffect(() => {
    if (!isReconnecting && !account) {
      router.push('/')
    }
  }, [ isReconnecting, account ])

  if (!account) {
    return null
  }

  return (
    <>
      <User />
      <Bets />
    </>
  )
}
