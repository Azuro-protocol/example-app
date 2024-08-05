'use client'

import React from 'react'
import cx from 'classnames'

import { Media } from 'components/layout'
import { LeftSidebar, RightSidebar, Header } from './components'

import ns from './Narrow.module.scss'
import ws from './Wide.module.scss'


const Content: React.CFC = ({ children }) => {

  const rootClassName = cx('h-full flex flex-col wd:flex-row min-h-screen mx-auto wd:px-2 wd:pb-2', ws.root)
  const mainClassName = cx(ns.main, ws.main,
    'mx-auto max-w-full flex-1 w-full wd:h-auto',
    {
    // [`${ws.withRightSidebar} ds:max-w-[784rem]`]: isRightSidebarVisible,
    }
  )
  const sidebarClassName = 'sticky top-0 h-[calc(100vh_-_0.5rem)] z-[100] shrink-0 no-scrollbar'

  return (
    <div className={rootClassName}>
      <Media className={cx(ws.leftSidebar, sidebarClassName, 'pr-2 overflow-auto')} wide>
        <LeftSidebar />
      </Media>
      <Media className="sticky top-0 z-[100]" narrow mobile>
        <Header />
      </Media>
      <main className={mainClassName}>
        {/* search block */}
        <Media className="h-16 sticky top-0" wide />
        <div className="flex flex-col bg-bg-l1 border border-grey-10 wd:rounded-l-4 -wd:rounded-t-4 px-2 wd:min-h-[calc(100vh_-_4.5rem)]">
          {children}
        </div>
      </main>
      <Media className={cx(ws.rightSidebar, sidebarClassName)} wide>
        <RightSidebar />
      </Media>
    </div>
  )
}

export default Content
