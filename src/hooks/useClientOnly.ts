import { useEffect, useState } from 'react'


const useClientOnly = () => {
// means only render after hydration on client, so initialState = false on client too
  const [ isVisible, setVisibility ] = useState(false)

  useEffect(() => {
    setVisibility(true)
  }, [])

  return isVisible
}

export default useClientOnly
