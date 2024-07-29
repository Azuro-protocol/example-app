import { svgRuntime } from './SvgProvider'


const containerId = 'svg-sprite'
const baseInnerHtml = ``

// if SSR is enabled, content should be static and synced on the client hydration
const clientWithSSRInnerHTML = typeof document !== 'undefined' && document.getElementById(containerId)?.innerHTML

const SvgSprite: React.FC<{ withSSR?: boolean }> = ({ withSSR = true }) => {
  const isClientWithSSRFlow = withSSR && typeof window !== 'undefined'

  let innerHtml = (isClientWithSSRFlow ? clientWithSSRInnerHTML : baseInnerHtml) || baseInnerHtml

  if (!isClientWithSSRFlow && 'getSymbolsHtml' in svgRuntime) {
    innerHtml += svgRuntime.getSymbolsHtml()
  }

  return (
    <svg
      id={containerId}
      xmlns="http://www.w3.org/2000/svg"
      dangerouslySetInnerHTML={{ __html: innerHtml }}
    />
  )
}

export default SvgSprite
