import dayjs from 'dayjs'


const getGameDateTime = (startDate: number) => {
  const dateTime = dayjs(startDate)

  let date = dateTime.format('DD MMM')
  const time = dateTime.format('HH:mm')

  if (dateTime.isSame(dayjs(), 'day') ) {
    date = 'Today'
  }
  else if (dateTime.isSame(dayjs().add(1, 'day'), 'day')) {
    date = 'Tomorrow'
  }

  return { date, time }
}

export default getGameDateTime
