import { Message } from '@locmod/intl'

import { useFilterByTime } from 'compositions/events/TimeFilter/TimeFilter'

import messages from './messages'


const EmptyContent: React.FC = () => {
  const { resetFilterByTime } = useFilterByTime()

  return (
    <div className="flex items-center text-caption-13 font-medium bg-bg-l2 px-4 py-3 rounded-md">
      <Message className="mr-2" value={messages.text} />
      <button className="cursor-pointer" onClick={resetFilterByTime}>
        <Message className="text-brand-50" value={messages.reset} />
      </button>
    </div>
  )
}

export default EmptyContent
