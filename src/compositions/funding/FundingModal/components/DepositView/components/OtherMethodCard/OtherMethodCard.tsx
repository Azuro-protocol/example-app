'use client'

import { Message } from '@locmod/intl'
import { Button } from 'components/inputs'
import { Icon, type IconName } from 'components/ui'


export type OtherMethodCardProps = {
  // className?: string
  title: Intl.Message
  icons: (IconName | 'divider')[]
  buttonTitle: Intl.Message
  onClick?: () => void
}

const OtherMethodCard: React.FC<OtherMethodCardProps> = (props) => {
  const { title, buttonTitle, onClick, icons } = props

  return (
    <div className="bg-60 rounded-8 p-12 flex items-center mb:flex-col gap-12">
      <Message className="text-white text-h3" value={title} />
      <div className="flex-1 mb:order-last mb:pt-4 text-white flex items-center gap-8 ds:justify-end">
        {
          icons.map((icon, index) => {
            if (icon === 'divider') {
              return (
                <span key={index} className="flex-none mx-4 w-px h-16 bg-dark-gray-60" />
              )
            }

            return (
              <Icon
                key={index}
                className="flex-none w-auto h-16"
                name={icon}
              />
            )
          })
        }
      </div>
      <Button
        className="mb:w-full ds:w-[128rem]"
        title={buttonTitle}
        size={32}
        onClick={onClick}
      />
    </div>
  )
}

export default OtherMethodCard
