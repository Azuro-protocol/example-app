'use client'

import React from 'react'
import cx from 'classnames'
import dynamic from 'next/dynamic'

import { Media } from 'components/layout'

import ns from './Narrow.module.scss'
import ws from './Wide.module.scss'


const LeftSidebar = dynamic(() => import('./components/LeftSidebar/LeftSidebar'))
const RightSidebar = dynamic(() => import('./components/RightSidebar/RightSidebar'))


const Content: React.CFC = ({ children }) => {

  const rootClassName = cx('h-full flex flex-col wd:flex-row min-h-screen mx-auto wd:px-2 wd:pb-2', ws.root)
  const mainClassName = cx(ns.main, ws.main,
    'bg-bg-l1 flex flex-col mx-auto px-2 max-w-full flex-1 w-full wd:h-auto',
    'border border-grey-10 wd:rounded-l-4 -wd:rounded-t-4',
    {
    // [`${ws.withRightSidebar} ds:max-w-[784rem]`]: isRightSidebarVisible,
    }
  )

  return (
    <div className={rootClassName}>
      <Media className={cx(ws.leftSidebar, 'sticky top-0 h-auto z-[100] shrink-0')} wide>
        <LeftSidebar />
      </Media>
      <main className={mainClassName}>
        {children}
      </main>
      <Media className={cx(ws.rightSidebar, 'sticky top-0 h-auto z-[100] shrink-0')} wide>
        <RightSidebar />
      </Media>
    </div>
  )
}

export default Content
