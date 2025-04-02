'use client'

import React from 'react'
import cx from 'classnames'

import { Media } from 'components/layout'
import MobileBetslipButton from 'compositions/MobileBetslipButton/MobileBetslipButton'
import MobileStatisticsButton from 'compositions/MobileStatisticsButton/MobileStatisticsButton'

import { LeftSidebar, RightSidebar, Header, Search } from './components'

import ns from './Narrow.module.scss'
import ws from './Wide.module.scss'


const Content: React.CFC = ({ children }) => {

  const rootClassName = cx('h-full flex flex-col wd:flex-row min-h-screen mx-auto wd:px-2 wd:pb-2', ws.root)
  const mainClassName = cx(ns.main, ws.main,
    'mx-auto flex-1 w-full wd:h-auto',
    {
      [ws.withRightSidebar]: true,
    }
  )
  const sidebarClassName = 'sticky top-0 z-[100] shrink-0 no-scrollbar'

  return (
    <div className={rootClassName}>
      <Media className={cx('h-screen', ws.leftSidebar, sidebarClassName, 'pr-2 overflow-auto')} wide>
        <LeftSidebar />
      </Media>
      <Media className="sticky top-0 z-[100]" narrow mobile>
        <Header />
      </Media>
      <main className={mainClassName}>
        <Media wide>
          <Search />
        </Media>
        <div className="flex flex-col bg-bg-l1 border border-grey-10 wd:rounded-l-md -wd:rounded-t-md px-2 min-h-[calc(100vh_-_4.5rem)]">
          {children}
        </div>
      </main>
      <Media className={cx('h-[calc(100vh_-_0.5rem)]', ws.rightSidebar, sidebarClassName)} wide>
        <RightSidebar />
      </Media>
      <Media narrow mobile>
        <div className="fixed left-1/2 -translate-x-1/2 bottom-2 z-[40] flex items-center justify-center space-x-2">
          <MobileStatisticsButton />
          <MobileBetslipButton />
        </div>
      </Media>
    </div>
  )
}

export default Content
