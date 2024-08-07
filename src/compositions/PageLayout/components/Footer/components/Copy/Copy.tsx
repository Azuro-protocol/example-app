
import React from 'react'
import { constants } from 'helpers'


const currentYear = new Date().getFullYear()

const Copy: React.FC = () => {
  return (
    <div className="text-grey-70 text-caption-12">{`©${currentYear} ${constants.companyName}`}</div>
  )
}

export default Copy
