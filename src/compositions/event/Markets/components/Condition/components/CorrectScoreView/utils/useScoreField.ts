import { useEffect, useState } from 'react'


const clamp = (value: number, max: number) => Math.min(Math.max(value, 0), max)

/**
 * A score field kept within `[0, max]`. When `max` shrinks (e.g. live outcomes
 * update), the current value is clamped down immediately.
 */
const useScoreField = (max: number) => {
  const [ value, setValue ] = useState(0)

  useEffect(() => {
    setValue((prev) => clamp(prev, max))
  }, [ max ])

  const set = (next: number) => {
    setValue(clamp(next, max))
  }

  return {
    value,
    set,
  }
}

export default useScoreField
