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
    'bg-bg-l1 flex flex-col mx-auto px-2 max-w-full flex-1 w-full wd:h-auto',
    'border border-grey-10 wd:rounded-l-4 -wd:rounded-t-4',
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
      <Media className="sticky top-0" narrow mobile>
        <Header />
      </Media>
      <main className={mainClassName}>
        {children}
      </main>
      <Media className={cx(ws.rightSidebar, sidebarClassName, 'overflow-auto')} wide>
        <RightSidebar />
      </Media>
    </div>
  )
}

export default Content
