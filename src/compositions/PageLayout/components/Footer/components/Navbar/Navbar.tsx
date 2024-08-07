import React from 'react'
import { Message } from '@locmod/intl'
import { constants } from 'helpers'

import messages from './messages'


const items = [
  {
    text: messages.nav.docs,
    link: constants.links.docs,
  },
  {
    text: messages.nav.terms,
    link: constants.links.terms,
  },
  {
    text: messages.nav.policy,
    link: constants.links.policy,
  },
  {
    text: messages.nav.faq,
    link: constants.links.faq,
  },
]

const Navbar: React.FC = () => {
  return (
    <div className="flex items-center justify-center space-x-3">
      {
        items.map((item, index) => (
          <a
            key={`${item.link}-${index}`}
            className=""
            href={item.link}
            rel="noreferrer"
            target="_blank"
          >
            <Message
              className="text-caption-13 font-medium text-grey-60 hover:text-grey-90 hover:underline"
              value={item.text}
            />
          </a>
        ))
      }
    </div>
  )
}

export default Navbar
