import { type MutableRefObject, useMemo, useRef } from 'react'


type Props = {
  odds: number
  nodeRef: MutableRefObject<HTMLDivElement | null>
}

const useOddsChange = ({ odds, nodeRef }: Props) => {
  const prevOdds = useRef<number>()
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useMemo(() => {
    if (odds) {
      if (prevOdds.current) {
        if (prevOdds.current === odds) {
          return
        }

        nodeRef.current?.classList.remove('increased', 'decreased')
        clearTimeout(timerRef.current!)

        nodeRef.current?.classList.add(odds > prevOdds.current ? 'increased' : 'decreased')

        timerRef.current = setTimeout(() => {
          nodeRef.current?.classList.remove('increased', 'decreased')
        }, 1500)
      }

      prevOdds.current = odds
    }
  }, [ odds ])
}

export default useOddsChange
