'use client'

import React from 'react'

import { Content } from './components'


const PageLayout: React.CFC = (props) => {
  let { children } = props

  return (
    <Content>
      {children}
      {/* <Footer /> */}
    </Content>
  )
}

export default PageLayout
