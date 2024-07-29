import { useEffect, useRef, useState } from 'react'
import { useSvgProvider } from './SvgProvider'


const useSvgData = (src: string, source?: string, symbolId?: string) => {
  const runtime = useSvgProvider()

  const loadedSrcRef = useRef<string | null>(null)
  const [ svgData, setSvgData ] = useState<SvgProvider.SvgData | undefined | null>(() => {
    try {
      if (runtime.isLoaded(src)) {
        loadedSrcRef.current = src

        return runtime.getSvgData(src)
      }

      if (source) {
        loadedSrcRef.current = src

        return runtime.loadSvgDataFromSource(src, source, symbolId)
      }
    }
    catch (error: any) {
      console.error(error)
    }

    return null
  })

  useEffect(() => {
    if (loadedSrcRef.current === src) {
      return
    }

    let isMounted = true

    if (src) {
      runtime.loadSvgData(src, symbolId)
        .then((svgData) => {
          if (isMounted) {
            setSvgData(svgData)
            loadedSrcRef.current = src
          }
        })
        .catch((error) => {
          console.error(error)

          if (isMounted) {
            setSvgData(null)
          }
        })
    }

    return () => {
      isMounted = false
    }
  }, [ src, symbolId, runtime ])

  return svgData
}

export default useSvgData
