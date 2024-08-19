import { svgRuntime } from './SvgProvider'


const containerId = 'svg-sprite'
const baseInnerHtml = `
<defs>
  <linearGradient id="gradient-primary" x1="19.007" y1="1.856" x2="1.896" y2="2.013" gradientUnits="userSpaceOnUse"><stop stop-color="#FCBD89" /><stop offset=".494" stop-color="#B78EFF" /><stop offset="1" stop-color="#82FCF4" /></linearGradient>
  <linearGradient id="gradient-secondary" x1="21.37" y1="5.33" x2="-7.16" y2="4.72" gradientUnits="userSpaceOnUse"><stop stop-color="#82FCF4"/><stop offset="1" stop-color="#B991FF"/></linearGradient>
  <linearGradient id="gradient-tertiary" x1="21.37" y1="5.33" x2="-7.16" y2="4.72" gradientUnits="userSpaceOnUse"><stop stop-color="#F8B980"/><stop offset="1" stop-color="#E882C0"/></linearGradient>
  <linearGradient id="gradient-azuro-waves-sky" gradientUnits="userSpaceOnUse"><stop stop-color="#94D3F3" /><stop stop-color="#83D5FF" offset="100%" /></linearGradient>
  <linearGradient id="gradient-azuro-waves-blue" gradientUnits="userSpaceOnUse"><stop stop-color="#83D5FF" /><stop stop-color="#64CAFF" offset="100%" /></linearGradient>
  <linearGradient id="gradient-azuro-waves-ultramarine" gradientUnits="userSpaceOnUse"><stop stop-color="#64CAFF" /><stop stop-color="#05AAFF" offset="100%" /></linearGradient>
  <linearGradient id="gradient-azuro-waves-bright" gradientUnits="userSpaceOnUse"><stop stop-color="#05AAFF" /><stop stop-color="#3499FE" offset="100%" /></linearGradient>
  <linearGradient id="gradient-azuro-waves-brilliant" gradientUnits="userSpaceOnUse"><stop stop-color="#3499FE" /><stop stop-color="#3D67FF" offset="100%" /></linearGradient>
  <linearGradient id="gradient-azuro-waves-royal" gradientUnits="userSpaceOnUse"><stop stop-color="#3D67FF" /><stop stop-color="#022E87" offset="100%" /></linearGradient>
</defs>`

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
