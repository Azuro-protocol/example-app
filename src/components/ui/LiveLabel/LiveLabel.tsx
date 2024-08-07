'use client'

import { Message } from '@locmod/intl'
import cx from 'classnames'

import { LiveDot } from 'components/ui'

import messages from './messages'


type LiveLabelProps = {
  className?: string
}

const LiveLabel: React.FC<LiveLabelProps> = ({ className }) => (
  <div className={cx(className, 'inline-flex items-center')}>
    <LiveDot className="mr-1" />
    <Message className="text-caption-13 font-semibold text-accent-red" value={messages.live} />
  </div>
)

export default LiveLabel
