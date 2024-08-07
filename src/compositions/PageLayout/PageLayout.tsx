'use client'

import React from 'react'

import { GlobalModalsRegistrar } from 'compositions/modals'

import { Content, Footer } from './components'


const PageLayout: React.CFC = (props) => {
  let { children } = props

  return (
    <>
      <Content>
        <div className="flex-1">{children}</div>
        <Footer />
        <GlobalModalsRegistrar />
      </Content>
      <div id="modals" />
    </>
  )
}

export default PageLayout
