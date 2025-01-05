'use client'

import { Message } from '@locmod/intl'
import cx from 'classnames'

import { LiveDot } from 'components/ui'

import messages from './messages'


type LiveLabelProps = {
  className?: string
  inverse?: boolean
}

const LiveLabel: React.FC<LiveLabelProps> = ({ className, inverse = false }) => (
  <div className={cx(className, 'inline-flex items-center')}>
    <LiveDot className="mr-1" inverse={inverse} />
    <Message
      className={
        cx('text-caption-13 font-semibold', {
          'text-accent-red': !inverse,
          'text-grey-90': inverse,
        })
      }
      value={messages.live}
    />
  </div>
)

export default LiveLabel
