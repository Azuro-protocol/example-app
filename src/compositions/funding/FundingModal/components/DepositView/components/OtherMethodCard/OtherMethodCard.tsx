'use client'

import { Message } from '@locmod/intl'

import { Button } from 'components/inputs'
import { Icon, type IconName } from 'components/ui'


export type OtherMethodCardProps = {
  title: Intl.Message
  icons: (IconName | 'divider')[]
  buttonTitle: Intl.Message
  onClick?: () => void
}

const OtherMethodCard: React.FC<OtherMethodCardProps> = (props) => {
  const { title, buttonTitle, onClick, icons } = props

  return (
    <div className="bg-bg-l3 rounded-md p-3 flex items-center mb:flex-col gap-3">
      <Message className="text-grey-90 text-heading-h5" value={title} />
      <div className="flex-1 mb:order-last mb:pt-1 text-grey-90 flex items-center gap-2 ds:justify-end">
        {
          icons.map((icon, index) => {
            if (icon === 'divider') {
              return (
                <span key={index} className="flex-none mx-1 w-px h-4 bg-grey-60" />
              )
            }

            return (
              <Icon
                key={index}
                className="flex-none w-auto h-4"
                name={icon}
              />
            )
          })
        }
      </div>
      <Button
        className="mb:w-full ds:w-[128px]"
        title={buttonTitle}
        size={32}
        onClick={onClick}
      />
    </div>
  )
}

export default OtherMethodCard
