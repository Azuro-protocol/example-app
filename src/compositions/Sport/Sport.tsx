'use client'

import React from 'react'
import { type Sport } from 'hooks'

import { Icon, type IconName } from 'components/ui'
import { Href } from 'components/navigation'


export const SportSkeleton: React.CFC = ({ children }) => {
  return (
    <div>
      <div className="flex items-center justify-between py-3 px-4">
        <div className="flex items-center">
          <div className="bone size-6 mr-3 rounded-full" />
          <div className="bone h-6 w-20 rounded-4" />
        </div>
      </div>
      <div>{children}</div>
    </div>
  )
}

type SportProps = {
  sport: Sport
  withLink?: boolean
}

const Sport: React.CFC<SportProps> = ({ children, sport, withLink = true }) => {
  const { slug, name } = sport

  return (
    <div>
      <div className="flex items-center justify-between py-3 px-4">
        <div className="flex items-center">
          <Icon className="size-6 mr-3 text-brand-50" name={`sport/${slug}` as IconName} />
          <div className="text-heading-h4 font-semibold">{name}</div>
        </div>
        {
          withLink && (
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
