'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useWallet } from 'wallet'
import { useRouter } from 'next/navigation'

import Bets from 'compositions/profile/Bets/Bets'
import User from 'compositions/profile/User/User'


const CashoutModal = dynamic(() => import('compositions/profile/CashoutModal/CashoutModal'))

export default function ProfilePage() {
  const { account, isConnecting, isReconnecting } = useWallet()
  const router = useRouter()

  useEffect(() => {
    if (!isConnecting && !isReconnecting && !account) {
      router.push('/')
    }
  }, [ isConnecting, isReconnecting, account ])

  if (!account) {
    return null
  }

  return (
    <>
      <User />
      <Bets />
      <CashoutModal />
    </>
  )
}
