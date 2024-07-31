'use client'

import React from 'react'

import { GlobalModalsRegistrar } from 'compositions/modals'

import { Content } from './components'


const PageLayout: React.CFC = (props) => {
  let { children } = props

  return (
    <>
      <Content>
        {children}
        {/* <Footer /> */}
        <GlobalModalsRegistrar />
      </Content>
      <div id="modals" />
    </>
  )
}

export default PageLayout
