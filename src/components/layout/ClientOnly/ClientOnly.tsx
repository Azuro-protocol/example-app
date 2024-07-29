'use client'


import { useClientOnly } from 'hooks'


const ClientOnly: React.CFC = ({ children }) => {
  const isVisible = useClientOnly()

  if (!isVisible) {
    return null
  }

  return (
    <>{children}</>
  )
}


export default ClientOnly
