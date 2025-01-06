let gameId = ''
let listeners: Function[] = []

const emitChange = () => {
  for (let listener of listeners) {
    listener()
  }
}

const liveStatisticsGameIdStore = {
  setGameId(newGameId: string) {
    gameId = newGameId
    emitChange()
  },
  subscribe(listener: Function) {
    listeners = [ ...listeners, listener ]

    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  },
  getSnapshot() {
    return gameId
  },
}

export default liveStatisticsGameIdStore
