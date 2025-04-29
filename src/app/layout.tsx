import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import duration from 'dayjs/plugin/duration'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cookies, headers } from 'next/headers'
import { type ChainId } from '@azuro-org/toolkit'
import { constants } from 'helpers'
import { appChains } from 'wallet/chains'

import Providers from 'compositions/Providers/Providers'
import PageLayout from 'compositions/PageLayout/PageLayout'

import '../scss/globals.scss'


dayjs.extend(utc)
dayjs.extend(duration)

const inter = Inter({ subsets: [ 'latin' ] })

export const metadata: Metadata = {
  metadataBase: new URL(constants.baseUrl),
  title: 'Betting Example',
  description: '',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const headersList = await headers()
  const cookieStore = await cookies()

  const userAgent = headersList.get('user-agent')
  const _initialChainId = cookieStore.get('appChainId')?.value
  const initialLiveState = JSON.parse(cookieStore.get('live')?.value || 'false')

  const initialChainId = _initialChainId &&
                  (appChains.find(chain => chain.id === +_initialChainId)?.id as ChainId) || constants.defaultChain.id

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers
          // initialState={initialState}
          userAgent={userAgent || ''}
          initialLiveState={initialLiveState}
          initialChainId={initialChainId}
        >
          <PageLayout>
            {children}
          </PageLayout>
        </Providers>
      </body>
    </html>
  )
}
