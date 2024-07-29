'use client'

import clsx from 'clsx'

import { Icon } from 'components/ui'


type PreloaderProps = {
  className?: string
}

const Preloader: React.CFC<PreloaderProps> = (props) => {
  const { children, className } = props

  return (
    <div className={clsx(className, 'relative size-full rounded-full')}>
      <Icon className="absolute top-0 left-0 right-0 bottom-0 size-full m-auto" name="interface/preloader" />
      <div className="absolute top-0 left-0 right-0 bottom-0 size-full p-3 m-auto">
        {
          children || (
            <Icon className="size-full" name="tokens/azuro" />
          )
        }
      </div>
    </div>
  )
}

export default Preloader
