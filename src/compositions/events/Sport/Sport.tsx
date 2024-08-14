'use client'

import React from 'react'
import { type Sport } from 'hooks'
import { Message } from '@locmod/intl'

import { Icon, type IconName } from 'components/ui'
import { Href } from 'components/navigation'
import messages from './messages'


export const SportSkeleton: React.CFC = ({ children }) => {
  return (
    <div>
      <div className="flex items-center justify-between py-3 px-4">
        <div className="flex items-center">
          <div className="bone size-6 mr-3 rounded-full" />
          <div className="bone h-6 w-20 rounded-md" />
        </div>
      </div>
      <div>{children}</div>
    </div>
  )
}

type SportProps = {
  sport: Sport
  isPage?: boolean
}

const Sport: React.CFC<SportProps> = ({ children, sport, isPage = false }) => {
  const { slug, name } = sport

  return (
    <div>
      <div className="flex items-center justify-between py-3 px-4">
        {
          isPage ? (
            <Message className="text-heading-h4 font-semibold" value={{ ...messages.sport, values: { sportName: name } }} />
          ) : (
            <div className="flex items-center">
              <Icon className="size-6 mr-3 text-brand-50" name={`sport/${slug}` as IconName} />
              <div className="text-heading-h4 font-semibold">{name}</div>
            </div>
          )
        }
        {
          !isPage && (
            <Href to={`/${slug}`} className="bg-grey-10 rounded-full text-grey-60 hover:text-grey-90 border border-bg-l2 size-6 flex items-center justify-center">
              <Icon className="size-4" name="interface/chevron_right" />
            </Href>
          )
        }
      </div>
      <div>{children}</div>
    </div>
  )
}

export default Sport
