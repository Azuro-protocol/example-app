import type { Metadata } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import BackgroundMesh from '@/components/ethereal/BackgroundMesh'
import LoadingScreen from '@/components/ethereal/LoadingScreen'
import Orbs from '@/components/ethereal/Orbs'
import Starfield from '@/components/ethereal/Starfield'
import Footer from '@/components/portfolio/Footer'
import Nav from '@/components/portfolio/Nav'
import { site } from '@/content/portfolio'

import '../scss/globals.scss'


const inter = Inter({
  subsets: [ 'latin' ],
  variable: '--font-inter',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: [ 'latin' ],
  variable: '--font-fraunces',
  display: 'swap',
  axes: [ 'opsz' ],
})

export const metadata: Metadata = {
  title: `${site.owner} — ${site.role}`,
  description: site.tagline,
}

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
    <body>
      <BackgroundMesh />
      <Orbs />
      <Starfield />
      <LoadingScreen />
      <Nav />
      <main className="relative z-0">{children}</main>
      <Footer />
    </body>
  </html>
)

export default RootLayout
