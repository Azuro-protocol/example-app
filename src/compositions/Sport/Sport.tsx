import React from 'react'
import { type Sport } from 'hooks'

import { Icon, type IconName } from 'components/ui'
import { Href } from 'components/navigation'


type SportProps = {
  sport: Sport
}

const Sport: React.CFC<SportProps> = ({ children, sport }) => {
  const { slug, name } = sport

  return (
    <div>
      <div className="flex items-center justify-between py-3 px-4">
        <div className="flex items-center">
          <Icon className="size-5 mr-3 text-brand-50" name={`sport/${slug}` as IconName} />
          <div className="text-heading-h4 font-semibold">{name}</div>
        </div>
        <Href to={`/${slug}`} className="bg-grey-10 rounded-full text-grey-60 hover:text-grey-90 border border-bg-l2 size-6 flex items-center justify-center">
          <Icon className="size-4" name="interface/chevron_right" />
        </Href>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default Sport
